"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts";
import {
  RiArrowUpLine,
  RiArrowDownLine,
  RiCheckboxCircleLine,
  RiGitMergeLine,
  RiRocketLine,
} from "@remixicon/react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StrokeDraw } from "@/components/stroke-draw";

const stats = [
  { label: "Total revenue", value: "$48.2k", delta: "+12.4%", positive: true },
  { label: "Active users", value: "2,840", delta: "+5.1%", positive: true },
  { label: "Conversion", value: "3.6%", delta: "-0.8%", positive: false },
];

const performanceData = [
  { month: "Jan", revenue: 31200 },
  { month: "Feb", revenue: 34800 },
  { month: "Mar", revenue: 33100 },
  { month: "Apr", revenue: 38600 },
  { month: "May", revenue: 42900 },
  { month: "Jun", revenue: 41300 },
  { month: "Jul", revenue: 45700 },
  { month: "Aug", revenue: 48200 },
];

const activity = [
  {
    name: "Priya Nair",
    avatar: "https://i.pravatar.cc/150?img=45",
    icon: RiRocketLine,
    action: "deployed",
    target: "acme-web v2.4",
    time: "2 Min Ago",
    tone: "primary" as const,
  },
  {
    name: "Marco Diaz",
    avatar: "https://i.pravatar.cc/150?img=33",
    icon: RiGitMergeLine,
    action: "merged",
    target: "PR #482: checkout refactor",
    time: "1 Hour Ago",
    tone: "primary" as const,
  },
  {
    name: "Lena Fischer",
    avatar: "https://i.pravatar.cc/150?img=47",
    icon: RiCheckboxCircleLine,
    action: "closed",
    target: "8 tasks in Sprint 7",
    time: "3 Hours Ago",
    tone: "success" as const,
  },
];

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Overview Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Monitor your portfolio performance, site traffic, and form submissions.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map(({ label, value, delta, positive }) => (
          <Card key={label} className="border border-border/80 bg-card/50 backdrop-blur-xs shadow-xs rounded-xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium text-muted-foreground">{label}</span>
              <Badge variant={positive ? "secondary" : "destructive"} className="flex items-center gap-1 py-0 px-2 rounded-full font-mono text-[10px]">
                <StrokeDraw>
                  {positive ? (
                    <RiArrowUpLine className="size-3.5 text-emerald-500" />
                  ) : (
                    <RiArrowDownLine className="size-3.5 text-rose-500" />
                  )}
                </StrokeDraw>
                {delta}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">{value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Compared to last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Layout */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Performance Chart Card */}
        <Card className="md:col-span-2 border border-border/80 bg-card/50 backdrop-blur-xs rounded-xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-base font-bold">Revenue Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-80 w-full pl-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" vertical={false} />
                <XAxis dataKey="month" className="text-[10px] fill-muted-foreground font-mono" stroke="none" />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity Card */}
        <Card className="border border-border/80 bg-card/50 backdrop-blur-xs rounded-xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-base font-bold">Recent Updates</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {activity.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <StrokeDraw>
                    <item.icon className="size-4" />
                  </StrokeDraw>
                </span>
                <div className="flex flex-col min-w-0 flex-1">
                  <p className="text-xs text-foreground font-medium">
                    <span className="font-bold">{item.name}</span> {item.action}{" "}
                    <span className="font-semibold text-primary">{item.target}</span>
                  </p>
                  <span className="text-[10px] text-muted-foreground mt-0.5 font-mono">{item.time}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
