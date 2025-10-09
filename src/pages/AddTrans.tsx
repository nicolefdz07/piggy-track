import { FaRegSave } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";


export default function AddTrans() {
  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-white">Add Transaction</h2>
          <p className="text-gray-400">
            Fill in the details to record a new transaction.
          </p>
        </div>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-white" htmlFor="type">
                Type
              </label>
              <div className="flex items-center space-x-2">
                <button
                  className="w-full flex items-center justify-center gap-2 rounded-2xl py-3 px-4 bg-[#129EE4] text-white font-semibold text-sm"
                  type="button"
                >
                  <span className="">
                    <FaArrowDown className="text-white text-sm"/>
                  </span>
                  <span>Income</span>
                </button>
                <button
                  className="w-full flex items-center justify-center gap-2 rounded-2xl py-3 px-4 bg-[#1F2E36] hover:bg-primary/10 text-white font-semibold text-sm transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-base">
                    <FaArrowUp className="text-white text-sm"/>
                  </span>
                  <span>Expense</span>
                </button>
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
            >
              <option>Food &amp; Dining</option>
              <option>Transportation</option>
              <option>Shopping</option>
              <option>Utilities</option>
              <option>Entertainment</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-white" htmlFor="date">
              Date
            </label>
            <input
              className="w-full py-3 px-4 rounded-2xl border-none bg-[#1F2E36] focus:ring-2 focus:ring-[#129EE4] focus:ring-opacity-50 focus:outline-none text-white"
              id="date"
              name="date"
              type="date"
              value="2024-07-26"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2 text-white"
              htmlFor="description"
            >
              Description{" "}
              <span className="text-gray-400 ">(optional)</span>
            </label>
            <textarea
              className="w-full p-4 rounded-2xl border-none bg-[#1F2E36] focus:ring-2 focus:ring-[#129EE4] focus:ring-opacity-50 focus:outline-none placeholder:text-gray-400 dark:placeholder:text-subtle-dark text-white"
              id="description"
              name="description"
              placeholder="e.g., Groceries from the market"
              rows={3}
            ></textarea>
          </div>
          <div className="pt-2">
            <button
              className="w-full bg-[#129EE4] text-white font-bold py-4 px-4 rounded-2xl hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
              type="submit"
            >
              <span className="material-symbols-outlined">
                <FaRegSave className="text-white text-xl"/>
              </span>
              <span>Save Transaction</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
