// Types
export type DateRange = "7d" | "30d" | "90d" | "all";

export interface TotalSalesData {
  date: string;
  sales: number;
}

export interface CountrySalesData {
  country: string;
  sales: number;
}

export interface DeviceSessionData {
  device: string;
  sessions: number;
  fill: string;
}

export interface CustomerData {
  date: string;
  firstTime: number;
  recurring: number;
}

export interface SessionsByCountryData {
  date: string;
  unitedStates: number;
  canada: number;
  unitedKingdom: number;
  france: number;
}

export interface SessionsOverTimeData {
  date: string;
  jun6_jul5_2023: number;
  apr22_may28_2024: number;
}

export interface ProductSalesData {
  product: string;
  sales: number;
  fill: string;
}

export interface DeviceSalesData {
  date: string;
  mobile: number;
  desktop: number;
  tablet: number;
}

// Data generators
export const generateTotalSalesData = (range: DateRange): TotalSalesData[] => {
  const days =
    range === "7d" ? 7 : range === "30d" ? 30 : range === "90d" ? 90 : 60;
  const data: TotalSalesData[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      sales: 5000 + Math.random() * 25000 + Math.sin(i / 5) * 10000,
    });
  }
  return data;
};

export const generateCountrySalesData = (
  range: DateRange
): CountrySalesData[] => {
  const baseMultiplier =
    range === "7d" ? 0.2 : range === "30d" ? 0.6 : range === "90d" ? 1 : 1.2;
  return [
    { country: "United States", sales: 10000 * baseMultiplier },
    { country: "Canada", sales: 8000 * baseMultiplier },
    { country: "United Kingdom", sales: 7000 * baseMultiplier },
    { country: "France", sales: 7500 * baseMultiplier },
    { country: "Mexico", sales: 6000 * baseMultiplier },
  ];
};

export const generateDeviceSessionData = (
  range: DateRange
): DeviceSessionData[] => {
  const baseMultiplier =
    range === "7d" ? 0.3 : range === "30d" ? 0.7 : range === "90d" ? 1 : 1.3;
  return [
    {
      device: "Mobile",
      sessions: 35000 * baseMultiplier,
      fill: "hsl(var(--chart-1))",
    },
    {
      device: "Desktop",
      sessions: 32000 * baseMultiplier,
      fill: "hsl(var(--chart-2))",
    },
    {
      device: "Tablet",
      sessions: 26000 * baseMultiplier,
      fill: "hsl(var(--chart-3))",
    },
    {
      device: "Other",
      sessions: 9000 * baseMultiplier,
      fill: "hsl(var(--chart-4))",
    },
  ];
};

export const generateCustomerData = (range: DateRange): CustomerData[] => {
  const days =
    range === "7d" ? 7 : range === "30d" ? 30 : range === "90d" ? 90 : 60;
  const data: CustomerData[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      firstTime: 2000 + Math.random() * 6000 + Math.sin(i / 8) * 2000,
      recurring: 1000 + Math.random() * 5000 + Math.cos(i / 8) * 2000,
    });
  }
  return data;
};

export const generateSessionsByCountryData = (
  range: DateRange
): SessionsByCountryData[] => {
  const points =
    range === "7d" ? 4 : range === "30d" ? 8 : range === "90d" ? 12 : 4;
  const data: SessionsByCountryData[] = [];

  for (let i = 0; i < points; i++) {
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - (points - i) * 7);
    data.push({
      date: baseDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      unitedStates: 4000 + Math.random() * 2000,
      canada: 2000 + Math.random() * 1500,
      unitedKingdom: 1500 + Math.random() * 1000,
      france: 1000 + Math.random() * 800,
    });
  }
  return data;
};

export const generateSessionsOverTimeData = (
  range: DateRange
): SessionsOverTimeData[] => {
  const points =
    range === "7d" ? 5 : range === "30d" ? 8 : range === "90d" ? 12 : 6;
  const data: SessionsOverTimeData[] = [];

  for (let i = 0; i < points; i++) {
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - (points - i) * 5);
    data.push({
      date: baseDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      jun6_jul5_2023: 3000 + Math.random() * 4000,
      apr22_may28_2024: 2500 + Math.random() * 4500,
    });
  }
  return data;
};

export const generateProductSalesData = (
  range: DateRange
): ProductSalesData[] => {
  const baseMultiplier =
    range === "7d" ? 0.25 : range === "30d" ? 0.65 : range === "90d" ? 1 : 1.25;
  return [
    {
      product: "Wool cap",
      sales: 419710 * baseMultiplier,
      fill: "hsl(var(--chart-1))",
    },
    {
      product: "Crewneck",
      sales: 251831 * baseMultiplier,
      fill: "hsl(var(--chart-2))",
    },
    {
      product: "Blouse",
      sales: 187887 * baseMultiplier,
      fill: "hsl(var(--chart-3))",
    },
    {
      product: "T-shirt",
      sales: 75549 * baseMultiplier,
      fill: "hsl(var(--chart-4))",
    },
    {
      product: "Long sleeve",
      sales: 75649 * baseMultiplier,
      fill: "hsl(var(--chart-5))",
    },
  ];
};

export const generateDeviceSalesData = (
  range: DateRange
): DeviceSalesData[] => {
  const days =
    range === "7d" ? 7 : range === "30d" ? 30 : range === "90d" ? 90 : 60;
  const data: DeviceSalesData[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      mobile: 2000 + Math.random() * 8000 + Math.sin(i / 7) * 3000,
      desktop: 1500 + Math.random() * 7000 + Math.cos(i / 7) * 2500,
      tablet: 500 + Math.random() * 3000 + Math.sin(i / 9) * 1000,
    });
  }
  return data;
};

// Download utility
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const downloadCSV = (data: any[], filename: string) => {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map((row) => headers.map((header) => row[header]).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
