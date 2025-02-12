"use client"

import * as React from "react"
import { useSimulator } from "@/app/simulator/context"
import { AnalyticsCard } from "@/app/components/analytics-card"

export function SimulatedAnalyticsCards() {
  const { history } = useSimulator()

  // If no history, show empty state or return null
  if (history.length === 0) {
    return null
  }

  // Indices for last/prev month
  const lastIndex = history.length - 1
  const prevIndex = lastIndex - 1
  const lastMonth = history[lastIndex]
  const prevMonth = prevIndex >= 0 ? history[prevIndex] : null

  // 1) Cumulative Revenue
  const totalRevenue = history.reduce((acc, cur) => acc + cur.mrr, 0)
  let cumulativeTrend: number | undefined = undefined
  if (prevMonth) {
    const prevCumulative = history.slice(0, prevIndex + 1).reduce((acc, cur) => acc + cur.mrr, 0)
    if (prevCumulative !== 0) {
      const diff = totalRevenue - prevCumulative
      cumulativeTrend = Number((diff / prevCumulative * 100).toFixed(1))
    }
  }

  // 2) Monthly Revenue Trend
  let revenueTrend: number | undefined = undefined
  if (prevMonth?.mrr && prevMonth.mrr !== 0) {
    const diff = lastMonth.mrr - prevMonth.mrr
    revenueTrend = Number((diff / prevMonth.mrr * 100).toFixed(1))
  }

  // 3) Users Trend
  let userTrend: number | undefined = undefined
  if (prevMonth?.users && prevMonth.users !== 0) {
    const diff = lastMonth.users - prevMonth.users
    userTrend = Number((diff / prevMonth.users * 100).toFixed(1))
  }

  // 4) Churn Rate Trend
  let churnTrend: number | undefined = undefined
  if (prevMonth?.churn && typeof lastMonth.churn === "number" && prevMonth.churn !== 0) {
    const diff = lastMonth.churn - prevMonth.churn
    churnTrend = Number((diff / prevMonth.churn * 100).toFixed(1))
  }

  return (
    <div className="grid auto-rows-min gap-2 p-2 md:grid-cols-4">
      {/* 1) Cumulative Revenue */}
      <AnalyticsCard
        title="Cumulative Revenue"
        description="Total to date"
        value={`$${Math.floor(totalRevenue).toLocaleString()}`}
        trend={cumulativeTrend}
      />

      {/* 2) Monthly Revenue (MRR) */}
      <AnalyticsCard
        title="Monthly Revenue"
        description="Current MRR"
        value={`$${lastMonth.mrr.toLocaleString()}`}
        trend={revenueTrend}
      />

      {/* 3) Active Users */}
      <AnalyticsCard
        title="Active Users"
        description="Current user count"
        value={lastMonth.users.toLocaleString()}
        trend={userTrend}
      />

      {/* 4) Churn Rate */}
      <AnalyticsCard
        title="Churn Rate"
        description="Monthly churn (%)"
        value={`${lastMonth.churn?.toFixed(2) ?? "N/A"}%`}
        trend={churnTrend}
        invertTrend={true}
      />
    </div>
  )
}