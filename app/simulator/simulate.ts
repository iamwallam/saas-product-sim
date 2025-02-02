import type { SimulatorParams } from "./context"

/**
 * Produce 12 months of data with separate 'base' vs. 'expansions'.
 * 
 * - churnRate: fraction of users lost each month
 * - growthRate: fraction of users gained from organic growth
 * - pricePerUser: how much each user pays
 * - marketingSpend: partial driver for new signups
 * - expansionRate: fraction of 'base' revenue added each month from expansions
 */
export function simulateSaaSMetrics(params: SimulatorParams) {
  const { churnRate, growthRate, pricePerUser, marketingSpend, expansionRate } = params

  const data = []

  // Starting point
  let users = 10

  for (let month = 1; month <= 12; month++) {
    // 1) churn: lose some portion of users
    users = Math.floor(users * (1 - churnRate))

    // 2) new signups from growth
    const growthSignups = Math.floor(users * growthRate)

    // 3) new signups from marketing
    const marketingSignups = Math.floor(marketingSpend / 50) // Example formula
    const totalSignups = growthSignups + marketingSignups

    // Update user base after signups
    users += totalSignups

    // 4) base revenue for this month
    const base = users * pricePerUser

    // 5) expansions: fraction of 'base' from upsells
    const expansions = base * expansionRate

    // 6) total MRR is base + expansions
    const mrr = base + expansions

    data.push({
      month: `Month ${month}`,
      users,
      base: Math.floor(base),
      expansions: Math.floor(expansions),
      mrr: Math.floor(mrr),
    })
  }

  return data
}