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
import { generateRiskLevelData, downloadCSV } from "@/lib/data";
import { Download } from "lucide-react";

type AgeGroup = "all" | "18-25" | "26-35" | "36-45" | "46-55" | "56+";

const chartConfig = {
  count: {
    label: "Count",
  },
  lowRisk: {
    label: "Low Risk",
    color: "hsl(var(--chart-1))",
  },
  mediumRisk: {
    label: "Medium Risk",
    color: "hsl(var(--chart-2))",
  },
  highRisk: {
    label: "High Risk",
    color: "hsl(var(--chart-3))",
  },
};

export function SalesByProductChart() {
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("all");
  const data = generateRiskLevelData("30d", ageGroup);

  const totalEmployees = data.reduce((acc, curr) => acc + curr.count, 0);

  const chartData = data.map((item) => ({
    riskLevel: item.riskLevel,
    value: item.count,
    fill: item.fill,
  }));

  const handleDownload = () => {
    downloadCSV(data, `attrition-risk-levels-${ageGroup}.csv`);
  };

  return (
    <Card suppressHydrationWarning>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-normal">
          Attrition Risk Levels
        </CardTitle>
        <div className="flex gap-2">
          <Select
            value={ageGroup}
            onValueChange={(value) => setAgeGroup(value as AgeGroup)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ages</SelectItem>
              <SelectItem value="18-25">18-25</SelectItem>
              <SelectItem value="26-35">26-35</SelectItem>
              <SelectItem value="36-45">36-45</SelectItem>
              <SelectItem value="46-55">46-55</SelectItem>
              <SelectItem value="56+">56+</SelectItem>
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
            {data.map((item) => (
              <div key={item.riskLevel} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-sm"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {item.riskLevel}
                  </span>
                </div>
                <span className="text-xl font-bold">
                  ₹{item.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div className="text-xs text-muted-foreground">+3 more</div>
          <ChartContainer config={chartConfig} className="h-12 w-full">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="riskLevel"
                innerRadius={0}
                outerRadius={20}
                startAngle={180}
                endAngle={0}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
