import { NavLink } from "react-router-dom";

export default function Dashboard() {
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
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                    2024-03-15
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 ">
                    Grocery Shopping
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 ">
                    Food
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-400 ">
                    $-120.50
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                    2024-03-15
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 ">
                    Rent Payment
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 ">
                    Housing
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-400 ">
                    $-1200.50
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                    2024-03-15
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 ">
                    Dinner with friends
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 ">
                    Entertaiment
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-400 ">
                    $-80.50
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                    2024-03-15
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 ">
                    Salary Deposit 
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 ">
                    Income
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400 ">
                    $5,000.50
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                    2024-03-15
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 ">
                    Online Shopping
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 ">
                    Shopping
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-400 ">
                    $-250.50
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-start mt-30  ">
            <NavLink to="/transactions/add" className="w-1/4 text-white bg-[#13A4EC] font-bold px-4 rounded-2xl hover:bg-[#13A4EC]/50 py-3 text-center">
              New Transaction
            </NavLink>
          </div>
        </main>
      </section>
    </>
  );
}
