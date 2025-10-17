export interface Transaction {
  id: string;
  user_id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: string;
  description?: string;
}

export interface RecentTransaction {
  date: string;
  description: string;
  category: string;
  type: "income" | "expense";
  amount: number;
}