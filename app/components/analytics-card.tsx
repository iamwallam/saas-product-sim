import * as React from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
  // Determine if the trend is up or down
  const isTrendUp = trend !== undefined && trend > 0
  const isTrendDown = trend !== undefined && trend < 0

  return (
    <Card className="w-full h-full">
      <CardHeader>
        {/* Title slightly smaller */}
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {/* Description even smaller */}
        {description && (
          <CardDescription className="text-sm">{description}</CardDescription>
        )}
      </CardHeader>

      <CardContent>
        {/* The main metric/value displayed prominently */}
        <div className="text-4xl font-bold">{value}</div>
      </CardContent>

      {/* Trend Indicator (if trend is provided) */}
      {trend !== undefined && (
        <CardFooter className="flex-col items-start gap-2 text-sm">
          {isTrendUp && (
            <div className="flex items-center gap-2 font-medium leading-none text-green-600">
              <span>
                Trending up by {Math.abs(trend).toFixed(1)}% this month
              </span>
              <TrendingUp className="h-4 w-4" />
            </div>
          )}

          {isTrendDown && (
            <div className="flex items-center gap-2 font-medium leading-none text-red-600">
              <span>
                Trending down by {Math.abs(trend).toFixed(1)}% this month
              </span>
              <TrendingDown className="h-4 w-4" />
            </div>
          )}

          {/* If trend = 0 or otherwise not up/down */}
          {!isTrendUp && !isTrendDown && (
            <div className="font-medium leading-none text-muted-foreground">
              No significant change
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  )
}