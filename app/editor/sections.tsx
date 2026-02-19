"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useFieldArray, Control, UseFormRegister, Controller } from "react-hook-form";
import { CVData } from "@/lib/cv";

interface SectionProps {
    control: Control<CVData>;
    register: UseFormRegister<CVData>;
}

// Reusable input styles - text-black ensures populated values are clearly visible (not gray like placeholders)
const inputClass = "w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100";
const inputStyle = undefined;

export function ExperienceSection({ control, register }: SectionProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "experience",
    });

    return (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 border border-slate-200 rounded-md inline-block">
                        Werkervaring
                    </span>
                </h2>
                <button
                    type="button"
                    onClick={() => append({ role: "", company: "", description: "", start: "", end: "", location: "", highlights: [] })}
                    className="text-sm bg-emerald-600 text-white font-semibold px-3 py-1.5 rounded-md border border-emerald-700 hover:bg-emerald-700 transition-colors"
                >
                    + Toevoegen
                </button>
            </div>

            <div className="space-y-4">
                {fields.map((item, index) => (
                    <ExperienceItem key={item.id} index={index} register={register} control={control} onRemove={() => remove(index)} fieldName="experience" />
                ))}
                {fields.length === 0 && (
                    <div className="text-center py-8 bg-slate-50 border border-dashed border-slate-300 text-slate-600 font-medium text-sm rounded-xl">
                        Nog geen werkervaring toegevoegd.
                    </div>
                )}
            </div>
        </section>
    );
}

