"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, type ReactNode } from "react";
import { useFieldArray, useWatch, Control, UseFormRegister, Controller } from "react-hook-form";
import { CVData } from "@/lib/cv";
import { UiLanguage } from "@/lib/ui-language";
import type { WritingAction, BulletSelection } from "@/lib/ai-writing-changes";
import { SectionStylesProvider, useSectionStyles } from "./section-styles";

interface SectionProps {
    control: Control<CVData>;
    register: UseFormRegister<CVData>;
    uiLanguage?: UiLanguage;
}

// Class names come from useSectionStyles() (section-styles.tsx): classic or stepped editor.
const inputStyle = undefined;

function t(uiLanguage: UiLanguage, dutch: string, english: string) {
    return uiLanguage === "en" ? english : dutch;
}

const OPEN_LAST = "__last__";

// Steps layout: which list entry is unfolded. Starts with the first one; a new entry opens itself.
function useEntryDisclosure(fields: Array<{ id: string }>, enabled: boolean) {
    const [openKey, setOpenKey] = useState<string | null>(() => fields[0]?.id ?? null);
    return {
        isOpen: (id: string, index: number) => !enabled || (openKey === OPEN_LAST ? index === fields.length - 1 : openKey === id),
        toggle: (id: string, open: boolean) => setOpenKey(open ? null : id),
        openLast: () => setOpenKey(OPEN_LAST),
    };
}

function EntryCard({ control, name, kind, open, onToggle, uiLanguage, children }: {
    control: Control<CVData>;
    name: `experience.${number}` | `internships.${number}` | `education.${number}`;
    kind: "job" | "education";
    open: boolean;
    onToggle: () => void;
    uiLanguage: UiLanguage;
    children: ReactNode;
}) {
    const s = useSectionStyles();
    const value = useWatch({ control, name }) as Record<string, unknown> | undefined;
    const text = (key: string) => (typeof value?.[key] === "string" ? (value[key] as string).trim() : "");
    const title = kind === "education" ? text("degree") : text("role");
    const period = [text("start"), text("end")].filter(Boolean).join(" – ");
    const meta = [kind === "education" ? text("school") : text("company"), text("location"), period].filter(Boolean).join(" · ");
    const fallback = kind === "education" ? t(uiLanguage, "Nieuwe opleiding", "New education") : t(uiLanguage, "Nieuwe functie", "New position");

    return (
        <div className={`rounded-[14px] bg-[var(--wk-surface)] transition-shadow ${open ? "border-2 border-[var(--wk-primary)] shadow-[var(--wk-shadow-md)]" : "border border-[var(--wk-border)]"}`}>
            <button type="button" onClick={onToggle} aria-expanded={open} className="flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left">
                <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-extrabold text-[var(--wk-ink)]">{title || fallback}</span>
                    {meta ? <span className="block truncate text-[13px] text-[var(--wk-ink-muted)]">{meta}</span> : null}
                </span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className={`shrink-0 text-[var(--wk-ink-muted)] transition-transform ${open ? "rotate-180" : ""}`}>
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            {open ? (
                <div className="border-t border-[#e6ebe7] px-4 pb-4 pt-4 sm:px-5">
                    <SectionStylesProvider value={{ ...s, item: s.itemInCard, removeAbs: s.removeInCard }}>
                        {children}
                    </SectionStylesProvider>
                </div>
            ) : null}
        </div>
    );
}

