// Types
export type DateRange = "7d" | "30d" | "90d" | "all";

export interface Employee {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  Age: number;
  Department: string;
  Education: number;
  EnvironmentSatisfaction: number;
  Gender: string;
  JobInvolvement: number;
  JobLevel: number;
  JobRole: string;
  JobSatisfaction: number;
  MaritalStatus: string;
  MonthlyIncome: number;
  OverTime: string;
  PercentSalaryHike: number;
  PerformanceRating: number;
  WorkLifeBalance: number;
  YearsAtCompany: number;
  YearsSinceLastPromotion: number;
  attrition: string;
  leavingMonth: string;
  attritionProbability: number;
  attritionRiskLevel: string;
}

export interface GenderAttritionData {
  gender: string;
  attrition: number;
  total: number;
  fill: string;
}

export interface AgeGroupAttritionData {
  ageGroup: string;
  attrition: number;
  total: number;
}

export interface JobLevelAttritionData {
  jobLevel: string;
  attrition: number;
  total: number;
  fill: string;
}

export interface JobRoleAttritionData {
  jobRole: string;
  attrition: number;
  total: number;
}

export interface AttritionOverTimeData {
  date: string;
  attrition: number;
  total: number;
}

export interface DepartmentAttritionData {
  date: string;
  sales: number;
  rd: number;
  hr: number;
}

export interface RiskLevelData {
  riskLevel: string;
  count: number;
  fill: string;
}

export interface WorkLifeBalanceData {
  date: string;
  poor: number;
  average: number;
  good: number;
  excellent: number;
}

// Data generators
export const generateGenderAttritionData = (
  range: DateRange,
  ageGroup: string = "all"
): GenderAttritionData[] => {
  const baseMultiplier =
    range === "7d" ? 0.2 : range === "30d" ? 0.6 : range === "90d" ? 1 : 1.2;

  // Age group multipliers
  const ageMultipliers: Record<string, number> = {
    all: 1,
    "18-25": 0.4,
    "26-35": 0.5,
    "36-45": 0.3,
    "46-55": 0.15,
    "56+": 0.1,
  };

  const ageMult = ageMultipliers[ageGroup] || 1;

  return [
    {
      gender: "Male",
      attrition: Math.round(45 * baseMultiplier * ageMult),
      total: Math.round(380 * baseMultiplier * ageMult),
      fill: "hsl(195, 100%, 50%)",
    },
    {
      gender: "Female",
      attrition: Math.round(35 * baseMultiplier * ageMult),
      total: Math.round(320 * baseMultiplier * ageMult),
      fill: "hsl(280, 100%, 70%)",
    },
  ];
};

export const generateAgeGroupAttritionData = (
  range: DateRange,
  department: string = "all"
): AgeGroupAttritionData[] => {
  const baseMultiplier =
    range === "7d" ? 0.2 : range === "30d" ? 0.6 : range === "90d" ? 1 : 1.2;

  // Department multipliers
  const deptMultipliers: Record<string, number> = {
    all: 1,
    sales: 0.5,
    rd: 0.35,
    hr: 0.15,
  };

  const deptMult = deptMultipliers[department] || 1;

  return [
    {
      ageGroup: "18-25",
      attrition: Math.round(25 * baseMultiplier * deptMult),
      total: Math.round(120 * baseMultiplier * deptMult),
    },
    {
      ageGroup: "26-35",
      attrition: Math.round(35 * baseMultiplier * deptMult),
      total: Math.round(280 * baseMultiplier * deptMult),
    },
    {
      ageGroup: "36-45",
      attrition: Math.round(15 * baseMultiplier * deptMult),
      total: Math.round(180 * baseMultiplier * deptMult),
    },
    {
      ageGroup: "46-55",
      attrition: Math.round(8 * baseMultiplier * deptMult),
      total: Math.round(90 * baseMultiplier * deptMult),
    },
    {
      ageGroup: "56+",
      attrition: Math.round(5 * baseMultiplier * deptMult),
      total: Math.round(30 * baseMultiplier * deptMult),
    },
  ];
};

export const generateJobLevelAttritionData = (
  range: DateRange,
  jobRole: string = "all"
): JobLevelAttritionData[] => {
  const baseMultiplier =
    range === "7d" ? 0.3 : range === "30d" ? 0.7 : range === "90d" ? 1 : 1.3;

  // Job role multipliers
  const roleMultipliers: Record<string, number> = {
    all: 1,
    sales: 0.5,
    research: 0.3,
    technician: 0.4,
    manager: 0.2,
  };

  const roleMult = roleMultipliers[jobRole] || 1;

  return [
    {
      jobLevel: "Entry Level",
      attrition: Math.round(35 * baseMultiplier * roleMult),
      total: Math.round(250 * baseMultiplier * roleMult),
      fill: "hsl(195, 100%, 50%)",
    },
    {
      jobLevel: "Mid Level",
      attrition: Math.round(25 * baseMultiplier * roleMult),
      total: Math.round(280 * baseMultiplier * roleMult),
      fill: "hsl(250, 100%, 60%)",
    },
    {
      jobLevel: "Senior Level",
      attrition: Math.round(15 * baseMultiplier * roleMult),
      total: Math.round(120 * baseMultiplier * roleMult),
      fill: "hsl(280, 100%, 70%)",
    },
    {
      jobLevel: "Executive",
      attrition: Math.round(5 * baseMultiplier * roleMult),
      total: Math.round(50 * baseMultiplier * roleMult),
      fill: "hsl(330, 100%, 70%)",
    },
  ];
};

