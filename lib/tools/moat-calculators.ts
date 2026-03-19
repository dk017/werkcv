export const WW_MAX_DAGLOON_2026 = 304.25;
export const THIRTY_PERCENT_GENERAL_THRESHOLD_2026 = 48013;
export const THIRTY_PERCENT_YOUNG_MASTER_THRESHOLD_2026 = 36497;
export const THIRTY_PERCENT_MAX_ALLOWANCE_2026 = 78600;
const AVERAGE_WORKDAYS_PER_MONTH = 261 / 12;

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

export type YearEndBonusInput = {
  monthlyGrossSalary: number;
  bonusPercentage: number;
  monthsWorked: number;
};

export type YearEndBonusResult = {
  annualBaseSalary: number;
  fullYearBonus: number;
  proratedBonus: number;
  decemberGrossWithBonus: number;
  bonusEquivalentMonths: number;
  monthlyBonusReserve: number;
};

export function calculateYearEndBonus(input: YearEndBonusInput): YearEndBonusResult {
  const annualBaseSalary = input.monthlyGrossSalary * 12;
  const fullYearBonus = annualBaseSalary * (input.bonusPercentage / 100);
  const proratedBonus = fullYearBonus * (input.monthsWorked / 12);

  return {
    annualBaseSalary: round2(annualBaseSalary),
    fullYearBonus: round2(fullYearBonus),
    proratedBonus: round2(proratedBonus),
    decemberGrossWithBonus: round2(input.monthlyGrossSalary + proratedBonus),
    bonusEquivalentMonths: round2(proratedBonus / input.monthlyGrossSalary),
    monthlyBonusReserve: round2(proratedBonus / Math.max(1, input.monthsWorked)),
  };
}

export type ThirtyPercentRulingInput = {
  annualTaxableSalary: number;
  monthsInScheme: number;
  under30WithMasters: boolean;
  researcherOrMedicalSpecialist: boolean;
  recruitedFromAbroad: boolean;
  livedOutside150KmZone: boolean;
  dutchPayrollEmployment: boolean;
};

export type ThirtyPercentRulingResult = {
  thresholdAnnual: number;
  proratedThresholdAnnual: number;
  meetsSalaryThreshold: boolean;
  structuralConditionsMet: boolean;
  likelyEligible: boolean;
  salaryGap: number;
  maximumUntaxedAllowanceAnnual: number;
  monthlyUntaxedAllowance: number;
  impliedTotalPackageAnnual: number;
  capApplied: boolean;
  status: "eligible" | "salary_gap" | "conditions_gap";
};

export function calculateThirtyPercentRuling(input: ThirtyPercentRulingInput): ThirtyPercentRulingResult {
  const baseThreshold = input.researcherOrMedicalSpecialist
    ? 0
    : input.under30WithMasters
      ? THIRTY_PERCENT_YOUNG_MASTER_THRESHOLD_2026
      : THIRTY_PERCENT_GENERAL_THRESHOLD_2026;
  const proratedThresholdAnnual = baseThreshold * (input.monthsInScheme / 12);
  const meetsSalaryThreshold = input.annualTaxableSalary >= proratedThresholdAnnual;
  const structuralConditionsMet =
    input.recruitedFromAbroad &&
    input.livedOutside150KmZone &&
    input.dutchPayrollEmployment;
  const rawAllowance = input.annualTaxableSalary * (30 / 70);
  const maxAllowanceCap = THIRTY_PERCENT_MAX_ALLOWANCE_2026 * (input.monthsInScheme / 12);
  const maximumUntaxedAllowanceAnnual = Math.min(rawAllowance, maxAllowanceCap);
  const likelyEligible = meetsSalaryThreshold && structuralConditionsMet;
  const status: ThirtyPercentRulingResult["status"] = !structuralConditionsMet
    ? "conditions_gap"
    : meetsSalaryThreshold
      ? "eligible"
      : "salary_gap";

  return {
    thresholdAnnual: round2(baseThreshold),
    proratedThresholdAnnual: round2(proratedThresholdAnnual),
    meetsSalaryThreshold,
    structuralConditionsMet,
    likelyEligible,
    salaryGap: round2(Math.max(0, proratedThresholdAnnual - input.annualTaxableSalary)),
    maximumUntaxedAllowanceAnnual: round2(maximumUntaxedAllowanceAnnual),
    monthlyUntaxedAllowance: round2(maximumUntaxedAllowanceAnnual / Math.max(1, input.monthsInScheme)),
    impliedTotalPackageAnnual: round2(input.annualTaxableSalary + maximumUntaxedAllowanceAnnual),
    capApplied: rawAllowance > maxAllowanceCap,
    status,
  };
}

export type LeaveHoursConversionMode = "hours_to_days" | "days_to_hours";

export type LeaveHoursConversionInput = {
  weeklyHours: number;
  workDaysPerWeek: number;
  amount: number;
  mode: LeaveHoursConversionMode;
};

export type LeaveHoursConversionResult = {
  hoursPerDay: number;
  convertedHours: number;
  convertedDays: number;
  workWeeksEquivalent: number;
};

export function calculateLeaveHoursConversion(input: LeaveHoursConversionInput): LeaveHoursConversionResult {
  const hoursPerDay = input.weeklyHours / input.workDaysPerWeek;
  const convertedHours = input.mode === "days_to_hours"
    ? input.amount * hoursPerDay
    : input.amount;
  const convertedDays = input.mode === "hours_to_days"
    ? input.amount / hoursPerDay
    : input.amount;

  return {
    hoursPerDay: round2(hoursPerDay),
    convertedHours: round2(convertedHours),
    convertedDays: round2(convertedDays),
    workWeeksEquivalent: round2(convertedHours / input.weeklyHours),
  };
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