export function ExperienceSection({ control, register, uiLanguage = "nl", onWritingAssist, writingBlocked }: SectionProps & {
    onWritingAssist?: (entryId: string, action: WritingAction, bullet?: BulletSelection) => void;
    writingBlocked?: boolean;
}) {
    const s = useSectionStyles();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "experience",
    });
    const entries = useEntryDisclosure(fields, s.collapsible);

    return (
        <section className={s.card}>
            <div className={s.headerRow}>
                <h2 className={s.heading}>
                    <span className={s.headingChip}>
                        {t(uiLanguage, "Werkervaring", "Experience")}
                    </span>
                </h2>
                <button
                    type="button"
                    onClick={() => {
                        append({ entryId: crypto.randomUUID(), role: "", company: "", description: "", start: "", end: "", location: "", highlights: [] });
                        entries.openLast();
                    }}
                    className={s.addButton}
                >
                    {t(uiLanguage, "+ Toevoegen", "+ Add")}
                </button>
            </div>

            <div className="space-y-4">
                {fields.map((item, index) => {
                    const entryBody = (<>
                    <ExperienceItem
                        key={item.id}
                        index={index}
                        register={register}
                        control={control}
                        onRemove={() => remove(index)}
                        fieldName="experience"
                        onBulletAssist={onWritingAssist && item.entryId ? (action, bullet) => onWritingAssist(item.entryId!, action, bullet) : undefined}
                        writingBlocked={writingBlocked}
                        uiLanguage={uiLanguage}
                    />
                    {onWritingAssist && item.entryId && <div className="mt-2 flex flex-wrap gap-2">
                        <button type="button" data-writing-trigger={`experience:${item.entryId}:draft_experience`} disabled={writingBlocked} className={s.assist} onClick={() => onWritingAssist(item.entryId!, "draft_experience")}>{t(uiLanguage, "Help mijn taken beschrijven", "Help describe my responsibilities")}</button>
                        <button type="button" data-writing-trigger={`experience:${item.entryId}:improve`} disabled={writingBlocked} className={s.assist} onClick={() => onWritingAssist(item.entryId!, "improve")}>{t(uiLanguage, "Verbeter de formulering", "Improve wording")}</button>
                        <button type="button" data-writing-trigger={`experience:${item.entryId}:shorten`} disabled={writingBlocked} className={s.assist} onClick={() => onWritingAssist(item.entryId!, "shorten")}>{t(uiLanguage, "Maak korter", "Make shorter")}</button>
                    </div>}
                    </>);
                    if (!s.collapsible) return <div key={item.id}>{entryBody}</div>;
                    const open = entries.isOpen(item.id, index);
                    return (
                        <EntryCard key={item.id} control={control} name={`experience.${index}`} kind="job" open={open} onToggle={() => entries.toggle(item.id, open)} uiLanguage={uiLanguage}>
                            {entryBody}
                        </EntryCard>
                    );
                })}
                {fields.length === 0 && (
                    <div className={s.emptyTall}>
                        {t(uiLanguage, "Nog geen werkervaring toegevoegd.", "No experience added yet.")}
                    </div>
                )}
            </div>
        </section>
    );
}

