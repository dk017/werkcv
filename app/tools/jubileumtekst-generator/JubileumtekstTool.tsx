"use client";

import { useMemo, useState } from "react";
import {
    generateAnniversaryMessages,
    type AnniversaryChannel,
    type AnniversaryRelation,
    type AnniversaryTone,
} from "@/lib/work-anniversary-messages";

const relations: Array<{ value: AnniversaryRelation; label: string }> = [
    { value: "collega", label: "Collega" },
    { value: "medewerker", label: "Medewerker (als manager/HR)" },
    { value: "leidinggevende", label: "Leidinggevende" },
    { value: "team", label: "Heel team" },
];

const tones: Array<{ value: AnniversaryTone; label: string }> = [
    { value: "warm", label: "Warm" },
    { value: "professioneel", label: "Professioneel" },
    { value: "kort", label: "Kort" },
    { value: "luchtig", label: "Luchtig, wel werkgeschikt" },
];

const channels: Array<{ value: AnniversaryChannel; label: string }> = [
    { value: "kaart", label: "Kaart" },
    { value: "teambericht", label: "Teams / Slack" },
    { value: "email", label: "E-mail" },
    { value: "linkedin", label: "LinkedIn" },
];

export default function JubileumtekstTool() {
    const [name, setName] = useState("Sanne");
    const [years, setYears] = useState(25);
    const [relation, setRelation] = useState<AnniversaryRelation>("collega");
    const [tone, setTone] = useState<AnniversaryTone>("warm");
    const [channel, setChannel] = useState<AnniversaryChannel>("kaart");
    const [company, setCompany] = useState("");
    const [contribution, setContribution] = useState("je rustige uitleg, scherpe vakkennis en hulp aan nieuwe collega's");
    const [generated, setGenerated] = useState(false);
    const [copied, setCopied] = useState<number | null>(null);

    const messages = useMemo(() => generateAnniversaryMessages({
        name,
        years: Number.isFinite(years) ? years : 25,
        relation,
        tone,
        channel,
        company,
        contribution,
    }), [name, years, relation, tone, channel, company, contribution]);

    async function copyMessage(index: number) {
        const message = messages[index];
        const value = message.subject ? `Onderwerp: ${message.subject}\n\n${message.text}` : message.text;
        await navigator.clipboard.writeText(value);
        setCopied(index);
        window.setTimeout(() => setCopied(null), 1800);
    }

    const inputClass = "mt-2 w-full border-2 border-black bg-white px-3 py-3 text-sm font-medium text-slate-900 outline-none focus:ring-4 focus:ring-yellow-200";

    return (
        <div id="generator" className="scroll-mt-24 border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="border-b-4 border-black bg-[#F7F3FF] p-5 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-700">Stap 1 — maak het specifiek</p>
                        <h2 className="mt-2 text-2xl font-black text-black sm:text-3xl">Voor wie schrijf je?</h2>
                    </div>
                    <span className="border-2 border-black bg-white px-3 py-1 text-xs font-black">Geen account · niets opgeslagen</span>
                </div>
            </div>

            <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-7">
                <label className="text-sm font-black text-slate-800">
                    Naam <span className="font-medium text-slate-500">(optioneel)</span>
                    <input className={inputClass} value={name} onChange={(event) => setName(event.target.value)} maxLength={60} placeholder="Bijvoorbeeld Sanne" />
                </label>
                <label className="text-sm font-black text-slate-800">
                    Aantal jaar
                    <input className={inputClass} type="number" min={1} max={60} step={0.5} value={years} onChange={(event) => setYears(event.target.valueAsNumber)} />
                </label>
                <label className="text-sm font-black text-slate-800">
                    Jullie werkrelatie
                    <select className={inputClass} value={relation} onChange={(event) => setRelation(event.target.value as AnniversaryRelation)}>
                        {relations.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                </label>
                <label className="text-sm font-black text-slate-800">
                    Waar komt de tekst?
                    <select className={inputClass} value={channel} onChange={(event) => setChannel(event.target.value as AnniversaryChannel)}>
                        {channels.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                </label>
                <label className="text-sm font-black text-slate-800">
                    Toon
                    <select className={inputClass} value={tone} onChange={(event) => setTone(event.target.value as AnniversaryTone)}>
                        {tones.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                </label>
                <label className="text-sm font-black text-slate-800">
                    Organisatie <span className="font-medium text-slate-500">(optioneel)</span>
                    <input className={inputClass} value={company} onChange={(event) => setCompany(event.target.value)} maxLength={80} placeholder="Bijvoorbeeld WerkCV" />
                </label>
                <label className="text-sm font-black text-slate-800 sm:col-span-2">
                    Wat waardeer je concreet? <span className="font-medium text-slate-500">(aanbevolen)</span>
                    <textarea
                        className={`${inputClass} min-h-24 resize-y`}
                        value={contribution}
                        onChange={(event) => setContribution(event.target.value)}
                        maxLength={220}
                        placeholder="Bijvoorbeeld: je rustige uitleg en de manier waarop je nieuwe collega's op weg helpt"
                    />
                    <span className="mt-1 block text-xs font-medium text-slate-500">Gebruik geen vertrouwelijke resultaten of persoonlijke informatie in een openbaar bericht.</span>
                </label>
            </div>

            <div className="border-y-4 border-black bg-yellow-300 p-5 sm:p-7">
                <button
                    type="button"
                    onClick={() => setGenerated(true)}
                    className="w-full border-4 border-black bg-black px-5 py-4 text-base font-black text-white shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] transition-transform hover:-translate-y-0.5 sm:w-auto"
                >
                    Maak 3 jubileumteksten
                </button>
                <p className="mt-3 text-xs font-bold text-slate-700">De tool combineert redactioneel geschreven tekstblokken in je browser. Controleer namen en feiten voordat je verstuurt.</p>
            </div>

            <div aria-live="polite" className="p-5 sm:p-7">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-700">Stap 2 — kies en maak persoonlijk</p>
                <h2 className="mt-2 text-2xl font-black text-black">{generated ? "Drie direct bruikbare varianten" : "Je voorbeelden verschijnen hier"}</h2>
                {!generated ? (
                    <div className="mt-5 border-2 border-dashed border-slate-400 bg-slate-50 p-6 text-sm font-medium leading-relaxed text-slate-600">
                        Vul minstens het jubileumjaar en de relatie in. Een specifieke bijdrage maakt het verschil tussen een beleefde standaardzin en oprechte waardering.
                    </div>
                ) : (
                    <div className="mt-6 grid gap-5 lg:grid-cols-3">
                        {messages.map((message, index) => (
                            <article key={`${message.label}-${index}`} className="flex flex-col border-3 border-black bg-[#FFFEF0] p-5" style={{ borderWidth: "3px" }}>
                                <div className="flex items-start justify-between gap-3">
                                    <h3 className="text-lg font-black text-black">{message.label}</h3>
                                    <span className="bg-white px-2 py-1 text-[10px] font-black uppercase tracking-wide text-slate-500">{message.bestFor}</span>
                                </div>
                                {message.subject && <p className="mt-4 text-xs font-black text-slate-600">Onderwerp: {message.subject}</p>}
                                <p className="mt-4 whitespace-pre-line text-sm font-medium leading-relaxed text-slate-800">{message.text}</p>
                                <button type="button" onClick={() => copyMessage(index)} className="mt-5 border-2 border-black bg-white px-4 py-2 text-sm font-black text-black hover:bg-yellow-200 lg:mt-auto">
                                    {copied === index ? "Gekopieerd ✓" : "Kopieer tekst"}
                                </button>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
