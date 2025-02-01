import { AppSidebar } from "./components/app-sidebar"
import { BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AnalyticsChart } from "./components/analytics-chart"
import { SimulatorPopover } from "./components/simulator-popover"
import { SimulatorProvider } from "./simulator/context"
import { DatePicker } from "./components/date-picker"

// Import your new file:
import { SimulatedAnalyticsCards } from "./components/simulated-analytics-cards"

export default function Page() {
  return (
    <SimulatorProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "350px",
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between">
            <div className="flex items-center gap-4 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </div>
            <div className="flex h-16 items-center px-4 gap-4">

              <DatePicker/>
              <SimulatorPopover />
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {/* Instead of repeating the same static card 4 times, 
                we render your dynamic cards */}
            <SimulatedAnalyticsCards />

            <div className="flex-1 rounded-xl bg-muted/50 shadow-inner p-4">
              <AnalyticsChart />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </SimulatorProvider>
  )
}