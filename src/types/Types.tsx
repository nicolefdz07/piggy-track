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
  id: string;
  date: string;
  description: string;
  category: string;
  type?: "income" | "expense";
  amount: number;
}

export interface Budget {
  id: string;
  user_id: string;
  name: string;
  total_amount: number;
  category: string;
  period: string;
   

}

export type FilterType = Transaction["type"] | "all";
export type FilterCategory = Transaction["category"] | "all"
export type FilterDate = Transaction["date"] | "all"