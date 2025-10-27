import { useContext, useMemo } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import DashboardTable from "../components/DashboardTable";
import TransactionsContext from "../context/TransactionsContext";
import type { FilterCategory, FilterDate } from "../types/Types";
import { formatCurrency } from "../utils/formatCurrency";

export default function Dashboard() {
  const context = useContext(TransactionsContext);
  const transactions = context?.transactions || [];
  const recentTransactions = context?.recentTransactions || [];

  const income: number = transactions
    .filter((tx) => tx.type === "income")
    .reduce((acc: number, tx) => acc + tx.amount, 0);
  const expenses: number = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc: number, tx) => acc + tx.amount, 0);
  const totalBalance: number = income - expenses;
  const [searchParams, setSearchParams] = useSearchParams();

  const category: FilterCategory =
    (searchParams.get("category") as FilterCategory) || "all";
  const type: string = searchParams.get("type") || "all";
  const date: FilterDate = (searchParams.get("date") as FilterDate) || "all";

  const displayDashTrans = useMemo(() => {
    return recentTransactions.filter((t) => {
      const matchType =
        type === "all" ||
        t.type?.toLowerCase().trim() === type.toLowerCase().trim();
      const matchDate =
        date === "all" ||
        t.date?.toLowerCase().trim() === date.toLowerCase().trim();
      const matchCategory =
        category === "all" ||
        t.category?.toLowerCase().trim() === category.toLowerCase().trim();
      return matchCategory && matchDate && matchType;
    });
  }, [recentTransactions, type, date, category]);

  console.log('display trans', displayDashTrans)
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-6 text-white mt-8">Dashboard</h2>

        <main className="mb-8">
          {/* Summary cards - responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="p-6 rounded-lg border border-gray-800">
              <h3 className="text-gray-400 text-sm font-medium">
                Total Balance
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-white mt-2">
                {formatCurrency(totalBalance)}
              </p>
            </div>

            <div className="p-6 rounded-lg border border-gray-800">
              <h3 className="text-gray-400 text-sm font-medium">Income</h3>
              <p className="text-2xl md:text-3xl font-bold text-green-400 mt-2">
                {formatCurrency(income)}
              </p>
            </div>

            <div className="p-6  rounded-lg border border-gray-800">
              <h3 className="text-gray-400 text-sm font-medium">Expenses</h3>
              <p className="text-2xl md:text-3xl font-bold text-red-400 mt-2">
                {formatCurrency(expenses)}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h3 className="text-2xl font-bold text-white">
              Recent Transactions
            </h3>

            <div className="flex items-center gap-3">
              <select
                value={type}
                onChange={(e) =>
                  handleFilterChange("type", e.target.value.toLowerCase())
                }
                className="border border-gray-600 text-gray-400 bg-transparent px-3 py-2 rounded-full cursor-pointer focus:outline-none"
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
                className="border border-gray-600 text-gray-400 bg-transparent px-3 py-2 rounded-full cursor-pointer focus:outline-none"
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
            </div>
          </div>

          {/* Table for md+ screens */}
          <div className="hidden md:block rounded-t-3xl overflow-hidden">
            <div className="overflow-x-auto bg-transparent">
              <table className="w-full min-w-[640px]">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-gray-400 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-gray-400 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-right text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>

                <DashboardTable
                  transactions={displayDashTrans || recentTransactions}
                />
              </table>
            </div>
          </div>

          {/* Mobile list view */}
          <div className="md:hidden space-y-3">
            {(displayDashTrans.length
              ? displayDashTrans
              : displayDashTrans
            ).map((t) => (
              <NavLink to={`/transactions/details/${t.id}`} key={t.id}>

              
              <div
                key={t.id}
                className="bg-[#0f1720] border border-gray-800 rounded-lg p-4 flex items-start justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">
                      {new Date(t.date).toLocaleDateString()}
                    </p>
                    <p
                      className={`font-semibold ${
                        t.type === "income" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {formatCurrency(t.amount)}
                    </p>
                  </div>
                  <p className="text-white font-medium mt-2">
                    {t.description || "No description"}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    {t.category || "Other"}
                  </p>
                </div>
              </div>
              </NavLink>
            ))}
            
          </div>

          {/* CTA */}
          <div className="flex justify-start mt-6">
            <NavLink
              to="/transactions/add"
              className="block w-full md:inline-block md:w-1/4 text-white bg-[#13A4EC] font-bold px-4 rounded-2xl hover:bg-[#13A4EC]/90 py-3 text-center"
            >
              New Transaction
            </NavLink>
          </div>
        </main>
      </section>
    </>
  );
}
