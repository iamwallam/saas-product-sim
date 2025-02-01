"use client"

import * as React from "react"
import { UsersRound, Command, Filter, Calendar, PencilRuler, ChartNoAxesCombined, Trash2, RefreshCw, Moon } from "lucide-react"


import { Label } from "@/components/ui/label"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarInput,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// This is sample data
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Profiles",
            url: "#",
            icon: UsersRound,
            isActive: false,
        }, 
        {
            title: "Date Range",
            url: "#",
            icon: Calendar,
            isActive: true,
        },
        {
            title: "Filters",
            url: "#",
            icon: Filter,
            isActive: false,
        },
        {
            title: "Scenarios",
            url: "#",
            icon: ChartNoAxesCombined,
            isActive: false,
        },
    ],
    footer: [
        {
            title: "Refresh",
            url: "#",
            icon: RefreshCw,
        },
        {
            title: "Moon",
            url: "#",
            icon: Moon,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    // Note: I'm using state to show active item.
    // IRL you should use the url/router.
    const [activeItem, setActiveItem] = React.useState(data.navMain[0])
    const { setOpen } = useSidebar()

    const renderContent = () => {
        switch (activeItem.title) {
            case "Profiles":
                return (
                    <>
                        <SidebarHeader className="gap-3.5 border-b p-4">
                            <div className="flex w-full items-center justify-between">
                                <div className="text-base font-medium text-foreground">
                                    {activeItem.title}
                                </div>
                                <Label className="flex items-center gap-2 text-sm">
                                    <span>Calendar View</span>
                                    <Switch className="shadow-none" />
                                </Label>
                            </div>
                            <SidebarInput placeholder="Type to search..." />
                        </SidebarHeader>
                        <SidebarContent>
                            <SidebarGroup className="px-0">
                                <SidebarGroupContent>
                                    <div className="flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                                        <div className="flex w-full items-center gap-2">
                                            <span>Calendar Item</span>
                                            <span className="ml-auto text-xs">Today</span>
                                        </div>
                                        <span className="font-medium">Calendar Details</span>
                                        <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                                            Calendar description and additional details go here
                                        </span>
                                    </div>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </>
                )
            case "Date Range":
                return (
                    <>
                        <SidebarHeader className="gap-3.5 border-b p-4">
                            <div className="flex w-full items-center justify-between">
                                <div className="text-base font-medium text-foreground">
                                    {activeItem.title}
                                </div>
                                <Label className="flex items-center gap-2 text-sm">
                                    <span>Compare</span>
                                    <Switch className="shadow-none" />
                                </Label>
                            </div>
                        </SidebarHeader>
                        <SidebarContent>
                            <SidebarGroup className="px-0">
                                <SidebarGroupContent>
                                    <div className="flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                                        <div className="flex w-full items-center gap-2">
                                            <span>Calendar Item</span>
                                            <span className="ml-auto text-xs">Today</span>
                                        </div>
                                        <span className="font-medium">Calendar Details</span>
                                        <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                                            Calendar description and additional details go here
                                        </span>
                                    </div>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </>
                )
                case "Filters":
                return (
                    <>
                        <SidebarHeader className="gap-3.5 border-b p-4">
                            <div className="flex w-full items-center justify-between">
                                <div className="text-base font-medium text-foreground">
                                    {activeItem.title}
                                </div>
                                <Label className="flex items-center gap-2 text-sm">
                                    <span>Calendar View</span>
                                    <Switch className="shadow-none" />
                                </Label>
                            </div>
                        </SidebarHeader>
                        <SidebarContent>
                            <SidebarGroup className="px-0">
                                <SidebarGroupContent>
                                    <div className="flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                                        <div className="flex w-full items-center gap-2">
                                            <span>Calendar Item</span>
                                            <span className="ml-auto text-xs">Today</span>
                                        </div>
                                        <span className="font-medium">Calendar Details</span>
                                        <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                                            Calendar description and additional details go here
                                        </span>
                                    </div>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </>
                )
            // ... other cases with similar structure
        }
    }

    return (
        <Sidebar
            side="right"
            collapsible="icon"
            className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row-reverse"
            {...props}
        >
            {/* This is the first sidebar */}
            {/* We disable collapsible and adjust width to icon. */}
            {/* This will make the sidebar appear as icons. */}
            <Sidebar
                side="right"
                collapsible="none"
                className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-l"
            >
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                                <a href="#">
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                        <Command className="size-4" />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">Acme Inc</span>
                                        <span className="truncate text-xs">Enterprise</span>
                                    </div>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent className="px-1.5 md:px-0">
                            <SidebarMenu>
                                {data.navMain.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            tooltip={{
                                                children: item.title,
                                                hidden: false,
                                            }}
                                            onClick={() => {
                                                setActiveItem(item)
                                                setOpen(true)
                                            }}
                                            isActive={activeItem.title === item.title}
                                            className="px-2.5 md:px-2"
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                  
                </SidebarFooter>
            </Sidebar>

            {/* This is the second sidebar */}
            {/* We disable collapsible and let it fill remaining space */}
            <Sidebar side="right" collapsible="none" className="hidden flex-1 md:flex">
                {renderContent()}
            </Sidebar>
        </Sidebar>
    )
}
