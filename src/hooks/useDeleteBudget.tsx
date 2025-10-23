import { useContext } from "react"
import BudgetsContext from "../context/BudgetsContext"
import { useNavigate } from "react-router-dom";


export default function useDeleteBudget({onCloseModal}: {onCloseModal: ()=> void}): { handleDeleteBudget: (id: string) => Promise<void> } {
  const context = useContext(BudgetsContext)
  const deleteBudget = context?.deleteBudget
  const navigate = useNavigate()

  const handleDeleteBudget = async (id: string): Promise<void>=>{
    if(!deleteBudget){
      console.error("deleteBudget function is not available");
      onCloseModal()
      return;
    }
    if(!id){
      console.error("No budget id to delete");
      onCloseModal()
      return;
    }
    try {
      await deleteBudget(id);
      onCloseModal()
      navigate("/budget");
    }catch(err){
      console.error("Error deleting budget:", err);
    }
  }

  return {
    handleDeleteBudget
  }

}

