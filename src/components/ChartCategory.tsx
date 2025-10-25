import { useContext, useMemo } from "react"
import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"
import TransactionsContext from "@/context/TransactionsContext"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

export function ChartPieExpenses() {
  const transactionsCtx = useContext(TransactionsContext)
  const transactions = transactionsCtx?.transactions || []

 
  const expenses = useMemo(
    () => transactions.filter((t) => t.type === "expense"),
    [transactions]
  )

  
  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {}
    for (const exp of expenses) {
      totals[exp.category] = (totals[exp.category] || 0) + exp.amount
    }
    return totals
  }, [expenses])

 
  const chartData = Object.entries(categoryTotals).map(([category, amount], i) => ({
    category,
    amount,
    fill: `hsl(${i * 50}, 70%, 50%)`, 
  }))

  const chartConfig: ChartConfig = {
    amount: { label: "Monto" },
    ...Object.fromEntries(
      Object.keys(categoryTotals).map((cat, i) => [
        cat.toLowerCase(),
        { label: cat, color: `hsl(${i * 60}, 70%, 50%)` },
      ])
    ),
  }


  const today = new Date()
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth() - (5 - i), 1)
    return d.toLocaleString("default", { month: "short" })
  })
  const monthRange = `${last6Months[0]} - ${last6Months[5]} ${today.getFullYear()}`

  if (chartData.length === 0) {
    return <p className="text-gray-400 text-center">There are not expenses registered.</p>
  }

  return (
    <Card className="flex flex-col bg-gray-800 text-white border border-white">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expenses by category</CardTitle>
        <CardDescription className="text-gray-400">{monthRange}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="p-2 gap-4" hideLabel />}
            />
            <Pie data={chartData} dataKey="amount" nameKey="category" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm text-gray-300">
        <div className="flex items-center gap-2 leading-none font-medium">
          Total expenses by category <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-gray-500 leading-none">
          Showing total expenses for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
