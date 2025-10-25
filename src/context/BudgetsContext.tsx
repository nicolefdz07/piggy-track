import { createContext, useEffect, useState } from "react";
import type { Budget } from "../types/Types";
import { useAuth } from "./AuthContext";
import { supabase } from "../lib/supabaseClient";

interface BudgetsContextType {
  Budgets: Budget[];
  loading: boolean;
  error: string | null;
  deleteBudget: (id: string) => Promise<boolean>;
  updateBudget: (id: string, updates: Partial<Budget>) => Promise<boolean>;
  createBudget: (budgetData: Omit<Budget, "id">) => Promise<Budget | null>;
}
const BudgetsContext = createContext<BudgetsContextType | undefined>(undefined);

export const BudgetsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { session } = useAuth();
  const userId = session?.user.id || "";
  const [Budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchBudgets() {
    if (!session) return;
    try {
      const { data, error } = await supabase
        .from("budgets")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBudgets(data ?? []);
      console.log(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session) {
      fetchBudgets();
    }
  }, [session]);

  const createBudget = async (budgetData: Omit<Budget, "id">): Promise<Budget | null>=> {
    if (!session) return null;

    try {
      const {data, error} = await supabase
      .from("budgets")
      .insert([budgetData])
      .eq("user_id", userId)
      .select()
      .single();

      if(error) throw error;
      setBudgets((prevBudgets)=> [...prevBudgets, data]);
      return data;
    } catch (error) {
      console.error("Error creating budget:", error);
      return null;
    }
  }
  const deleteBudget = async (id: string): Promise<boolean> => {
    if (!session) return false;

    try {
      const { error } = await supabase.from("budgets").delete().eq("id", id).eq("user_id", userId);

      if (error) throw error;
      setBudgets((prev) => prev.filter((b) => String(b.id) !== String(id)));
      return true;
    } catch (err) {
      console.error("Error deleting transaction:", err);
      return false;
    }
  };

  const updateBudget = async (id: string, updates: Partial<Budget>): Promise<boolean> => {
    if (!session) return false;

    try {
      const {data, error} = await supabase
      .from("budgets")
      .update(updates)
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

      if(error) throw error;
      setBudgets((prevBudgets)=> prevBudgets.map((budget)=> budget.id === id ? {...budget, ...data} : budget));

      return true;
    } catch (error) {
      console.error("Error updating budget:", error);
      return false;
    }
  }
// real timee subscription
  useEffect(() => {
    if (!session?.user?.id) return;
    fetchBudgets();
    

    const channel = supabase
      .channel("budget_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "budgets",
        },
        (payload) => {
          // Action
          fetchBudgets();
          console.log("payload", payload.new);
        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session?.user.id]);


  const BudgetCtx = {
    Budgets,
    loading,
    error,
    deleteBudget,
    updateBudget,
    createBudget
  };

  return (
    <BudgetsContext.Provider value={BudgetCtx}>
      {children}
    </BudgetsContext.Provider>
  );
};
export default BudgetsContext;
