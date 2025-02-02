import * as React from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"

/**
 * Props for the AnalyticsCard component.
 * - title: main heading at the top
 * - description: small subheading under the title
 * - value: the key metric or figure, displayed prominently
 * - trend: percentage to show how it's trending up or down
 */
interface AnalyticsCardProps {
  title: string
  description?: string
  value: string | number
  trend?: number
}

export function AnalyticsCard({
  title,
  description,
  value,
  trend,
}: AnalyticsCardProps) {
  const isTrendUp = trend !== undefined && trend > 0
  const isTrendDown = trend !== undefined && trend < 0

  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-4">
        {/* Left side - Title and description */}
        <div className="flex flex-col  items-start">
          <div className="text-md font-semibold">{title}</div>
         
        </div>

        {/* Spacer */}
        <div className="flex-1" />
      

        {/* Right side - Value and trend */}
        <div className="flex flex-col items-end">
          <div className="text-xl font-bold">{value}</div>
          
          {trend !== undefined && (
            <>
              {isTrendUp && (
                <div className="flex items-center text-sm font-medium text-green-600">
                  <span>{Math.abs(trend).toFixed(1)}%</span>
                  <TrendingUp className="h-4 w-4" />
                </div>
              )}

              {isTrendDown && (
                <div className="flex items-center gap-1 text-sm font-medium text-red-600">
                  <span>{Math.abs(trend).toFixed(1)}%</span>
                  <TrendingDown className="h-4 w-4" />
                </div>
              )}

              {!isTrendUp && !isTrendDown && (
                <div className="text-sm font-medium text-muted-foreground">
                  No change
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}