import { cloneElement, type ReactElement, type ReactNode } from "react";
import type { CVData } from "@/lib/cv";
import type { ColorTheme } from "@/lib/templates";
import { formatGender, formatLanguageLevel, formatMaritalStatus, resumeText } from "@/lib/resume-language";
import { cvSectionHasSubstantiveContent, resolveCvSectionLayout, type CvBodySectionId } from "@/lib/cv-sections";
import { OrderedSectionContainer } from "./section-layout";
import { LinkText } from "./link-utils";

export type TemplateVisualStyle = {
    id: string;
    font: "sans" | "serif" | "mono";
    headerAlign: "left" | "center";
    heading: "line" | "accent" | "boxed" | "minimal";
    sidebar: "solid" | "soft" | "outline";
    identity: "main" | "sidebar";
    photo: "circle" | "rounded" | "square" | "hidden";
    skills: "pills" | "bars" | "plain" | "dots";
};

export type TemplateSectionRenderProps = {
    id: CvBodySectionId;
    title: string;
    children: ReactNode;
    inverse: boolean;
};

interface CanonicalCvTemplateProps {
    data: CVData;
    theme: ColorTheme;
    templateId: string;
    visualStyle: TemplateVisualStyle;
    renderSection: (props: TemplateSectionRenderProps) => ReactElement;
}

function dateRange(start?: string, end?: string) {
    return [start, end].filter(Boolean).join(" – ");
}

function fontClass(font: TemplateVisualStyle["font"]) {
    if (font === "serif") return "font-serif";
    if (font === "mono") return "font-mono";
    return "font-sans";
}

function headingClass(style: TemplateVisualStyle["heading"]) {
    const base = "mb-3 pb-2 text-[12px] font-bold uppercase tracking-[0.16em]";
    if (style === "minimal") return `${base} pb-0`;
    if (style === "boxed") return `${base} border px-2 py-1.5`;
    if (style === "accent") return `${base} border-l-4 pl-3`;
    return `${base} border-b`;
}