function ExperienceItem({ index, register, control, onRemove, fieldName, uiLanguage, onBulletAssist, writingBlocked }: {
    index: number;
    register: UseFormRegister<CVData>;
    control: Control<CVData>;
    onRemove: () => void;
    fieldName: "experience" | "internships";
    uiLanguage: UiLanguage;
    onBulletAssist?: (action: WritingAction, bullet: BulletSelection) => void;
    writingBlocked?: boolean;
}) {
    const s = useSectionStyles();
    const {
        fields: highlightFields,
        append: appendHighlight,
        insert: insertHighlight,
        move: moveHighlight,
        remove: removeHighlight,
    } = useFieldArray({
        control,
        name: `${fieldName}.${index}.highlights` as any,
    });

    return (
        <div className={s.item}>
            <button
                type="button"
                onClick={onRemove}
                className={s.removeAbs}
                title={t(uiLanguage, "Verwijderen", "Remove")}
            >
                ✕
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className={s.label}>{t(uiLanguage, "Functie", "Role")}</label>
                    <input
                        {...register(`${fieldName}.${index}.role` as any)}
                        placeholder={t(uiLanguage, "bv. Software Developer", "e.g. Software Developer")}
                        className={s.input}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label className={s.label}>{t(uiLanguage, "Bedrijf", "Company")}</label>
                    <input
                        {...register(`${fieldName}.${index}.company` as any)}
                        placeholder={t(uiLanguage, "bv. Tech Solutions BV", "e.g. Tech Solutions BV")}
                        className={s.input}
                        style={inputStyle}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className={s.label}>{t(uiLanguage, "Start", "Start")}</label>
                    <input
                        {...register(`${fieldName}.${index}.start` as any)}
                        placeholder={t(uiLanguage, "bv. jan 2020", "e.g. Jan 2020")}
                        className={s.input}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label className={s.label}>{t(uiLanguage, "Eind", "End")}</label>
                    <input
                        {...register(`${fieldName}.${index}.end` as any)}
                        placeholder={t(uiLanguage, "bv. heden", "e.g. Present")}
                        className={s.input}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label className={s.label}>{t(uiLanguage, "Locatie", "Location")}</label>
                    <input
                        {...register(`${fieldName}.${index}.location` as any)}
                        placeholder={t(uiLanguage, "bv. Amsterdam", "e.g. Amsterdam")}
                        className={s.input}
                        style={inputStyle}
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className={s.label}>{t(uiLanguage, "Omschrijving (optioneel)", "Description (optional)")}</label>
                <textarea
                    {...register(`${fieldName}.${index}.description` as any)}
                    placeholder={t(uiLanguage, "Korte omschrijving van je rol...", "Short description of your role...")}
                    className={`${s.input} min-h-[60px]`}
                    style={inputStyle}
                />
            </div>

            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className={s.labelBare}>{t(uiLanguage, "Taken & Resultaten", "Tasks & Results")}</label>
                    <button
                        type="button"
                        onClick={() => appendHighlight("" as any)}
                        className={s.smallAdd}
                    >
                        {t(uiLanguage, "+ Punt", "+ Bullet")}
                    </button>
                </div>
                <div className="space-y-2">
                    {onBulletAssist && <button type="button" disabled={writingBlocked} data-writing-trigger={`bullet:${index}:insert`} className="rounded-lg border bg-white px-3 py-2 text-sm" onClick={() => onBulletAssist("draft_experience", { operation: "insert_bullet", index: highlightFields.length })}>{t(uiLanguage, "Voeg een taak toe met schrijfhulp", "Add a responsibility with writing help")}</button>}
                    {highlightFields.map((h, hIndex) => (
                        <div key={h.id} className="flex flex-wrap gap-2 items-start">
                            <span className="text-black mt-2">•</span>
                            <textarea
                                {...register(`${fieldName}.${index}.highlights.${hIndex}` as any)}
                                placeholder={t(uiLanguage, "Beschrijf een taak of resultaat...", "Describe a task or result...")}
                                className={`${s.input} min-h-[50px] min-w-0 flex-1`}
                                style={inputStyle}
                            />
                            <div className="mt-1 grid shrink-0 grid-cols-2 gap-1">
                                {onBulletAssist && <div className="col-span-2 flex flex-wrap gap-1">
                                    {(["improve", "shorten"] as const).map(action => <button key={action} type="button" disabled={writingBlocked}
                                      data-writing-trigger={`bullet:${index}:${hIndex}:${action}`} aria-label={`${t(uiLanguage, "Punt", "Bullet")} ${hIndex + 1}: ${action === "improve" ? t(uiLanguage, "Verbeter", "Improve") : t(uiLanguage, "Maak korter", "Shorten")}`}
                                      className="rounded border bg-white p-2 text-xs focus-visible:outline-2" onClick={() => onBulletAssist(action, { operation: "replace_bullet", index: hIndex })}>{action === "improve" ? t(uiLanguage, "Verbeter", "Improve") : t(uiLanguage, "Maak korter", "Shorten")}</button>)}
                                </div>}
                                <button
                                    type="button"
                                    onClick={() => insertHighlight(hIndex + 1, "" as any)}
                                    className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 bg-white text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100"
                                    title={t(uiLanguage, "Punt hieronder invoegen", "Insert bullet below")}
                                    aria-label={t(uiLanguage, "Punt hieronder invoegen", "Insert bullet below")}
                                >
                                    +
                                </button>
                                <button
                                    type="button"
                                    onClick={() => removeHighlight(hIndex)}
                                    className="flex h-7 w-7 items-center justify-center rounded-md border border-rose-200 bg-white text-xs font-bold text-rose-700 transition-colors hover:bg-rose-50"
                                    title={t(uiLanguage, "Punt verwijderen", "Remove bullet")}
                                    aria-label={t(uiLanguage, "Punt verwijderen", "Remove bullet")}
                                >
                                    ✕
                                </button>
                                <button
                                    type="button"
                                    onClick={() => moveHighlight(hIndex, hIndex - 1)}
                                    disabled={hIndex === 0}
                                    className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 bg-white text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
                                    title={t(uiLanguage, "Punt omhoog verplaatsen", "Move bullet up")}
                                    aria-label={t(uiLanguage, "Punt omhoog verplaatsen", "Move bullet up")}
                                >
                                    ↑
                                </button>
                                <button
                                    type="button"
                                    onClick={() => moveHighlight(hIndex, hIndex + 1)}
                                    disabled={hIndex === highlightFields.length - 1}
                                    className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 bg-white text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
                                    title={t(uiLanguage, "Punt omlaag verplaatsen", "Move bullet down")}
                                    aria-label={t(uiLanguage, "Punt omlaag verplaatsen", "Move bullet down")}
                                >
                                    ↓
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function InternshipsSection({ control, register, uiLanguage = "nl" }: SectionProps) {
    const s = useSectionStyles();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "internships",
    });
    const entries = useEntryDisclosure(fields, s.collapsible);

    return (
        <section className={s.card}>
            <div className={s.headerRow}>
                <h2 className={s.heading}>
                    <span className={s.headingChip}>
                        {t(uiLanguage, "Stages", "Internships")}
                    </span>
                </h2>
                <button
                    type="button"
                    onClick={() => {
                        append({ role: "", company: "", description: "", start: "", end: "", location: "", highlights: [] });
                        entries.openLast();
                    }}
                    className={s.addButton}
                >
                    {t(uiLanguage, "+ Toevoegen", "+ Add")}
                </button>
            </div>

            <div className="space-y-4">
                {fields.map((item, index) => {
                    const entryBody = (
                    <ExperienceItem
                        key={item.id}
                        index={index}
                        register={register}
                        control={control}
                        onRemove={() => remove(index)}
                        fieldName="internships"
                        uiLanguage={uiLanguage}
                    />
                    );
                    if (!s.collapsible) return entryBody;
                    const open = entries.isOpen(item.id, index);
                    return (
                        <EntryCard key={item.id} control={control} name={`internships.${index}`} kind="job" open={open} onToggle={() => entries.toggle(item.id, open)} uiLanguage={uiLanguage}>
                            {entryBody}
                        </EntryCard>
                    );
                })}
                {fields.length === 0 && (
                    <div className={s.emptyLarge}>
                        {t(uiLanguage, "Nog geen stages toegevoegd.", "No internships added yet.")}
                    </div>
                )}
            </div>
        </section>
    );
}

export function EducationSection({ control, register, uiLanguage = "nl" }: SectionProps) {
    const s = useSectionStyles();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "education",
    });
    const entries = useEntryDisclosure(fields, s.collapsible);

    return (
        <section className={s.card}>
            <div className={s.headerRow}>
                <h2 className={s.heading}>
                    <span className={s.headingChip}>
                        {t(uiLanguage, "Opleidingen", "Education")}
                    </span>
                </h2>
                <button
                    type="button"
                    onClick={() => {
                        append({ degree: "", school: "", start: "", end: "", location: "", description: "" });
                        entries.openLast();
                    }}
                    className={s.addButton}
                >
                    {t(uiLanguage, "+ Toevoegen", "+ Add")}
                </button>
            </div>

            <div className="space-y-4">
                {fields.map((item, index) => {
                    const open = entries.isOpen(item.id, index);
                    const entryBody = (
                    <div key={item.id} className={s.collapsible ? s.itemInCard : s.item}>
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className={s.collapsible ? s.removeInCard : s.removeAbs}
                            title={t(uiLanguage, "Verwijderen", "Remove")}
                        >
                            ✕
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className={s.label}>{t(uiLanguage, "Opleiding / Studie", "Degree / Study")}</label>
                                <input
                                    {...register(`education.${index}.degree`)}
                                    placeholder={t(uiLanguage, "bv. HBO Informatica", "e.g. BSc Computer Science")}
                                    className={s.input}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label className={s.label}>{t(uiLanguage, "Onderwijsinstelling", "Institution")}</label>
                                <input
                                    {...register(`education.${index}.school`)}
                                    placeholder={t(uiLanguage, "bv. Hogeschool Utrecht", "e.g. Utrecht University")}
                                    className={s.input}
                                    style={inputStyle}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className={s.label}>{t(uiLanguage, "Start", "Start")}</label>
                                <input
                                    {...register(`education.${index}.start`)}
                                    placeholder={t(uiLanguage, "sep 2016", "Sep 2016")}
                                    className={s.input}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label className={s.label}>{t(uiLanguage, "Eind", "End")}</label>
                                <input
                                    {...register(`education.${index}.end`)}
                                    placeholder={t(uiLanguage, "jun 2020", "Jun 2020")}
                                    className={s.input}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label className={s.label}>{t(uiLanguage, "Locatie", "Location")}</label>
                                <input
                                    {...register(`education.${index}.location`)}
                                    placeholder={t(uiLanguage, "bv. Utrecht", "e.g. Utrecht")}
                                    className={s.input}
                                    style={inputStyle}
                                />
                            </div>
                        </div>

                        <div>
                            <label className={s.label}>{t(uiLanguage, "Omschrijving (optioneel)", "Description (optional)")}</label>
                            <textarea
                                {...register(`education.${index}.description`)}
                                placeholder={t(uiLanguage, "Relevante vakken, thesis, etc...", "Relevant coursework, thesis, etc.")}
                                className={`${s.input} min-h-[60px]`}
                                style={inputStyle}
                            />
                        </div>
                    </div>
                    );
                    if (!s.collapsible) return entryBody;
                    return (
                        <EntryCard key={item.id} control={control} name={`education.${index}`} kind="education" open={open} onToggle={() => entries.toggle(item.id, open)} uiLanguage={uiLanguage}>
                            {entryBody}
                        </EntryCard>
                    );
                })}
                {fields.length === 0 && (
                    <div className={s.emptyLarge}>
                        {t(uiLanguage, "Nog geen opleiding toegevoegd.", "No education added yet.")}
                    </div>
                )}
            </div>
        </section>
    );
}

// Individual skill item with controlled level using Controller for reliable updates
function SkillItem({ index, control, register, onRemove, uiLanguage }: {
    index: number;
    control: Control<CVData>;
    register: UseFormRegister<CVData>;
    onRemove: () => void;
    uiLanguage: UiLanguage;
}) {
    const s = useSectionStyles();
    return (
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center bg-slate-50 p-3 border border-slate-200 rounded-xl">
            <input
                {...register(`skills.${index}.name`)}
                placeholder={t(uiLanguage, "bv. Projectmanagement", "e.g. Project Management")}
                className={`${s.input} flex-1`}
                style={inputStyle}
            />
            <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-black whitespace-nowrap">{t(uiLanguage, "Niveau:", "Level:")}</span>
                <Controller
                    control={control}
                    name={`skills.${index}.level`}
                    render={({ field }) => (
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((level) => (
                                <button
                                    key={level}
                                    type="button"
                                    onClick={() => field.onChange(level)}
                                    className={`w-5 h-5 border border-slate-300 rounded-full transition-all hover:scale-110 ${
                                        (field.value || 3) >= level ? "bg-pink-500" : "bg-white"
                                    }`}
                                    title={t(uiLanguage, `Niveau ${level}`, `Level ${level}`)}
                                />
                            ))}
                        </div>
                    )}
                />
                <button
                    type="button"
                    onClick={onRemove}
                    className="bg-white text-rose-700 font-semibold px-2 py-2 text-xs border border-rose-200 rounded-md hover:bg-rose-50 transition-colors ml-1"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}

export function SkillsSection({ control, register, uiLanguage = "nl" }: SectionProps) {
    const s = useSectionStyles();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "skills",
    });

    return (
        <section className={s.card}>
            <div className={s.headerRow}>
                <h2
                    className={s.heading}
                    data-editor-focus-heading="skills"
                    tabIndex={-1}
                >
                    <span className={s.headingChip}>
                        {t(uiLanguage, "Vaardigheden", "Skills")}
                    </span>
                </h2>
                <button
                    type="button"
                    onClick={() => append({ name: "", level: 3 })}
                    className={s.addButton}
                >
                    {t(uiLanguage, "+ Toevoegen", "+ Add")}
                </button>
            </div>
            <div className="space-y-3">
                {fields.map((item, index) => (
                    <SkillItem
                        key={item.id}
                        index={index}
                        control={control}
                        register={register}
                        onRemove={() => remove(index)}
                        uiLanguage={uiLanguage}
                    />
                ))}
            </div>
            {fields.length === 0 && (
                <p className={s.emptySmall}>
                    {t(uiLanguage, "Voeg vaardigheden toe met een niveau (1-5 bolletjes).", "Add skills with a level (1-5 dots).")}
                </p>
            )}
        </section>
    );
}

