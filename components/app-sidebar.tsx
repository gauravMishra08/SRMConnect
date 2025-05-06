"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Users,
  Layers,
  Calendar,
  Award,
  DollarSign,
  FileText,
  MessageSquare,
  Box,
  Bell,
  BarChart,
  Moon,
  Sun,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const navItems = [
  { name: "Dashboard", href: "/", icon: BarChart },
  { name: "Students", href: "/students", icon: Users },
  { name: "Clubs", href: "/clubs", icon: Layers },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Sessions", href: "/sessions", icon: Calendar },
  { name: "Competitions", href: "/competitions", icon: Award },
  { name: "Funds", href: "/funds", icon: DollarSign },
  { name: "Expenses", href: "/expenses", icon: DollarSign },
  { name: "Resources", href: "/resources", icon: Box },
  { name: "Announcements", href: "/announcements", icon: Bell },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Feedback", href: "/feedback", icon: MessageSquare },
]

export default function AppSidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border/50">
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="text-sm font-bold text-primary-foreground">SRM</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold">SRMConnect</span>
            <span className="text-xs text-muted-foreground">Admin Dashboard</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link href={item.href}>
                    <item.icon className="mr-2" />
                    {item.name}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-border/50 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatar.png" alt="Admin" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Admin User</span>
              <span className="text-xs text-muted-foreground">SRM University</span>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-8 w-8"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <SidebarTrigger />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
