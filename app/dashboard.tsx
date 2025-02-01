import { AppSidebar } from "./components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Component as AnalyticsChart } from "./components/analytics-chart"
import AnalyticsCard from "./components/analytics-card"
import { DollarSign, Users, PercentCircle, Wallet, Activity } from "lucide-react"

// Helper function to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

// Sample metrics data
const derivedMetrics = {
  mrr: 125000,
  churn: 0.05,
  ltv: 2400,
  cac: 400,
  mau: 50000,
  trends: {
    mrr: 12,
    churn: -2,
    ltv: 15,
    cac: -8,
    mau: 10,
  }
}

export default function Page() {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "400px",
      } as React.CSSProperties}
    >
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center bg-muted/50 gap-2 border-b px-4">
          <div className="flex-grow"></div>
          <SidebarTrigger className="-mr-1" />
        </header>
        <div className="flex flex-1 flex-col bg-muted/50 gap-4 p-4">

          <div className="min-h-[100vh] flex-1 rounded-xl bg-white md:min-h-min shadow-sm p-4">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
              <AnalyticsCard
                title="Monthly Recurring Revenue"
                value={formatCurrency(derivedMetrics.mrr)}
                description="Total revenue this month"
                icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
                trend={derivedMetrics.trends.mrr}
              />
              <AnalyticsCard
                title="Churn Rate"
                value={`${(derivedMetrics.churn * 100).toFixed(1)}%`}
                description="Customer retention rate"
                icon={<PercentCircle className="h-4 w-4 text-muted-foreground" />}
                trend={derivedMetrics.trends.churn}
              />
              <AnalyticsCard
                title="Customer Lifetime Value"
                value={formatCurrency(derivedMetrics.ltv)}
                description="Average revenue per user"
                icon={<Wallet className="h-4 w-4 text-muted-foreground" />}
                trend={derivedMetrics.trends.ltv}
              />
              <AnalyticsCard
                title="Customer Acquisition Cost"
                value={formatCurrency(derivedMetrics.cac)}
                description="Cost to acquire each customer"
                icon={<Activity className="h-4 w-4 text-muted-foreground" />}
                trend={derivedMetrics.trends.cac}
              />
              <AnalyticsCard
                title="Monthly Active Users"
                value={derivedMetrics.mau.toLocaleString()}
                description="Users active in the last 30 days"
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
                trend={derivedMetrics.trends.mau}
              />
            </div>
            <div className="mt-4">
              <AnalyticsChart />
            </div>
          </div>
        </div>
      </SidebarInset>
      <AppSidebar />
    </SidebarProvider>
  )
}

