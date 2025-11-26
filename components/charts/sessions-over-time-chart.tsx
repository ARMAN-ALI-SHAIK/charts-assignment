"use client";

import { useState } from "react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
import { generateDepartmentAttritionData, downloadCSV } from "@/lib/data";
import { Download } from "lucide-react";

type JobLevel = "all" | "entry" | "mid" | "senior" | "executive";

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(195, 100%, 50%)",
  },
  rd: {
    label: "R&D",
    color: "hsl(280, 100%, 70%)",
  },
  hr: {
    label: "HR",
    color: "hsl(330, 100%, 70%)",
  },
};

export function SessionsOverTimeChart() {
  const [jobLevel, setJobLevel] = useState<JobLevel>("all");
  const data = generateDepartmentAttritionData("30d", jobLevel);

  const handleDownload = () => {
    downloadCSV(data, `department-attrition-${jobLevel}.csv`);
  };

  return (
    <Card suppressHydrationWarning>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-normal">
          Department-wise Attrition
        </CardTitle>
        <div className="flex gap-2">
          <Select
            value={jobLevel}
            onValueChange={(value) => setJobLevel(value as JobLevel)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="entry">Entry</SelectItem>
              <SelectItem value="mid">Mid</SelectItem>
              <SelectItem value="senior">Senior</SelectItem>
              <SelectItem value="executive">Executive</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[220px] w-full">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="sales"
              stroke={chartConfig.sales.color}
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="rd"
              stroke={chartConfig.rd.color}
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="hr"
              stroke={chartConfig.hr.color}
              strokeWidth={2}
              dot={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
