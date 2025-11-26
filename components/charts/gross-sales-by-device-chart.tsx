"use client";

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
import { generateWorkLifeBalanceData, downloadCSV } from "@/lib/data";
import { Download } from "lucide-react";

type MaritalStatus = "all" | "single" | "married" | "divorced";

const chartConfig = {
  poor: {
    label: "Poor",
    color: "hsl(195, 100%, 50%)",
  },
  average: {
    label: "Average",
    color: "hsl(280, 100%, 70%)",
  },
  good: {
    label: "Good",
    color: "hsl(250, 100%, 60%)",
  },
  excellent: {
    label: "Excellent",
    color: "hsl(330, 100%, 70%)",
  },
};

export function GrossSalesByDeviceChart() {
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus>("all");
  const data = generateWorkLifeBalanceData("30d", maritalStatus);

  const handleDownload = () => {
    downloadCSV(data, `work-life-balance-attrition-${maritalStatus}.csv`);
  };

  return (
    <Card suppressHydrationWarning>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-normal">
          Work-Life Balance vs Attrition
        </CardTitle>
        <div className="flex gap-2">
          <Select
            value={maritalStatus}
            onValueChange={(value) => setMaritalStatus(value as MaritalStatus)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
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
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="poor"
              stackId="1"
              stroke={chartConfig.poor.color}
              fill={chartConfig.poor.color}
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="average"
              stackId="1"
              stroke={chartConfig.average.color}
              fill={chartConfig.average.color}
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="good"
              stackId="1"
              stroke={chartConfig.good.color}
              fill={chartConfig.good.color}
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="excellent"
              stackId="1"
              stroke={chartConfig.excellent.color}
              fill={chartConfig.excellent.color}
              fillOpacity={0.6}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
