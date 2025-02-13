"use client"

import * as React from "react"
import { ResponsiveContainer, CartesianGrid, Line, LineChart, XAxis, YAxis, LabelList } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { useSimulator } from "@/app/simulator/context"

/**
 * We only have one line—MRR—so we can skip the ChartLegend or config for multiple data keys.
 */
export function AnalyticsChart() {
  const { history } = useSimulator()

  // Add chart configuration
  const chartConfig = {
    mrr: {
      label: "Monthly Recurring Revenue",
      color: "hsl(var(--chart-1))"
    }
  }

  // If no history, show empty state
  if (history.length === 0) {
    return (
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-lg font-semibold">Monthly Revenue</CardTitle>
          <CardDescription>
            Click "Next Month" to start the simulation
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold">Monthly Revenue</CardTitle>
        <CardDescription>
          Showing monthly revenue progression
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[450px]">
        <ChartContainer 
          className="w-full h-[400px]" 
          config={chartConfig}
          aria-label="Line chart showing monthly revenue progression"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history} margin={{ left: 12, right: 12, top: 8, bottom: 8 }}>
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(val: number) => `$${val.toLocaleString()}`}
              />

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="line"
                  />
                }
              />

              <Line
                dataKey="mrr"
                type="monotone"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-1))" }}
                activeDot={{ r: 6 }}
              >
                {/* Label each point */}
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}