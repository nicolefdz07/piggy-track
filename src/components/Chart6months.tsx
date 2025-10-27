"use client";

import { useContext } from "react";
import TransactionsContext from "../context/TransactionsContext";
import { TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export const description = "A bar chart";

export function ChartBarDefault() {
  const transactionsCtx = useContext(TransactionsContext);
  const transactions = transactionsCtx?.transactions || [];
  const today = new Date();

  const last6Months: { month: string; total: number }[] = [];

  
  for (let i = 5; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthName = d.toLocaleString("default", { month: "short" }); // ej: "Oct"
    last6Months.push({ month: monthName, total: 0 });
  }

  transactions.forEach((t) => {
    if (t.type === "expense") {
      const tDate = new Date(t.date);
      const monthIndex = last6Months.findIndex(
        (_, index) =>
          tDate.getMonth() === new Date(today.getFullYear(), today.getMonth() - (5 - index), 1).getMonth()
      );
      if (monthIndex !== -1) {
        last6Months[monthIndex].total += t.amount;
      }
    }
  });

  const chartData = last6Months.map((m) => ({
    month: m.month,
    total:  m.total,
  }));

  return (
    <Card className="bg-gray-800 text-white mx-auto">
      <CardHeader>
        <CardTitle>Expenses for the last 6 months</CardTitle>
        <CardDescription className="text-gray-400">
          {last6Months[0].month} - {last6Months[5].month} {today.getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis  
            stroke="rgba(255, 255, 255, 0.7)" 
            dataKey="month" />
            <YAxis stroke="rgba(255, 255, 255, 0.7)" />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium items-center">
          {/* Trending up by 5.2% this month <TrendingUp className="h-4 w-4" /> */}
        </div>
        <div className="text-muted-foreground">
          Showing expenses for the last 6 months.
        </div>
      </CardFooter>
    </Card>
  );
}
