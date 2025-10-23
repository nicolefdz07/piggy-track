import { useActionState, useState } from "react";
import { FaArrowDown, FaArrowUp, FaRegSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import type { Transaction } from "../types/Types";

export default function AddTrans() {
  const { session } = useAuth();
  const [type, setType] = useState<"income" | "expense">("income");
  const navigate = useNavigate();
  const userId = session?.user.id || "";
  const [error, submitAction, isPending] = useActionState(
    async (prevState, formData: FormData) => {
      if (!userId) {
        console.error("No user logged in");
        return new Error("User not logged in");
      }

      try {
        const newTransaction: Omit<Transaction, "id"> = {
          user_id: userId,
          type: type,
          amount: parseFloat(String(formData.get("amount") ?? "0")) || 0,
          category: String(formData.get("category") ?? ""),
          date: String(
            formData.get("date") ?? new Date().toISOString().slice(0, 10)
          ),
          description: (formData.get("description") as string) || undefined,
        };

        console.log("Inserting transaction:", newTransaction);

        // return after inserting into supabase
        const { data, error: insertError } = await supabase
          .from("transactions")
          .insert([newTransaction])
          .select()
          .single();

        if (insertError) {
          console.error("Error inserting transaction:", insertError);
          return new Error("Failed to add transaction");
        }

        console.log("Transaction added:", data);
        navigate("/transactions");
        return data;
      } catch (err: unknown) {
        console.error("Unexpected error adding transaction:", err);
        if (err instanceof Error) return err;
        return new Error("Unknown error");
      }
    },
    null // initial state
  );
  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Add Transaction
          </h2>
          <p className="text-gray-400">
            Fill in the details to record a new transaction.
          </p>
        </div>
        <form action={submitAction} className="space-y-6">
          {/* Hidden input for user_id */}
          {userId && <input type="hidden" name="user_id" value={userId} />}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-sm font-medium mb-2 text-white"
                htmlFor="type"
              >
                Type
              </label>
              <div className="flex items-center space-x-2">
                <label
                  htmlFor="income"
                  className={`w-full flex items-center justify-center gap-2 rounded-2xl py-3 px-4 font-semibold text-sm cursor-pointer transition-colors duration-300 ${
                    type === "income"
                      ? "bg-[#129EE4] text-white"
                      : "bg-[#1F2E36] text-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    id="income"
                    name="type"
                    value="income"
                    checked={type === "income"}
                    onChange={() => setType("income")}
                    className="hidden"
                    disabled={isPending}
                  />
                  <FaArrowDown className="text-white text-sm" />
                  <span>Income</span>
                </label>
                <label
                  htmlFor="expense"
                  className={`w-full flex items-center justify-center gap-2 rounded-2xl py-3 px-4 font-semibold text-sm cursor-pointer transition-colors duration-300 ${
                    type === "expense"
                      ? "bg-red-500 text-white"
                      : "bg-[#1F2E36] text-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    id="expense"
                    name="type"
                    value="expense"
                    checked={type === "expense"}
                    onChange={() => setType("expense")}
                    className="hidden"
                    disabled={isPending}
                  />
                  <FaArrowUp className="text-white text-sm" />
                  <span>Expense</span>
                </label>
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-2 text-white "
                htmlFor="amount"
              >
                Amount
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-subtle-dark">
                  $
                </span>
                <input
                  className="w-full pl-7 pr-4 py-3 rounded-2xl border-none bg-[#1F2E36] focus:ring-2 focus:ring-[#129EE4] focus:ring-opacity-50 focus:outline-none placeholder:text-gray-400 dark:placeholder:text-subtle-dark text-white"
                  id="amount"
                  name="amount"
                  placeholder="0.00"
                  type="number"
                  disabled={isPending}
                />
              </div>
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2 text-white"
              htmlFor="category"
            >
              Category
            </label>
            <select
              className="form-select w-full py-3 px-4 rounded-2xl border-none bg-[#1F2E36] focus:ring-2 focus:ring-[#129EE4] focus:ring-opacity-50 focus:outline-none text-white"
              id="category"
              name="category"
              required
              disabled={isPending}
            >
              <option>Food &amp; Dining</option>
              <option>Transportation</option>
              <option>Shopping</option>
              <option>Utilities</option>
              <option>Entertainment</option>
              <option>Salary</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2 text-white"
              htmlFor="date"
            >
              Date
            </label>
            <input
              className="w-full py-3 px-4 rounded-2xl border-none bg-[#1F2E36] focus:ring-2 focus:ring-[#129EE4] focus:ring-opacity-50 focus:outline-none text-white"
              id="date"
              name="date"
              required
              type="date"
              disabled={isPending}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2 text-white"
              htmlFor="description"
            >
              Description <span className="text-gray-400 ">(optional)</span>
            </label>
            <textarea
              className="w-full p-4 rounded-2xl border-none bg-[#1F2E36] focus:ring-2 focus:ring-[#129EE4] focus:ring-opacity-50 focus:outline-none placeholder:text-gray-400 dark:placeholder:text-subtle-dark text-white"
              id="description"
              name="description"
              placeholder="e.g., Groceries from the market"
              rows={3}
              disabled={isPending}
            ></textarea>
          </div>
          <div className="pt-2">
            <button
              className="w-full bg-[#129EE4] text-white font-bold py-4 px-4 rounded-2xl hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
              type="submit"
              disabled={isPending}
            >
              <span className="material-symbols-outlined">
                <FaRegSave className="text-white text-xl" />
              </span>
              <span>{isPending ? "Saving..." : "Save Transaction"}</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
