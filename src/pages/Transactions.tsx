import { MdOutlineRestaurant } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { MdOutlineLocalMovies } from "react-icons/md";
import { NavLink } from "react-router-dom";
import type { Transaction } from "../types/Types";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import TransactionsTable from "../components/TransactionsTable";

export default function Transactions() {
  const { session } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  console.log("here should be the transactions list")
  async function fetchTransactions() {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", session?.user.id)
        .order("date", { ascending: false });

        if(error) throw error;
        setTransactions(data ?? [])
        console.log('data:', data)
        
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
              <button className="px-4 py-2 rounded-2xl bg-[#129EE4] text-white text-sm font-medium">
                All
              </button>
              <button className="px-4 py-2 rounded-2xl bg-[#1A2830] text-white hover:bg-primary/20 dark:hover:bg-primary/30 text-sm font-medium">
                Income
              </button>
              <button className="px-4 py-2 rounded-2xl bg-[#1A2830] text-white hover:bg-primary/20 dark:hover:bg-primary/30 text-sm font-medium">
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
              <TransactionsTable transactions={transactions} />
              {/* <tbody>
                <tr className="border-b  border-gray-700 hover:bg-subtle-light/50 dark:hover:bg-subtle-dark/50">
                  <NavLink to="/transactions/details">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-danger-light dark:text-danger-dark">
                          <MdOutlineRestaurant className="text-red-400 text-xl" />
                        </span>
                        <p className="font-medium text-white">
                          Breakfast in Central Perk
                        </p>
                      </div>
                    </td>
                  </NavLink>

                  <td className="p-4 text-gray-400 hidden md:table-cell">
                    Food
                  </td>
                  <td className="p-4 text-gray-400 hidden lg:table-cell">
                    July 15, 2024
                  </td>
                  <td className="p-4 text-right font-medium text-red-400">
                    -$15.50
                  </td>
                  <td className="p-4 text-center">
                    <button className="p-1 rounded-full text-gray-400 hover:text-primary hover:bg-primary/20">
                      <span className="material-symbols-outlined text-base">
                        ...
                      </span>
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-700 hover:bg-subtle-light/50 dark:hover:bg-subtle-dark/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-success-light dark:text-success-dark">
                        <FaMoneyCheckAlt className="text-green-400 text-xl" />
                      </span>
                      <p className="font-medium text-white">
                        Payment from ACME Corp
                      </p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-400 hidden md:table-cell">
                    Salary
                  </td>
                  <td className="p-4 text-gray-400 hidden lg:table-cell">
                    July 14, 2024
                  </td>
                  <td className="p-4 text-right font-medium text-green-400">
                    +$3,500.00
                  </td>
                  <td className="p-4 text-center">
                    <button className="p-1 rounded-full text-gray-400 hover:text-primary hover:bg-primary/20">
                      <span className="material-symbols-outlined text-base">
                        ...
                      </span>
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-700 hover:bg-subtle-light/50 dark:hover:bg-subtle-dark/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-danger-light dark:text-danger-dark">
                        <FaCar className="text-red-400 text-xl" />
                      </span>
                      <p className="font-medium text-white">Trip in taxi</p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-400 hidden md:table-cell">
                    Transportation
                  </td>
                  <td className="p-4 text-gray-400 hidden lg:table-cell">
                    July 12, 2024
                  </td>
                  <td className="p-4 text-right font-medium text-red-400">
                    -$25.00
                  </td>
                  <td className="p-4 text-center">
                    <button className="p-1 rounded-full text-gray-400 hover:text-primary hover:bg-primary/20">
                      <span className="material-symbols-outlined text-base">
                        ...
                      </span>
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-700 hover:bg-subtle-light/50 dark:hover:bg-subtle-dark/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-danger-light dark:text-danger-dark">
                        <MdOutlineShoppingBag className="text-red-400 text-xl" />
                      </span>
                      <p className="font-medium text-white">
                        Purchase of clothing at Elegant Store
                      </p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-400 hidden md:table-cell">
                    Shopping
                  </td>
                  <td className="p-4 text-gray-400 hidden lg:table-cell">
                    July 10, 2024
                  </td>
                  <td className="p-4 text-right font-medium text-red-400">
                    -$150.00
                  </td>
                  <td className="p-4 text-center">
                    <button className="p-1 rounded-full text-gray-400 hover:text-primary hover:bg-primary/20">
                      <span className="material-symbols-outlined text-base">
                        ...
                      </span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-subtle-light/50 dark:hover:bg-subtle-dark/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-danger-light dark:text-danger-dark">
                        <MdOutlineLocalMovies className="text-red-400 text-xl" />
                      </span>
                      <p className="font-medium text-white">
                        Movies with friends
                      </p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-400 hidden md:table-cell">
                    Entertainment
                  </td>
                  <td className="p-4 text-gray-400 hidden lg:table-cell">
                    July 8, 2024
                  </td>
                  <td className="p-4 text-right font-medium text-red-400">
                    -$40.00
                  </td>
                  <td className="p-4 text-center">
                    <button className="p-1 rounded-full text-gray-400 hover:text-primary hover:bg-primary/20">
                      <span className="material-symbols-outlined text-base">
                        ...
                      </span>
                    </button>
                  </td>
                </tr>
              </tbody> */}
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
