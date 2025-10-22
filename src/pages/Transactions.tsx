
import { NavLink } from "react-router-dom";
import type { Transaction } from "../types/Types";
import {  useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import TransactionsTable from "../components/TransactionsTable";
import { useSearchParams } from "react-router-dom";

export default function Transactions() {
  const { session } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  type FilterType = Transaction["type"] | "all";
  const type: string = searchParams.get("type") || "all";

  const displayTrans = useMemo(() => {
    return transactions.filter((t) => {
      const matchType = type === "all" || t.type === type;
      return matchType;
    });
  }, [transactions, type]);

  //  Cambiar filtro al hacer clic
  function handleTypeChange(newType: FilterType) {
    const params = new URLSearchParams(searchParams);
    if (newType === "all") {
      params.delete("type");
    } else {
      params.set("type", newType);
    }
    setSearchParams(params);
  }

  console.log("here should be the transactions list");
  async function fetchTransactions() {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", session?.user.id)
      .order("date", { ascending: false });

    if (error) throw error;
    setTransactions(data ?? []);
    console.log("data:", data);
  }

  useEffect(() => {
    if (session) {
      fetchTransactions();
    }
  }, [session]);

  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white">All Transactions</h2>
            <p className="text-gray-400">
              Manage your transactions for easier tracking. fácil.
            </p>
          </div>
        </div>
        <div className="bg-background-light dark:bg-background-dark p-4 rounded-lg">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-light dark:text-muted-dark"></span>
              <input
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-subtle-light dark:bg-subtle-dark border border-gray-700 focus:ring-2  focus:outline-none text-white placeholder:text-gray-400"
                placeholder="Search transactions by description, category..."
                type="text"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleTypeChange("all")}
                className={`px-4 py-2 rounded-2xl text-sm font-medium ${
                  type === "all"
                    ? "bg-[#129EE4] text-white"
                    : "bg-[#1A2830] text-white hover:bg-primary/20 dark:hover:bg-primary/30"
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleTypeChange("income")}
                className={`px-4 py-2 rounded-2xl text-sm font-medium ${
                  type === "income"
                    ? "bg-[#129EE4] text-white"
                    : "bg-[#1A2830] text-white hover:bg-primary/20 dark:hover:bg-primary/30"
                }`}
              >
                Income
              </button>
              <button
                onClick={() => handleTypeChange("expense")}
                className={`px-4 py-2 rounded-2xl text-sm font-medium ${
                  type === "expense"
                    ? "bg-[#129EE4] text-white"
                    : "bg-[#1A2830] text-white hover:bg-primary/20 dark:hover:bg-primary/30"
                }`}
              >
                Expenses
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700 ">
                  <th className="p-4 text-sm font-semibold text-gray-300">
                    Description
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-300 hidden md:table-cell">
                    Category
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-300 hidden lg:table-cell">
                    Date
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-300 text-right">
                    Amount
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-300 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <TransactionsTable transactions={displayTrans} />
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
