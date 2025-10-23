import { MdOutlineMovieCreation, MdOutlineRestaurant } from "react-icons/md";
import { NavLink } from "react-router-dom";
import type { Transaction } from "../types/Types";
import { formatCurrency } from "../utils/formatCurrency";
import { useNavigate } from "react-router-dom";
import { FaCar, FaShoppingCart } from "react-icons/fa";
import { AiOutlineShopping } from "react-icons/ai";

export default function TransactionsTable({
  transactions,
}: {
  transactions: Transaction[];
})
 {
  const navigate = useNavigate()
  const getIcon = (category?: string) => {
      const cat = (category ?? "").toLowerCase().trim();
      if (cat.includes("food") || cat.includes("grocery"))
        return <MdOutlineRestaurant className="text-[#13A4EC] text-xl"/>;
      if (cat.includes("entertain")) return <MdOutlineMovieCreation className="text-[#13A4EC] text-xl"/>;
      if (cat.includes("shop")) return <AiOutlineShopping className="text-[#13A4EC] text-xl"/>;
      if (cat.includes("transport")) return <FaCar className="text-[#13A4EC] text-xl"/>;
      return <FaShoppingCart className="text-[#13A4EC] text-xl"/>;
    };
  return (
    <tbody>
      {transactions.map((transaction, idx) => (
        <tr
          key={transaction.id ?? idx}
          className="border-b border-gray-700 cursor-pointer hover:bg-gray-800"
          onClick={()=> navigate(`/transactions/details/${transaction.id}`)}
        >
          <td className="p-4">
            <div className="flex items-center gap-3">
              <NavLink
                to={`/transactions/details/${transaction.id}`}
                className="flex items-center gap-3"
              >
                {getIcon(transaction.category)}
                <p className="font-medium text-white">
                  {transaction.description}
                </p>
              </NavLink>
            </div>
          </td>

          <td className="p-4 text-gray-400 hidden md:table-cell">
            {transaction.category}
          </td>

          <td className="p-4 text-gray-400 hidden lg:table-cell">
            {transaction.date}
          </td>

          <td
            className={`p-4 text-right font-medium ${
              transaction.type === "income" ? "text-green-400" : "text-red-400"
            }`}
          >
            {transaction.type === "expense" ? "-" : "+"}
            {formatCurrency(transaction.amount)}
          </td>

          <td className="p-4 text-center">
            <button className="p-1 rounded-full text-gray-400 hover:text-primary hover:bg-primary/20">
              …
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
