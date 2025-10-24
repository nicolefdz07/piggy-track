import { createContext, useEffect, useState } from "react";
import type { ReactNode} from "react"; 
import { useAuth } from "./AuthContext";
import { supabase } from '../lib/supabaseClient';
import type { Transaction } from "../types/Types";


interface TransactionsContextType {
  transactions: Transaction[]
  loading: boolean
  error: string | null
  fetchTransactionById: (id: string) => Promise<Transaction | undefined>
  deleteTransaction: (id: string) => Promise<Boolean>
  createTransaction: (newTransaction: Omit<Transaction, "id">) => Promise<Transaction | null>
  updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<boolean>
  
  
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export const TransactionsProvider = ({children} : {children: ReactNode})=>{
  const {session} = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const userId = session?.user.id || "";
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
      .eq('user_id', userId)
      .eq('id', id);

      if (error) throw error;

      return true;
    }catch(err){
      console.error("Error deleting transaction:", err);
      return false;
    }
    
    }

    const createTransaction = async (newTransaction: Omit<Transaction, "id">): Promise<Transaction | null> => {
      try {
        const { data, error: insertError } = await supabase
          .from("transactions")
          .insert([newTransaction])
          .eq("user_id", userId)
          .select()
          .single();

        if (insertError) {
          console.error("Error inserting transaction:", insertError);
          throw new Error("Failed to add transaction");
        }
        return data;
      } catch (err: unknown) {
        console.error("Unexpected error adding transaction:", err);
        if (err instanceof Error) throw err;
        throw new Error("Unknown error");
      }
      
    }
    const updateTransaction = async (id: string, updates: Partial<Transaction>): Promise<boolean> => {
      if (!session) return false;

      try {
        const { data, error } = await supabase
          .from("transactions")
          .update(updates)
          .eq("id", id)
          .eq("user_id", userId)
          .select()
          .single();

        if (error) throw error;

        return !!data;
      } catch (error) {
        console.error("Unexpected error updating transaction:", error);
        if (error instanceof Error) throw error;
        throw new Error("Unknown error");
      }

    }

  

    const transactionsCtx = {
      transactions,
      loading,
      error,
      fetchTransactionById,
      deleteTransaction,
      createTransaction,
      updateTransaction
    }

    return (
      <TransactionsContext.Provider value={transactionsCtx}>
        {children}
      </TransactionsContext.Provider>
    )

}
export default TransactionsContext;