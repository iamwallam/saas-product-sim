"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useSimulator } from "@/app/simulator/context"

export function EndDialog() {
  const { isGameOver, history, resetSimulation } = useSimulator()

  if (!history.length) return null

  // Final month = last entry in history
  const lastRecord = history[history.length - 1]
  // Optionally compute cumulative revenue
  const cumulativeRevenue = history.reduce((acc, cur) => acc + cur.mrr, 0)

  // “Play Again” => calls resetSimulation
  function handlePlayAgain() {
    resetSimulation()
  }

  return (
    <Dialog open={isGameOver}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Simulation Complete</DialogTitle>
          <DialogDescription>
            <p className="mt-2">
              Congratulations! You’ve reached Month {lastRecord.month}.
            </p>
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 space-y-2 text-sm">
          <div>
            <strong>Final MRR:</strong> ${lastRecord.mrr.toLocaleString()}
          </div>
          <div>
            <strong>Final Users:</strong> {lastRecord.users.toLocaleString()}
          </div>
          <div>
            <strong>Final Churn:</strong> {lastRecord.churn?.toFixed(2) ?? "0"}%
          </div>
          <div>
            <strong>Cumulative Revenue:</strong> ${Math.floor(cumulativeRevenue).toLocaleString()}
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handlePlayAgain}>Play Again</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}