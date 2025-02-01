"use client"

import * as React from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

/**
 * Sample Data: MRR (dollars) vs. MAU (user count)
 */
const chartData = [
  { date: "2024-04-01", mrr: 122000, mau: 48500 },
  { date: "2024-04-02", mrr: 123500, mau: 48800 },
  { date: "2024-04-03", mrr: 124200, mau: 49100 },
  { date: "2024-04-04", mrr: 124800, mau: 49300 },
  { date: "2024-04-05", mrr: 125500, mau: 49600 },
  { date: "2024-04-06", mrr: 126200, mau: 49800 },
  { date: "2024-04-07", mrr: 126800, mau: 50000 },
  { date: "2024-04-08", mrr: 127500, mau: 50200 },
  { date: "2024-04-09", mrr: 128200, mau: 50400 },
  { date: "2024-04-10", mrr: 128800, mau: 50600 },
  { date: "2024-04-11", mrr: 129500, mau: 50800 },
  { date: "2024-04-12", mrr: 130200, mau: 51000 },
  { date: "2024-04-13", mrr: 130800, mau: 51200 },
  { date: "2024-04-14", mrr: 131500, mau: 51400 },
  { date: "2024-04-15", mrr: 132200, mau: 51600 },
  { date: "2024-04-16", mrr: 132800, mau: 51800 },
  { date: "2024-04-17", mrr: 133500, mau: 52000 },
  { date: "2024-04-18", mrr: 134200, mau: 52200 },
  { date: "2024-04-19", mrr: 134800, mau: 52400 },
  { date: "2024-04-20", mrr: 135500, mau: 52600 },
  { date: "2024-04-21", mrr: 136200, mau: 52800 },
  { date: "2024-04-22", mrr: 136800, mau: 53000 },
  { date: "2024-04-23", mrr: 137500, mau: 53200 },
  { date: "2024-04-24", mrr: 138200, mau: 53400 },
  { date: "2024-04-25", mrr: 138800, mau: 53600 },
  { date: "2024-04-26", mrr: 139500, mau: 53800 },
  { date: "2024-04-27", mrr: 140200, mau: 54000 },
  { date: "2024-04-28", mrr: 140800, mau: 54200 },
  { date: "2024-04-29", mrr: 141500, mau: 54400 },
  { date: "2024-04-30", mrr: 142200, mau: 54600 },
]

/**
 * Chart config for MRR + MAU lines.
 * The colors reference your design tokens (chart-1, chart-2).
 */
const chartConfig = {
  mrr: {
    label: "Monthly Recurring Revenue",
    color: "hsl(var(--chart-1))",
  },
  mau: {
    label: "Monthly Active Users",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Component() {
  // Example sums (not displayed in this snippet, but you can use them if you like):
  const total = React.useMemo(
    () => ({
      mrr: chartData.reduce((acc, curr) => acc + curr.mrr, 0),
      mau: chartData.reduce((acc, curr) => acc + curr.mau, 0),
    }),
    []
  )

  return (
    <Card>
      {/* Header */}
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Monthly Recurring Revenue vs. Monthly Active Users</CardTitle>
          <CardDescription>
            Showing the relationship between monthly recurring revenue and monthly active users
          </CardDescription>
        </div>
      </CardHeader>

      {/* Chart */}
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[400px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />

            {/* X-Axis (Dates) */}
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />

            {/* LEFT Y-Axis (MRR, in dollars) */}
            <YAxis
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tickFormatter={(val: number) => `$${(val / 1000).toFixed(1)}k`}
            />

            {/* RIGHT Y-Axis (MAU, in user count) */}
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tickFormatter={(val: number) => `${(val / 1000).toFixed(1)}k users`}
            />

            {/* Tooltip */}
            <ChartTooltip
              content={
                <ChartTooltipContent
                  // e.g., "Apr 1, 2024"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                  className="w-[150px]"
                />
              }
            />

            {/* MRR Line (left axis) */}
            <Line
              yAxisId="left"
              dataKey="mrr"
              type="monotone"
              stroke={chartConfig.mrr.color}
              strokeWidth={2}
              dot={true}
            />

            {/* MAU Line (right axis) */}
            <Line
              yAxisId="right"
              dataKey="mau"
              type="monotone"
              stroke={chartConfig.mau.color}
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}