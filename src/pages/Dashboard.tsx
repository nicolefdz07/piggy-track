import { supabase } from "../lib/supabaseClient";
import { useContext, useEffect, useMemo, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardTable from "../components/DashboardTable";
import type { RecentTransaction, Transaction } from "../types/Types";
import TransactionsContext from "../context/TransactionsContext";
import { formatCurrency } from "../utils/formatCurrency";
import type { FilterType, FilterCategory, FilterDate } from "../types/Types";

export default function Dashboard() {
  const { session } = useAuth();
  const context = useContext(TransactionsContext);
  const transactions = context?.transactions || [];
  const [recentTransactions, setRecentTransactions] = useState<
    RecentTransaction[]
  >([]);

  const income: number = transactions
    .filter((tx) => tx.type === "income")
    .reduce((acc: number, tx) => acc + tx.amount, 0);
  const expenses: number = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc: number, tx) => acc + tx.amount, 0);
  const totalBalance: number = income - expenses;
  const [searchParams, setSearchParams] = useSearchParams();

  const category: FilterCategory = searchParams.get("category") || "all";
  const type: string = searchParams.get("type") || "all";
  const date: FilterDate = searchParams.get("date") || "all";

  async function fetchRecentTransactions(): Promise<void> {
    try {
      const { data, error } = await supabase
        .from("transactions")
        .select(
          `
    date,
    description,
    category,
    amount,
    type,
    id
    `
        )
        .order("created_at", {
          ascending: false,
        })
        .limit(6);

      if (error) {
        throw new Error(error.message);
      }
      setRecentTransactions(data as RecentTransaction[]);
      console.log("recent transactions: ", data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  useEffect(() => {
    fetchRecentTransactions();

    const channel = supabase
      .channel("transactions_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "transactions",
        },
        (payload) => {
          // Action
          fetchRecentTransactions();
          console.log("payload", payload.new);
        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const displayDashTrans = useMemo(() => {
    return recentTransactions.filter((t) => {
      const matchType = type === "all" || t.type?.toLowerCase().trim() === type.toLowerCase().trim();
      const matchDate = date === "all" || t.date?.toLowerCase().trim() === date.toLowerCase().trim();
      const matchCategory = category === "all" || t.category?.toLowerCase().trim() === category.toLowerCase().trim();
      return matchCategory && matchDate && matchType;
    });
  }, [recentTransactions, type, date, category]);

  const handleFilterChange = (param: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "all") {
      newParams.delete(param);
    } else {
      newParams.set(param, value);
    }
    setSearchParams(newParams);
  };
  return (
    <>
      <section className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-white text-right mt-12 mr-12">
          Dashboard
        </h2>
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 ">
              <h3 className="text-gray-400 font-medium mb-2">Total Balance</h3>
              <p className="text-3xl font-bold text-white">
                {formatCurrency(totalBalance)}
              </p>
            </div>
            <div className="p-6 ">
              <h3 className="text-gray-400 font-medium mb-2">Income</h3>
              <p className="text-3xl font-bold text-green-400">
                {formatCurrency(income)}
              </p>
            </div>
            <div className="p-6 ">
              <h3 className="text-gray-400 font-medium mb-2">Expenses</h3>
              <p className="text-3xl font-bold text-red-400">
                {formatCurrency(expenses)}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center mb-6 flex-col gap-2 md:flex-row">
            <h3 className="text-2xl font-bold text-white">
              Recent Transactions
            </h3>
            <div className="flex items-center gap-4">
              <select
                value={type}
                onChange={(e) =>
                  handleFilterChange("type", e.target.value.toLowerCase())
                }
                className=" border border-gray-600 text-gray-400 bg-transparent px-4 py-2 rounded-full pr-8  cursor-pointer hover:bg-gray-800 focus:outline-none"
              >
                <option value="all">Type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <select
                value={category}
                onChange={(e) =>
                  handleFilterChange("category", e.target.value.toLowerCase())
                }
                className=" border border-gray-600 text-gray-400 bg-transparent px-4 py-2 rounded-full pr-8  cursor-pointer hover:bg-gray-800 focus:outline-none"
              >
                <option value="all">Category</option>
                <option value="food & dining">Food &amp; Dining</option>
                <option value="transportation">Transportation</option>
                <option value="shopping">Shopping</option>
                <option value="utilities">Utilities</option>
                <option value="entertainment">Entertainment</option>
                <option value="salary">Salary</option>
                <option value="other">Other</option>
              </select>
              <select
                value={date}
                onChange={(e) =>
                  handleFilterChange("date", e.target.value.toLowerCase())
                }
                className=" border border-gray-600 text-gray-400 bg-transparent px-4 py-2 rounded-full cursor-pointer hover:bg-gray-800 focus:outline-none"
              >
                <option value="all">Date</option>
              </select>
            </div>
          </div>
          <div className="rounded-t-3xl overflow-hidden mt-8">
            <table className="w-full">
              <thead className="bg-gray-800/50 rounded-t-full">
                <tr>
                  <th className="px-6 py-4 text-xs text-left font-bold  text-gray-400 uppercase tracking-wider">
                    date
                  </th>
                  <th className="px-6 py-4 text-xs text-left font-bold  text-gray-400 uppercase tracking-wider">
                    description
                  </th>
                  <th className="px-6 py-4 text-xs text-left font-bold  text-gray-400 uppercase tracking-wider">
                    category
                  </th>
                  <th className="px-6 py-4 text-xs text-left font-bold  text-gray-400 uppercase tracking-wider">
                    amount
                  </th>
                </tr>
              </thead>

              <DashboardTable
                transactions={displayDashTrans || recentTransactions}
              />
            </table>
          </div>
          <div className="flex justify-start mt-30  ">
            <NavLink
              to="/transactions/add"
              className="w-1/4 text-white bg-[#13A4EC] font-bold px-4 rounded-2xl hover:bg-[#13A4EC]/50 py-3 text-center"
            >
              New Transaction
            </NavLink>
          </div>
        </main>
      </section>
    </>
  );
}