function ArrayList({ items }: { items: string[] }) {
    return <ul className="list-disc space-y-1 pl-5 text-[11.5px] leading-[1.5]">{items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul>;
}

function RatedItems({ items, style }: { items: Array<{ name: string; level?: number }>; style: TemplateVisualStyle["skills"] }) {
    if (style === "plain") return <div className="space-y-1 text-[11.5px]">{items.map((item, index) => <div key={`${item.name}-${index}`}>{item.name}</div>)}</div>;
    if (style === "bars") return <div className="space-y-2">{items.map((item, index) => <div key={`${item.name}-${index}`}><div className="mb-1 text-[11px]">{item.name}</div><div className="h-1.5 rounded-full bg-current opacity-20"><div className="h-full rounded-full bg-current opacity-80" style={{ width: `${Math.max(20, Math.min(100, (item.level ?? 3) * 20))}%` }} /></div></div>)}</div>;
    if (style === "dots") return <div className="space-y-2">{items.map((item, index) => <div key={`${item.name}-${index}`} className="flex items-center justify-between gap-3 text-[11px]"><span>{item.name}</span><span className="flex gap-1" aria-label={`${item.level ?? 3} / 5`}>{[1, 2, 3, 4, 5].map((dot) => <span key={dot} className={`h-1.5 w-1.5 rounded-full border ${dot <= (item.level ?? 3) ? "bg-current" : "opacity-30"}`} />)}</span></div>)}</div>;
    return <div className="flex flex-wrap gap-2">{items.map((item, index) => <span key={`${item.name}-${index}`} className="rounded-full px-3 py-1 text-[11px] font-medium" style={{ backgroundColor: "var(--cv-soft)", color: "var(--cv-primary)" }}>{item.name}</span>)}</div>;
}

function SectionBody({ id, data, visualStyle }: { id: CvBodySectionId; data: CVData; visualStyle: TemplateVisualStyle }) {
    switch (id) {
        case "experience":
            return <div className="space-y-4">{data.experience.map((item, index) => <article key={index} className="break-inside-avoid"><div className="flex items-start justify-between gap-4"><div className="min-w-0"><h3 className="text-[13px] font-bold">{item.role}</h3><p className="text-[12px] opacity-65">{item.company}{item.location ? ` | ${item.location}` : ""}</p></div><span className="shrink-0 text-[11px] opacity-65">{dateRange(item.start, item.end)}</span></div>{item.description ? <p className="mt-1 text-[11.5px] leading-relaxed opacity-80">{item.description}</p> : null}{item.highlights?.length ? <ArrayList items={item.highlights} /> : null}</article>)}</div>;
        case "education":
            return <div className="space-y-3">{data.education.map((item, index) => <article key={index} className="break-inside-avoid"><div className="flex items-start justify-between gap-4"><div><h3 className="text-[13px] font-bold">{item.degree}</h3><p className="text-[12px] opacity-65">{item.school}{item.location ? ` | ${item.location}` : ""}</p></div><span className="shrink-0 text-[11px] opacity-65">{dateRange(item.start, item.end)}</span></div>{item.description ? <p className="mt-1 text-[11.5px] leading-relaxed opacity-80">{item.description}</p> : null}</article>)}</div>;
        case "internships":
            return <div className="space-y-4">{(data.internships ?? []).map((item, index) => <article key={index} className="break-inside-avoid"><div className="flex items-start justify-between gap-4"><div><h3 className="text-[13px] font-bold">{item.role}</h3><p className="text-[12px] opacity-65">{item.company}{item.location ? ` | ${item.location}` : ""}</p></div><span className="shrink-0 text-[11px] opacity-65">{dateRange(item.start, item.end)}</span></div>{item.description ? <p className="mt-1 text-[11.5px] leading-relaxed opacity-80">{item.description}</p> : null}{item.highlights?.length ? <ArrayList items={item.highlights} /> : null}</article>)}</div>;
        case "courses":
            return <div className="space-y-2">{data.courses.map((item, index) => <div key={index} className="flex justify-between gap-4 text-[11.5px]"><span className="font-semibold">{item.name}</span><span className="opacity-65">{item.institution}{item.year ? ` | ${item.year}` : ""}</span></div>)}</div>;
        case "awards": return <ArrayList items={data.awards} />;
        case "skills": return <RatedItems items={data.skills.map((item) => ({ name: item.name, level: item.level }))} style={visualStyle.skills} />;
        case "languages": return <div className="space-y-1.5">{data.languages.map((item, index) => <div key={index} className="text-[11.5px]">{item.name}{item.level ? ` (${formatLanguageLevel(item.level, data)})` : ""}</div>)}</div>;
        case "interests": return <div className="flex flex-wrap gap-2">{(data.interests ?? []).map((item, index) => <span key={index} className="rounded px-2 py-1 text-[11px] opacity-80" style={{ backgroundColor: "var(--cv-soft)" }}>{item}</span>)}</div>;
        case "properties": return <ArrayList items={(data.properties ?? []).filter(Boolean)} />;
        case "references": return <div className="space-y-3">{(data.references ?? []).map((item, index) => <div key={index} className="text-[11.5px]"><strong>{item.name}</strong>{item.role || item.company ? <div className="opacity-65">{[item.role, item.company].filter(Boolean).join(" · ")}</div> : null}{item.email ? <div><LinkText value={item.email} /></div> : null}{item.phone ? <div>{item.phone}</div> : null}</div>)}</div>;
        case "sideActivities": return <div className="space-y-3">{(data.sideActivities ?? []).map((item, index) => <article key={index}><div className="flex items-start justify-between gap-4"><div><h3 className="text-[13px] font-bold">{item.title}</h3><p className="text-[12px] opacity-65">{item.organization}</p></div><span className="text-[11px] opacity-65">{dateRange(item.start, item.end)}</span></div>{item.description ? <p className="mt-1 text-[11.5px] opacity-80">{item.description}</p> : null}</article>)}</div>;
        case "customSections": return <div className="space-y-3">{(data.customSections ?? []).map((item, index) => <div key={index}>{item.title ? <h3 className="text-[13px] font-bold">{item.title}</h3> : null}{item.items?.length ? <ArrayList items={item.items} /> : null}</div>)}</div>;
    }
}

function ContactDetails({ data }: { data: CVData }) {
    const values = [data.personal.email, data.personal.phone, data.personal.location, data.personal.address, data.personal.postalCode].filter((value): value is string => Boolean(value?.trim()));
    const personalDetails = [
        data.personal.birthDate || data.personal.birthPlace ? `${resumeText(data, "birthDateAndPlace")}: ${data.personal.birthDate || ""}${data.personal.birthPlace ? `, ${data.personal.birthPlace}` : ""}` : null,
        data.personal.nationality ? `${resumeText(data, "nationality")}: ${data.personal.nationality}` : null,
        data.personal.driversLicense ? `${resumeText(data, "driversLicense")}: ${data.personal.driversLicense}` : null,
        data.personal.gender ? `${resumeText(data, "gender")}: ${formatGender(data.personal.gender, data)}` : null,
        data.personal.maritalStatus ? `${resumeText(data, "maritalStatus")}: ${formatMaritalStatus(data.personal.maritalStatus, data)}` : null,
    ].filter((value): value is string => Boolean(value));
    return <div className="space-y-1 text-[11px] opacity-75">{values.map((value, index) => <div key={`${value}-${index}`} className="break-words"><LinkText value={value} /></div>)}{data.personal.linkedIn ? <div><LinkText value={data.personal.linkedIn} /></div> : null}{data.personal.github ? <div><LinkText value={data.personal.github} /></div> : null}{data.personal.website ? <div><LinkText value={data.personal.website} /></div> : null}{personalDetails.length > 0 ? <div className="mt-2 space-y-0.5 text-[10px]">{personalDetails.map((value) => <div key={value}>{value}</div>)}</div> : null}</div>;
}

function Photo({ data, theme, visualStyle }: { data: CVData; theme: ColorTheme; visualStyle: TemplateVisualStyle }) {
    if (visualStyle.photo === "hidden") return null;
    const radius = visualStyle.photo === "circle" ? "rounded-full" : visualStyle.photo === "rounded" ? "rounded-lg" : "rounded-none";
    if (data.personal.photo) return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={data.personal.photo} alt={data.personal.name || resumeText(data, "profilePhotoAlt")} className={`mx-auto mb-3 h-20 w-20 object-cover ${radius}`} style={{ border: `3px solid ${theme.primary}` }} />
    );
    return <div className={`mx-auto mb-3 flex h-20 w-20 items-center justify-center text-2xl font-bold ${radius}`} style={{ backgroundColor: "var(--cv-soft)", color: "var(--cv-primary)" }}>{data.personal.name ? data.personal.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() : "CV"}</div>;
}

