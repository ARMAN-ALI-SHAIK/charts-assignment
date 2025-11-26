"use client";

import { TotalSalesChart } from "@/components/charts/total-sales-chart";
import { GrossSalesByCountryChart } from "@/components/charts/gross-sales-by-country-chart";
import { SessionsByDeviceChart } from "@/components/charts/sessions-by-device-chart";
import { CustomersOverTimeChart } from "@/components/charts/customers-over-time-chart";
import { SessionsByCountryChart } from "@/components/charts/sessions-by-country-chart";
import { SessionsOverTimeChart } from "@/components/charts/sessions-over-time-chart";
import { SalesByProductChart } from "@/components/charts/sales-by-product-chart";
import { GrossSalesByDeviceChart } from "@/components/charts/gross-sales-by-device-chart";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-[1400px] space-y-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track your business metrics and insights
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Row 1 */}
          <div className="md:col-span-1">
            <TotalSalesChart />
          </div>
          <div className="md:col-span-1">
            <GrossSalesByCountryChart />
          </div>
          <div className="md:col-span-1">
            <SessionsByDeviceChart />
          </div>

          {/* Row 2 */}
          <div className="md:col-span-1">
            <CustomersOverTimeChart />
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <SessionsByCountryChart />
          </div>

          {/* Row 3 */}
          <div className="md:col-span-1">
            <SessionsOverTimeChart />
          </div>
          <div className="md:col-span-1">
            <SalesByProductChart />
          </div>
          <div className="md:col-span-1">
            <GrossSalesByDeviceChart />
          </div>
        </div>
      </div>
    </div>
  );
}
