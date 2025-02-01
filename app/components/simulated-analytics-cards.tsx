"use client"

import * as React from "react"
import { useSimulator } from "@/app/simulator/context"
import { simulateSaaSMetrics } from "@/app/simulator/simulate"
import { AnalyticsCard } from "@/app/components/analytics-card"

export function SimulatedAnalyticsCards() {
  // Pull the scenario parameters (churnRate, growthRate, pricePerUser)
  const { params } = useSimulator()

  // Generate 12-month data whenever params changes
  const data = React.useMemo(() => simulateSaaSMetrics(params), [params])

  // If no data or no months, just return null
  if (!data || data.length === 0) {
    return null
  }

  // For demonstration, let's get the first and last months
  const firstMonth = data[0]
  const lastMonth = data[data.length - 1]

  // 1) Cumulative revenue: sum of mrr across all months
  const totalRevenue = data.reduce((acc, cur) => acc + cur.mrr, 0)

  // 2) Final month MRR: lastMonth.mrr
  // Let's compute a trend from first to last month
  const revenueTrend = ((lastMonth.mrr - firstMonth.mrr) / firstMonth.mrr) * 100

  // 3) Final month user count: lastMonth.users
  // We'll do a user trend similarly
  const userTrend = ((lastMonth.users - firstMonth.users) / firstMonth.users) * 100

  // 4) Average user count: sum of all users / number of months
  const averageUsers =
    data.reduce((acc, cur) => acc + cur.users, 0) / data.length
  // If you want a trend for average vs. first month, you could compute it,
  // but let's skip that or call it 0 for now.
  const avgUsersTrend = 0 // or do something else

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      {/* Card 1: Cumulative Revenue */}
      <div className="rounded-xl bg-muted/50 p-2 shadow-inner">
        <AnalyticsCard
          title="Cumulative Revenue"
          description="Sum across 12 months"
          value={`$${Math.floor(totalRevenue).toLocaleString()}`}
          // This might not have a direct "trend," but you could pass revenueTrend or 0
          trend={undefined}
        />
      </div>

      {/* Card 2: Final Month MRR */}
      <div className="rounded-xl bg-muted/50 p-2 shadow-inner">
        <AnalyticsCard
          title="Monthly Revenue"
          description="Final month MRR"
          value={`$${lastMonth.mrr.toLocaleString()}`}
          trend={revenueTrend}
        />
      </div>

      {/* Card 3: Final Month Users */}
      <div className="rounded-xl bg-muted/50 p-2 shadow-inner">
        <AnalyticsCard
          title="Active Users"
          description="Final month user count"
          value={`${lastMonth.users.toLocaleString()}`}
          trend={userTrend}
        />
      </div>
    </div>
  )
}