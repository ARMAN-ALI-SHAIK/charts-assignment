"use client";

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
import { generateAttritionOverTimeData, downloadCSV } from "@/lib/data";
import { Download } from "lucide-react";

type Department = "all" | "sales" | "rd" | "hr";

const chartConfig = {
  attrition: {
    label: "Attrition",
    color: "hsl(195, 100%, 50%)",
  },
};

export function SessionsByCountryChart() {
  const [department, setDepartment] = useState<Department>("all");
  const data = generateAttritionOverTimeData("30d", department);

  const handleDownload = () => {
    downloadCSV(data, `attrition-over-time-${department}.csv`);
  };

  return (
    <Card suppressHydrationWarning>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-normal">
          Attrition Over Time
        </CardTitle>
        <div className="flex gap-2">
          <Select
            value={department}
            onValueChange={(value) => setDepartment(value as Department)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Depts</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="rd">R&D</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
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
              dataKey="attrition"
              stroke="hsl(195, 100%, 50%)"
              fill="hsl(195, 100%, 50%)"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
