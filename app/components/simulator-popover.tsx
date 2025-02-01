"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useSimulator } from "@/app/simulator/context"

export function SimulatorPopover() {
  // Pull state from context
  const { params, setParams } = useSimulator()

  function handleChurnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = parseFloat(e.target.value) / 100
    setParams((prev) => ({ ...prev, churnRate: isNaN(val) ? 0 : val }))
  }

  function handleGrowthChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = parseFloat(e.target.value) / 100
    setParams((prev) => ({ ...prev, growthRate: isNaN(val) ? 0 : val }))
  }

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = parseFloat(e.target.value)
    setParams((prev) => ({ ...prev, pricePerUser: isNaN(val) ? 0 : val }))
  }

  // NEW: marketing spend
  function handleMarketingChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = parseFloat(e.target.value)
    setParams((prev) => ({ ...prev, marketingSpend: isNaN(val) ? 0 : val }))
  }

  // NEW: expansion rate
  function handleExpansionChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = parseFloat(e.target.value) / 100
    setParams((prev) => ({ ...prev, expansionRate: isNaN(val) ? 0 : val }))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Scenario</Button>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-1">
            <h4 className="font-medium leading-none">Configure</h4>
            <p className="text-sm text-muted-foreground">
              Adjust key SaaS parameters below.
            </p>
          </div>

          {/* Churn Rate */}
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="churn">Churn (%)</Label>
            <Input
              id="churn"
              type="number"
              value={(params.churnRate * 100).toFixed(2)}
              onChange={handleChurnChange}
              className="col-span-2 h-8"
            />
          </div>

          {/* Growth Rate */}
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="growth">Growth (%)</Label>
            <Input
              id="growth"
              type="number"
              value={(params.growthRate * 100).toFixed(2)}
              onChange={handleGrowthChange}
              className="col-span-2 h-8"
            />
          </div>

          {/* Price per User */}
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="ppu">Price/User ($)</Label>
            <Input
              id="ppu"
              type="number"
              value={params.pricePerUser}
              onChange={handlePriceChange}
              className="col-span-2 h-8"
            />
          </div>

          {/* Marketing Spend */}
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="mSpend">Marketing ($)</Label>
            <Input
              id="mSpend"
              type="number"
              value={params.marketingSpend}
              onChange={handleMarketingChange}
              className="col-span-2 h-8"
            />
          </div>

          {/* Expansion Rate */}
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="expansion">Expansion (%)</Label>
            <Input
              id="expansion"
              type="number"
              value={(params.expansionRate * 100).toFixed(2)}
              onChange={handleExpansionChange}
              className="col-span-2 h-8"
            />
          </div>

        </div>
      </PopoverContent>
    </Popover>
  )
}