export const WW_MAX_DAGLOON_2026 = 304.25;
const AVERAGE_WORKDAYS_PER_MONTH = 261 / 12;

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

export type VacationDaysInput = {
  weeklyHours: number;
  workDaysPerWeek: number;
  accrualMonths: number;
  extraDays: number;
  takenDays: number;
};

export type VacationDaysResult = {
  hoursPerDay: number;
  statutoryHoursPerYear: number;
  accruedStatutoryHours: number;
  accruedStatutoryDays: number;
  extraHours: number;
  totalAvailableHours: number;
  totalAvailableDays: number;
  usedHours: number;
  remainingHours: number;
  remainingDays: number;
  remainingWeeks: number;
  status: "healthy" | "low" | "negative";
};

export function calculateVacationDays(input: VacationDaysInput): VacationDaysResult {
  const hoursPerDay = input.weeklyHours / input.workDaysPerWeek;
  const statutoryHoursPerYear = input.weeklyHours * 4;
  const accruedStatutoryHours = statutoryHoursPerYear * (input.accrualMonths / 12);
  const accruedStatutoryDays = accruedStatutoryHours / hoursPerDay;
  const extraHours = input.extraDays * hoursPerDay;
  const totalAvailableHours = accruedStatutoryHours + extraHours;
  const totalAvailableDays = totalAvailableHours / hoursPerDay;
  const usedHours = input.takenDays * hoursPerDay;
  const remainingHours = totalAvailableHours - usedHours;
  const remainingDays = remainingHours / hoursPerDay;
  const remainingWeeks = remainingHours / input.weeklyHours;

  let status: VacationDaysResult["status"] = "healthy";

  if (remainingHours < 0) {
    status = "negative";
  } else if (remainingHours < input.weeklyHours) {
    status = "low";
  }

  return {
    hoursPerDay: round2(hoursPerDay),
    statutoryHoursPerYear: round2(statutoryHoursPerYear),
    accruedStatutoryHours: round2(accruedStatutoryHours),
    accruedStatutoryDays: round2(accruedStatutoryDays),
    extraHours: round2(extraHours),
    totalAvailableHours: round2(totalAvailableHours),
    totalAvailableDays: round2(totalAvailableDays),
    usedHours: round2(usedHours),
    remainingHours: round2(remainingHours),
    remainingDays: round2(remainingDays),
    remainingWeeks: round2(remainingWeeks),
    status,
  };
}

export type ParttimeSalaryMode = "monthly" | "annual";

export type ParttimeSalaryInput = {
  mode: ParttimeSalaryMode;
  fullTimeSalary: number;
  fullTimeHours: number;
  targetHours: number;
  holidayPercentage: number;
};

export type ParttimeSalaryScenario = {
  hours: number;
  ratio: number;
  monthlyGross: number;
  annualGross: number;
};

export type ParttimeSalaryResult = {
  fullTimeMonthlyGross: number;
  fullTimeAnnualGross: number;
  targetMonthlyGross: number;
  targetAnnualGross: number;
  targetHolidayAllowance: number;
  targetFtePercentage: number;
  hourlyGross: number;
  monthlyDifference: number;
  annualDifference: number;
  scenarios: ParttimeSalaryScenario[];
};

const DEFAULT_PARTTIME_SCENARIOS = [24, 28, 32, 36];

