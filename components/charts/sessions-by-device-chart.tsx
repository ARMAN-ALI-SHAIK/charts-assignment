"use client";

import { useState } from "react";
import { Pie, PieChart, Cell, Label } from "recharts";
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
import { generateJobLevelAttritionData, downloadCSV } from "@/lib/data";
import { Download } from "lucide-react";

type JobRole = "all" | "sales" | "research" | "technician" | "manager";

const chartConfig = {
  attrition: {
    label: "Attrition",
  },
  entryLevel: {
    label: "Entry Level",
    color: "hsl(var(--chart-1))",
  },
  midLevel: {
    label: "Mid Level",
    color: "hsl(var(--chart-2))",
  },
  seniorLevel: {
    label: "Senior Level",
    color: "hsl(var(--chart-3))",
  },
  executive: {
    label: "Executive",
    color: "hsl(var(--chart-4))",
  },
};

export function SessionsByDeviceChart() {
  const [jobRole, setJobRole] = useState<JobRole>("all");
  const data = generateJobLevelAttritionData("30d", jobRole);

  const totalAttrition = data.reduce((acc, curr) => acc + curr.attrition, 0);

  const chartData = data.map((item) => ({
    jobLevel: item.jobLevel,
    value: item.attrition,
    fill: item.fill,
  }));

  const handleDownload = () => {
    downloadCSV(data, `attrition-by-job-level-${jobRole}.csv`);
  };

  return (
    <Card suppressHydrationWarning>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-normal">
          Attrition by Job Level
        </CardTitle>
        <div className="flex gap-2">
          <Select
            value={jobRole}
            onValueChange={(value) => setJobRole(value as JobRole)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="research">Research</SelectItem>
              <SelectItem value="technician">Technician</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <ChartContainer config={chartConfig} className="h-[200px] w-[200px]">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="jobLevel"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-xl font-bold"
                          >
                            {totalAttrition}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="flex flex-col gap-2">
            {data.map((item) => (
              <div key={item.jobLevel} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-sm"
                  style={{ backgroundColor: item.fill }}
                />
                <div className="flex items-baseline gap-2">
                  <span className="text-sm">{item.jobLevel}</span>
                  <span className="text-base font-semibold">
                    {item.attrition.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 mt-1">
              <div className="h-3 w-3" />
              <span className="text-xs text-muted-foreground">+1 more</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
