"use client"
import { createContext, useState, useContext } from "react"
import { simulateMonth } from "./simulate"

// Interface for monthly simulation data
export interface MonthData {
  month: number
  users: number
  mrr: number
  churn: number
}

export interface SimulatorParams {
  // Core business metrics
  pricePerUser: number
  marketingSpend: number

  // Team role allocations
  newBiz: number      // Number of new business representatives
  accountManagers: number  // Number of account managers
  support: number     // Number of support team members

  // Customer satisfaction score (optional)
  csat: number
}

interface SimulatorContextValue {
  params: SimulatorParams
  setParams: React.Dispatch<React.SetStateAction<SimulatorParams>>
  currentMonth: number
  userCount: number
  history: MonthData[]
  simulateNextMonth: () => void
  showIntro: boolean
  setShowIntro: React.Dispatch<React.SetStateAction<boolean>>
  resetSimulation: () => void
  isGameOver: boolean
}

const SimulatorContext = createContext<SimulatorContextValue | undefined>(undefined)

export function SimulatorProvider({ children }: { children: React.ReactNode }) {
  const [params, setParams] = useState<SimulatorParams>({
    // Core business metrics
    pricePerUser: 50,
    marketingSpend: 500,   // e.g. $500 monthly marketing

    // Team role allocations
    newBiz: 7,      // Number of new business representatives
    accountManagers: 7,  // Number of account managers
    support: 6,     // Number of support team members

    // Customer satisfaction score (optional)
    csat: 70,
  })

  // New state for simulation progress
  const [currentMonth, setCurrentMonth] = useState<number>(1)
  const [userCount, setUserCount] = useState<number>(10)
  const [history, setHistory] = useState<MonthData[]>([])
  const [showIntro, setShowIntro] = useState<boolean>(true)

  // Compute game over state based on current month
  const isGameOver = currentMonth > 24

  // Update simulateNextMonth to prevent simulation after game over
  const simulateNextMonth = () => {
    if (isGameOver) return

    const randomFactor = (Math.random() - 0.5) / 10
    const { newUsers, newMRR, churnRate } = simulateMonth(userCount, params, randomFactor)
    
    setUserCount(newUsers)
    setHistory(prev => [...prev, {
      month: currentMonth,
      users: newUsers,
      mrr: newMRR,
      churn: churnRate
    }])
    setCurrentMonth(prev => prev + 1)
  }

  const resetSimulation = () => {
    setCurrentMonth(1)
    setUserCount(10)
    setHistory([])
    setShowIntro(true)
  }

  return (
    <SimulatorContext.Provider value={{
      params,
      setParams,
      currentMonth,
      userCount,
      history,
      simulateNextMonth,
      showIntro,
      setShowIntro,
      resetSimulation,
      isGameOver
    }}>
      {children}
    </SimulatorContext.Provider>
  )
}

export function useSimulator() {
  const ctx = useContext(SimulatorContext)
  if (!ctx) throw new Error("useSimulator must be used within a SimulatorProvider")
  return ctx
}