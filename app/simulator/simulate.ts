import type { SimulatorParams } from "./context"

/**
 * Simulates a single month of SaaS metrics based on team role allocations.
 * 
 * - New Business: Each rep brings in 5 new customers
 * - Support: Each rep reduces churn by 0.5% (from 10% baseline)
 * - Account Managers: Each adds 3% to expansion revenue
 */
export function simulateMonth(
  currentUsers: number,
  params: SimulatorParams,
  randomFactor: number
): {
  newUsers: number
  newMRR: number
  churnRate: number
} {
  // Baseline churn set to 10%
  const baseChurn = 0.10
  // Each support rep reduces churn by 0.5% (0.005)
  const churnReduction = 0.005 * params.support
  const effectiveChurn = Math.max(baseChurn - churnReduction, 0)
  // Factor in randomFactor to add some variability
  const churnThisMonth = effectiveChurn * (1 + randomFactor)

  // Subtract churned users from current
  const remainingUsers = Math.floor(currentUsers * (1 - churnThisMonth))

  // New business: each rep brings in 5 new customers
  const newCustomers = params.newBiz * 5 * (1 + randomFactor)

  // Marketing signups: $50 per signup
  const marketingSignups = Math.floor(params.marketingSpend / 50)

  // Compute total new users
  const newUsers = remainingUsers + Math.floor(newCustomers) + marketingSignups

  // Account managers: each rep adds +3% to expansion revenue
  const baseRevenue = newUsers * params.pricePerUser
  const expansionRate = params.accountManagers * 0.03
  const expansions = baseRevenue * expansionRate * (1 + randomFactor)

  const totalMRR = Math.floor(baseRevenue + expansions)

  return {
    newUsers,
    newMRR: totalMRR,
    churnRate: Math.round(churnThisMonth * 100), // store as percentage (e.g., 7 => 7%)
  }
}