function Identity({ data, visualStyle, compact = false }: { data: CVData; visualStyle: TemplateVisualStyle; compact?: boolean }) {
    return <div className={visualStyle.headerAlign === "center" ? "text-center" : "text-left"}><h1 className={compact ? "text-xl font-bold leading-tight" : "text-[31px] font-extrabold leading-tight"}>{data.personal.name || resumeText(data, "nameFallback")}</h1>{data.personal.title ? <p className={`${compact ? "text-xs" : "text-[15px]"} mt-1 font-medium opacity-65`}>{data.personal.title}</p> : null}</div>;
}

function Profile({ data, visualStyle }: { data: CVData; visualStyle: TemplateVisualStyle }) {
    if (!data.personal.summary) return null;
    return <section className="mb-6"><h2 className={headingClass(visualStyle.heading)} style={{ color: "var(--cv-primary)", borderColor: "var(--cv-border)" }}>{resumeText(data, "profile")}</h2><p className="whitespace-pre-wrap text-[12.5px] leading-[1.65]">{data.personal.summary}</p></section>;
}

function BodySections({ data, templateId, lane, visualStyle, renderSection, inverse = false }: { data: CVData; templateId: string; lane: "main" | "sidebar"; visualStyle: TemplateVisualStyle; renderSection: (props: TemplateSectionRenderProps) => ReactElement; inverse?: boolean }) {
    const resolved = resolveCvSectionLayout(data, templateId);
    const ids = lane === "sidebar" ? resolved.sidebar : resolved.main;
    return <OrderedSectionContainer data={data} templateId={templateId} lane={lane} className={lane === "sidebar" ? "space-y-5" : "space-y-1"}>{ids.map((id) => cvSectionHasSubstantiveContent(data, id) ? cloneElement(renderSection({ id, title: resumeText(data, id === "sideActivities" ? "sideActivities" : id === "customSections" ? "customSection" : id as Parameters<typeof resumeText>[1]), children: <SectionBody id={id} data={data} visualStyle={visualStyle} />, inverse }), { key: id }) : null)}</OrderedSectionContainer>;
}

