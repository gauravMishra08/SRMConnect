"use client"

import { Activity, Award, Calendar, DollarSign, Users } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "event",
    title: "Tech Symposium scheduled",
    timestamp: "2 hours ago",
    icon: Calendar,
  },
  {
    id: 2,
    type: "fund",
    title: "₹50,000 allocated to Robotics Club",
    timestamp: "5 hours ago",
    icon: DollarSign,
  },
  {
    id: 3,
    type: "competition",
    title: "Coding Challenge winners announced",
    timestamp: "1 day ago",
    icon: Award,
  },
  {
    id: 4,
    type: "member",
    title: "15 new students joined Design Club",
    timestamp: "2 days ago",
    icon: Users,
  },
  {
    id: 5,
    type: "activity",
    title: "Annual report submitted by AI Club",
    timestamp: "3 days ago",
    icon: Activity,
  },
]

export function RecentActivities() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4 rounded-lg border p-3">
          <div className="rounded-full bg-primary/10 p-2">
            <activity.icon className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">{activity.title}</p>
            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
