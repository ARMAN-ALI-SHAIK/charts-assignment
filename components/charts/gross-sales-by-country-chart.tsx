"use client";

import { useState } from "react";
import { Bar, BarChart, XAxis, YAxis, LabelList } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { DateRange, generateCountrySalesData, downloadCSV } from "@/lib/data";
import { Download } from "lucide-react";

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
};

export function GrossSalesByCountryChart() {
  const [dateRange, setDateRange] = useState<DateRange>("30d");
  const data = generateCountrySalesData(dateRange);

  const handleDownload = () => {
    downloadCSV(data, `gross-sales-by-country-${dateRange}.csv`);
  };

  return (
    <Card suppressHydrationWarning>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-normal">
          Gross sales by country
        </CardTitle>
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
        <ChartContainer config={chartConfig} className="h-[220px] w-full">
          <BarChart
            data={data}
            layout="horizontal"
            margin={{ left: 0, right: 60, top: 5, bottom: 5 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="country"
              tickLine={false}
              axisLine={false}
              width={120}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar
              dataKey="sales"
              fill="hsl(var(--chart-1))"
              radius={[0, 4, 4, 0]}
              maxBarSize={30}
            >
              <LabelList
                dataKey="sales"
                position="right"
                formatter={(value: number) => `₹${(value / 1000).toFixed(0)}K`}
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  fill: "currentColor",
                }}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
