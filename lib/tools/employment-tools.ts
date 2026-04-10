import { addMonths } from "@/lib/tools/calculator-utils";

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function addDays(date: Date, daysToAdd: number): Date {
  const next = new Date(date.getTime());
  next.setUTCDate(next.getUTCDate() + daysToAdd);
  return next;
}

function startOfUtcDay(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

export const UWV_MAX_DAGLOON_2026 = 290.68;
export const PARTNER_GEBOORTEVERLOF_MAX_DAGLOON_2026 = 203.48;
export const ZZP_ZVW_RATE_2026 = 0.0565;
export const DUO_INTEREST_RATE_2026 = 0.0256;
export const DUO_THRESHOLD_SINGLE_2026 = 24893;
export const DUO_THRESHOLD_PARTNER_2026 = 30474;

export type PayrollLineItem = {
  id: string;
  label: string;
  explanation: string;
  calculationHint: string;
  whoPays: string;
  taxable: string;
};

export const PAYROLL_LINE_ITEMS: PayrollLineItem[] = [
  {
    id: "loon-lh",
    label: "Loon LH / Loon voor loonheffing",
    explanation:
      "Dit is je belastbare bruto loon. Het is het bedrag waarover de Belastingdienst loonheffing berekent. Het verschilt soms van je contractloon omdat bepaalde vergoedingen (bijv. onbelaste reiskostenvergoeding) hier niet bij worden opgeteld.",
    calculationHint:
      "Meestal: bruto loon minus bedragen die onbelast blijven, zoals sommige vergoedingen of aftrekbare pensioenpremie.",
    whoPays: "Werkgever verrekent, werknemer draagt",
    taxable: "Ja",
  },
  {
    id: "loonheffing",
    label: "Loonheffing",
    explanation:
      "Dit is de inkomstenbelasting die je werkgever direct inhoudt op je loon en afdraagt aan de Belastingdienst. Het tarief in 2026 is 35,82% over de eerste schijf (t/m €38.441) en 49,50% over het meerdere. De heffingskortingen worden hier al op in mindering gebracht.",
    calculationHint:
      "Je werkgever berekent loonbelasting over het loon voor loonheffing en trekt daarna heffingskortingen af als die op jou worden toegepast.",
    whoPays: "Werknemer (ingehouden door werkgever)",
    taxable: "N.v.t. — dit IS de belasting",
  },
  {
    id: "heffingskorting",
    label: "Heffingskorting / Algemene heffingskorting",
    explanation:
      "Dit is een belastingkorting waarop iedere belastingplichtige recht heeft. In 2026 is het maximum €3.068 (afgebouwd bij hogere inkomens). Je werkgever past dit toe als je het hebt aangevraagd via je loonbelastingverklaring. Heb je meerdere werkgevers? Vraag de korting dan maar bij één aan.",
    calculationHint:
      "De algemene heffingskorting verlaagt de berekende loonheffing tot een maximum en wordt afgebouwd bij hogere inkomens.",
    whoPays: "Belastingdienst geeft korting via werkgever",
    taxable: "Nee — het verlaagt je belasting",
  },
  {
    id: "arbeidskorting",
    label: "Arbeidskorting",
    explanation:
      "Een extra belastingkorting voor mensen die werken (in loondienst of als ondernemer). Hoe hoger je inkomen, hoe hoger de korting — tot een maximum en daarna afbouwend. In 2026 is het maximum €5.158. Dit staat los van de algemene heffingskorting.",
    calculationHint:
      "De arbeidskorting groeit mee met inkomen tot een maximum en loopt daarna weer af. Je werkgever verwerkt dit automatisch in de loonheffing.",
    whoPays: "Via werkgever verrekend",
    taxable: "Nee — het verlaagt je belasting",
  },
  {
    id: "ww-premie",
    label: "WW-premie (werknemerspremie)",
    explanation:
      "De premie voor de Werkloosheidswet (WW). Werknemers met een vast contract betalen in 2026 een lage WW-premie van 2,74%. Werknemers met een tijdelijk, oproep- of nul-urencontract betalen de hoge premie van 7,74%. Je werkgever betaalt ook een WW-premie, maar die staat niet op je loonstrook.",
    calculationHint:
      "Dit is meestal een percentage van je premieplichtige loon. Welk percentage geldt, hangt af van je contracttype.",
    whoPays: "Werknemer (ingehouden door werkgever)",
    taxable: "Nee — premie is niet belast",
  },
  {
    id: "wia-premie",
    label: "WAO/WIA-premie / Arbeidsongeschiktheidspremie",
    explanation:
      "Premie voor de Wet werk en inkomen naar arbeidsvermogen (WIA). Beschermt je bij langdurige arbeidsongeschiktheid na 2 jaar ziekte. De premie wordt deels door werkgever betaald, deels door werknemer. Het werknemersdeel staat op de loonstrook.",
    calculationHint:
      "De premie volgt uit de arbeidsongeschiktheidsregeling van je werkgever of fonds. Alleen jouw eigen deel is zichtbaar op de loonstrook.",
    whoPays: "Werknemer (werkgeversaandeel niet zichtbaar op loonstrook)",
    taxable: "Nee",
  },
  {
    id: "pensioenpremie",
    label: "Pensioenpremie",
    explanation:
      "Het deel van de pensioenpremie dat jij als werknemer bijdraagt aan je pensioenregeling. De hoogte hangt af van je pensioenfonds of verzekeraar en de afspraken in je cao. Het werkgeversaandeel staat meestal niet op je loonstrook. Pensioenpremie is aftrekbaar — je betaalt er geen loonheffing over.",
    calculationHint:
      "Je pensioenfonds of werkgever rekent een werknemersbijdrage uit op basis van pensioengrondslag, franchise en premieafspraken.",
    whoPays: "Werknemer (werkgeversaandeel apart)",
    taxable: "Nee — aftrekbaar van belastbaar loon",
  },
  {
    id: "vakantiegeld",
    label: "Vakantiegeld (opbouw)",
    explanation:
      "Elke maand bouw je vakantiegeld op: minimaal 8% van je bruto maandloon. Op de loonstrook staat hoeveel er die maand wordt opgebouwd. Uitbetaling vindt doorgaans plaats in mei/juni, tenzij je cao anders bepaalt. Vakantiegeld is gewoon belast als loon.",
    calculationHint:
      "Vaak wordt elke maand ongeveer 8% van je bruto loon gereserveerd. Die opbouw wordt later in een keer uitbetaald.",
    whoPays: "Werkgever reserveert, uitbetaald aan werknemer",
    taxable: "Ja — belast als normaal loon",
  },
  {
    id: "netto-loon",
    label: "Netto loon",
    explanation:
      "Het bedrag dat na alle inhoudingen en toeslagen op je bankrekening wordt gestort. Berekening: bruto loon − loonheffing − werknemerspremies − eigen pensioenpremie + onbelaste vergoedingen.",
    calculationHint:
      "Je nettoloon is de eindsom na alle inhoudingen en eventuele netto vergoedingen op dezelfde loonstrook.",
    whoPays: "N.v.t.",
    taxable: "N.v.t.",
  },
  {
    id: "reiskostenvergoeding",
    label: "Reiskostenvergoeding (onbelast)",
    explanation:
      "De onbelaste woon-werkvergoeding. In 2026 mag je werkgever maximaal €0,23 per kilometer belastingvrij vergoeden. Dit bedrag telt niet mee voor de loonheffing en staat vaak als aparte positieve regel op de loonstrook.",
    calculationHint:
      "Meestal: aantal woon-werkkilometers maal het afgesproken tarief, tot maximaal €0,23 per kilometer onbelast.",
    whoPays: "Werkgever betaalt, niet belast",
    taxable: "Nee — tot €0,23/km",
  },
  {
    id: "thuiswerkvergoeding",
    label: "Thuiswerkvergoeding (onbelast)",
    explanation:
      "Belastingvrije vergoeding voor thuiswerken. In 2026 is het maximum €2,35 per thuiswerkdag. Vergoedt je werkgever meer, dan is het meerdere belast als loon.",
    calculationHint:
      "Meestal: aantal thuiswerkdagen maal het afgesproken bedrag, belastingvrij tot het wettelijke maximum van €2,35 per dag.",
    whoPays: "Werkgever betaalt, niet belast tot max",
    taxable: "Nee — tot €2,35/dag",
  },
  {
    id: "eindejaarsuitkering",
    label: "Eindejaarsuitkering / 13e maand (opbouw)",
    explanation:
      "Als je cao of contract een eindejaarsuitkering kent, wordt die vaak maandelijks opgebouwd en aan het eind van het jaar uitbetaald. Op de loonstrook zie je de maandelijkse opbouw. De uitkering is gewoon belast als loon.",
    calculationHint:
      "Werkgevers reserveren vaak maandelijks een percentage van je loon of een deel van een vaste 13e maand.",
    whoPays: "Werkgever reserveert",
    taxable: "Ja",
  },
  {
    id: "loonbeslag",
    label: "Loonbeslag / Beslaglegging",
    explanation:
      "Als er juridisch beslag is gelegd op je loon (bijv. door schuldeisers of deurwaarders), wordt een deel van je nettoloon ingehouden en afgedragen. Er geldt altijd een beslagvrije voet — een minimumbedrag dat je zelf houdt.",
    calculationHint:
      "De deurwaarder of beslaglegger bepaalt hoeveel van je nettoloon mag worden ingehouden, met respect voor de beslagvrije voet.",
    whoPays: "Ingehouden door werkgever, afgedragen aan derde",
    taxable: "N.v.t.",
  },
  {
    id: "ziekengeld",
    label: "Ziekengeld / Loondoorbetaling bij ziekte",
    explanation:
      "Als je ziek bent, betaalt je werkgever minimaal 70% van je loon door (in jaar 1 vaak 100% afhankelijk van cao). Dit staat als apart loonelement op je loonstrook als je loon afwijkt van je normale salaris.",
    calculationHint:
      "Werkgevers rekenen dit meestal als een percentage van je normale loon. In veel cao's is jaar 1 hoger dan het wettelijke minimum van 70%.",
    whoPays: "Werkgever (UWV vergoedt na 2 jaar)",
    taxable: "Ja",
  },
];

export const DEFAULT_PAYROLL_LINE_ITEM_IDS = [
  "loon-lh",
  "loonheffing",
  "heffingskorting",
  "netto-loon",
];

export type ZzpTaxProfile = "starter" | "established";

export type ZzpTariffInput = {
  desiredNetMonthlyIncome: number;
  workableDaysPerYear: number;
  declarabilityPercentage: number;
  monthlyOverhead: number;
  monthlyPensionBuffer: number;
  taxProfile: ZzpTaxProfile;
};

export type ZzpTariffResult = {
  netAnnualIncome: number;
  selectedTaxRate: number;
  requiredGrossAnnualIncome: number;
  estimatedAnnualTax: number;
  annualOverhead: number;
  annualPensionBuffer: number;
  zvwPremium: number;
  totalAnnualCosts: number;
  declarableDays: number;
  requiredAnnualRevenue: number;
  minimumDayRate: number;
  minimumHourlyRate: number;
  effectiveCombinedBurdenRate: number;
};

function getZzpEffectiveTaxRate(netAnnualIncome: number, taxProfile: ZzpTaxProfile): number {
  if (taxProfile === "starter") {
    if (netAnnualIncome < 25000) return 0.28;
    if (netAnnualIncome <= 40000) return 0.34;
    return 0.42;
  }

  if (netAnnualIncome < 25000) return 0.32;
  if (netAnnualIncome <= 40000) return 0.38;
  return 0.46;
}

export function calculateZzpTariff(input: ZzpTariffInput): ZzpTariffResult {
  const netAnnualIncome = input.desiredNetMonthlyIncome * 12;
  const selectedTaxRate = getZzpEffectiveTaxRate(netAnnualIncome, input.taxProfile);
  const requiredGrossAnnualIncome = netAnnualIncome / (1 - selectedTaxRate);
  const estimatedAnnualTax = requiredGrossAnnualIncome - netAnnualIncome;
  const annualOverhead = input.monthlyOverhead * 12;
  const annualPensionBuffer = input.monthlyPensionBuffer * 12;
  const zvwPremium = requiredGrossAnnualIncome * ZZP_ZVW_RATE_2026;
  const totalAnnualCosts =
    requiredGrossAnnualIncome + annualOverhead + annualPensionBuffer + zvwPremium;
  const declarableDays = input.workableDaysPerYear * (input.declarabilityPercentage / 100);
  const requiredAnnualRevenue = totalAnnualCosts;
  const minimumDayRate = requiredAnnualRevenue / declarableDays;
  const minimumHourlyRate = minimumDayRate / 8;
  const effectiveCombinedBurdenRate =
    ((estimatedAnnualTax + zvwPremium) / requiredGrossAnnualIncome) * 100;

  return {
    netAnnualIncome: round2(netAnnualIncome),
    selectedTaxRate: round2(selectedTaxRate * 100),
    requiredGrossAnnualIncome: round2(requiredGrossAnnualIncome),
    estimatedAnnualTax: round2(estimatedAnnualTax),
    annualOverhead: round2(annualOverhead),
    annualPensionBuffer: round2(annualPensionBuffer),
    zvwPremium: round2(zvwPremium),
    totalAnnualCosts: round2(totalAnnualCosts),
    declarableDays: round2(declarableDays),
    requiredAnnualRevenue: round2(requiredAnnualRevenue),
    minimumDayRate: round2(minimumDayRate),
    minimumHourlyRate: round2(minimumHourlyRate),
    effectiveCombinedBurdenRate: round2(effectiveCombinedBurdenRate),
  };
}

export type PregnancyLeaveInput = {
  dueDate: Date;
  weeksBeforeDue: 4 | 5 | 6;
  monthlyGrossSalary: number;
};

export type PregnancyLeaveResult = {
  leaveStartDate: Date;
  minimumLeaveEndDate: Date;
  rawDayWage: number;
  cappedDayWage: number;
  monthlyBenefitEstimate: number;
  totalBenefit16Weeks: number;
  weeklyBenefit: number;
  shortfallPerMonth: number;
  rawAboveCapPerDay: number;
  capped: boolean;
};

export function calculatePregnancyLeave(
  input: PregnancyLeaveInput,
): PregnancyLeaveResult {
  const leaveStartDate = addDays(input.dueDate, -(input.weeksBeforeDue * 7));
  const minimumLeaveEndDate = addDays(leaveStartDate, 16 * 7);
  const rawDayWage = (input.monthlyGrossSalary * 3) / 65;
  const cappedDayWage = Math.min(rawDayWage, UWV_MAX_DAGLOON_2026);
  const weeklyBenefit = cappedDayWage * 5;
  const totalBenefit16Weeks = weeklyBenefit * 16;
  const monthlyBenefitEstimate = cappedDayWage * 21.75;
  const rawAboveCapPerDay = Math.max(0, rawDayWage - UWV_MAX_DAGLOON_2026);
  const shortfallPerMonth = rawAboveCapPerDay * 21.75;

  return {
    leaveStartDate,
    minimumLeaveEndDate,
    rawDayWage: round2(rawDayWage),
    cappedDayWage: round2(cappedDayWage),
    monthlyBenefitEstimate: round2(monthlyBenefitEstimate),
    totalBenefit16Weeks: round2(totalBenefit16Weeks),
    weeklyBenefit: round2(weeklyBenefit),
    shortfallPerMonth: round2(shortfallPerMonth),
    rawAboveCapPerDay: round2(rawAboveCapPerDay),
    capped: rawDayWage > UWV_MAX_DAGLOON_2026,
  };
}

export type PartnerLeaveInput = {
  birthDate: Date;
  monthlyGrossSalary: number;
};

export type PartnerLeaveResult = {
  rawDayWage: number;
  cappedDayWage: number;
  kraamverlofValue: number;
  aanvullendDailyBenefit: number;
  aanvullendFiveWeeksBenefit: number;
  uitersteAanvullendDate: Date;
  totalPartnerBenefit: number;
};

export function calculatePartnerLeave(input: PartnerLeaveInput): PartnerLeaveResult {
  const rawDayWage = (input.monthlyGrossSalary * 3) / 65;
  const cappedDayWage = Math.min(rawDayWage, UWV_MAX_DAGLOON_2026);
  const aanvullendDailyBenefit = Math.min(cappedDayWage * 0.7, PARTNER_GEBOORTEVERLOF_MAX_DAGLOON_2026);
  const aanvullendFiveWeeksBenefit = aanvullendDailyBenefit * 25;
  const kraamverlofValue = cappedDayWage * 5;
  const uitersteAanvullendDate = addDays(input.birthDate, 26 * 7);

  return {
    rawDayWage: round2(rawDayWage),
    cappedDayWage: round2(cappedDayWage),
    kraamverlofValue: round2(kraamverlofValue),
    aanvullendDailyBenefit: round2(aanvullendDailyBenefit),
    aanvullendFiveWeeksBenefit: round2(aanvullendFiveWeeksBenefit),
    uitersteAanvullendDate,
    totalPartnerBenefit: round2(kraamverlofValue + aanvullendFiveWeeksBenefit),
  };
}

export type AowAgeLookup = {
  years: number;
  months: number;
  note: string | null;
};

export function lookupAowAge(birthYear: number): AowAgeLookup {
  if (birthYear <= 1947) return { years: 65, months: 0, note: null };
  if (birthYear === 1948) return { years: 65, months: 3, note: null };
  if (birthYear === 1949) return { years: 65, months: 6, note: null };
  if (birthYear === 1950) return { years: 65, months: 9, note: null };
  if (birthYear === 1951) return { years: 66, months: 0, note: null };
  if (birthYear === 1952) return { years: 66, months: 3, note: null };
  if (birthYear === 1953) return { years: 66, months: 6, note: null };
  if (birthYear === 1954) return { years: 66, months: 9, note: null };
  if (birthYear === 1955) return { years: 66, months: 10, note: null };
  if (birthYear === 1956) return { years: 66, months: 10, note: null };
  if (birthYear === 1957) return { years: 67, months: 0, note: null };

  return {
    years: 67,
    months: 0,
    note:
      "Voor mensen geboren na 1957 is de AOW-leeftijd momenteel 67 jaar. De overheid kan dit verhogen als de levensverwachting stijgt. Per 2026 is er geen verhoging vastgesteld voor de komende jaren.",
  };
}

export type AowResult = {
  ageYears: number;
  ageMonths: number;
  aowDate: Date;
  reached: boolean;
  remainingYears: number;
  remainingMonths: number;
  note: string | null;
};

export function calculateAowDate(birthDate: Date, ageYears: number, ageMonths: number): Date {
  return addMonths(
    new Date(Date.UTC(birthDate.getUTCFullYear(), birthDate.getUTCMonth(), birthDate.getUTCDate())),
    ageYears * 12 + ageMonths,
  );
}

export function calculateAowResult(birthDate: Date, today = new Date()): AowResult {
  const lookup = lookupAowAge(birthDate.getUTCFullYear());
  const aowDate = calculateAowDate(birthDate, lookup.years, lookup.months);
  const todayUtc = startOfUtcDay(today);
  const reached = aowDate.getTime() <= todayUtc.getTime();
  const diffDays = reached ? 0 : Math.floor((aowDate.getTime() - todayUtc.getTime()) / 86400000);
  const remainingYears = Math.floor(diffDays / 365.25);
  const remainingMonths = Math.max(
    0,
    Math.floor((diffDays - remainingYears * 365.25) / 30.44),
  );

  return {
    ageYears: lookup.years,
    ageMonths: lookup.months,
    aowDate,
    reached,
    remainingYears,
    remainingMonths,
    note: lookup.note,
  };
}

export type EarlyRetirementResult = {
  gapYears: number;
  gapMonths: number;
  monthlyNetEstimate: number;
  totalBridgeCapital: number;
};

export function calculateEarlyRetirementBridge(
  aowAgeYears: number,
  aowAgeMonths: number,
  stopAge: number,
  grossMonthlyIncome: number,
): EarlyRetirementResult | null {
  const aowAgeTotalMonths = aowAgeYears * 12 + aowAgeMonths;
  const stopAgeTotalMonths = Math.round(stopAge * 12);
  const gapMonthsTotal = aowAgeTotalMonths - stopAgeTotalMonths;

  if (gapMonthsTotal <= 0) {
    return null;
  }

  const monthlyNetEstimate = grossMonthlyIncome * 0.72;

  return {
    gapYears: Math.floor(gapMonthsTotal / 12),
    gapMonths: gapMonthsTotal % 12,
    monthlyNetEstimate: round2(monthlyNetEstimate),
    totalBridgeCapital: round2(monthlyNetEstimate * gapMonthsTotal),
  };
}

export type DuoSystem = "old" | "new";
export type DuoLivingSituation = "single" | "partner";

export type DuoRepaymentInput = {
  system: DuoSystem;
  outstandingDebt: number;
  annualIncome: number;
  livingSituation: DuoLivingSituation;
  extraMonthlyRepayment: number;
};

export type DuoRepaymentResult = {
  thresholdIncome: number;
  repaymentTermYears: number;
  annualIncome: number;
  incomeAboveThreshold: number;
  requiredAnnualRepayment: number;
  requiredMonthlyRepayment: number;
  extraMonthlyRepayment: number;
  totalMonthlyRepayment: number;
  totalAnnualRepayment: number;
  simplePayoffYears: number;
  remainingDebtAfterTerm: number;
  underThreshold: boolean;
  finishesWithinTerm: boolean;
};

export function calculateDuoRepayment(input: DuoRepaymentInput): DuoRepaymentResult {
  const thresholdIncome =
    input.livingSituation === "partner" ? DUO_THRESHOLD_PARTNER_2026 : DUO_THRESHOLD_SINGLE_2026;
  const repaymentTermYears = input.system === "old" ? 15 : 35;
  const incomeAboveThreshold = Math.max(0, input.annualIncome - thresholdIncome);
  const requiredAnnualRepayment = input.annualIncome <= thresholdIncome ? 0 : incomeAboveThreshold * 0.04;
  const requiredMonthlyRepayment = requiredAnnualRepayment / 12;
  const totalMonthlyRepayment = requiredMonthlyRepayment + input.extraMonthlyRepayment;
  const totalAnnualRepayment = totalMonthlyRepayment * 12;
  const simplePayoffYears =
    totalAnnualRepayment > 0 ? input.outstandingDebt / totalAnnualRepayment : repaymentTermYears;
  const remainingDebtAfterTerm =
    simplePayoffYears >= repaymentTermYears
      ? Math.max(0, input.outstandingDebt - (totalAnnualRepayment * repaymentTermYears))
      : 0;

  return {
    thresholdIncome,
    repaymentTermYears,
    annualIncome: round2(input.annualIncome),
    incomeAboveThreshold: round2(incomeAboveThreshold),
    requiredAnnualRepayment: round2(requiredAnnualRepayment),
    requiredMonthlyRepayment: round2(requiredMonthlyRepayment),
    extraMonthlyRepayment: round2(input.extraMonthlyRepayment),
    totalMonthlyRepayment: round2(totalMonthlyRepayment),
    totalAnnualRepayment: round2(totalAnnualRepayment),
    simplePayoffYears: round2(simplePayoffYears),
    remainingDebtAfterTerm: round2(remainingDebtAfterTerm),
    underThreshold: incomeAboveThreshold <= 0,
    finishesWithinTerm:
      totalAnnualRepayment > 0 && simplePayoffYears <= repaymentTermYears,
  };
}
