"use client";

import { useState } from "react";

type Situation =
    | "employer_ends"
    | "non_renewal"
    | "employee_due_to_employer"
    | "employee_resigns"
    | "serious_fault_employee"
    | "equal_contract_refused"
    | "bankruptcy"
    | "retirement";

type SituationMeta = {
    label: string;
    eligible: boolean;
    title: string;
    reason: string;
    tips: string[];
};

type ServiceBreakdown = {
    years: number;
    months: number;
    days: number;
    totalMonths: number;
};

type Result = {
    eligible: boolean;
    title: string;
    reason: string;
    amount: number;
    uncappedAmount: number;
    cap: number;
    capApplied: boolean;
    transitieMaandloon: number;
    baseMonthlySalary: number;
    vacationAllowanceAmount: number;
    annualBonusMonthly: number;
    monthlyVariablePay: number;
    service: ServiceBreakdown;
    nextSteps: string[];
};

const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

const situationMeta: Record<Situation, SituationMeta> = {
    employer_ends: {
        label: "Werkgever beeindigt contract",
        eligible: true,
        title: "Waarschijnlijk recht op transitievergoeding",
        reason: "Als het initiatief om het contract te beeindigen bij de werkgever ligt, heb je in de meeste gevallen recht op transitievergoeding.",
        tips: [
            "Controleer je einddatum en looncomponenten met je laatste loonstrook.",
            "Vraag je werkgever om een schriftelijke berekening als het dienstverband eindigt.",
            "Claim op tijd als de vergoeding niet wordt betaald.",
        ],
    },
    non_renewal: {
        label: "Tijdelijk contract wordt niet verlengd",
        eligible: true,
        title: "Waarschijnlijk recht bij niet-verlenging",
        reason: "Ook bij het niet verlengen van een tijdelijk contract ligt het initiatief bij de werkgever, dus is transitievergoeding meestal verschuldigd.",
        tips: [
            "Controleer of er geen gelijkwaardig nieuw contract is aangeboden.",
            "Check ook meteen de aanzegtermijn en aanzegvergoeding.",
            "Bewaar het schriftelijke bericht over niet-verlenging.",
        ],
    },
    employee_due_to_employer: {
        label: "Ik neem zelf ontslag door ernstig verwijtbaar gedrag werkgever",
        eligible: true,
        title: "Mogelijk recht door ernstig verwijtbaar handelen werkgever",
        reason: "Als je zelf vertrekt vanwege ernstig verwijtbaar handelen of nalaten van de werkgever, kan er alsnog recht op transitievergoeding bestaan.",
        tips: [
            "Laat deze situatie juridisch toetsen; dit is een zwaardere uitzondering.",
            "Bewaar e-mails, waarschuwingen en andere bewijsstukken.",
            "Een rechter kan in ernstige gevallen ook een aanvullende billijke vergoeding toekennen.",
        ],
    },
    employee_resigns: {
        label: "Ik neem vrijwillig zelf ontslag",
        eligible: false,
        title: "Meestal geen recht bij vrijwillig ontslag",
        reason: "Bij een gewone vrijwillige opzegging ligt het initiatief niet bij de werkgever. Dan is transitievergoeding meestal niet verschuldigd.",
        tips: [
            "Controleer of er toch sprake was van ernstig verwijtbaar handelen door de werkgever.",
            "Bereken liever je opzegtermijn en regel je vertrek schriftelijk.",
            "Gebruik deze tool opnieuw als de werkgever toch tot beeindiging overgaat.",
        ],
    },
    serious_fault_employee: {
        label: "Ontslag door ernstig verwijtbaar handelen werknemer",
        eligible: false,
        title: "Meestal geen recht bij ernstig verwijtbaar handelen",
        reason: "Als de beeindiging het gevolg is van ernstig verwijtbaar handelen of nalaten van de werknemer, vervalt het recht op transitievergoeding meestal.",
        tips: [
            "De kwalificatie ernstig verwijtbaar ligt juridisch hoog.",
            "Twijfel je of dit terecht is? Laat het ontslag beoordelen.",
            "Check ook of de werkgever de juiste ontslagroute heeft gevolgd.",
        ],
    },
    equal_contract_refused: {
        label: "Werkgever bood gelijkwaardig of verlengd contract aan",
        eligible: false,
        title: "Meestal geen recht bij gelijkwaardig aanbod",
        reason: "Er is meestal geen recht als de werkgever voor afloop een gelijkwaardig nieuw contract of verlenging aanbiedt.",
        tips: [
            "Let op: ook een aanbod dat je niet accepteert kan transitievergoeding blokkeren.",
            "Controleer of het nieuwe aanbod echt gelijkwaardig is.",
            "Bewaar het schriftelijke aanbod en de voorwaarden.",
        ],
    },
    bankruptcy: {
        label: "Faillissement / surseance / WSNP werkgever",
        eligible: false,
        title: "Geen regulier recht bij insolventie werkgever",
        reason: "Bij faillissement, surseance van betaling of WSNP is transitievergoeding meestal niet verschuldigd door de werkgever.",
        tips: [
            "Controleer wel of UWV andere loonverplichtingen kan overnemen.",
            "Bewaar loonstroken en contractdocumenten.",
            "Vraag specialistisch advies als meerdere werknemers worden geraakt.",
        ],
    },
    retirement: {
        label: "Ontslag vanwege AOW of pensioenleeftijd",
        eligible: false,
        title: "Meestal geen recht bij pensioenontslag",
        reason: "Bij ontslag vanwege het bereiken van de AOW-leeftijd of andere pensioengerechtigde leeftijd bestaat meestal geen recht op transitievergoeding.",
        tips: [
            "Controleer of je contract of cao aanvullende afspraken bevat.",
            "Laat het nakijken als er een andere ontslagreden meespeelt.",
            "Gebruik deze tool opnieuw bij een andere beeindigingsgrond.",
        ],
    },
};

