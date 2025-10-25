import { useContext} from "react";
import type { Budget } from "../types/Types";
import BudgetsTable from "../components/BudgetsTable";
import BudgetsContext from "../context/BudgetsContext";

export default function Budget() {

const budgetsCtx = useContext(BudgetsContext);
const budgetsFromCtx = budgetsCtx?.Budgets || [];


  return (
    <BudgetsTable budgets={budgetsFromCtx} />
   
  );
}