export default function CanonicalCvTemplate({ data, theme, templateId, visualStyle, renderSection }: CanonicalCvTemplateProps) {
    const resolved = resolveCvSectionLayout(data, templateId);
    const variables = { color: theme.text, "--cv-primary": theme.primary, "--cv-border": theme.border, "--cv-soft": `${theme.primary}18` } as React.CSSProperties;
    const styleSignature = [visualStyle.font, visualStyle.headerAlign, visualStyle.heading, visualStyle.sidebar, visualStyle.identity, visualStyle.photo, visualStyle.skills].join(":");

    if (resolved.layout === "single-column") return <div className={`mx-auto min-h-[297mm] w-[210mm] bg-white px-10 py-11 text-[12px] leading-[1.45] ${fontClass(visualStyle.font)}`} style={variables} data-cv-template={templateId} data-cv-visual-style={visualStyle.id} data-cv-style-signature={styleSignature} data-cv-layout="single-column"><header className={`mb-7 border-b-2 pb-6 ${visualStyle.headerAlign === "center" ? "text-center" : "text-left"}`} style={{ borderColor: theme.primary }}><Photo data={data} theme={theme} visualStyle={visualStyle} /><Identity data={data} visualStyle={visualStyle} /><div className={`mt-3 ${visualStyle.headerAlign === "center" ? "mx-auto max-w-[150mm]" : ""}`}><ContactDetails data={data} /></div></header><Profile data={data} visualStyle={visualStyle} /><main data-cv-lane="main"><BodySections data={data} templateId={templateId} lane="main" visualStyle={visualStyle} renderSection={renderSection} /></main></div>;

    const inverse = visualStyle.sidebar === "solid";
    const sidebarStyle: React.CSSProperties = visualStyle.sidebar === "solid" ? { backgroundColor: theme.primary, color: "#ffffff", "--cv-soft": "rgba(255,255,255,.16)" } as React.CSSProperties : visualStyle.sidebar === "outline" ? { borderLeft: resolved.layout === "two-column-right" ? `1px solid ${theme.border}` : undefined, borderRight: resolved.layout === "two-column-left" ? `1px solid ${theme.border}` : undefined } : { backgroundColor: `${theme.primary}10` };
    const sidebar = <aside key="sidebar" data-cv-lane="sidebar" className="w-[34%] shrink-0 p-7" style={sidebarStyle}><Photo data={data} theme={theme} visualStyle={visualStyle} />{visualStyle.identity === "sidebar" ? <div className="mb-5"><Identity data={data} visualStyle={visualStyle} compact /></div> : null}<ContactDetails data={data} /><div className="mt-6"><BodySections data={data} templateId={templateId} lane="sidebar" visualStyle={visualStyle} renderSection={renderSection} inverse={inverse} /></div></aside>;
    const main = <main key="main" data-cv-lane="main" className="min-w-0 flex-1 p-8">{visualStyle.identity === "main" ? <header className="mb-7 border-b-2 pb-6" style={{ borderColor: theme.primary }}><Identity data={data} visualStyle={visualStyle} /></header> : null}<Profile data={data} visualStyle={visualStyle} /><BodySections data={data} templateId={templateId} lane="main" visualStyle={visualStyle} renderSection={renderSection} /></main>;
    const columns = resolved.layout === "two-column-right" ? [main, sidebar] : [sidebar, main];

    return <div className={`mx-auto flex min-h-[297mm] w-[210mm] bg-white text-[12px] leading-[1.45] ${fontClass(visualStyle.font)}`} style={variables} data-cv-template={templateId} data-cv-visual-style={visualStyle.id} data-cv-style-signature={styleSignature} data-cv-layout={resolved.layout}>{columns}</div>;
}
