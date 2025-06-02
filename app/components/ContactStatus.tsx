"use client"

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

type Contact = {
  status: string
}

type Props = {
  contacts: Contact[]
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#B23BFF"]

export default function ContactStatusPie({ contacts }: Props) {
  // Count how many contacts per status
  const statusCount = contacts.reduce((acc: any, contact) => {
    const key = contact.status || "unknown"
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})

  const data = Object.entries(statusCount).map(([status, count]) => ({
    name: status,
    value: count,
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