export const generateJobRoleAttritionData = (
  range: DateRange,
  gender: string = "all"
): JobRoleAttritionData[] => {
  const baseMultiplier =
    range === "7d" ? 0.25 : range === "30d" ? 0.65 : range === "90d" ? 1 : 1.25;

  // Gender multipliers
  const genderMultipliers: Record<string, number> = {
    all: 1,
    male: 0.6,
    female: 0.4,
  };

  const genderMult = genderMultipliers[gender] || 1;
  return [
    {
      jobRole: "Sales Executive",
      attrition: Math.round(35 * baseMultiplier * genderMult),
      total: Math.round(180 * baseMultiplier * genderMult),
    },
    {
      jobRole: "Research Scientist",
      attrition: Math.round(18 * baseMultiplier * genderMult),
      total: Math.round(120 * baseMultiplier * genderMult),
    },
    {
      jobRole: "Laboratory Technician",
      attrition: Math.round(25 * baseMultiplier * genderMult),
      total: Math.round(150 * baseMultiplier * genderMult),
    },
    {
      jobRole: "Manufacturing Director",
      attrition: Math.round(8 * baseMultiplier * genderMult),
      total: Math.round(80 * baseMultiplier * genderMult),
    },
    {
      jobRole: "Healthcare Representative",
      attrition: Math.round(12 * baseMultiplier * genderMult),
      total: Math.round(90 * baseMultiplier * genderMult),
    },
    {
      jobRole: "Manager",
      attrition: Math.round(10 * baseMultiplier * genderMult),
      total: Math.round(85 * baseMultiplier * genderMult),
    },
    {
      jobRole: "Research Director",
      attrition: Math.round(5 * baseMultiplier * genderMult),
      total: Math.round(45 * baseMultiplier * genderMult),
    },
    {
      jobRole: "HR",
      attrition: Math.round(7 * baseMultiplier * genderMult),
      total: Math.round(50 * baseMultiplier * genderMult),
    },
  ];
};

export const generateAttritionOverTimeData = (
  range: DateRange,
  department: string = "all"
): AttritionOverTimeData[] => {
  const days =
    range === "7d" ? 7 : range === "30d" ? 30 : range === "90d" ? 90 : 60;

  // Department multipliers
  const deptMultipliers: Record<string, number> = {
    all: 1,
    sales: 0.6,
    rd: 0.3,
    hr: 0.1,
  };

  const deptMult = deptMultipliers[department] || 1;

  const data: AttritionOverTimeData[] = [];
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
      attrition: Math.round(
        (2 + Math.random() * 8 + Math.sin(i / 7) * 3) * deptMult
      ),
      total: 700,
    });
  }
  return data;
};

export const generateDepartmentAttritionData = (
  range: DateRange,
  jobLevel: string = "all"
): DepartmentAttritionData[] => {
  const points =
    range === "7d" ? 5 : range === "30d" ? 8 : range === "90d" ? 12 : 6;

  // Job level multipliers
  const levelMultipliers: Record<string, number> = {
    all: 1,
    entry: 0.6,
    mid: 0.5,
    senior: 0.3,
    executive: 0.1,
  };

  const levelMult = levelMultipliers[jobLevel] || 1;

  const data: DepartmentAttritionData[] = [];

  for (let i = 0; i < points; i++) {
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - (points - i) * 5);
    data.push({
      date: baseDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      sales: Math.round((5 + Math.random() * 10) * levelMult),
      rd: Math.round((3 + Math.random() * 8) * levelMult),
      hr: Math.round((1 + Math.random() * 5) * levelMult),
    });
  }
  return data;
};

export const generateRiskLevelData = (
  range: DateRange,
  ageGroup: string = "all"
): RiskLevelData[] => {
  const baseMultiplier =
    range === "7d" ? 0.25 : range === "30d" ? 0.65 : range === "90d" ? 1 : 1.25;

  // Age group multipliers
  const ageMultipliers: Record<string, number> = {
    all: 1,
    "18-25": 0.5,
    "26-35": 0.6,
    "36-45": 0.35,
    "46-55": 0.2,
    "56+": 0.1,
  };

  const ageMult = ageMultipliers[ageGroup] || 1;

  return [
    {
      riskLevel: "Low Risk",
      count: Math.round(520 * baseMultiplier * ageMult),
      fill: "hsl(195, 100%, 50%)",
    },
    {
      riskLevel: "Medium Risk",
      count: Math.round(125 * baseMultiplier * ageMult),
      fill: "hsl(45, 100%, 51%)",
    },
    {
      riskLevel: "High Risk",
      count: Math.round(55 * baseMultiplier * ageMult),
      fill: "hsl(330, 100%, 70%)",
    },
  ];
};

export const generateWorkLifeBalanceData = (
  range: DateRange,
  maritalStatus: string = "all"
): WorkLifeBalanceData[] => {
  const days =
    range === "7d" ? 7 : range === "30d" ? 30 : range === "90d" ? 90 : 60;

  // Marital status multipliers
  const maritalMultipliers: Record<string, number> = {
    all: 1,
    single: 0.5,
    married: 0.4,
    divorced: 0.35,
  };

  const maritalMult = maritalMultipliers[maritalStatus] || 1;

  const data: WorkLifeBalanceData[] = [];
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
      poor: Math.round(
        (2 + Math.random() * 5 + Math.sin(i / 7) * 2) * maritalMult
      ),
      average: Math.round(
        (3 + Math.random() * 6 + Math.cos(i / 7) * 2) * maritalMult
      ),
      good: Math.round(
        (1 + Math.random() * 4 + Math.sin(i / 9) * 1.5) * maritalMult
      ),
      excellent: Math.round((0.5 + Math.random() * 2) * maritalMult),
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
