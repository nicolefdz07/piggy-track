"use client"

import { useContext } from "react"
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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
import TransactionsContext from "@/context/TransactionsContext"

export const description = "A simple area chart"

export function ChartAreaDefault() {
  const transactionsCtx = useContext(TransactionsContext)
  const transactions = transactionsCtx?.transactions || []
  const today = new Date()

  // últimos 6 meses
  const last6Months: { month: string; total: number }[] = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1)
    const monthName = d.toLocaleString("default", { month: "short" })
    last6Months.push({ month: monthName, total: 0 })
  }

  // sumamos ingresos
  transactions.forEach((t) => {
    if (t.type === "income") {
      const tDate = new Date(t.date)
      const monthIndex = last6Months.findIndex(
        (_, index) =>
          tDate.getMonth() ===
          new Date(today.getFullYear(), today.getMonth() - (5 - index), 1).getMonth()
      )
      if (monthIndex !== -1) last6Months[monthIndex].total += t.amount
    }
  })

  const chartData = last6Months.map((m) => ({ month: m.month, total: m.total }))

  const chartConfig = {
    total: {
      label: "Income",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig

  return (
    <Card className="bg-gray-800 text-white mx-auto">
      <CardHeader>
        <CardTitle>Income Area Chart</CardTitle>
        <CardDescription>
          Showing total income for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              stroke="rgba(255, 255, 255, 0.7)" 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="total"
              type="natural"
              fill="#8884d8"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            {/* <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div> */}
            <div className="text-white flex items-center gap-2 leading-none">
              {last6Months[0].month} - {last6Months[5].month} {today.getFullYear()}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