export function LanguagesSection({ control, register, uiLanguage = "nl" }: SectionProps) {
    const s = useSectionStyles();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "languages",
    });

    const levels = [
        { value: "Moedertaal", label: uiLanguage === "en" ? "Native" : "Moedertaal / Native" },
        { value: "Vloeiend", label: uiLanguage === "en" ? "Fluent" : "Vloeiend / Fluent" },
        { value: "Goed", label: uiLanguage === "en" ? "Good" : "Goed / Good" },
        { value: "Basis", label: uiLanguage === "en" ? "Basic" : "Basis / Basic" },
    ];

    return (
        <section className={s.card}>
            <div className={s.headerRow}>
                <h2 className={s.heading}>
                    <span className={s.headingChip}>
                        {t(uiLanguage, "Talen", "Languages")}
                    </span>
                </h2>
                <button
                    type="button"
                    onClick={() => append({ name: "", level: "Goed" })}
                    className={s.addButton}
                >
                    {t(uiLanguage, "+ Toevoegen", "+ Add")}
                </button>
            </div>
            <div className="space-y-3">
                {fields.map((item, index) => (
                    <div key={item.id} className={s.row}>
                        <input
                            {...register(`languages.${index}.name`)}
                            placeholder={t(uiLanguage, "bv. Engels", "e.g. English")}
                            className={`${s.input} flex-1`}
                            style={inputStyle}
                        />
                        <select
                            {...register(`languages.${index}.level`)}
                            className={`${s.input} w-40`}
                            style={inputStyle}
                        >
                            {levels.map((level) => (
                                <option key={level.value} value={level.value}>{level.label}</option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className={s.removeInlineAlt}
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
            {fields.length === 0 && (
                <p className={s.emptySmall}>
                    {t(uiLanguage, "Voeg talen toe met niveau (Moedertaal, Vloeiend, Goed, Basis).", "Add languages with a level (Native, Fluent, Good, Basic).")}
                </p>
            )}
        </section>
    )
}

export function InterestsSection({ control, register, uiLanguage = "nl" }: SectionProps) {
    const s = useSectionStyles();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "interests" as any,
    });

    return (
        <section className={s.card}>
            <div className={s.headerRow}>
                <h2 className={s.heading}>
                    <span className={s.headingChip}>
                        {t(uiLanguage, "Interesses", "Interests")}
                    </span>
                </h2>
                <button
                    type="button"
                    onClick={() => append("" as any)}
                    className={s.addButton}
                >
                    {t(uiLanguage, "+ Toevoegen", "+ Add")}
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {fields.map((item, index) => (
                    <div key={item.id} className="flex gap-1 items-center bg-lime-200 px-3 py-2 border border-slate-300">
                        <input
                            {...register(`interests.${index}` as any)}
                            placeholder={t(uiLanguage, "bv. Lezen", "e.g. Reading")}
                            className="bg-transparent border-none outline-none text-sm font-medium w-24"
                        />
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-black font-black text-xs hover:text-red-600 transition-all"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
            {fields.length === 0 && (
                <p className={s.emptySmall}>
                    {t(uiLanguage, "Voeg interesses toe zoals \"Lezen\", \"Reizen\", \"Sport\".", "Add interests such as \"Reading\", \"Travel\", or \"Sports\".")}
                </p>
            )}
        </section>
    )
}

export function CoursesSection({ control, register, uiLanguage = "nl" }: SectionProps) {
    const s = useSectionStyles();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "courses",
    });

    return (
        <section className={s.card}>
            <div className={s.headerRow}>
                <h2 className={s.heading}>
                    <span className={s.headingChip}>
                        {t(uiLanguage, "Cursussen & Certificaten", "Courses & Certifications")}
                    </span>
                </h2>
                <button
                    type="button"
                    onClick={() => append({ name: "", institution: "", year: "" })}
                    className={s.addButton}
                >
                    {t(uiLanguage, "+ Toevoegen", "+ Add")}
                </button>
            </div>
            <div className="space-y-3">
                {fields.map((item, index) => (
                    <div key={item.id} className={s.row}>
                        <input
                            {...register(`courses.${index}.name`)}
                            placeholder={t(uiLanguage, "Naam van cursus", "Course name")}
                            className={`${s.input} flex-1`}
                            style={inputStyle}
                        />
                        <input
                            {...register(`courses.${index}.institution`)}
                            placeholder={t(uiLanguage, "Instituut", "Institution")}
                            className={`${s.input} w-32`}
                            style={inputStyle}
                        />
                        <input
                            {...register(`courses.${index}.year`)}
                            placeholder={t(uiLanguage, "Jaar", "Year")}
                            className={`${s.input} w-20`}
                            style={inputStyle}
                        />
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className={s.removeInlineAlt}
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
            {fields.length === 0 && (
                <p className={s.emptySmall}>
                    {t(uiLanguage, "Voeg cursussen of certificaten toe.", "Add courses or certifications.")}
                </p>
            )}
        </section>
    )
}

export function AwardsSection({ control, register, uiLanguage = "nl" }: SectionProps) {
    const s = useSectionStyles();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "awards" as any,
    });

    return (
        <section className={s.card}>
            <div className={s.headerRow}>
                <h2 className={s.heading}>
                    <span className={s.headingChip}>
                        {t(uiLanguage, "Prijzen & Onderscheidingen", "Awards & Achievements")}
                    </span>
                </h2>
                <button
                    type="button"
                    onClick={() => append("" as any)}
                    className={s.addButton}
                >
                    {t(uiLanguage, "+ Toevoegen", "+ Add")}
                </button>
            </div>
            <div className="space-y-2">
                {fields.map((item, index) => (
                    <div key={item.id} className={s.rowStart}>
                        <span className="text-black mt-2">🏆</span>
                        <textarea
                            {...register(`awards.${index}` as any)}
                            placeholder={t(uiLanguage, "Beschrijf een prijs, certificaat of bijzondere prestatie...", "Describe an award, certificate, or notable achievement...")}
                            className={`${s.input} min-h-[50px] flex-1`}
                            style={inputStyle}
                        />
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className={s.removeInline}
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
            {fields.length === 0 && (
                <p className={s.emptySmall}>
                    {t(uiLanguage, "Voeg prijzen, certificaten of bijzondere prestaties toe.", "Add awards, certifications, or notable achievements.")}
                </p>
            )}
        </section>
    )
}

export function PropertiesSection({ control, register, uiLanguage = "nl" }: SectionProps) {
    const s = useSectionStyles();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "properties" as any,
    });

    return (
        <section className={s.card}>
            <div className={s.headerRow}>
                <h2 className={s.heading}>
                    <span className={s.headingChip}>
                        {t(uiLanguage, "Eigenschappen", "Strengths")}
                    </span>
                </h2>
                <button
                    type="button"
                    onClick={() => append("" as any)}
                    className={s.addButton}
                >
                    {t(uiLanguage, "+ Toevoegen", "+ Add")}
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {fields.map((item, index) => (
                    <div key={item.id} className="flex gap-1 items-center bg-sky-100 px-3 py-2 border border-slate-300">
                        <input
                            {...register(`properties.${index}` as any)}
                            placeholder={t(uiLanguage, "bv. Proactief", "e.g. Proactive")}
                            className="bg-transparent border-none outline-none text-sm font-medium w-28"
                        />
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-black font-black text-xs hover:text-red-600 transition-all"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
            {fields.length === 0 && (
                <p className={s.emptySmall}>
                    {t(uiLanguage, "Voeg persoonlijke eigenschappen toe zoals \"Nauwkeurig\" of \"Leergierig\".", "Add personal strengths such as \"Accurate\" or \"Eager to learn\".")}
                </p>
            )}
        </section>
    )
}

export function ReferencesSection({ control, register, uiLanguage = "nl" }: SectionProps) {
    const s = useSectionStyles();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "references" as any,
    });

    return (
        <section className={s.card}>
            <div className={s.headerRow}>
                <h2 className={s.heading}>
                    <span className={s.headingChip}>
                        {t(uiLanguage, "Referenties", "References")}
                    </span>
                </h2>
                <button
                    type="button"
                    onClick={() => append({ name: "", role: "", company: "", email: "", phone: "" } as any)}
                    className={s.addButton}
                >
                    {t(uiLanguage, "+ Toevoegen", "+ Add")}
                </button>
            </div>

            <div className="space-y-4">
                {fields.map((item, index) => (
                    <div key={item.id} className={s.item}>
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className={s.removeAbs}
                            title={t(uiLanguage, "Verwijderen", "Remove")}
                        >
                            ✕
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className={s.label}>{t(uiLanguage, "Naam", "Name")}</label>
                                <input
                                    {...register(`references.${index}.name` as any)}
                                    placeholder={t(uiLanguage, "bv. Jan Jansen", "e.g. Jane Smith")}
                                    className={s.input}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label className={s.label}>{t(uiLanguage, "Functie", "Role")}</label>
                                <input
                                    {...register(`references.${index}.role` as any)}
                                    placeholder={t(uiLanguage, "bv. Teamlead Engineering", "e.g. Engineering Manager")}
                                    className={s.input}
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className={s.label}>{t(uiLanguage, "Bedrijf", "Company")}</label>
                                <input
                                    {...register(`references.${index}.company` as any)}
                                    placeholder={t(uiLanguage, "bv. Tech BV", "e.g. Tech BV")}
                                    className={s.input}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label className={s.label}>Email</label>
                                <input
                                    {...register(`references.${index}.email` as any)}
                                    placeholder="jan@bedrijf.nl"
                                    className={s.input}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label className={s.label}>{t(uiLanguage, "Telefoon", "Phone")}</label>
                                <input
                                    {...register(`references.${index}.phone` as any)}
                                    placeholder={t(uiLanguage, "06 12345678", "+31 6 12345678")}
                                    className={s.input}
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {fields.length === 0 && (
                <p className={s.emptySmall}>
                    {t(uiLanguage, "Voeg referenties toe die werkgevers mogen benaderen.", "Add references employers may contact.")}
                </p>
            )}
        </section>
    );
}

export function SideActivitiesSection({ control, register, uiLanguage = "nl" }: SectionProps) {
    const s = useSectionStyles();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "sideActivities" as any,
    });

    return (
        <section className={s.card}>
            <div className={s.headerRow}>
                <h2 className={s.heading}>
                    <span className={s.headingChip}>
                        {t(uiLanguage, "Nevenactiviteiten", "Side Activities")}
                    </span>
                </h2>
                <button
                    type="button"
                    onClick={() => append({ title: "", organization: "", start: "", end: "", description: "" } as any)}
                    className={s.addButton}
                >
                    {t(uiLanguage, "+ Toevoegen", "+ Add")}
                </button>
            </div>

            <div className="space-y-4">
                {fields.map((item, index) => (
                    <div key={item.id} className={s.item}>
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className={s.removeAbs}
                            title={t(uiLanguage, "Verwijderen", "Remove")}
                        >
                            ✕
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className={s.label}>{t(uiLanguage, "Rol of activiteit", "Role or activity")}</label>
                                <input
                                    {...register(`sideActivities.${index}.title` as any)}
                                    placeholder={t(uiLanguage, "bv. Vrijwilliger evenementen", "e.g. Volunteer events coordinator")}
                                    className={s.input}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label className={s.label}>{t(uiLanguage, "Organisatie", "Organization")}</label>
                                <input
                                    {...register(`sideActivities.${index}.organization` as any)}
                                    placeholder={t(uiLanguage, "bv. Stichting X", "e.g. Foundation X")}
                                    className={s.input}
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className={s.label}>{t(uiLanguage, "Start", "Start")}</label>
                                <input
                                    {...register(`sideActivities.${index}.start` as any)}
                                    placeholder={t(uiLanguage, "jan 2022", "Jan 2022")}
                                    className={s.input}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label className={s.label}>{t(uiLanguage, "Eind", "End")}</label>
                                <input
                                    {...register(`sideActivities.${index}.end` as any)}
                                    placeholder={t(uiLanguage, "heden", "Present")}
                                    className={s.input}
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                        <div>
                            <label className={s.label}>{t(uiLanguage, "Omschrijving", "Description")}</label>
                            <textarea
                                {...register(`sideActivities.${index}.description` as any)}
                                placeholder={t(uiLanguage, "Beschrijf je bijdrage of resultaten...", "Describe your contribution or results...")}
                                className={`${s.input} min-h-[60px]`}
                                style={inputStyle}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {fields.length === 0 && (
                <p className={s.emptySmall}>
                    {t(uiLanguage, "Voeg nevenactiviteiten toe zoals vrijwilligerswerk, bestuur of verenigingen.", "Add side activities such as volunteering, board roles, or associations.")}
                </p>
            )}
        </section>
    );
}

function CustomSectionItem({ sectionIndex, control, register, onRemoveSection, uiLanguage }: {
    sectionIndex: number;
    control: Control<CVData>;
    register: UseFormRegister<CVData>;
    onRemoveSection: () => void;
    uiLanguage: UiLanguage;
}) {
    const s = useSectionStyles();
    const { fields, append, remove } = useFieldArray({
        control,
        name: `customSections.${sectionIndex}.items` as any,
    });

    return (
        <div className={s.item}>
            <button
                type="button"
                onClick={onRemoveSection}
                className={s.removeAbs}
                title={t(uiLanguage, "Verwijderen", "Remove")}
            >
                ✕
            </button>

            <div className="mb-4">
                <label className={s.label}>{t(uiLanguage, "Titel onderdeel", "Section title")}</label>
                <input
                    {...register(`customSections.${sectionIndex}.title` as any)}
                    placeholder={t(uiLanguage, "bv. Publicaties", "e.g. Publications")}
                    className={s.input}
                    style={inputStyle}
                />
            </div>

            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className={s.labelBare}>{t(uiLanguage, "Inhoud", "Content")}</label>
                    <button
                        type="button"
                        onClick={() => append("" as any)}
                        className={s.smallAdd}
                    >
                        {t(uiLanguage, "+ Punt", "+ Bullet")}
                    </button>
                </div>
                <div className="space-y-2">
                    {fields.map((item, itemIndex) => (
                        <div key={item.id} className="flex gap-2 items-start">
                            <span className="text-black mt-2">•</span>
                            <textarea
                                {...register(`customSections.${sectionIndex}.items.${itemIndex}` as any)}
                                placeholder={t(uiLanguage, "Voeg detail toe...", "Add detail...")}
                                className={`${s.input} min-h-[50px] flex-1`}
                                style={inputStyle}
                            />
                            <button
                                type="button"
                                onClick={() => remove(itemIndex)}
                                className={s.removeInline}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function CustomSectionsSection({ control, register, uiLanguage = "nl" }: SectionProps) {
    const s = useSectionStyles();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "customSections" as any,
    });

    return (
        <section className={s.card}>
            <div className={s.headerRow}>
                <h2 className={s.heading}>
                    <span className={s.headingChip}>
                        {t(uiLanguage, "Eigen onderdeel", "Custom Section")}
                    </span>
                </h2>
                <button
                    type="button"
                    onClick={() => append({ title: "", items: [] } as any)}
                    className={s.addButton}
                >
                    {t(uiLanguage, "+ Onderdeel", "+ Section")}
                </button>
            </div>

            <div className="space-y-4">
                {fields.map((item, index) => (
                    <CustomSectionItem
                        key={item.id}
                        sectionIndex={index}
                        control={control}
                        register={register}
                        onRemoveSection={() => remove(index)}
                        uiLanguage={uiLanguage}
                    />
                ))}
            </div>

            {fields.length === 0 && (
                <p className={s.emptySmall}>
                    {t(uiLanguage, "Maak een vrij onderdeel zoals Publicaties, Projecten of Lidmaatschappen.", "Create a free section such as Publications, Projects, or Memberships.")}
                </p>
            )}
        </section>
    );
}



