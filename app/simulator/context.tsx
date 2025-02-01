"use client"
import { createContext, useState, useContext } from "react"

interface SimulatorParams {
  churnRate: number
  growthRate: number
  pricePerUser: number
}

interface SimulatorContextValue {
  params: SimulatorParams
  setParams: React.Dispatch<React.SetStateAction<SimulatorParams>>
}

const SimulatorContext = createContext<SimulatorContextValue | undefined>(undefined)

export function SimulatorProvider({ children }: { children: React.ReactNode }) {
  const [params, setParams] = useState<SimulatorParams>({
    churnRate: 0.05,
    growthRate: 0.1,
    pricePerUser: 50,
  })

  return (
    <SimulatorContext.Provider value={{ params, setParams }}>
      {children}
    </SimulatorContext.Provider>
  )
}

export function useSimulator() {
  const ctx = useContext(SimulatorContext)
  if (!ctx) throw new Error("useSimulator must be used within a SimulatorProvider")
  return ctx
}