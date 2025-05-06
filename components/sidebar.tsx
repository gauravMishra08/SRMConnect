"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, Layers, Calendar, Award, DollarSign, FileText, MessageSquare, Box, Bell, BarChart } from "lucide-react"

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

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-slate-900 text-white p-4 flex flex-col h-full">
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold">SRMConnect</h1>
        <p className="text-sm text-slate-400">Admin Dashboard</p>
      </div>
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-2 py-2 rounded-md text-sm font-medium ${
                isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="pt-4 pb-2 border-t border-slate-700">
        <div className="flex items-center px-2">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center">
              <span className="text-sm font-medium">A</span>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-slate-400">SRM University</p>
          </div>
        </div>
      </div>
    </div>
  )
}
