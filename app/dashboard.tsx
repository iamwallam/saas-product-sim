import { AppSidebar } from "./components/app-sidebar"
import { BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AnalyticsChart } from "./components/analytics-chart"
import { SimulatorDialog } from "./components/simulator-dialog"
import { SimulatorProvider, useSimulator } from "./simulator/context"
import { DatePicker } from "./components/date-picker"
import { Button } from "@/components/ui/button"
import { PlayIcon } from "lucide-react"
import { SimulatedAnalyticsCards } from "./components/simulated-analytics-cards"
import { DataTableDemo } from "./components/data-table"
import { IntroDialog } from "./components/intro-dialog"
import { EndDialog } from "./components/end-dialog"

function SimulationControls() {
  const { simulateNextMonth, currentMonth } = useSimulator()
  
  return (
    <Button onClick={simulateNextMonth} variant="outline">
      <PlayIcon className="h-4 w-4" />
      Month {currentMonth}
    </Button>
  )
}

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
              <SimulatorDialog/>
              <SimulationControls/>
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-4">
            {/* The intro overlay */}
            <IntroDialog />

            {/* The end game overlay */}
            <EndDialog />
            
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