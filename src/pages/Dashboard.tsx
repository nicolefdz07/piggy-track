import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardTable from "../components/DashboardTable";
import type { RecentTransaction } from "../types/Types";



export default function Dashboard() {
  const { session } = useAuth();
  const [recentTransactions, setRecentTransactions] = useState<
    RecentTransaction[]
  >([]);

  async function fetchRecentTransactions(): Promise<void> {
    try {
      const { data, error } = await supabase
        .from("transactions")
        .select(
          `
    date,
    description,
    category,
    amount
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
      console.log('recent transactions: ', data)
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  useEffect(() => {
    fetchRecentTransactions();

    const channel = supabase.channel('transactions_changes').on(
      'postgres_changes',
      {
       event: '*', 
          schema: 'public',
          table: 'transactions'
        },
        (payload) => {
          // Action
          fetchRecentTransactions();
          console.log("payload", payload.new);
          
        })

      .subscribe();

      return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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
              <p className="text-3xl font-bold text-white">$5,768.90</p>
            </div>
            <div className="p-6 ">
              <h3 className="text-gray-400 font-medium mb-2">Income</h3>
              <p className="text-3xl font-bold text-green-400">$5,768.90</p>
            </div>
            <div className="p-6 ">
              <h3 className="text-gray-400 font-medium mb-2">Expenses</h3>
              <p className="text-3xl font-bold text-red-400">$3,456.78</p>
            </div>
          </div>
          <div className="flex justify-between items-center mb-6 flex-col gap-2 md:flex-row">
            <h3 className="text-2xl font-bold text-white">
              Recent Transactions
            </h3>
            <div className="flex items-center gap-4">
              <select className=" border border-gray-600 text-gray-400 bg-transparent px-4 py-2 rounded-full pr-8  cursor-pointer hover:bg-gray-800 focus:outline-none">
                <option selected>Type</option>
                <option>Technology</option>
                <option>Business</option>
                <option>Health</option>
              </select>
              <select className=" border border-gray-600 text-gray-400 bg-transparent px-4 py-2 rounded-full pr-8  cursor-pointer hover:bg-gray-800 focus:outline-none">
                <option selected>Category</option>
                <option>Technology</option>
                <option>Business</option>
                <option>Health</option>
              </select>
              <select className=" border border-gray-600 text-gray-400 bg-transparent px-4 py-2 rounded-full cursor-pointer hover:bg-gray-800 focus:outline-none">
                <option selected>Date</option>
                <option>Technology</option>
                <option>Business</option>
                <option>Health</option>
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
              
              <DashboardTable transactions={recentTransactions} />
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
