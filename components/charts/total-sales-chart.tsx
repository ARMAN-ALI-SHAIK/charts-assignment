"use client";

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DateRange, generateTotalSalesData, downloadCSV } from "@/lib/data";
import { Download } from "lucide-react";

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
};

export function TotalSalesChart() {
  const [dateRange, setDateRange] = useState<DateRange>("30d");
  const data = generateTotalSalesData(dateRange);

  const totalSales = data.reduce((acc, curr) => acc + curr.sales, 0);
  const previousTotal = totalSales * 0.7;
  const growth = ((totalSales - previousTotal) / previousTotal) * 100;

  const handleDownload = () => {
    downloadCSV(data, `total-sales-${dateRange}.csv`);
  };

  return (
    <Card suppressHydrationWarning>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base font-normal">Total sales</CardTitle>
          <CardDescription className="text-2xl font-bold">
            ₹{totalSales.toLocaleString("en-IN", { maximumFractionDigits: 0 })}{" "}
            <span className="text-sm font-normal text-green-600">
              +{growth.toFixed(0)}%
            </span>
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Select
            value={dateRange}
            onValueChange={(value) => setDateRange(value as DateRange)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 6)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="hsl(var(--chart-1))"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
        <div className="text-xs text-muted-foreground mt-4">
          Jun 6–Jul 5, 2023 · May 7–Jun 5, 2023
        </div>
      </CardContent>
    </Card>
  );
}
