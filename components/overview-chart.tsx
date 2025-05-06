"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    events: 4,
    funds: 24000,
    students: 35,
  },
  {
    name: "Feb",
    events: 3,
    funds: 18000,
    students: 28,
  },
  {
    name: "Mar",
    events: 5,
    funds: 30000,
    students: 45,
  },
  {
    name: "Apr",
    events: 6,
    funds: 36000,
    students: 52,
  },
  {
    name: "May",
    events: 8,
    funds: 48000,
    students: 68,
  },
  {
    name: "Jun",
    events: 7,
    funds: 42000,
    students: 60,
  },
  {
    name: "Jul",
    events: 9,
    funds: 54000,
    students: 78,
  },
]

export function OverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="events" fill="#8884d8" name="Events" />
        <Bar yAxisId="left" dataKey="students" fill="#82ca9d" name="New Students" />
        <Bar yAxisId="right" dataKey="funds" fill="#ffc658" name="Funds (₹)" />
      </BarChart>
    </ResponsiveContainer>
  )
}
