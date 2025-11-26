"use client";

import { TotalSalesChart } from "@/components/charts/total-sales-chart";
import { GrossSalesByCountryChart } from "@/components/charts/gross-sales-by-country-chart";
import { SessionsByDeviceChart } from "@/components/charts/sessions-by-device-chart";
import { CustomersOverTimeChart } from "@/components/charts/customers-over-time-chart";
import { SessionsByCountryChart } from "@/components/charts/sessions-by-country-chart";
import { SessionsOverTimeChart } from "@/components/charts/sessions-over-time-chart";
import { GrossSalesByDeviceChart } from "@/components/charts/gross-sales-by-device-chart";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-[1400px] space-y-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">HR Attrition Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor employee attrition trends and risk factors.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Row 1 - All same size */}
          <TotalSalesChart />
          <GrossSalesByCountryChart />
          <SessionsByDeviceChart />

          {/* Row 2 - All same size */}
          <CustomersOverTimeChart />
          <SessionsByCountryChart />
          <SessionsOverTimeChart />

          {/* Row 3 - Work-Life Balance takes full width */}
          <div className="lg:col-span-3">
            <GrossSalesByDeviceChart />
          </div>
        </div>
      </div>
    </div>
  );
}
