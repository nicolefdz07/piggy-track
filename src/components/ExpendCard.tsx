import { RiDeleteBin6Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";

export default function ExpendCard({
  type,
  remaining,
  icon,
  total_amount,
  total_spent,
  id,
  onDelete
}: {
  type: string;
  remaining: number;
  icon?: React.ReactNode;
  total_amount: number;
  total_spent: number;
  id: string;
  onDelete: ()=> void;
}) {
  const calcWidth = (total_spent / total_amount) * 100;
  return (
    <>
      <div className="bg-[#1A2830] p-6 rounded-xl shadow-sm border border-gray-700 ">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#129EE4]/20 text-[#129EE4] text-[#129EE4]">
              <span>{icon}</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <NavLink to={`/budget/edit/${id}`}>
                  <h3 className="text-lg font-bold text-white">{type}</h3>
                </NavLink>
                <button onClick={onDelete}>
                  <RiDeleteBin6Line className="text-xl font-bold text-[#129EE4] hover:text-[#0f7ae5]" />
                </button>
              </div>
              <p className="text-sm text-gray-400">Remaining: ${remaining}</p>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-white">
                ${total_spent} / ${total_amount}
              </span>
              <span className="text-gray-400">{calcWidth}%</span>
            </div>
            <div className="bg-[#243641] rounded-full h-3 overflow-hidden mt-1">
              <div
                id="progress"
                className="bg-[#129EE4] h-3 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${calcWidth}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