function parseDecimal(value: string): number {
    const trimmed = value.trim().replace(/\s+/g, "");

    if (!trimmed) {
        return NaN;
    }

    if (trimmed.includes(",") && trimmed.includes(".")) {
        return parseFloat(trimmed.replace(/\./g, "").replace(",", "."));
    }

    if (trimmed.includes(",")) {
        return parseFloat(trimmed.replace(",", "."));
    }

    if (trimmed.includes(".")) {
        const parts = trimmed.split(".");
        if (parts.length > 1 && parts[parts.length - 1].length === 3) {
            return parseFloat(parts.join(""));
        }
    }

    return parseFloat(trimmed);
}

function createUtcDate(value: string): Date | null {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return null;
    }

    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));

    if (
        date.getUTCFullYear() !== year ||
        date.getUTCMonth() !== month - 1 ||
        date.getUTCDate() !== day
    ) {
        return null;
    }

    return date;
}

function daysInMonth(year: number, monthIndex: number): number {
    return new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
}

function addYears(date: Date, years: number): Date {
    const year = date.getUTCFullYear() + years;
    const month = date.getUTCMonth();
    const day = Math.min(date.getUTCDate(), daysInMonth(year, month));
    return new Date(Date.UTC(year, month, day));
}

function addMonths(date: Date, monthsToAdd: number): Date {
    const totalMonths = (date.getUTCFullYear() * 12) + date.getUTCMonth() + monthsToAdd;
    const year = Math.floor(totalMonths / 12);
    const month = totalMonths % 12;
    const day = Math.min(date.getUTCDate(), daysInMonth(year, month));
    return new Date(Date.UTC(year, month, day));
}

function diffDays(start: Date, end: Date): number {
    return Math.round((end.getTime() - start.getTime()) / 86400000);
}

