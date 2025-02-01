"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { useSimulator } from "@/app/simulator/context"
import { simulateSaaSMetrics } from "@/app/simulator/simulate"

/**
 * Chart config for stacked bars:
 * - base => color 1
 * - expansions => color 2
 */
const chartConfig = {
  base: {
    label: "Base MRR",
    color: "hsl(var(--chart-1))",
  },
  expansions: {
    label: "Expansion MRR",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function AnalyticsChart() {
  // Pull params from context
  const { params } = useSimulator()
  // Recompute data whenever params changes
  const data = React.useMemo(() => simulateSaaSMetrics(params), [params])

  return (
    <Card>
      <CardHeader className="flex flex-col space-y-0 border-b p-4">
        <CardTitle>Monthly MRR (Stacked)</CardTitle>
        <CardDescription>
          Shows Base vs. Expansion revenue across 12 months
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[450px] w-full">
          <BarChart data={data} margin={{ left: 12, right: 12, top: 4, bottom: 4 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />

            {/* Single Y-axis for MRR in dollars */}
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(val: number) => `$${val.toLocaleString()}`}
            />

            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />

            {/* Stacked bars: base + expansions */}
            <Bar
              dataKey="base"
              stackId="mrr"
              fill="var(--color-base)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="expansions"
              stackId="mrr"
              fill="var(--color-expansions)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}