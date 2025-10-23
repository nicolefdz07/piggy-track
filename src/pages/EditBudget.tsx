import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import { useEffect } from "react";

;

export default async function EditBudget() {
  const {id} = useParams<{id: string}>();
  const {session} = useAuth();

// useEffect(async () => {
//   if (!session) return;

//   const { error } = await supabase
//     .from('budgets')
//     .update({ name: 'piano' })
//     .eq('id', 1)
// }, [])







  return (
    <main className="flex-grow container mx-auto px-6 py-12 flex justify-center">
      <div className="w-full max-w-lg">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white">Modify Budget</h2>
          <p className="text-slate-400 mt-1">
            Update the details of your existing budget.
          </p>
        </div>
        <form className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium text-slate-300 k mb-2"
              htmlFor="budget-name"
            >
              Budget Name
            </label>
            <input
            
              className="w-full h-14 px-4 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-2xl focus:ring-2 focus:ring-[#129EE4] focus:border-[#129EE4] outline-none transition-shadow text-slate-400"
              id="budget-name"
              type="text"
              value="Monthly Groceries"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-slate-300 mb-2"
              htmlFor="total-amount"
            >
              Total Amount
            </label>
            <input
              className="w-full h-14 px-4 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-2xl  focus:ring-2 focus:ring-[#129EE4] focus:border-[#129EE4] outline-none transition-shadow text-slate-400"
              id="total-amount"
              type="number"
              value="500"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-slate-300 mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              className="form-select appearance-none w-full h-14 px-4 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-2xl  focus:ring-2 focus:ring-[#129EE4] focus:border-[#129EE4] outline-none transition-shadow text-slate-400"
              id="category"
            >
              <option>Food</option>
              <option selected={true}>Groceries</option>
              <option>Utilities</option>
              <option>Entertainment</option>
            </select>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-slate-300 mb-2"
              htmlFor="period"
            >
              Period
            </label>
            <select
              className="form-select appearance-none w-full h-14 px-4 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-2xl  focus:ring-2 focus:ring-[#129EE4] focus:border-[#129EE4] outline-none transition-shadow text-slate-400"
              id="period"
            >
              <option>Daily</option>
              <option>Weekly</option>
              <option selected={true}>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>
          <div className="pt-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-white">Amount Spent</p>
              <p className="text-sm font-bold text-white">60%</p>
            </div>
            <div className="w-full bg-border-light dark:bg-border-dark rounded-full h-2.5 bg-[#2A3B47]">
              <div
                className="bg-[#129EE4] h-2.5 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
            <p className="text-sm text-slate-400 mt-2">$300 / $500</p>
          </div>
          <div className="flex items-center justify-end gap-4 pt-6">
            <button
              className="px-6 py-3 rounded-full text-sm font-bold bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark hover:bg-border-light dark:hover:bg-border-dark transition-colors text-white"
              type="button"
            >
              Cancel
            </button>
            <button
              className="px-6 py-3 rounded-full text-sm font-bold bg-[#129EE4] text-white hover:opacity-90 transition-opacity"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
