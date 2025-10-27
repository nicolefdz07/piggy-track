import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "../lib/supabaseClient";
import type { RecentTransaction, Transaction } from "../types/Types";

interface TransactionsContextType {
  transactions: Transaction[];
  recentTransactions: RecentTransaction[];
  loading: boolean;
  error: string | null;
  fetchTransactionById: (id: string) => Promise<Transaction | undefined>;
  deleteTransaction: (id: string) => Promise<Boolean>;
  createTransaction: (
    newTransaction: Omit<Transaction, "id">
  ) => Promise<Transaction | null>;
  updateTransaction: (
    id: string,
    updates: Partial<Transaction>
  ) => Promise<boolean>;
  fetchRecentTransactions: () => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined
);

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const { session } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<RecentTransaction[]>(
    []
  );
  const userId = session?.user.id || "";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchTransactions() {
    if (!session) return;
    try {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", session?.user.id)
        .order("date", { ascending: false });

      if (error) throw error;
      setTransactions(data ?? []);
      
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session) {
      fetchTransactions();
    }
  }, [session]);

  async function fetchTransactionById(
    id: string
  ): Promise<Transaction | undefined> {
    try {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("Error fetching transaction:", error);
      return undefined;
    }
  }
  async function deleteTransaction(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("user_id", userId)
        .eq("id", id);

      if (error) throw error;
      setTransactions((prev) => prev.filter((t) => String(t.id) !== String(id)));
      setRecentTransactions((prev) => prev.filter((t) => String(t.id) !== String(id)));
      
      return true;
    } catch (err) {
      console.error("Error deleting transaction:", err);
      return false;
    }
  }

  const createTransaction = async (
    newTransaction: Omit<Transaction, "id">
  ): Promise<Transaction | null> => {
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
      setTransactions(prev=> [...prev, data as Transaction]);
      setRecentTransactions(prev=> [...prev, data as RecentTransaction]);
      return data;
    } catch (err: unknown) {
      console.error("Unexpected error adding transaction:", err);
      if (err instanceof Error) throw err;
      throw new Error("Unknown error");
    }
  };
  const updateTransaction = async (
    id: string,
    updates: Partial<Transaction>
  ): Promise<boolean> => {
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
  };
  async function fetchRecentTransactions(): Promise<void> {
    try {
      const { data, error } = await supabase
        .from("transactions")
        .select(
          `
         date,
         description,
         category,
         amount,
         type,
         id
         `
        )
        .eq("user_id", session?.user.id)
        .order("created_at", {
          ascending: false,
        })
        .limit(6);

      if (error) {
        throw new Error(error.message);
      }
      setRecentTransactions(data as RecentTransaction[]);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // real time  subscription
  useEffect(() => {
    if (!session?.user?.id) return;
    fetchRecentTransactions();
    fetchTransactions()

    const channel = supabase
      .channel("transactions_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "transactions",
        },
        (payload: any) => {
        console.log("Realtime payload:", payload);

        // normalize event name (supabase payloads can use different property names)
        const event = payload.eventType ?? payload.event ?? payload.type;

        if (event === "INSERT") {
          // Agrega solo la nueva transacción al estado general
          const newTx = payload.new as Transaction;
          setTransactions(prev => [...prev, newTx]);

          
          setRecentTransactions(prev => [newTx as RecentTransaction, ...prev].slice(0, 6));
        } else if (event === "UPDATE") {
          // Actualiza solo la transacción modificada
          const newTx = payload.new as Transaction;
          setTransactions(prev =>
            prev.map(tx => (tx.id === newTx.id ? newTx : tx))
          );
          setRecentTransactions(prev =>
            prev.map(tx => (tx.id === newTx.id ? (newTx as RecentTransaction) : tx))
          );
        } else if (event === "DELETE") {
          // Elimina la transacción eliminada
          const oldTx = payload.old as Transaction;
          setTransactions(prev => prev.filter(tx => tx.id !== oldTx.id));
          setRecentTransactions(prev => prev.filter(tx => tx.id !== oldTx.id));
        }
      }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session?.user.id]);

  const transactionsCtx = {
    transactions,
    loading,
    error,
    fetchTransactionById,
    deleteTransaction,
    createTransaction,
    updateTransaction,
    fetchRecentTransactions,
    recentTransactions
  };

  return (
    <TransactionsContext.Provider value={transactionsCtx}>
      {children}
    </TransactionsContext.Provider>
  );
};
export default TransactionsContext;
