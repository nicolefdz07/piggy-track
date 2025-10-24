import { useContext, useState } from "react";
import { CiWarning } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import TransactionsContext from "../context/TransactionsContext";
import { RiDeleteBin6Line, RiErrorWarningLine } from "react-icons/ri";
import type { Budget } from "../types/Types";
import ExpendCard from "./ExpendCard";
import DeleteBudgetModal from "./DeleteBudgetModal";
import useDeleteBudget from "../hooks/useDeleteBudget";
import { getIcon } from "../utils/helperFunctions";
import { getImg } from "../utils/helperFunctions";
import { calcWidthPercentage } from "../utils/helperFunctions";

export default function BudgetsTable({ budgets }: { budgets: Budget[] }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const context = useContext(TransactionsContext);
  const transactions = context?.transactions ?? [];
  const { handleDeleteBudget } = useDeleteBudget({
    onCloseModal: () => setOpenModal(false),
  });

  const spentAmount = (category?: string): number => {
    const cat = (category ?? "").toLowerCase().trim();
    return transactions
      .filter(
        (transaction: any) =>
          (transaction.category ?? "").toLowerCase().trim() === cat &&
          String(transaction.type ?? "").toLowerCase() === "expense"
      )
      .reduce(
        (sum: number, transaction: any) =>
          sum + (Number(transaction.amount) || 0),
        0
      );
  };

  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-white">
          Budgets
        </h2>
        <NavLink
          to="create"
          className="flex flex-items gap-2 bg-[#129EE4] text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <span>+</span>
          <span>New Budget</span>
        </NavLink>
      </div>
      {budgets[0] && (
        <div className="space-y-6">
          <div className="bg-[#1A2830] p-6 rounded-xl shadow-sm border border-gray-700 ">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#129EE4]/20 text-[#129EE4] text-[#129EE4]">
                    <span>
                      <FaShoppingCart className="text-2xl" />
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <NavLink to='/budget/create' 
                      state={{budget: budgets[0]}}>
                        <h3 className="text-lg font-bold text-white">
                          {budgets[0]?.name}
                        </h3>
                      </NavLink>
                      <button
                        onClick={() => {
                          setSelectedBudget(budgets[0] || null);
                          setOpenModal(true);
                        }}
                      >
                        <RiDeleteBin6Line className="text-3xl font-bold text-[#129EE4] hover:text-[#0f7ae5]" />
                      </button>
                      <DeleteBudgetModal
                        deleteFunc={() => {
                          if (selectedBudget?.id) {
                            handleDeleteBudget(selectedBudget.id);
                          }
                        }}
                        open={openModal}
                        budgetName={selectedBudget?.name || ""}
                        onClose={() => setOpenModal(false)}
                      />
                    </div>

                    <p className="text-sm text-gray-400">
                      Remaining: $
                      {Number(budgets[0]?.total_amount) -
                        spentAmount(budgets[0]?.category)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 ">
                  {/* Sección izquierda: info y barra */}
                  <div className="flex-[2] w-full justify-center">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-white">{`$${spentAmount(
                        budgets[0]?.category
                      )} / $${budgets[0]?.total_amount}`}</span>
                      <span className="text-gray-400">
                        {calcWidthPercentage(
                          spentAmount(budgets[0]?.category),
                          Number(budgets[0]?.total_amount)
                        )}
                      </span>
                    </div>

                    <div className="bg-[#243641] rounded-full h-3 overflow-hidden mt-1">
                      <div
                        id="progress"
                        className="bg-[#129EE4] h-3 rounded-full transition-all duration-300 ease-in-out"
                        style={{
                          width: calcWidthPercentage(
                            spentAmount(budgets[0]?.category),
                            Number(budgets[0]?.total_amount)
                          ),
                        }}
                      ></div>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      {(() => {
                        const total = Number(budgets[0]?.total_amount) || 0;
                        const spent =
                          Number(spentAmount(budgets[0]?.category)) || 0;
                        const percent = total > 0 ? (spent / total) * 100 : 0;

                        return (
                          <>
                            {percent >= 100 && (
                              <RiErrorWarningLine className="text-red-500 text-3xl" />
                            )}
                            {percent >= 80 && percent < 100 && (
                              <CiWarning className="text-yellow-300 text-3xl" />
                            )}
                            <p className="text-yellow-500 text-sm">
                              {percent >= 80 && percent < 100
                                ? "You are too close to your limit!"
                                : ""}
                            </p>
                            <p className="text-red-500 text-sm">
                              {" "}
                              {percent >= 100
                                ? "You have exceeded your limit!"
                                : ""}
                            </p>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Sección derecha: imagen */}
                  <div className="flex-[1] w-full md:w-auto">
                    <img
                      src={getImg(budgets[0]?.category)}
                      alt={budgets[0]?.name}
                      className="rounded-lg w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="grid md:grid-cols-2 gap-6 mt-8">
        {budgets.slice(1).map((budget) => (
          <ExpendCard
            id={budget.id}
            key={budget.id}
            type={budget.name}
            budget={budget}
            onDelete={() => {
              setSelectedBudget(budget);
              setOpenModal(true);
            }}
            remaining={
              Number(budget.total_amount) - Number(spentAmount(budget.category))
            }
            icon={getIcon(budget.category)}
            total_amount={Number(budget.total_amount)}
            total_spent={spentAmount(budget.category)}
          />
        ))}
      </section>
    </main>
  );
}
