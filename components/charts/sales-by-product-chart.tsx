"use client";

import { useState } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
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
import { DateRange, generateProductSalesData, downloadCSV } from "@/lib/data";
import { Download } from "lucide-react";

const chartConfig = {
  sales: {
    label: "Sales",
  },
  woolCap: {
    label: "Wool cap",
    color: "hsl(var(--chart-1))",
  },
  crewneck: {
    label: "Crewneck",
    color: "hsl(var(--chart-2))",
  },
  blouse: {
    label: "Blouse",
    color: "hsl(var(--chart-3))",
  },
  tShirt: {
    label: "T-shirt",
    color: "hsl(var(--chart-4))",
  },
  longSleeve: {
    label: "Long sleeve",
    color: "hsl(var(--chart-5))",
  },
};

export function SalesByProductChart() {
  const [dateRange, setDateRange] = useState<DateRange>("30d");
  const data = generateProductSalesData(dateRange);

  const handleDownload = () => {
    downloadCSV(data, `sales-by-product-${dateRange}.csv`);
  };

  return (
    <Card suppressHydrationWarning>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-normal">
          Sales by product name
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
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-sm">
            {data.slice(0, 3).map((item) => (
              <div key={item.product} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-sm"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="font-medium">{item.product}</span>
                <span className="ml-auto">
                  ₹
                  {item.sales.toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {data.slice(3).map((item) => (
              <div key={item.product} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-sm"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="font-medium">{item.product}</span>
                <span className="ml-auto">
                  ₹
                  {item.sales.toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            ))}
          </div>
          <ChartContainer config={chartConfig} className="h-20 w-full">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ left: 0, right: 0 }}
            >
              <YAxis type="category" dataKey="product" hide />
              <XAxis type="number" hide />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="sales" radius={4}>
                {data.map((entry, index) => (
                  <Bar key={`bar-${index}`} dataKey="sales" fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
