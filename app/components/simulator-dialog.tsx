"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSimulator } from "@/app/simulator/context"
import { PlusIcon } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function SimulatorDialog() {
  const { params, setParams } = useSimulator()
  const [teamError, setTeamError] = React.useState<string | null>(null)

  // Initialize team allocation from params
  const [teamAllocation, setTeamAllocation] = React.useState({
    newBiz: params.newBiz || 7,
    accountManagers: params.accountManagers || 7,
    support: params.support || 6
  })

  const totalTeamMembers = Object.values(teamAllocation).reduce((a, b) => a + b, 0)

  // Simplified team change handler - only updates raw numbers
  function handleTeamChange(role: keyof typeof teamAllocation, value: string) {
    const newValue = parseInt(value) || 0
    const newAllocation = { ...teamAllocation, [role]: newValue }
    const newTotal = Object.values(newAllocation).reduce((a, b) => a + b, 0)

    if (newTotal > 20) {
      setTeamError("Total team members cannot exceed 20")
    } else {
      setTeamError(null)
      setTeamAllocation(newAllocation)
      
      // Update simulator params with raw team numbers
      setParams(prev => ({
        ...prev,
        [role]: newValue
      }))
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="mr-2 h-4 w-4" />
          Team Allocation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Team Allocation</DialogTitle>
          <DialogDescription>
            Allocate your 20 team members across different roles. 
            Current total: {totalTeamMembers}/20
          </DialogDescription>
        </DialogHeader>
        
        {teamError && (
          <Alert variant="destructive">
            <AlertDescription>{teamError}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newBiz" className="text-right">
                New Business
              </Label>
              <Input
                id="newBiz"
                type="number"
                min="0"
                max="20"
                value={teamAllocation.newBiz}
                onChange={(e) => handleTeamChange('newBiz', e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accountManagers" className="text-right">
                Account Management
              </Label>
              <Input
                id="accountManagers"
                type="number"
                min="0"
                max="20"
                value={teamAllocation.accountManagers}
                onChange={(e) => handleTeamChange('accountManagers', e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="support" className="text-right">
                Support
              </Label>
              <Input
                id="support"
                type="number"
                min="0"
                max="20"
                value={teamAllocation.support}
                onChange={(e) => handleTeamChange('support', e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>

          {/* Team Distribution Summary */}
          <div className="mt-6 space-y-2">
            <h4 className="text-sm font-semibold">Team Distribution</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>New Business:</div>
              <div>{teamAllocation.newBiz} members</div>
              <div>Account Management:</div>
              <div>{teamAllocation.accountManagers} members</div>
              <div>Support:</div>
              <div>{teamAllocation.support} members</div>
              <div className="font-semibold">Total:</div>
              <div className="font-semibold">{totalTeamMembers}/20</div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" disabled={!!teamError}>
            Apply Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 