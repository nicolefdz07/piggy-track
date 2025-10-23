import { createContext, useEffect, useState } from "react";
import type { ReactNode} from "react"; 
import { useAuth } from "./AuthContext";
import { supabase } from '../lib/supabaseClient';

export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  category: string;
  created_at: string;
  date: string;
  description: string;
  type: "expense" | "income" | string;
}

interface TransactionsContextType {
  transactions: Transaction[]
  loading: boolean
  error: string | null
  fetchTransactionById: (id: string) => Promise<Transaction | undefined>
  deleteTransaction: (id: string) => Promise<Boolean>
  
  
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export const TransactionsProvider = ({children} : {children: ReactNode})=>{
  const {session} = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchTransactions() {

    if (!session) return;
    try{
        const { data, error } = await supabase
          .from("transactions")
          .select("*")
          .eq("user_id", session?.user.id)
          .order("date", { ascending: false });
    
          if(error) throw error;
          setTransactions(data ?? [])
          console.log(data)
        }catch(err: unknown){

          setError(err instanceof Error ? err.message : String(err));
        }finally{
          setLoading(false);
        }       
      }
  
    useEffect(() => {
      if (session) {
        fetchTransactions();
      }
    }, [session]);

    async function fetchTransactionById(id: string): Promise<Transaction | undefined> {
   try {
    const {data, error} = await supabase
      .from("transactions")
      .select("*")
      .eq("id", id)
      .single();

      if(error) throw error;

      return data;
   } catch (error) {
     console.error("Error fetching transaction:", error);
     return undefined;
   }

    }
    async function deleteTransaction(id: string): Promise<boolean> {
    try {
      const {error} = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);

      if (error) throw error;

      return true;
    }catch(err){
      console.error("Error deleting transaction:", err);
      return false;
    }
    
    }

  

    const transactionsCtx = {
      transactions,
      loading,
      error,
      fetchTransactionById,
      deleteTransaction
    }

    return (
      <TransactionsContext.Provider value={transactionsCtx}>
        {children}
      </TransactionsContext.Provider>
    )

}
export default TransactionsContext;