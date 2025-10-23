import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import TransactionsContext from "../context/TransactionsContext";
import DeleteTransModal from "../components/DeleteTransModal";

export default function TransactionDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const context = useContext(TransactionsContext);
  if (!context) {
    return null;
  }

  const { deleteTransaction, transactions } = context;

  const transaction = transactions.find((tx) => tx.id === id);

   const handleDeleteTrans = async () => {
     if (!id) return;
     try {
       await deleteTransaction(id);
       setOpenModal(false);
       navigate('/transactions');
     } catch (err) {
       console.error("Error deleting transaction:", err);
     }
   }

  
  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <p className="text-sm text-slate-400">
            <NavLink to="/transactions" className="hover:text-[#129EE4]" >
              Transactions
            </NavLink>
            <span className="mx-2">/</span>
            <span>Transaction Details</span>
          </p>
          <h1 className="text-3xl font-bold mt-2 text-slate-900 dark:text-white">
            Transaction Details
          </h1>
        </div>
        <div className="bg-[#101C22] rounded-lg shadow-sm border border-slate-800">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 border-b border-slate-200 dark:border-slate-800 pb-6">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Amount
                  </p>
                  <p className="text-2xl font-bold text-[#129EE4]">${transaction?.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Date
                  </p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {new Date(transaction?.date || "").toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Category
                </p>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  {transaction?.category}
                </p>
              </div>
              {/* <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Account
                </p>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  Checking Account
                </p>
              </div> */}
              <div className="md:col-span-3">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Description
                </p>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  {transaction?.description}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#101C22] px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3 rounded-b-lg">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-2xl bg-slate-200/60 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 transition-colors">
              <span className="material-symbols-outlined text-base">
                <MdOutlineModeEdit className="text-white"/>
              </span>
              Edit
            </button>
            <button 
            onClick={()=> setOpenModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-2xl bg-red-500 hover:bg-red-600 text-white transition-colors">
              <span className="">
                <RiDeleteBin6Line className="text-white"/>
              </span>
              Delete
            </button>
          </div>
        </div>
        <DeleteTransModal
        id={id!}
        open={openModal}
        onClose={() => setOpenModal(false)}
        deleteFunc={handleDeleteTrans}
        />
        {/* <div className="mt-10 bg-[#101C22] rounded-lg shadow-sm border border-slate-800 p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <span className="">
              <MdWarningAmber className="text-red-400 text-2xl"/>
            </span>
          </div>
          <h2 className="text-xl font-bold mt-4 text-slate-900 dark:text-white">
            Confirm Deletion
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Are you sure you want to delete this transaction? This action cannot
            be undone.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <button className="px-6 py-2 text-sm font-bold rounded-2xl bg-slate-200/60 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 transition-colors">
              Cancel
            </button>
            <button className="px-6 py-2 text-sm font-bold rounded-2xl bg-[#129EE4] hover:bg-[#129EE4]/90 text-white transition-colors">
              Yes, Delete
            </button>
          </div>
        </div> */}
      </div>
    </main>
  );
}
