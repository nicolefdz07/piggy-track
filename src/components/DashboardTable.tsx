import type { RecentTransaction } from "../types/Types";
import { formatCurrency } from "../utils/formatCurrency";

export default function DashboardTable({
  transactions,
}: {
  transactions: RecentTransaction[];
}) {
  return (
    <tbody className="divide-y divide-gray-700">
      {transactions.map((transaction: RecentTransaction, idx: number) => {
        return (
          <tr key={transaction.id ?? idx}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
              {transaction.date}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
              {transaction.description}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
              {transaction.category}
            </td>
            <td
              className={`px-6 py-4 whitespace-nowrap text-sm ${
                transaction.type === "income"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {formatCurrency(transaction.amount)}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
