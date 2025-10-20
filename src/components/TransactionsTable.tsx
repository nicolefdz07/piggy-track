import type { Transaction } from "../types/Types";

export default function TransactionsTable({ transactions }: { transactions: Transaction[] }) {
  return (
    <tbody>
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
              </tbody>
  )
}