function calculateServiceBreakdown(start: Date, end: Date): ServiceBreakdown {
    let years = end.getUTCFullYear() - start.getUTCFullYear();
    let cursor = addYears(start, years);

    if (cursor.getTime() > end.getTime()) {
        years -= 1;
        cursor = addYears(start, years);
    }

    let months = 0;
    while (months < 11) {
        const next = addMonths(cursor, 1);
        if (next.getTime() <= end.getTime()) {
            cursor = next;
            months += 1;
            continue;
        }
        break;
    }

    const days = diffDays(cursor, end);
    const partialMonthDays = daysInMonth(cursor.getUTCFullYear(), cursor.getUTCMonth());
    const totalMonths = (years * 12) + months + (days > 0 ? days / partialMonthDays : 0);

    return {
        years,
        months,
        days,
        totalMonths,
    };
}

function formatEuro(amount: number): string {
    return new Intl.NumberFormat("nl-NL", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

function formatService(service: ServiceBreakdown): string {
    const parts: string[] = [];

    if (service.years > 0) {
        parts.push(`${service.years} jaar`);
    }

    if (service.months > 0) {
        parts.push(`${service.months} ${service.months === 1 ? "maand" : "maanden"}`);
    }

    if (service.days > 0 || parts.length === 0) {
        parts.push(`${service.days} ${service.days === 1 ? "dag" : "dagen"}`);
    }

    return parts.join(", ");
}

export default function TransitievergoedingTool() {
    const [situation, setSituation] = useState<Situation>("employer_ends");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [baseMonthlySalary, setBaseMonthlySalary] = useState("");
    const [vacationAllowancePct, setVacationAllowancePct] = useState("8");
    const [annualBonus, setAnnualBonus] = useState("");
    const [monthlyVariablePay, setMonthlyVariablePay] = useState("");
    const [isMinorLimitedHours, setIsMinorLimitedHours] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState<Result | null>(null);

    function handleCalculate() {
        const start = createUtcDate(startDate);
        const end = createUtcDate(endDate);
        const baseSalary = parseDecimal(baseMonthlySalary);
        const vacationPct = parseDecimal(vacationAllowancePct);
        const annualBonusValue = annualBonus.trim() ? parseDecimal(annualBonus) : 0;
        const monthlyVariableValue = monthlyVariablePay.trim() ? parseDecimal(monthlyVariablePay) : 0;

        if (!start || !end) {
            setError("Vul een geldige start- en einddatum in.");
            return;
        }

        if (end.getTime() <= start.getTime()) {
            setError("De einddatum moet na de startdatum liggen.");
            return;
        }

        if (isNaN(baseSalary) || baseSalary <= 0) {
            setError("Vul een geldig bruto maandsalaris in.");
            return;
        }

        if (isNaN(vacationPct) || vacationPct < 0 || vacationPct > 25) {
            setError("Vul een realistisch vakantiegeldpercentage in, bijvoorbeeld 8.");
            return;
        }

        if (isNaN(annualBonusValue) || annualBonusValue < 0 || isNaN(monthlyVariableValue) || monthlyVariableValue < 0) {
            setError("Gebruik alleen positieve bedragen voor bonus en variabele looncomponenten.");
            return;
        }

        const service = calculateServiceBreakdown(start, end);
        const vacationAmount = baseSalary * (vacationPct / 100);
        const annualBonusMonthly = annualBonusValue / 12;
        const monthlyWage = baseSalary + vacationAmount + annualBonusMonthly + monthlyVariableValue;
        const annualSalary = monthlyWage * 12;
        const cap = Math.max(102000, annualSalary);
        const meta = situationMeta[situation];
        const eligible = meta.eligible && !isMinorLimitedHours;
        const noRightBecauseMinor = isMinorLimitedHours;
        const uncappedAmount = eligible ? (monthlyWage * service.totalMonths) / 36 : 0;
        const amount = Math.min(uncappedAmount, cap);

        setError("");
        setResult({
            eligible,
            title: noRightBecauseMinor ? "Meestal geen recht voor minderjarige werknemer met beperkt aantal uren" : meta.title,
            reason: noRightBecauseMinor
                ? "Werknemers die bij ontslag nog geen 18 jaar zijn en gemiddeld niet meer dan 12 uur per week werken, hebben meestal geen recht op transitievergoeding."
                : meta.reason,
            amount,
            uncappedAmount,
            cap,
            capApplied: eligible && uncappedAmount > cap,
            transitieMaandloon: monthlyWage,
            baseMonthlySalary: baseSalary,
            vacationAllowanceAmount: vacationAmount,
            annualBonusMonthly,
            monthlyVariablePay: monthlyVariableValue,
            service,
            nextSteps: noRightBecauseMinor
                ? [
                    "Controleer of je gemiddelde uren per week correct zijn bepaald.",
                    "Laat uitzonderingen of geschillen beoordelen als je werkgever een andere ontslaggrond noemt.",
                    "Gebruik de tool opnieuw zonder deze uitzondering als je situatie toch anders blijkt.",
                ]
                : meta.tips,
        });
    }

    return (
        <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
            <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                            Situatie bij einde dienstverband
                        </label>
                        <select
                            value={situation}
                            onChange={(event) => setSituation(event.target.value as Situation)}
                            className={inputClass}
                        >
                            {(Object.entries(situationMeta) as [Situation, SituationMeta][]).map(([key, meta]) => (
                                <option key={key} value={key}>
                                    {meta.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                            Startdatum arbeidsovereenkomst
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(event) => setStartDate(event.target.value)}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                            Einddatum arbeidsovereenkomst
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(event) => setEndDate(event.target.value)}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                            Basis bruto maandsalaris
                        </label>
                        <input
                            type="text"
                            inputMode="decimal"
                            value={baseMonthlySalary}
                            onChange={(event) => setBaseMonthlySalary(event.target.value)}
                            placeholder="bijv. 3500"
                            className={inputClass}
                        />
                        <p className="text-[11px] text-slate-500 mt-1">
                            Gebruik bij oproep- of uurcontracten je gemiddelde bruto maandloon.
                        </p>
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                            Vakantiegeld %
                        </label>
                        <input
                            type="text"
                            inputMode="decimal"
                            value={vacationAllowancePct}
                            onChange={(event) => setVacationAllowancePct(event.target.value)}
                            placeholder="8"
                            className={inputClass}
                        />
                        <p className="text-[11px] text-slate-500 mt-1">
                            Standaard is 8. Pas dit alleen aan als jouw situatie afwijkt.
                        </p>
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                            Vaste eindejaarsuitkering per jaar
                        </label>
                        <input
                            type="text"
                            inputMode="decimal"
                            value={annualBonus}
                            onChange={(event) => setAnnualBonus(event.target.value)}
                            placeholder="bijv. 2400"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                            Gemiddeld variabel loon per maand
                        </label>
                        <input
                            type="text"
                            inputMode="decimal"
                            value={monthlyVariablePay}
                            onChange={(event) => setMonthlyVariablePay(event.target.value)}
                            placeholder="bijv. 150"
                            className={inputClass}
                        />
                        <p className="text-[11px] text-slate-500 mt-1">
                            Denk aan structurele bonus, provisie, ploegentoeslag of overwerkvergoeding.
                        </p>
                    </div>
                </div>

                <label className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <input
                        type="checkbox"
                        checked={isMinorLimitedHours}
                        onChange={(event) => setIsMinorLimitedHours(event.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-sm text-slate-600 leading-relaxed">
                        Ik ben bij ontslag nog geen 18 jaar en werk gemiddeld niet meer dan 12 uur per week.
                    </span>
                </label>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-sm text-red-700 font-medium">{error}</p>
                    </div>
                )}

                <button
                    type="button"
                    onClick={handleCalculate}
                    className="w-full py-3 px-6 bg-[#4ECDC4] hover:bg-teal-500 text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                    style={{ borderWidth: "3px" }}
                >
                    Bereken transitievergoeding
                </button>

                <p className="text-xs text-slate-500 text-center">
                    Indicatie op basis van Rijksoverheid-regels per 11 maart 2026. Cao-afspraken, variabele uren en juridische uitzonderingen kunnen de uitkomst beinvloeden.
                </p>
            </div>

            {result && (
                <div className="mt-8 pt-8 border-t border-slate-200 space-y-5">
                    <div className={`border-2 rounded-xl p-5 ${result.eligible ? "bg-emerald-50 border-emerald-300" : "bg-amber-50 border-amber-300"}`}>
                        <p className={`text-xs font-black uppercase tracking-wide mb-2 ${result.eligible ? "text-emerald-700" : "text-amber-700"}`}>
                            {result.title}
                        </p>
                        <p className={`text-4xl font-black mb-2 ${result.eligible ? "text-emerald-900" : "text-amber-900"}`}>
                            {result.eligible ? formatEuro(result.amount) : formatEuro(0)}
                        </p>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            {result.reason}
                        </p>
                        {result.capApplied && (
                            <p className="text-xs text-slate-600 mt-3">
                                De berekende vergoeding valt boven het wettelijke maximum. Daarom is het bedrag afgekapt op {formatEuro(result.cap)}.
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Duur dienstverband</p>
                            <p className="text-xl font-black text-slate-900">{formatService(result.service)}</p>
                            <p className="text-[11px] text-slate-500 mt-1">
                                Omgerekend: {result.service.totalMonths.toFixed(2)} maanden
                            </p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Transitie-maandloon</p>
                            <p className="text-xl font-black text-slate-900">{formatEuro(result.transitieMaandloon)}</p>
                            <p className="text-[11px] text-slate-500 mt-1">
                                Basis voor de berekening
                            </p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Wettelijk maximum 2026</p>
                            <p className="text-xl font-black text-slate-900">{formatEuro(result.cap)}</p>
                            <p className="text-[11px] text-slate-500 mt-1">
                                Max. EUR 102.000 of 1 bruto jaarsalaris
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white border border-slate-200 rounded-xl p-4">
                            <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-3">
                                Opbouw maandloon
                            </p>
                            <div className="space-y-2 text-sm text-slate-700">
                                <div className="flex items-center justify-between gap-3">
                                    <span>Basis bruto maandsalaris</span>
                                    <span className="font-black">{formatEuro(result.baseMonthlySalary)}</span>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <span>Vakantiegeld</span>
                                    <span className="font-black">{formatEuro(result.vacationAllowanceAmount)}</span>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <span>1/12 vaste eindejaarsuitkering</span>
                                    <span className="font-black">{formatEuro(result.annualBonusMonthly)}</span>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <span>Gemiddeld variabel loon</span>
                                    <span className="font-black">{formatEuro(result.monthlyVariablePay)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-4">
                            <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-3">
                                Wat je nu moet doen
                            </p>
                            <div className="space-y-2">
                                {result.nextSteps.map((step, index) => (
                                    <div key={step} className="flex items-start gap-3">
                                        <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[11px] font-black text-slate-700">
                                            {index + 1}
                                        </span>
                                        <p className="text-sm text-slate-700 leading-relaxed">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">
                            Hoe deze tool rekent
                        </p>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            Deze indicatie rekent met 1/3 maandloon per dienstjaar. Voor resterende maanden en dagen wordt je transitie-maandloon naar rato verdeeld over de resterende contractduur. Bij wisselende uren, afwijkende cao-afspraken of inhoudingen voor inzetbaarheidskosten kan de werkelijke uitkomst anders zijn.
                        </p>
                        {result.eligible && (
                            <p className="text-sm text-slate-700 leading-relaxed mt-2">
                                Onbegrensde uitkomst: <span className="font-black">{formatEuro(result.uncappedAmount)}</span>
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <a
                            href="/tools/opzegtermijn-berekenen"
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#4ECDC4] text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                            style={{ borderWidth: "3px" }}
                        >
                            Bereken ook je opzegtermijn
                        </a>
                        <a
                            href="/cv-maken"
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-black text-white font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.35)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.35)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                            style={{ borderWidth: "3px" }}
                        >
                            Nieuwe stap? Maak je CV
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
