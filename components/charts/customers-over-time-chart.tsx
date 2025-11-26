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
import { generateJobRoleAttritionData, downloadCSV } from "@/lib/data";
import { Download } from "lucide-react";

type Gender = "all" | "male" | "female";

const chartConfig = {
  attrition: {
    label: "Attrition",
    color: "hsl(195, 100%, 50%)",
  },
};

export function CustomersOverTimeChart() {
  const [gender, setGender] = useState<Gender>("all");
  const data = generateJobRoleAttritionData("30d", gender);

  const handleDownload = () => {
    downloadCSV(data, `attrition-by-job-role-${gender}.csv`);
  };

  return (
    <Card suppressHydrationWarning>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-normal">
          Attrition by Job Role
        </CardTitle>
        <div className="flex gap-2">
          <Select
            value={gender}
            onValueChange={(value) => setGender(value as Gender)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genders</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 0, right: 60, top: 5, bottom: 5 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="jobRole"
              tickLine={false}
              axisLine={false}
              width={150}
              tick={{ fontSize: 11 }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `Role: ${value}`}
                  formatter={(value) => [`${value} employees`, "Attrition"]}
                />
              }
            />
            <Bar
              dataKey="attrition"
              fill="hsl(195, 100%, 50%)"
              radius={[0, 4, 4, 0]}
              maxBarSize={20}
            >
              <LabelList
                dataKey="attrition"
                position="right"
                formatter={(value: number) => `${value}`}
                style={{
                  fontSize: "11px",
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
