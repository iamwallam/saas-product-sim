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
import { DataTableDemo } from "./components/data-table"

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
          <header className="flex h-16 shrink-0 items-center justify-between border-b">
            <div className="flex items-center gap-4 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <BreadcrumbPage className="text-lg font-semibold">Dashboard</BreadcrumbPage>
            </div>
            <div className="flex h-16 items-center px-4 gap-4">
              <DatePicker/>
              <SimulatorPopover />
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-4">
            {/* Analytics cards section */}
            <SimulatedAnalyticsCards />

            {/* Full width chart section */}
            <div >
              <AnalyticsChart />
            </div>

            {/* Data table section */}
            <div>
              <DataTableDemo />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </SimulatorProvider>
  )
}