export function calculateParttimeSalary(input: ParttimeSalaryInput): ParttimeSalaryResult {
  const fullTimeAnnualGross = input.mode === "monthly" ? input.fullTimeSalary * 12 : input.fullTimeSalary;
  const fullTimeMonthlyGross = fullTimeAnnualGross / 12;
  const ratio = input.targetHours / input.fullTimeHours;
  const targetAnnualGross = fullTimeAnnualGross * ratio;
  const targetMonthlyGross = targetAnnualGross / 12;
  const targetHolidayAllowance = targetAnnualGross * (input.holidayPercentage / 100);
  const hourlyGross = fullTimeAnnualGross / (input.fullTimeHours * 52);

  const scenarioHours = Array.from(new Set(
    [...DEFAULT_PARTTIME_SCENARIOS, input.targetHours]
      .filter((hours) => hours > 0 && hours <= input.fullTimeHours)
      .map((hours) => round2(hours)),
  )).sort((left, right) => left - right);

  return {
    fullTimeMonthlyGross: round2(fullTimeMonthlyGross),
    fullTimeAnnualGross: round2(fullTimeAnnualGross),
    targetMonthlyGross: round2(targetMonthlyGross),
    targetAnnualGross: round2(targetAnnualGross),
    targetHolidayAllowance: round2(targetHolidayAllowance),
    targetFtePercentage: round2(ratio * 100),
    hourlyGross: round2(hourlyGross),
    monthlyDifference: round2(fullTimeMonthlyGross - targetMonthlyGross),
    annualDifference: round2(fullTimeAnnualGross - targetAnnualGross),
    scenarios: scenarioHours.map((hours) => {
      const scenarioRatio = hours / input.fullTimeHours;
      const annualGross = fullTimeAnnualGross * scenarioRatio;

      return {
        hours,
        ratio: round2(scenarioRatio * 100),
        monthlyGross: round2(annualGross / 12),
        annualGross: round2(annualGross),
      };
    }),
  };
}

export type WwDagloonResult = {
  mode: "quick" | "advanced";
  referenceIncome: number;
  dayCount: number;
  rawDagloon: number;
  dagloon: number;
  maxDagloon: number;
  capped: boolean;
  capReduction: number;
  dailyBenefitFirstTwoMonths: number;
  dailyBenefitAfterTwoMonths: number;
  monthlyBenefitFirstTwoMonths: number;
  monthlyBenefitAfterTwoMonths: number;
};

function buildWwDagloonResult(
  mode: "quick" | "advanced",
  referenceIncome: number,
  dayCount: number,
): WwDagloonResult {
  const rawDagloon = referenceIncome / dayCount;
  const dagloon = Math.min(rawDagloon, WW_MAX_DAGLOON_2026);
  const dailyBenefitFirstTwoMonths = dagloon * 0.75;
  const dailyBenefitAfterTwoMonths = dagloon * 0.7;

  return {
    mode,
    referenceIncome: round2(referenceIncome),
    dayCount: round2(dayCount),
    rawDagloon: round2(rawDagloon),
    dagloon: round2(dagloon),
    maxDagloon: WW_MAX_DAGLOON_2026,
    capped: rawDagloon > WW_MAX_DAGLOON_2026,
    capReduction: round2(Math.max(0, rawDagloon - WW_MAX_DAGLOON_2026)),
    dailyBenefitFirstTwoMonths: round2(dailyBenefitFirstTwoMonths),
    dailyBenefitAfterTwoMonths: round2(dailyBenefitAfterTwoMonths),
    monthlyBenefitFirstTwoMonths: round2(dailyBenefitFirstTwoMonths * AVERAGE_WORKDAYS_PER_MONTH),
    monthlyBenefitAfterTwoMonths: round2(dailyBenefitAfterTwoMonths * AVERAGE_WORKDAYS_PER_MONTH),
  };
}

export type QuickWwDagloonInput = {
  monthlyGrossSalary: number;
  monthsWithSalary: number;
  holidayPercentage: number;
  annualReserve: number;
};

export function calculateQuickWwDagloon(input: QuickWwDagloonInput): WwDagloonResult {
  const grossReferenceIncome = input.monthlyGrossSalary * input.monthsWithSalary;
  const reservedHoliday = grossReferenceIncome * (input.holidayPercentage / 100);
  const referenceIncome = grossReferenceIncome + reservedHoliday + input.annualReserve;
  const dayCount = input.monthsWithSalary === 12
    ? 261
    : input.monthsWithSalary * AVERAGE_WORKDAYS_PER_MONTH;

  return buildWwDagloonResult("quick", referenceIncome, dayCount);
}

export type AdvancedWwDagloonInput = {
  svLoon: number;
  paidHolidayAndAvwb: number;
  reservedHolidayAndAvwb: number;
  dayCount: number;
};

export function calculateAdvancedWwDagloon(input: AdvancedWwDagloonInput): WwDagloonResult {
  const referenceIncome = Math.max(0, input.svLoon - input.paidHolidayAndAvwb + input.reservedHolidayAndAvwb);
  return buildWwDagloonResult("advanced", referenceIncome, input.dayCount);
}
