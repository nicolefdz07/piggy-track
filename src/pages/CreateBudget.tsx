import { RiEdit2Line } from "react-icons/ri";
import { MdAttachMoney } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { BsCalendar2Event } from "react-icons/bs";
import { supabase } from "../lib/supabaseClient";
import type { Budget } from "../types/Types";
import { useAuth } from "../context/AuthContext";
import {useActionState} from "react"
import { useNavigate } from "react-router-dom";

export default function CreateBudget() {
  const { session } = useAuth();

  const userId = session?.user.id || "";
  const navigate = useNavigate();

  const [error, submitAction, isPending] = useActionState(
    async (prevState, formData: FormData) => {
      if (!userId) {
        console.error("No user logged in");
        return new Error("User not logged in");
      }

      try {
        const newBudget: Omit<Budget, "id"> = {
          user_id: userId,
          name: String(formData.get("name") ?? ""),
          total_amount: parseFloat(String(formData.get("total_amount") ?? "0")) || 0,
          amount_spent: parseFloat(String(formData.get("amount_spent") ?? "0")) || 0,
          category: String(formData.get("category") ?? ""),
          period: String(formData.get("period") as string) || "",
        };

        console.log("Inserting budget:", newBudget);

        // return after inserting into supabase
        const { data, error: insertError } = await supabase
          .from("budgets")
          .insert([newBudget])
          .select()
          .single();

        if (insertError) {
          console.error("Error inserting budget:", insertError);
          return new Error("Failed to add budget");
        }

        console.log("Budget added:", data);
        navigate("/budget");
        return data;
      } catch (err: unknown) {
        console.error("Unexpected error adding budget:", err);
        if (err instanceof Error) return err;
        return new Error("Unknown error");
      }
    },
    null // initial state
  );

  return (
    <main className="flex flex-1 items-center justify-center py-12">
      <div className="w-full max-w-2xl space-y-8 rounded-2xl  p-8 shadow-sm dark:bg-background-dark/50">
        <div>
          <h2 className="text-3xl font-bold text-white">Create New Budget</h2>
          <p className="mt-2 text-sm text-slate-400">
            Set up a new budget to track your spending.
          </p>
        </div>
        <form action={submitAction}
        className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-300"
                htmlFor="budget-name"
              >
                Budget Name
              </label>
              <div className="relative">
                <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <RiEdit2Line className="h-5 w-5 text-slate-400" />
                </span>
                <input
                  name="name"
                  className="form-input block w-full rounded-2xl border border-[#129EE4]/30   py-3 pl-10 pr-3 text-slate-900 placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
                  id="budget-name"
                  placeholder="e.g., Groceries"
                  type="text"
                  disabled={isPending}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                htmlFor="total-amount"
              >
                Total Amount
              </label>
              <div className="relative">
                <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <MdAttachMoney className="h-5 w-5 text-slate-400" />
                </span>
                <input
                  className="form-input block w-full rounded-2xl border border-[#129EE4]/30 bg-background-light py-3 pl-10 pr-3 text-slate-900 placeholder:text-slate-400 focus:border-[#129EE4] border-[#129EE4]/50 dark:bg-background-dark dark:text-white dark:placeholder:text-slate-500 focus:outline-none"
                  id="total_amount"
                  placeholder="e.g., 500"
                  type="number"
                  name="total_amount"
                  disabled={isPending}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                htmlFor="category"
              >
                Category
              </label>
              <div className="relative">
                <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <MdOutlineCategory className="h-5 w-5 text-slate-400" />
                </span>
                <select
                  className="form-select block w-full appearance-none rounded-2xl border border-[#129EE4]/30 bg-background-light py-3 pl-10 pr-10 text-slate-900 focus:border-[#129EE4] dark:border-[#129EE4]/50 dark:bg-background-dark dark:text-white focus-outline-none"
                  id="category"
                  name="category"
                  disabled={isPending}
                >
                  <option>Select a category</option>
                  <option>Food</option>
                  <option>Transportation</option>
                  <option>Entertainment</option>
                  <option>Utilities</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                htmlFor="period"
              >
                Period
              </label>
              <div className="relative">
                <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <BsCalendar2Event className="h-5 w-5 text-slate-400" />
                </span>
                <select
                  className="form-select block w-full appearance-none rounded-2xl border border-[#129EE4]/30 py-3 pl-10 pr-10 text-slate-900 focus:border-[#129EE4] dark:border-[#129EE4]/50  focus-outline-none"
                  id="period"
                  name="period"
                  disabled={isPending}
                >
                  <option>Select a period</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Yearly</option>
                </select>
              </div>
            </div>
          </div>
          <div className="space-y-2 pt-2">
            {/* <div className="flex items-center justify-between"> */}
              {/* <label
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                htmlFor="spent"
              >
                Amount Spent
              </label> */}
              {/* <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                $125 / $500
              </span> */}
            {/* </div> */}
            {/* <div className="h-2.5 w-full rounded-full bg-[#129EE4]/20 dark:bg-[#129EE4]/30">
              <div
                className="h-2.5 rounded-full bg-[#129EE4]"
                style={{ width: "25%" }}
              ></div>
            </div> */}
          </div>
          <div>
            <button
              className="flex w-full justify-center rounded-2xl bg-[#129EE4] px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#129EE4]/90 focus:outline-none dark:ring-offset-background-dark"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Creating budget..." : "Create Budget"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
