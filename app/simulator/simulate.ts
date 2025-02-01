import type { SimulatorParams } from "./context"

export function simulateSaaSMetrics(params: SimulatorParams) {
  // e.g. Return array for chart 
  // This is just a basic example
  const { churnRate, growthRate, pricePerUser } = params
  const data = []
  let users = 1000
  let mrr = users * pricePerUser

  for (let month = 1; month <= 12; month++) {
    // churn out a portion
    users = Math.floor(users * (1 - churnRate))
    // add new signups
    users = Math.floor(users * (1 + growthRate))
    // recalc MRR
    mrr = users * pricePerUser

    data.push({
      month: `Month ${month}`,
      users,
      mrr,
    })
  }

  return data
}