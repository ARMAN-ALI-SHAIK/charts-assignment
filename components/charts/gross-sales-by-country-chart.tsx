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
import { generateAgeGroupAttritionData, downloadCSV } from "@/lib/data";
import { Download } from "lucide-react";

type Department = "all" | "sales" | "rd" | "hr";

const chartConfig = {
  attrition: {
    label: "Attrition",
    color: "hsl(195, 100%, 50%)",
  },
};

export function GrossSalesByCountryChart() {
  const [department, setDepartment] = useState<Department>("all");
  const data = generateAgeGroupAttritionData("30d", department);

  const handleDownload = () => {
    downloadCSV(data, `attrition-by-age-group-${department}.csv`);
  };

  return (
    <Card suppressHydrationWarning>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-normal">
          Attrition by Age Group
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
        <ChartContainer config={chartConfig} className="h-[220px] w-full">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 0, right: 60, top: 5, bottom: 5 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="ageGroup"
              tickLine={false}
              axisLine={false}
              width={60}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `Age: ${value}`}
                  formatter={(value) => [`${value} employees`, "Attrition"]}
                />
              }
            />
            <Bar
              dataKey="attrition"
              fill="hsl(195, 100%, 50%)"
              radius={[0, 4, 4, 0]}
              maxBarSize={30}
            >
              <LabelList
                dataKey="attrition"
                position="right"
                formatter={(value: number) => `${value}`}
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
