"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  DateRange,
  generateSessionsByCountryData,
  downloadCSV,
} from "@/lib/data";
import { Download } from "lucide-react";

const chartConfig = {
  unitedStates: {
    label: "United States",
    color: "hsl(var(--chart-1))",
  },
  canada: {
    label: "Canada",
    color: "hsl(var(--chart-2))",
  },
  unitedKingdom: {
    label: "United Kingdom",
    color: "hsl(var(--chart-3))",
  },
  france: {
    label: "France",
    color: "hsl(var(--chart-4))",
  },
};

export function SessionsByCountryChart() {
  const [dateRange, setDateRange] = useState<DateRange>("30d");
  const data = generateSessionsByCountryData(dateRange);

  const handleDownload = () => {
    downloadCSV(data, `sessions-by-country-${dateRange}.csv`);
  };

  return (
    <Card suppressHydrationWarning>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-normal">
          Sessions by country
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
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="unitedStates"
              stackId="a"
              fill={chartConfig.unitedStates.color}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="canada"
              stackId="a"
              fill={chartConfig.canada.color}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="unitedKingdom"
              stackId="a"
              fill={chartConfig.unitedKingdom.color}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="france"
              stackId="a"
              fill={chartConfig.france.color}
              radius={[4, 4, 0, 0]}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
