import { AppSidebar } from "./components/app-sidebar"
import {
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AnalyticsCard } from "./components/analytics-card"
import { Component as AnalyticsChart } from "./components/analytics-chart"


export default function Page() {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "350px", // Note: Fixed the CSS custom property syntax
      } as React.CSSProperties}
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />

            <BreadcrumbPage>Dashboard</BreadcrumbPage>

          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <div className="rounded-xl bg-muted/50 p-2 shadow-inner">
              <AnalyticsCard
                title="Revenue"
                description="Monthly revenue trends"
                value="$45,200"
                trend={20.1}
              />
            </div>
            <div className="rounded-xl bg-muted/50 p-2 shadow-inner">
              <AnalyticsCard
                title="Revenue"
                description="Monthly revenue trends"
                value="$45,200"
                trend={20.1}
              />
            </div>
            <div className="rounded-xl bg-muted/50 p-2 shadow-inner">
              <AnalyticsCard
                title="Revenue"
                description="Monthly revenue trends"
                value="$45,200"
                trend={20.1}
              />
            </div>
            <div className="rounded-xl bg-muted/50 p-2 shadow-inner">
              <AnalyticsCard
                title="Revenue"
                description="Monthly revenue trends"
                value="$45,200"
                trend={20.1}
              />
            </div>
          </div>
          <div className="flex-1 rounded-xl bg-muted/50 shadow-inner p-4">
            <AnalyticsChart />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