function ExperienceItem({ index, register, control, onRemove, fieldName }: {
    index: number;
    register: UseFormRegister<CVData>;
    control: Control<CVData>;
    onRemove: () => void;
    fieldName: "experience" | "internships";
}) {
    const { fields: highlightFields, append: appendHighlight, remove: removeHighlight } = useFieldArray({
        control,
        name: `${fieldName}.${index}.highlights` as any,
    });

    return (
        <div className="relative bg-slate-50 p-4 border border-slate-200 rounded-xl group">
            <button
                type="button"
                onClick={onRemove}
                className="absolute top-2 right-2 bg-white text-rose-700 font-semibold px-2 py-1 text-xs border border-rose-200 rounded-md opacity-0 group-hover:opacity-100 hover:bg-rose-50 transition-colors"
                title="Verwijderen"
            >
                ✕
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Functie</label>
                    <input
                        {...register(`${fieldName}.${index}.role` as any)}
                        placeholder="bv. Software Developer"
                        className={inputClass}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Bedrijf</label>
                    <input
                        {...register(`${fieldName}.${index}.company` as any)}
                        placeholder="bv. Tech Solutions BV"
                        className={inputClass}
                        style={inputStyle}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Start</label>
                    <input
                        {...register(`${fieldName}.${index}.start` as any)}
                        placeholder="bv. jan 2020"
                        className={inputClass}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Eind</label>
                    <input
                        {...register(`${fieldName}.${index}.end` as any)}
                        placeholder="bv. heden"
                        className={inputClass}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Locatie</label>
                    <input
                        {...register(`${fieldName}.${index}.location` as any)}
                        placeholder="bv. Amsterdam"
                        className={inputClass}
                        style={inputStyle}
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Omschrijving (optioneel)</label>
                <textarea
                    {...register(`${fieldName}.${index}.description` as any)}
                    placeholder="Korte omschrijving van je rol..."
                    className={`${inputClass} min-h-[60px]`}
                    style={inputStyle}
                />
            </div>

            {/* Highlights / Bullet points */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Taken & Resultaten</label>
                    <button
                        type="button"
                        onClick={() => appendHighlight("" as any)}
                        className="text-xs bg-sky-100 text-sky-900 font-semibold px-2 py-1 rounded-md border border-sky-300 hover:bg-sky-200 transition-colors"
                    >
                        + Punt
                    </button>
                </div>
                <div className="space-y-2">
                    {highlightFields.map((h, hIndex) => (
                        <div key={h.id} className="flex gap-2 items-start">
                            <span className="text-black mt-2">•</span>
                            <textarea
                                {...register(`${fieldName}.${index}.highlights.${hIndex}` as any)}
                                placeholder="Beschrijf een taak of resultaat..."
                                className={`${inputClass} min-h-[50px] flex-1`}
                                style={inputStyle}
                            />
                            <button
                                type="button"
                                onClick={() => removeHighlight(hIndex)}
                                className="bg-white text-rose-700 font-semibold px-2 py-1 text-xs border border-rose-200 rounded-md hover:bg-rose-50 transition-colors mt-1"
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

export function InternshipsSection({ control, register }: SectionProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "internships",
    });

    return (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 border border-slate-200 rounded-md inline-block">
                        Stages
                    </span>
                </h2>
                <button
                    type="button"
                    onClick={() => append({ role: "", company: "", description: "", start: "", end: "", location: "", highlights: [] })}
                    className="text-sm bg-emerald-600 text-white font-semibold px-3 py-1.5 rounded-md border border-emerald-700 hover:bg-emerald-700 transition-colors"
                >
                    + Toevoegen
                </button>
            </div>

            <div className="space-y-4">
                {fields.map((item, index) => (
                    <ExperienceItem key={item.id} index={index} register={register} control={control} onRemove={() => remove(index)} fieldName="internships" />
                ))}
                {fields.length === 0 && (
                    <div className="text-center py-6 bg-slate-50 border border-dashed border-slate-300 text-slate-600 font-medium text-sm rounded-xl">
                        Nog geen stages toegevoegd.
                    </div>
                )}
            </div>
        </section>
    );
}

export function EducationSection({ control, register }: SectionProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "education",
    });

    return (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 border border-slate-200 rounded-md inline-block">
                        Opleidingen
                    </span>
                </h2>
                <button
                    type="button"
                    onClick={() => append({ degree: "", school: "", start: "", end: "", location: "", description: "" })}
                    className="text-sm bg-emerald-600 text-white font-semibold px-3 py-1.5 rounded-md border border-emerald-700 hover:bg-emerald-700 transition-colors"
                >
                    + Toevoegen
                </button>
            </div>

            <div className="space-y-4">
                {fields.map((item, index) => (
                    <div key={item.id} className="relative bg-slate-50 p-4 border border-slate-200 rounded-xl group">
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="absolute top-2 right-2 bg-white text-rose-700 font-semibold px-2 py-1 text-xs border border-rose-200 rounded-md opacity-0 group-hover:opacity-100 hover:bg-rose-50 transition-colors"
                            title="Verwijderen"
                        >
                            ✕
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Opleiding / Studie</label>
                                <input
                                    {...register(`education.${index}.degree`)}
                                    placeholder="bv. HBO Informatica"
                                    className={inputClass}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Onderwijsinstelling</label>
                                <input
                                    {...register(`education.${index}.school`)}
                                    placeholder="bv. Hogeschool Utrecht"
                                    className={inputClass}
                                    style={inputStyle}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Start</label>
                                <input
                                    {...register(`education.${index}.start`)}
                                    placeholder="sep 2016"
                                    className={inputClass}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Eind</label>
                                <input
                                    {...register(`education.${index}.end`)}
                                    placeholder="jun 2020"
                                    className={inputClass}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Locatie</label>
                                <input
                                    {...register(`education.${index}.location`)}
                                    placeholder="bv. Utrecht"
                                    className={inputClass}
                                    style={inputStyle}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Omschrijving (optioneel)</label>
                            <textarea
                                {...register(`education.${index}.description`)}
                                placeholder="Relevante vakken, thesis, etc..."
                                className={`${inputClass} min-h-[60px]`}
                                style={inputStyle}
                            />
                        </div>
                    </div>
                ))}
                {fields.length === 0 && (
                    <div className="text-center py-6 bg-slate-50 border border-dashed border-slate-300 text-slate-600 font-medium text-sm rounded-xl">
                        Nog geen opleiding toegevoegd.
                    </div>
                )}
            </div>
        </section>
    );
}

// Individual skill item with controlled level using Controller for reliable updates
function SkillItem({ index, control, register, onRemove }: {
    index: number;
    control: Control<CVData>;
    register: UseFormRegister<CVData>;
    onRemove: () => void;
}) {
    return (
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center bg-slate-50 p-3 border border-slate-200 rounded-xl">
            <input
                {...register(`skills.${index}.name`)}
                placeholder="bv. Projectmanagement"
                className={`${inputClass} flex-1`}
                style={inputStyle}
            />
            <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-black whitespace-nowrap">Niveau:</span>
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
                                        (field.value || 3) >= level ? 'bg-pink-500' : 'bg-white'
                                    }`}
                                    title={`Niveau ${level}`}
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

export function SkillsSection({ control, register }: SectionProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "skills",
    });

    return (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 border border-slate-200 rounded-md inline-block">
                        Vaardigheden
                    </span>
                </h2>
                <button
                    type="button"
                    onClick={() => append({ name: "", level: 3 })}
                    className="text-sm bg-emerald-600 text-white font-semibold px-3 py-1.5 rounded-md border border-emerald-700 hover:bg-emerald-700 transition-colors"
                >
                    + Toevoegen
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
                    />
                ))}
            </div>
            {fields.length === 0 && (
                <p className="text-sm text-slate-600 font-medium bg-slate-50 p-3 border border-dashed border-slate-300 rounded-xl">
                    Voeg vaardigheden toe met een niveau (1-5 bolletjes).
                </p>
            )}
        </section>
    );
}

export function LanguagesSection({ control, register }: SectionProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "languages",
    });

    // Support both Dutch and English language levels (for uploaded CVs in either language)
    const levels = [
        { value: "Moedertaal", label: "Moedertaal / Native" },
        { value: "Vloeiend", label: "Vloeiend / Fluent" },
        { value: "Goed", label: "Goed / Good" },
        { value: "Basis", label: "Basis / Basic" },
    ];

    return (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 border border-slate-200 rounded-md inline-block">
                        Talen
                    </span>
                </h2>
                <button
                    type="button"
                    onClick={() => append({ name: "", level: "Goed" })}
                    className="text-sm bg-emerald-600 text-white font-semibold px-3 py-1.5 rounded-md border border-emerald-700 hover:bg-emerald-700 transition-colors"
                >
                    + Toevoegen
                </button>
            </div>
            <div className="space-y-3">
                {fields.map((item, index) => (
                    <div key={item.id} className="flex gap-3 items-center bg-slate-50 p-3 border border-slate-200 rounded-xl">
                        <input
                            {...register(`languages.${index}.name`)}
                            placeholder="bv. Engels"
                            className={`${inputClass} flex-1`}
                            style={inputStyle}
                        />
                        <select
                            {...register(`languages.${index}.level`)}
                            className={`${inputClass} w-40`}
                            style={inputStyle}
                        >
                            {levels.map((level) => (
                                <option key={level.value} value={level.value}>{level.label}</option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="bg-red-400 text-black font-black px-2 py-2 text-xs border border-slate-300 hover:bg-red-500 transition-all"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
            {fields.length === 0 && (
                <p className="text-sm text-slate-600 font-medium bg-slate-50 p-3 border border-dashed border-slate-300 rounded-xl">
                    Voeg talen toe met niveau (Moedertaal, Vloeiend, Goed, Basis).
                </p>
            )}
        </section>
    )
}

export function InterestsSection({ control, register }: SectionProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "interests" as any,
    });

    return (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 border border-slate-200 rounded-md inline-block">
                        Interesses
                    </span>
                </h2>
                <button
                    type="button"
                    onClick={() => append("" as any)}
                    className="text-sm bg-emerald-600 text-white font-semibold px-3 py-1.5 rounded-md border border-emerald-700 hover:bg-emerald-700 transition-colors"
                >
                    + Toevoegen
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {fields.map((item, index) => (
                    <div key={item.id} className="flex gap-1 items-center bg-lime-200 px-3 py-2 border border-slate-300">
                        <input
                            {...register(`interests.${index}` as any)}
                            placeholder="bv. Lezen"
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
                <p className="text-sm text-slate-600 font-medium bg-slate-50 p-3 border border-dashed border-slate-300 rounded-xl">
                    Voeg interesses toe zoals &quot;Lezen&quot;, &quot;Reizen&quot;, &quot;Sport&quot;.
                </p>
            )}
        </section>
    )
}

export function CoursesSection({ control, register }: SectionProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "courses",
    });

    return (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 border border-slate-200 rounded-md inline-block">
                        Cursussen & Certificaten
                    </span>
                </h2>
                <button
                    type="button"
                    onClick={() => append({ name: "", institution: "", year: "" })}
                    className="text-sm bg-emerald-600 text-white font-semibold px-3 py-1.5 rounded-md border border-emerald-700 hover:bg-emerald-700 transition-colors"
                >
                    + Toevoegen
                </button>
            </div>
            <div className="space-y-3">
                {fields.map((item, index) => (
                    <div key={item.id} className="flex gap-3 items-center bg-slate-50 p-3 border border-slate-200 rounded-xl">
                        <input
                            {...register(`courses.${index}.name`)}
                            placeholder="Cursus naam"
                            className={`${inputClass} flex-1`}
                            style={inputStyle}
                        />
                        <input
                            {...register(`courses.${index}.institution`)}
                            placeholder="Instituut"
                            className={`${inputClass} w-32`}
                            style={inputStyle}
                        />
                        <input
                            {...register(`courses.${index}.year`)}
                            placeholder="Jaar"
                            className={`${inputClass} w-20`}
                            style={inputStyle}
                        />
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="bg-red-400 text-black font-black px-2 py-2 text-xs border border-slate-300 hover:bg-red-500 transition-all"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
            {fields.length === 0 && (
                <p className="text-sm text-slate-600 font-medium bg-slate-50 p-3 border border-dashed border-slate-300 rounded-xl">
                    Voeg cursussen of certificaten toe.
                </p>
            )}
        </section>
    )
}

export function AwardsSection({ control, register }: SectionProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "awards" as any,
    });

    return (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 border border-slate-200 rounded-md inline-block">
                        Prijzen & Onderscheidingen
                    </span>
                </h2>
                <button
                    type="button"
                    onClick={() => append("" as any)}
                    className="text-sm bg-emerald-600 text-white font-semibold px-3 py-1.5 rounded-md border border-emerald-700 hover:bg-emerald-700 transition-colors"
                >
                    + Toevoegen
                </button>
            </div>
            <div className="space-y-2">
                {fields.map((item, index) => (
                    <div key={item.id} className="flex gap-2 items-start bg-slate-50 p-3 border border-slate-200 rounded-xl">
                        <span className="text-black mt-2">🏆</span>
                        <textarea
                            {...register(`awards.${index}` as any)}
                            placeholder="Beschrijf een prijs, certificaat of bijzondere prestatie..."
                            className={`${inputClass} min-h-[50px] flex-1`}
                            style={inputStyle}
                        />
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="bg-white text-rose-700 font-semibold px-2 py-1 text-xs border border-rose-200 rounded-md hover:bg-rose-50 transition-colors mt-1"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
            {fields.length === 0 && (
                <p className="text-sm text-slate-600 font-medium bg-slate-50 p-3 border border-dashed border-slate-300 rounded-xl">
                    Voeg prijzen, certificaten of bijzondere prestaties toe.
                </p>
            )}
        </section>
    )
}

export function PropertiesSection({ control, register }: SectionProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "properties" as any,
    });

    return (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 border border-slate-200 rounded-md inline-block">
                        Eigenschappen
                    </span>
                </h2>
                <button
                    type="button"
                    onClick={() => append("" as any)}
                    className="text-sm bg-emerald-600 text-white font-semibold px-3 py-1.5 rounded-md border border-emerald-700 hover:bg-emerald-700 transition-colors"
                >
                    + Toevoegen
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {fields.map((item, index) => (
                    <div key={item.id} className="flex gap-1 items-center bg-sky-100 px-3 py-2 border border-slate-300">
                        <input
                            {...register(`properties.${index}` as any)}
                            placeholder="bv. Proactief"
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
                <p className="text-sm text-slate-600 font-medium bg-slate-50 p-3 border border-dashed border-slate-300 rounded-xl">
                    Voeg persoonlijke eigenschappen toe zoals &quot;Nauwkeurig&quot; of &quot;Leergierig&quot;.
                </p>
            )}
        </section>
    )
}

export function ReferencesSection({ control, register }: SectionProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "references" as any,
    });

    return (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 border border-slate-200 rounded-md inline-block">
                        Referenties
                    </span>
                </h2>
                <button
                    type="button"
                    onClick={() => append({ name: "", role: "", company: "", email: "", phone: "" } as any)}
                    className="text-sm bg-emerald-600 text-white font-semibold px-3 py-1.5 rounded-md border border-emerald-700 hover:bg-emerald-700 transition-colors"
                >
                    + Toevoegen
                </button>
            </div>

            <div className="space-y-4">
                {fields.map((item, index) => (
                    <div key={item.id} className="relative bg-slate-50 p-4 border border-slate-200 rounded-xl group">
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="absolute top-2 right-2 bg-white text-rose-700 font-semibold px-2 py-1 text-xs border border-rose-200 rounded-md opacity-0 group-hover:opacity-100 hover:bg-rose-50 transition-colors"
                            title="Verwijderen"
                        >
                            ✕
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Naam</label>
                                <input
                                    {...register(`references.${index}.name` as any)}
                                    placeholder="bv. Jan Jansen"
                                    className={inputClass}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Functie</label>
                                <input
                                    {...register(`references.${index}.role` as any)}
                                    placeholder="bv. Teamlead Engineering"
                                    className={inputClass}
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Bedrijf</label>
                                <input
                                    {...register(`references.${index}.company` as any)}
                                    placeholder="bv. Tech BV"
                                    className={inputClass}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Email</label>
                                <input
                                    {...register(`references.${index}.email` as any)}
                                    placeholder="jan@bedrijf.nl"
                                    className={inputClass}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Telefoon</label>
                                <input
                                    {...register(`references.${index}.phone` as any)}
                                    placeholder="06 12345678"
                                    className={inputClass}
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {fields.length === 0 && (
                <p className="text-sm text-slate-600 font-medium bg-slate-50 p-3 border border-dashed border-slate-300 rounded-xl">
                    Voeg referenties toe die werkgevers mogen benaderen.
                </p>
            )}
        </section>
    );
}

export function SideActivitiesSection({ control, register }: SectionProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "sideActivities" as any,
    });

    return (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 border border-slate-200 rounded-md inline-block">
                        Nevenactiviteiten
                    </span>
                </h2>
                <button
                    type="button"
                    onClick={() => append({ title: "", organization: "", start: "", end: "", description: "" } as any)}
                    className="text-sm bg-emerald-600 text-white font-semibold px-3 py-1.5 rounded-md border border-emerald-700 hover:bg-emerald-700 transition-colors"
                >
                    + Toevoegen
                </button>
            </div>

            <div className="space-y-4">
                {fields.map((item, index) => (
                    <div key={item.id} className="relative bg-slate-50 p-4 border border-slate-200 rounded-xl group">
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="absolute top-2 right-2 bg-white text-rose-700 font-semibold px-2 py-1 text-xs border border-rose-200 rounded-md opacity-0 group-hover:opacity-100 hover:bg-rose-50 transition-colors"
                            title="Verwijderen"
                        >
                            ✕
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Rol of activiteit</label>
                                <input
                                    {...register(`sideActivities.${index}.title` as any)}
                                    placeholder="bv. Vrijwilliger evenementen"
                                    className={inputClass}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Organisatie</label>
                                <input
                                    {...register(`sideActivities.${index}.organization` as any)}
                                    placeholder="bv. Stichting X"
                                    className={inputClass}
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Start</label>
                                <input
                                    {...register(`sideActivities.${index}.start` as any)}
                                    placeholder="jan 2022"
                                    className={inputClass}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Eind</label>
                                <input
                                    {...register(`sideActivities.${index}.end` as any)}
                                    placeholder="heden"
                                    className={inputClass}
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Omschrijving</label>
                            <textarea
                                {...register(`sideActivities.${index}.description` as any)}
                                placeholder="Beschrijf je bijdrage of resultaten..."
                                className={`${inputClass} min-h-[60px]`}
                                style={inputStyle}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {fields.length === 0 && (
                <p className="text-sm text-slate-600 font-medium bg-slate-50 p-3 border border-dashed border-slate-300 rounded-xl">
                    Voeg nevenactiviteiten toe zoals vrijwilligerswerk, bestuur of verenigingen.
                </p>
            )}
        </section>
    );
}

function CustomSectionItem({ sectionIndex, control, register, onRemoveSection }: {
    sectionIndex: number;
    control: Control<CVData>;
    register: UseFormRegister<CVData>;
    onRemoveSection: () => void;
}) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `customSections.${sectionIndex}.items` as any,
    });

    return (
        <div className="relative bg-slate-50 p-4 border border-slate-200 rounded-xl group">
            <button
                type="button"
                onClick={onRemoveSection}
                className="absolute top-2 right-2 bg-white text-rose-700 font-semibold px-2 py-1 text-xs border border-rose-200 rounded-md opacity-0 group-hover:opacity-100 hover:bg-rose-50 transition-colors"
                title="Verwijderen"
            >
                ✕
            </button>

            <div className="mb-4">
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Titel onderdeel</label>
                <input
                    {...register(`customSections.${sectionIndex}.title` as any)}
                    placeholder="bv. Publicaties"
                    className={inputClass}
                    style={inputStyle}
                />
            </div>

            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Inhoud</label>
                    <button
                        type="button"
                        onClick={() => append("" as any)}
                        className="text-xs bg-sky-100 text-sky-900 font-semibold px-2 py-1 rounded-md border border-sky-300 hover:bg-sky-200 transition-colors"
                    >
                        + Punt
                    </button>
                </div>
                <div className="space-y-2">
                    {fields.map((item, itemIndex) => (
                        <div key={item.id} className="flex gap-2 items-start">
                            <span className="text-black mt-2">•</span>
                            <textarea
                                {...register(`customSections.${sectionIndex}.items.${itemIndex}` as any)}
                                placeholder="Voeg detail toe..."
                                className={`${inputClass} min-h-[50px] flex-1`}
                                style={inputStyle}
                            />
                            <button
                                type="button"
                                onClick={() => remove(itemIndex)}
                                className="bg-white text-rose-700 font-semibold px-2 py-1 text-xs border border-rose-200 rounded-md hover:bg-rose-50 transition-colors mt-1"
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

export function CustomSectionsSection({ control, register }: SectionProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "customSections" as any,
    });

    return (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 border border-slate-200 rounded-md inline-block">
                        Eigen onderdeel
                    </span>
                </h2>
                <button
                    type="button"
                    onClick={() => append({ title: "", items: [] } as any)}
                    className="text-sm bg-emerald-600 text-white font-semibold px-3 py-1.5 rounded-md border border-emerald-700 hover:bg-emerald-700 transition-colors"
                >
                    + Onderdeel
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
                    />
                ))}
            </div>

            {fields.length === 0 && (
                <p className="text-sm text-slate-600 font-medium bg-slate-50 p-3 border border-dashed border-slate-300 rounded-xl">
                    Maak een vrij onderdeel zoals Publicaties, Projecten of Lidmaatschappen.
                </p>
            )}
        </section>
    );
}



