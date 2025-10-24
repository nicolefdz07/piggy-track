export default function Reports() {
  return (
    <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 text-white">
            Financial Reports
          </h2>
          <p className="mt-2 text-gray-600 text-gray-400">
            Analyze your financial performance over time with interactive charts
            and visualizations.
          </p>
        </div>
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <button className="flex items-center gap-2 rounded-full bg-background-light px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-background-dark dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-800">
            Period
            <span className="material-symbols-outlined text-base">
              {" "}
              
            </span>
          </button>
          <button className="flex items-center gap-2 rounded-full bg-background-light px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-background-dark dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-800">
            Category
            <span className="material-symbols-outlined text-base">
              {" "}
              
              
            </span>
          </button>
          <button className="flex items-center gap-2 rounded-full bg-background-light px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-background-dark dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-800">
            Transaction Type
            <span className="material-symbols-outlined text-base">
              {" "}
              
              
            </span>
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200  p-6 dark:border-gray-800 dark:bg-background-dark">
            <p className="font-medium text-gray-700 dark:text-gray-300">
              Income Over Time
            </p>
            <p className="mt-1 text-4xl font-bold text-gray-900 dark:text-white">
              $12,500
            </p>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <p className="text-gray-500 dark:text-gray-400">Last 12 Months</p>
              <p className="font-medium text-green-600">+15%</p>
            </div>
            <div className="mt-6 h-48">
                  <svg
                    fill="none"
                    height="100%"
                    preserveAspectRatio="none"
                    viewBox="-3 0 478 150"
                    width="100%"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z"
                      fill="url(#paint0_linear)"
                    ></path>
                    <path
                      d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                      stroke="#13a4ec"
                      strokeLinecap="round"
                      strokeWidth="3"
                    ></path>
                    <defs>
                      <linearGradient
                        gradientUnits="userSpaceOnUse"
                        id="paint0_linear"
                        x1="236"
                        x2="236"
                        y1="1"
                        y2="149"
                      >
                        <stop stopColor="#13a4ec" stopOpacity="0.2"></stop>
                        <stop
                          offset="1"
                          stopColor="#13a4ec"
                          stopOpacity="0"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
            <div className="mt-4 flex justify-around text-xs font-bold text-gray-500 dark:text-gray-400">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200  p-6 dark:border-gray-800 dark:bg-background-dark">
            <p className="font-medium text-gray-700 dark:text-gray-300">
              Expenses by Category
            </p>
            <p className="mt-1 text-4xl font-bold text-gray-900 dark:text-white">
              $7,800
            </p>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <p className="text-gray-500 dark:text-gray-400">Current Month</p>
              <p className="font-medium text-red-600">-8%</p>
            </div>
            <div className="mt-6 grid h-48 grid-flow-col items-end justify-items-center gap-4 px-2">
              <div className="flex h-full w-full flex-col items-center justify-end gap-1">
                <div
                  class="w-full rounded-t bg-primary/20"
                  style={{ height: "60%" }}
                ></div>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  Food
                </p>
              </div>
              <div className="flex h-full w-full flex-col items-center justify-end gap-1">
                <div
                  className="w-full rounded-t bg-primary/20"
                  style={{ height: "40%" }}
                ></div>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  Rent
                </p>
              </div>
              <div className="flex h-full w-full flex-col items-center justify-end gap-1">
                <div
                  className="w-full rounded-t bg-primary/20"
                  style={{ height: "70%" }}
                ></div>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  Util
                </p>
              </div>
              <div className="flex h-full w-full flex-col items-center justify-end gap-1">
                <div
                  className="w-full rounded-t bg-primary/20"
                  style={{ height: "20%" }}
                ></div>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  Trans
                </p>
              </div>
              <div className="flex h-full w-full flex-col items-center justify-end gap-1">
                <div
                  className="w-full rounded-t bg-primary/20"
                  style={{ height: "30%" }}
                ></div>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  Ent
                </p>
              </div>
              <div className="flex h-full w-full flex-col items-center justify-end gap-1">
                <div
                  className="w-full rounded-t bg-primary/20"
                  style={{ height: "20%" }}
                ></div>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  Shop
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200  p-6 dark:border-gray-800 dark:bg-background-dark">
            <p className="font-medium text-gray-700 dark:text-gray-300">
              Savings Trends
            </p>
            <p className="mt-1 text-4xl font-bold text-gray-900 dark:text-white">
              $4,700
            </p>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <p className="text-gray-500 dark:text-gray-400">Year to Date</p>
              <p className="font-medium text-green-600">+22%</p>
            </div>
            <div className="mt-6 grid h-48 grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 py-3">
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                Jan
              </p>
              <div className="h-2 w-full rounded-full bg-primary/20">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: "80%" }}
                ></div>
              </div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                Feb
              </p>
              <div className="h-2 w-full rounded-full bg-primary/20">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: "20%" }}
                ></div>
              </div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                Mar
              </p>
              <div className="h-2 w-full rounded-full bg-primary/20">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: "40%" }}
                ></div>
              </div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                Apr
              </p>
              <div className="h-2 w-full rounded-full bg-primary/20">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: "60%" }}
                ></div>
              </div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                May
              </p>
              <div className="h-2 w-full rounded-full bg-primary/20">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: "90%" }}
                ></div>
              </div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                Jun
              </p>
              <div className="h-2 w-full rounded-full bg-primary/20">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Detailed Breakdown
          </h3>
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-background-dark">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                      scope="col"
                    >
                      Date
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                      scope="col"
                    >
                      Description
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                      scope="col"
                    >
                      Category
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                      scope="col"
                    >
                      Type
                    </th>
                    <th
                      className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                      scope="col"
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200  dark:divide-gray-800 dark:bg-background-dark">
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      2024-07-15
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      Salary Deposit
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/50 dark:text-green-300">
                        Income
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Credit
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-green-600">
                      $5,000.00
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      2024-07-16
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      Grocery Shopping
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        Food
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Debit
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-gray-900 dark:text-white">
                      ($250.00)
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      2024-07-17
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      Rent Payment
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        Rent
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Debit
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-gray-900 dark:text-white">
                      ($1,500.00)
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      2024-07-18
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      Online Shopping
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        Shopping
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Debit
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-gray-900 dark:text-white">
                      ($100.00)
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      2024-07-19
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      Freelance Income
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/50 dark:text-green-300">
                        Income
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Credit
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-green-600">
                      $1,000.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center">
            <nav
              aria-label="Pagination"
              className="isolate inline-flex -space-x-px rounded-lg shadow-sm"
            >
              <a
                className="relative inline-flex items-center rounded-l-lg px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 dark:bg-background-dark dark:text-gray-500 dark:ring-gray-700 dark:hover:bg-gray-800"
                href="#"
              >
                <span className="material-symbols-outlined h-5 w-5">
                  chevron_left
                </span>
              </a>
              <a
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-primary px-4 py-2 text-sm font-semibold text-white focus:z-20"
                href="#"
              >
                1
              </a>
              <a
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 dark:bg-background-dark dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-800"
                href="#"
              >
                2
              </a>
              <a
                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 md:inline-flex dark:bg-background-dark dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-800"
                href="#"
              >
                3
              </a>
              <a
                className="relative inline-flex items-center rounded-r-lg px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 dark:bg-background-dark dark:text-gray-500 dark:ring-gray-700 dark:hover:bg-gray-800"
                href="#"
              >
                <span className="material-symbols-outlined h-5 w-5">
                  chevron_right
                </span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
}
