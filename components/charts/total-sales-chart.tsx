"use client";

import { useState } from "react";
import { Pie, PieChart, Cell, Label } from "recharts";
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
import { generateGenderAttritionData, downloadCSV } from "@/lib/data";
import { Download } from "lucide-react";

type AgeGroup = "all" | "18-25" | "26-35" | "36-45" | "46-55" | "56+";

const chartConfig = {
  male: {
    label: "Male",
    color: "hsl(195, 100%, 50%)",
  },
  female: {
    label: "Female",
    color: "hsl(280, 100%, 70%)",
  },
};

export function TotalSalesChart() {
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("all");
  const data = generateGenderAttritionData("30d", ageGroup);

  const totalAttrition = data.reduce((acc, curr) => acc + curr.attrition, 0);
  const totalEmployees = data.reduce((acc, curr) => acc + curr.total, 0);
  const attritionRate = ((totalAttrition / totalEmployees) * 100).toFixed(1);

  const chartData = data.map((item, index) => ({
    gender: item.gender,
    value: item.attrition,
    fill: index === 0 ? "hsl(195, 100%, 50%)" : "hsl(280, 100%, 70%)",
  }));

  const handleDownload = () => {
    downloadCSV(data, `gender-attrition-${ageGroup}.csv`);
  };

  return (
    <Card suppressHydrationWarning>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base font-normal">
            Gender vs Attrition
          </CardTitle>
          <CardDescription className="text-2xl font-bold">
            {totalAttrition} employees{" "}
            <span className="text-sm font-normal text-red-600">
              {attritionRate}% rate
            </span>
          </CardDescription>
        </div>
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
        <div className="flex items-center justify-between">
          <ChartContainer config={chartConfig} className="h-[200px] w-[200px]">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="gender"
                innerRadius={60}
                outerRadius={80}
                strokeWidth={2}
              >
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
                            className="fill-foreground text-2xl font-bold"
                          >
                            {totalAttrition}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="flex flex-col gap-3">
            {data.map((item, index) => (
              <div key={item.gender} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-sm"
                  style={{
                    backgroundColor:
                      index === 0
                        ? "hsl(195, 100%, 50%)"
                        : "hsl(280, 100%, 70%)",
                  }}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{item.gender}</span>
                  <span className="text-2xl font-bold">
                    {item.attrition.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
