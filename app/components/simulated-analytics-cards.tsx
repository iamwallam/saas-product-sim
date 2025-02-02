"use client"

import * as React from "react"
import { useSimulator } from "@/app/simulator/context"
import { simulateSaaSMetrics } from "@/app/simulator/simulate"
import { AnalyticsCard } from "@/app/components/analytics-card"

export function SimulatedAnalyticsCards() {
  // 1. Pull the scenario parameters (churnRate, growthRate, etc.) from context
  const { params } = useSimulator()

  // 2. Generate 12-month data whenever params changes
  const data = React.useMemo(() => simulateSaaSMetrics(params), [params])

  // 3. If no data or no months, just return null
  if (!data || data.length === 0) {
    return null
  }

  // For demonstration, let's get the first and last months
  const firstMonth = data[0]
  const lastMonth = data[data.length - 1]

  // (A) Cumulative revenue: sum of MRR across all months
  const totalRevenue = data.reduce((acc, cur) => acc + cur.mrr, 0)

  // (B) Final month MRR
  const revenueTrend = ((lastMonth.mrr - firstMonth.mrr) / firstMonth.mrr) * 100

  // (C) Final month user count
  // NOTE: multiplying by 10 or 100 is your choice, depending on how you want to represent the percentage
  const userTrend = ((lastMonth.users - firstMonth.users) / firstMonth.users) * 10

  // (D) Average user count across the 12 months
  const averageUsers = data.reduce((acc, cur) => acc + cur.users, 0) / data.length
  const avgUsersTrend = 0 // or some other calculation if you wish

  return (
    <div className="grid auto-rows-min gap-2 p-2 md:grid-cols-4">
      {/* Card 1: Cumulative Revenue */}
      <AnalyticsCard
        title="Cumulative Revenue"
        description="Sum across 12 months"
        value={`$${Math.floor(totalRevenue).toLocaleString()}`}
        // No specific trend—it's a total
        trend={undefined}
      />

      {/* Card 2: Final Month MRR */}
      <AnalyticsCard
        title="Monthly Revenue"
        description="Final month MRR"
        value={`$${lastMonth.mrr.toLocaleString()}`}
        trend={revenueTrend}
      />

      {/* Card 3: Final Month Users */}
      <AnalyticsCard
        title="Active Users"
        description="Final month user count"
        value={lastMonth.users.toLocaleString()}
        trend={userTrend}
      />

      {/* Card 4: Average Users */}
      <AnalyticsCard
        title="Average Users"
        description="Mean user count"
        value={Math.round(averageUsers).toLocaleString()}
        trend={avgUsersTrend}
      />
    </div>
  )
}