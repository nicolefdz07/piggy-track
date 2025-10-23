import { useEffect, useRef } from "react";
import { MdWarningAmber } from "react-icons/md";


interface DeleteTransModalProps {
  open: boolean;
  deleteFunc: () => void;
  onClose: () => void;
  id: string;
}

export default function DeleteTransModal({
  open,
  deleteFunc,
  onClose,
  id,
}: DeleteTransModalProps) {
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
    className=" bg-[#101C22] rounded-lg shadow-sm border border-slate-800 p-6 text-center mx-auto my-auto backdrop:bg-black/60 backdrop:backdrop-blur-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <span className="">
              <MdWarningAmber
              className="text-red-400 text-2xl"/>
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
            <button 
            onClick={onClose}
            className="px-6 py-2 text-sm font-bold rounded-2xl bg-slate-200/60 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 transition-colors">
              Cancel
            </button>
            <button 
            onClick={deleteFunc}
            className="px-6 py-2 text-sm font-bold rounded-2xl bg-red-500 hover:bg-red-500/90 text-white transition-colors">
              Yes, Delete
            </button>
          </div>
        </dialog>
  );
}
