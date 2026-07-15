import { CVData } from "@/lib/cv";
import { ColorTheme } from "@/lib/templates";
import { LinkText } from "./link-utils";
import { formatGender, formatLanguageLevel, formatMaritalStatus, resumeText } from "@/lib/resume-language";
import type { ReactNode } from "react";

interface TemplateProps {
    data: CVData;
    theme: ColorTheme;
}

function dateRange(start?: string, end?: string) {
    return [start, end].filter(Boolean).join(" - ");
}

function Section({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="mb-6">
            <h2 className="mb-3 border-b border-slate-200 pb-2 text-[13px] font-bold uppercase tracking-[0.16em] text-slate-700">
                {title}
            </h2>
            {children}
        </section>
    );
}

function MutedText({ children }: { children: ReactNode }) {
    return <p className="text-[12px] leading-[1.55] text-slate-500">{children}</p>;
}

export default function ProfessionalTemplate({ data, theme }: TemplateProps) {
    const contactItems = [
        data.personal.email,
        data.personal.phone,
        data.personal.address,
        data.personal.postalCode,
        data.personal.location,
    ].filter((value): value is string => Boolean(value && value.trim()));

    const personalDetails = [
        data.personal.birthDate || data.personal.birthPlace
            ? `${resumeText(data, "birthDateAndPlace")}: ${data.personal.birthDate || ""}${data.personal.birthPlace ? `, ${data.personal.birthPlace}` : ""}`
            : null,
        data.personal.nationality ? `${resumeText(data, "nationality")}: ${data.personal.nationality}` : null,
        data.personal.driversLicense ? `${resumeText(data, "driversLicense")}: ${data.personal.driversLicense}` : null,
        formatGender(data.personal.gender, data) ? `${resumeText(data, "gender")}: ${formatGender(data.personal.gender, data)}` : null,
        formatMaritalStatus(data.personal.maritalStatus, data) ? `${resumeText(data, "maritalStatus")}: ${formatMaritalStatus(data.personal.maritalStatus, data)}` : null,
    ].filter(Boolean);

    return (
        <div
            className="mx-auto min-h-[297mm] w-[210mm] bg-white px-10 py-11 font-sans text-[12px] leading-[1.45] text-slate-900"
            style={{ color: theme.text }}
        >
            <header className="mb-7 border-b-2 border-slate-700 pb-6 text-center">
                {data.personal.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={data.personal.photo}
                        alt={data.personal.name || resumeText(data, "profilePhotoAlt")}
                        className="mx-auto mb-3 h-20 w-20 rounded-full object-cover"
                        style={{ border: `3px solid ${theme.primary}` }}
                    />
                ) : null}
                <h1 className="text-[31px] font-extrabold leading-tight tracking-normal text-slate-950">
                    {data.personal.name || resumeText(data, "nameFallback")}
                </h1>
                {data.personal.title ? (
                    <p className="mt-1 text-[15px] font-medium text-slate-500">{data.personal.title}</p>
                ) : null}
                {contactItems.length > 0 ? (
                    <div className="mt-3 flex flex-wrap justify-center gap-x-2 gap-y-1 text-[11px] leading-relaxed text-slate-500">
                        {contactItems.map((item, index) => (
                            <span key={`${item}-${index}`} className="inline-flex items-center gap-2">
                                {index > 0 ? <span className="text-slate-300">|</span> : null}
                                <LinkText value={item} />
                            </span>
                        ))}
                    </div>
                ) : null}
                {(data.personal.linkedIn || data.personal.github || data.personal.website) ? (
                    <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10.5px] leading-relaxed text-slate-500">
                        {data.personal.linkedIn ? <span>LinkedIn: <LinkText value={data.personal.linkedIn} /></span> : null}
                        {data.personal.github ? <span>GitHub: <LinkText value={data.personal.github} /></span> : null}
                        {data.personal.website ? <span>Website: <LinkText value={data.personal.website} /></span> : null}
                    </div>
                ) : null}
                {personalDetails.length > 0 ? (
                    <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10.5px] text-slate-500">
                        {personalDetails.map((item) => <span key={item}>{item}</span>)}
                    </div>
                ) : null}
            </header>

            {data.personal.summary ? (
                <Section title={resumeText(data, "profile")}>
                    <p className="whitespace-pre-wrap text-[12.5px] leading-[1.65] text-slate-800">
                        {data.personal.summary}
                    </p>
                </Section>
            ) : null}

            {data.experience.length > 0 ? (
                <Section title={resumeText(data, "experience")}>
                    <div className="space-y-4">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="break-inside-avoid">
                                <div className="flex items-start justify-between gap-5">
                                    <div className="min-w-0">
                                        <h3 className="text-[13px] font-bold leading-snug text-slate-950">{exp.role}</h3>
                                        <p className="mt-0.5 text-[12px] font-medium text-slate-500">
                                            {exp.company}{exp.location ? ` | ${exp.location}` : ""}
                                        </p>
                                    </div>
                                    <span className="shrink-0 whitespace-nowrap text-right text-[11px] text-slate-500">
                                        {dateRange(exp.start, exp.end)}
                                    </span>
                                </div>
                                {exp.description ? <MutedText>{exp.description}</MutedText> : null}
                                {exp.highlights && exp.highlights.length > 0 ? (
                                    <ul className="mt-1.5 list-disc space-y-0.5 pl-5 text-[11.5px] leading-[1.42] text-slate-800">
                                        {exp.highlights.map((highlight, highlightIndex) => (
                                            <li key={highlightIndex}>{highlight}</li>
                                        ))}
                                    </ul>
                                ) : null}
                            </div>
                        ))}
                    </div>
                </Section>
            ) : null}

            {data.internships && data.internships.length > 0 ? (
                <Section title={resumeText(data, "internships")}>
                    <div className="space-y-4">
                        {data.internships.map((internship, index) => (
                            <div key={index} className="break-inside-avoid">
                                <div className="flex items-start justify-between gap-5">
                                    <div>
                                        <h3 className="text-[13px] font-bold leading-snug text-slate-950">{internship.role}</h3>
                                        <p className="mt-0.5 text-[12px] font-medium text-slate-500">
                                            {internship.company}{internship.location ? ` | ${internship.location}` : ""}
                                        </p>
                                    </div>
                                    <span className="shrink-0 whitespace-nowrap text-right text-[11px] text-slate-500">
                                        {dateRange(internship.start, internship.end)}
                                    </span>
                                </div>
                                {internship.description ? <MutedText>{internship.description}</MutedText> : null}
                                {internship.highlights && internship.highlights.length > 0 ? (
                                    <ul className="mt-1.5 list-disc space-y-0.5 pl-5 text-[11.5px] leading-[1.42] text-slate-800">
                                        {internship.highlights.map((highlight, highlightIndex) => (
                                            <li key={highlightIndex}>{highlight}</li>
                                        ))}
                                    </ul>
                                ) : null}
                            </div>
                        ))}
                    </div>
                </Section>
            ) : null}

            {data.education.length > 0 ? (
                <Section title={resumeText(data, "education")}>
                    <div className="space-y-3.5">
                        {data.education.map((education, index) => (
                            <div key={index} className="break-inside-avoid">
                                <div className="flex items-start justify-between gap-5">
                                    <div>
                                        <h3 className="text-[13px] font-bold leading-snug text-slate-950">{education.degree}</h3>
                                        <p className="mt-0.5 text-[12px] font-medium text-slate-500">
                                            {education.school}{education.location ? ` | ${education.location}` : ""}
                                        </p>
                                    </div>
                                    <span className="shrink-0 whitespace-nowrap text-right text-[11px] text-slate-500">
                                        {dateRange(education.start, education.end)}
                                    </span>
                                </div>
                                {education.description ? <MutedText>{education.description}</MutedText> : null}
                            </div>
                        ))}
                    </div>
                </Section>
            ) : null}

            {data.awards && data.awards.length > 0 ? (
                <Section title={resumeText(data, "awards")}>
                    <ul className="list-disc space-y-1 pl-5 text-[11.5px] leading-[1.5] text-slate-800">
                        {data.awards.map((award, index) => <li key={index}>{award}</li>)}
                    </ul>
                </Section>
            ) : null}

            {data.courses && data.courses.length > 0 ? (
                <Section title={resumeText(data, "courses")}>
                    <div className="space-y-1.5">
                        {data.courses.map((course, index) => (
                            <div key={index} className="flex justify-between gap-4 text-[11.5px]">
                                <span className="font-semibold text-slate-900">{course.name}</span>
                                <span className="text-slate-500">{course.institution} | {course.year}</span>
                            </div>
                        ))}
                    </div>
                </Section>
            ) : null}

            {(data.skills.length > 0 || data.languages.length > 0 || (data.interests && data.interests.length > 0)) ? (
                <div className="grid grid-cols-1 gap-5">
                    {data.skills.length > 0 ? (
                        <Section title={resumeText(data, "skills")}>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, index) => (
                                    <span key={index} className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-700">
                                        {typeof skill === "object" ? skill.name : skill}
                                    </span>
                                ))}
                            </div>
                        </Section>
                    ) : null}

                    {data.languages.length > 0 ? (
                        <Section title={resumeText(data, "languages")}>
                            <div className="flex flex-wrap gap-2">
                                {data.languages.map((language, index) => (
                                    <span key={index} className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-700">
                                        {typeof language === "object" ? `${language.name} (${formatLanguageLevel(language.level, data)})` : language}
                                    </span>
                                ))}
                            </div>
                        </Section>
                    ) : null}

                    {data.interests && data.interests.length > 0 ? (
                        <Section title={resumeText(data, "interests")}>
                            <div className="flex flex-wrap gap-2">
                                {data.interests.map((interest, index) => (
                                    <span key={index} className="rounded-full bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-600">
                                        {interest}
                                    </span>
                                ))}
                            </div>
                        </Section>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}
