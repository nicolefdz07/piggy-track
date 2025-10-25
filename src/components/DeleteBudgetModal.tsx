import { useEffect, useRef } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

interface DeleteBudgetModalProps {
  open: boolean;
  deleteFunc: () => void;
  onClose: () => void;
  budgetName?: string;
}

export default function DeleteBudgetModal({
  open,
  deleteFunc,
  onClose,
  budgetName,
}: DeleteBudgetModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;

    
    if (open) {
      modal.showModal();
    } else {
      modal.close();
    }

    
    const handleBackdropClick = (e: MouseEvent) => {
      if (modal && e.target === modal) {
        onClose(); 
      }
    };

    modal.addEventListener("click", handleBackdropClick);

    
    return () => {
      modal.removeEventListener("click", handleBackdropClick);
      modal.close();
    };
  }, [open, onClose]);

  return (
    <dialog
      ref={dialog}
      className="bg-[#1A2830] rounded-xl shadow-2xl w-full max-w-md mx-auto my-auto backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 text-center">
        <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-red-900/30 text-red-500">
          <RiDeleteBin6Line className="text-3xl text-red-500" />
        </div>
        <h3 className="mt-4 text-xl font-bold text-white">Delete Budget</h3>
        <p className="mt-2 text-gray-400">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-white">
            "{budgetName ?? "this"}"
          </span>{" "}
          budget? This action cannot be undone.
        </p>
      </div>
      <div className="flex justify-stretch px-6 py-4 rounded-b-xl">
        <button
          onClick={onClose}
          className="flex-1 mr-2 bg-transparent text-gray-400 font-bold py-2 px-4 rounded-full hover:bg-[#24343e] transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={deleteFunc}
          className="flex-1 ml-2 bg-red-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl hover:bg-red-600 transition-all duration-300"
        >
          Delete
        </button>
      </div>
    </dialog>
  );
}
