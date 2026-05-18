"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

interface AnalyticsChartProps {
  type: "line" | "bar" | "pie";
  data: { name: string; value: number; color?: string }[];
  height?: number;
}

const COLORS = ["#10B981", "#F59E0B", "#3B82F6", "#8B5CF6", "#EC4899"];

export default function AnalyticsChart({ type, data, height = 250 }: AnalyticsChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-sm text-muted">
        No data yet
      </div>
    );
  }

  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" strokeOpacity={0.1} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#737373" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#737373" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "#141414",
                border: "1px solid #262626",
                borderRadius: "8px",
                color: "#FAFAFA",
                fontSize: "12px",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: "#10B981", r: 3 }}
              activeDot={{ r: 5, fill: "#10B981" }}
            />
          </LineChart>
        );
      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" strokeOpacity={0.1} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#737373" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#737373" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "#141414",
                border: "1px solid #262626",
                borderRadius: "8px",
                color: "#FAFAFA",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      case "pie":
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#141414",
                border: "1px solid #262626",
                borderRadius: "8px",
                color: "#FAFAFA",
                fontSize: "12px",
              }}
            />
          </PieChart>
        );
    }
  };

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}
