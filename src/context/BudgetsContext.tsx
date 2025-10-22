import { createContext, useEffect, useState } from "react";
import type { Budget } from "../types/Types";
import { useAuth } from "./AuthContext";
import { supabase } from "../lib/supabaseClient";

interface BudgetsContextType {
  Budgets: Budget[]
  loading: boolean
  error: string | null
  
  
  
}
const BudgetsContext = createContext<BudgetsContextType | undefined>(undefined);

export const BudgetsProvider = ({children} : {children: React.ReactNode})=>{
  const {session} = useAuth();
  const [Budgets, setBudgets] = useState<Budget[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchBudgets() {
    if (!session) return;
    try{
        const { data, error } = await supabase
          .from("budgets")
          .select("*")
          .eq("user_id", session?.user.id)
          .order("created_at", { ascending: false });
    
          if(error) throw error;
          setBudgets(data ?? [])
          console.log(data)
        }catch(err: unknown){

          setError(err instanceof Error ? err.message : String(err));
        }finally{
          setLoading(false);
        }
  }

  useEffect(()=>{
    if(session){
      fetchBudgets();
    }
  }, [session])

  const BudgetCtx = {
    Budgets,
    loading,
    error,
  }

  return (
    <BudgetsContext.Provider value={BudgetCtx}>
      {children}
    </BudgetsContext.Provider>
  )
}
export default BudgetsContext;