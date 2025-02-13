"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useSimulator } from "@/app/simulator/context"

export function IntroDialog() {
  const { showIntro, setShowIntro } = useSimulator()

  // Called when user clicks “Start Simulation”
  function handleStart() {
    setShowIntro(false)
  }

  return (
    <Dialog open={showIntro} onOpenChange={setShowIntro}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to the SaaS Simulation</DialogTitle>
          <DialogDescription>
            <p>
              You have 20 team members total. Each month, allocate them among
              New Business, Account Management, and Support to maximize revenue.
            </p>
            <p className="mt-2">
              Then click “Next Month” to simulate changes in user counts, MRR,
              and churn. Aim to achieve the highest results by Month 24!
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="default" onClick={handleStart}>
            Start Simulation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}