import { cloneElement, type ReactElement, type ReactNode } from "react";
import type { CVData, CvLayoutFont } from "@/lib/cv";
import type { ColorTheme } from "@/lib/templates";
import { formatGender, formatLanguageLevel, formatMaritalStatus, resumeText } from "@/lib/resume-language";
import { cvSectionHasSubstantiveContent, resolveCvSectionLayout, type CvBodySectionId } from "@/lib/cv-sections";
import { OrderedSectionContainer } from "./section-layout";
import { LinkText } from "./link-utils";
import { CvDocumentHeading } from "./document-heading";
import { Editable, InlineAddButton, InlineSeparator, WhenFilledOrEditing } from "./inline-edit";

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
    /** The heading: the user's own wording or the default, editable in place in document mode. */
    title: ReactNode;
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

// Bundled fonts (app/layout.tsx), so the browser and the server-side PDF use the same font.
const LAYOUT_FONT_FAMILIES: Record<Exclude<CvLayoutFont, "template">, string> = {
    manrope: "var(--font-manrope), sans-serif",
    inter: "var(--font-cv-inter), sans-serif",
    "source-serif": "var(--font-cv-serif), serif",
    merriweather: "var(--font-cv-merriweather), serif",
};

function fontFamilyFor(font: TemplateVisualStyle["font"], chosen: CvLayoutFont | undefined): string | undefined {
    if (chosen && chosen !== "template") return LAYOUT_FONT_FAMILIES[chosen];
    // The serif designs use a bundled serif; the system serif differs per machine (Georgia vs Times).
    return font === "serif" ? "var(--font-cv-template-serif), Georgia, serif" : undefined;
}

function fontClass(font: TemplateVisualStyle["font"]) {
    if (font === "serif") return "font-serif";
    if (font === "mono") return "font-mono";
    return "font-sans";
}

function headingClass(style: TemplateVisualStyle["heading"]) {
    const base = "mb-3 pb-2 text-[length:calc(12px*var(--cv-fs,1))] font-bold uppercase tracking-[0.1em]";
    if (style === "minimal") return `${base} pb-0`;
    if (style === "boxed") return `${base} border px-2 py-1.5`;
    if (style === "accent") return `${base} border-l-4 pl-3`;
    return `${base} border-b`;
}

function ArrayList({ items, listPath }: { items: string[]; listPath?: string }) {
    return <ul className="list-disc space-y-1 pl-5 text-[length:calc(11.5px*var(--cv-fs,1))] leading-[calc(1.5*var(--cv-lh,1))]">{items.map((item, index) => <li key={index}>{listPath ? <Editable path={`${listPath}.${index}`} value={item} field="bullet" list={{ path: listPath, index }} /> : item}</li>)}</ul>;
}

function RatedItems({ items, style }: { items: Array<{ name: string; level?: number }>; style: TemplateVisualStyle["skills"] }) {
    const name = (item: { name: string }, index: number) => <Editable path={`skills.${index}.name`} value={item.name} field="skill" />;
    if (style === "plain") return <div className="space-y-1 text-[length:calc(11.5px*var(--cv-fs,1))]">{items.map((item, index) => <div key={index}>{name(item, index)}</div>)}</div>;
    if (style === "bars") return <div className="space-y-2">{items.map((item, index) => <div key={index}><div className="mb-1 text-[length:calc(11px*var(--cv-fs,1))]">{name(item, index)}</div><div className="h-1.5 rounded-full bg-current opacity-20"><div className="h-full rounded-full bg-current opacity-80" style={{ width: `${Math.max(20, Math.min(100, (item.level ?? 3) * 20))}%` }} /></div></div>)}</div>;
    if (style === "dots") return <div className="space-y-2">{items.map((item, index) => <div key={index} className="flex items-center justify-between gap-3 text-[length:calc(11px*var(--cv-fs,1))]"><span>{name(item, index)}</span><span className="flex gap-1" aria-label={`${item.level ?? 3} / 5`}>{[1, 2, 3, 4, 5].map((dot) => <span key={dot} className={`h-1.5 w-1.5 rounded-full border ${dot <= (item.level ?? 3) ? "bg-current" : "opacity-30"}`} />)}</span></div>)}</div>;
    return <div className="flex flex-wrap gap-2">{items.map((item, index) => <span key={index} className="rounded-full px-3 py-1 text-[length:calc(11px*var(--cv-fs,1))] font-medium" style={{ backgroundColor: "var(--cv-soft)", color: "var(--cv-primary)" }}>{name(item, index)}</span>)}</div>;
}

function SectionBody({ id, data, visualStyle }: { id: CvBodySectionId; data: CVData; visualStyle: TemplateVisualStyle }) {
    switch (id) {
        case "experience":
            return <div className="space-y-[calc(1rem*var(--cv-gap,1))]">{data.experience.map((item, index) => <article data-cv-entry={`experience:${index}`} key={index} className="break-inside-avoid"><div className="flex items-start justify-between gap-4"><div className="min-w-0"><h3 className="text-[length:calc(13px*var(--cv-fs,1))] font-bold"><Editable path={`experience.${index}.role`} value={item.role} field="role" /></h3><p className="text-[length:calc(12px*var(--cv-fs,1))] text-current/65"><Editable path={`experience.${index}.company`} value={item.company} field="company" /><InlineSeparator show={Boolean(item.location)} text=" | " /><WhenFilledOrEditing value={item.location}><Editable path={`experience.${index}.location`} value={item.location} field="location" /></WhenFilledOrEditing></p></div><span className="shrink-0 text-[length:calc(11px*var(--cv-fs,1))] text-current/65"><Editable path={`experience.${index}.start`} value={item.start} field="start" /><InlineSeparator show={Boolean(item.start && item.end)} text=" – " /><WhenFilledOrEditing value={item.end}><Editable path={`experience.${index}.end`} value={item.end} field="end" /></WhenFilledOrEditing></span></div>{item.description ? <p className="mt-1 text-[length:calc(11.5px*var(--cv-fs,1))] leading-[calc(1.625*var(--cv-lh,1))] text-current/80"><Editable path={`experience.${index}.description`} value={item.description} field="description" /></p> : null}{item.highlights?.length ? <ArrayList items={item.highlights} listPath={`experience.${index}.highlights`} /> : <InlineAddButton kind="bullet" listPath={`experience.${index}.highlights`} count={0} />}</article>)}<InlineAddButton kind="experience" listPath="experience" count={data.experience.length} /></div>;
        case "education":
            return <div className="space-y-[calc(0.75rem*var(--cv-gap,1))]">{data.education.map((item, index) => <article data-cv-entry={`education:${index}`} key={index} className="break-inside-avoid"><div className="flex items-start justify-between gap-4"><div><h3 className="text-[length:calc(13px*var(--cv-fs,1))] font-bold"><Editable path={`education.${index}.degree`} value={item.degree} field="degree" /></h3><p className="text-[length:calc(12px*var(--cv-fs,1))] text-current/65"><Editable path={`education.${index}.school`} value={item.school} field="school" /><InlineSeparator show={Boolean(item.location)} text=" | " /><WhenFilledOrEditing value={item.location}><Editable path={`education.${index}.location`} value={item.location} field="location" /></WhenFilledOrEditing></p></div><span className="shrink-0 text-[length:calc(11px*var(--cv-fs,1))] text-current/65"><Editable path={`education.${index}.start`} value={item.start} field="start" /><InlineSeparator show={Boolean(item.start && item.end)} text=" – " /><WhenFilledOrEditing value={item.end}><Editable path={`education.${index}.end`} value={item.end} field="end" /></WhenFilledOrEditing></span></div>{item.description ? <p className="mt-1 text-[length:calc(11.5px*var(--cv-fs,1))] leading-[calc(1.625*var(--cv-lh,1))] text-current/80"><Editable path={`education.${index}.description`} value={item.description} field="description" /></p> : null}</article>)}<InlineAddButton kind="education" listPath="education" count={data.education.length} /></div>;
        case "internships":
            return <div className="space-y-[calc(1rem*var(--cv-gap,1))]">{(data.internships ?? []).map((item, index) => <article data-cv-entry={`internships:${index}`} key={index} className="break-inside-avoid"><div className="flex items-start justify-between gap-4"><div><h3 className="text-[length:calc(13px*var(--cv-fs,1))] font-bold"><Editable path={`internships.${index}.role`} value={item.role} field="role" /></h3><p className="text-[length:calc(12px*var(--cv-fs,1))] text-current/65"><Editable path={`internships.${index}.company`} value={item.company} field="company" /><InlineSeparator show={Boolean(item.location)} text=" | " /><WhenFilledOrEditing value={item.location}><Editable path={`internships.${index}.location`} value={item.location} field="location" /></WhenFilledOrEditing></p></div><span className="shrink-0 text-[length:calc(11px*var(--cv-fs,1))] text-current/65"><Editable path={`internships.${index}.start`} value={item.start} field="start" /><InlineSeparator show={Boolean(item.start && item.end)} text=" – " /><WhenFilledOrEditing value={item.end}><Editable path={`internships.${index}.end`} value={item.end} field="end" /></WhenFilledOrEditing></span></div>{item.description ? <p className="mt-1 text-[length:calc(11.5px*var(--cv-fs,1))] leading-[calc(1.625*var(--cv-lh,1))] text-current/80"><Editable path={`internships.${index}.description`} value={item.description} field="description" /></p> : null}{item.highlights?.length ? <ArrayList items={item.highlights} listPath={`internships.${index}.highlights`} /> : <InlineAddButton kind="bullet" listPath={`internships.${index}.highlights`} count={0} />}</article>)}<InlineAddButton kind="internship" listPath="internships" count={(data.internships ?? []).length} /></div>;
        case "courses":
            return <div className="space-y-2">{data.courses.map((item, index) => <div key={index} className="flex justify-between gap-4 text-[length:calc(11.5px*var(--cv-fs,1))]"><span className="font-semibold">{item.name}</span><span className="text-current/65">{item.institution}{item.year ? ` | ${item.year}` : ""}</span></div>)}</div>;
        case "awards": return <ArrayList items={data.awards} />;
        case "skills": return <RatedItems items={data.skills.map((item) => ({ name: item.name, level: item.level }))} style={visualStyle.skills} />;
        case "languages": return <div className="space-y-1.5">{data.languages.map((item, index) => <div key={index} className="text-[length:calc(11.5px*var(--cv-fs,1))]"><Editable path={`languages.${index}.name`} value={item.name} field="language" />{item.level ? ` (${formatLanguageLevel(item.level, data)})` : ""}</div>)}</div>;
        case "interests": return <div className="flex flex-wrap gap-2">{(data.interests ?? []).map((item, index) => <span key={index} className="rounded px-2 py-1 text-[length:calc(11px*var(--cv-fs,1))] text-current/80" style={{ backgroundColor: "var(--cv-soft)" }}>{item}</span>)}</div>;
        case "properties": return <ArrayList items={(data.properties ?? []).filter(Boolean)} />;
        case "references": return <div className="space-y-[calc(0.75rem*var(--cv-gap,1))]">{(data.references ?? []).map((item, index) => <div key={index} className="text-[length:calc(11.5px*var(--cv-fs,1))]"><strong>{item.name}</strong>{item.role || item.company ? <div className="text-current/65">{[item.role, item.company].filter(Boolean).join(" · ")}</div> : null}{item.email ? <div><LinkText value={item.email} /></div> : null}{item.phone ? <div>{item.phone}</div> : null}</div>)}</div>;
        case "sideActivities": return <div className="space-y-[calc(0.75rem*var(--cv-gap,1))]">{(data.sideActivities ?? []).map((item, index) => <article key={index}><div className="flex items-start justify-between gap-4"><div><h3 className="text-[length:calc(13px*var(--cv-fs,1))] font-bold">{item.title}</h3><p className="text-[length:calc(12px*var(--cv-fs,1))] text-current/65">{item.organization}</p></div><span className="text-[length:calc(11px*var(--cv-fs,1))] text-current/65">{dateRange(item.start, item.end)}</span></div>{item.description ? <p className="mt-1 text-[length:calc(11.5px*var(--cv-fs,1))] text-current/80">{item.description}</p> : null}</article>)}</div>;
        case "customSections": return null; // rendered per custom section in BodySections
    }
}

function ContactDetails({ data, inline = false }: { data: CVData; inline?: boolean }) {
    const contactFields = [
        { key: "email", field: "email" }, { key: "phone", field: "phone" }, { key: "location", field: "city" }, { key: "address" }, { key: "postalCode" },
        { key: "linkedIn", field: "linkedIn" }, { key: "github", field: "github" }, { key: "website", field: "website" },
    ] as const;
    const personalDetails = [
        data.personal.birthDate || data.personal.birthPlace ? `${resumeText(data, "birthDateAndPlace")}: ${data.personal.birthDate || ""}${data.personal.birthPlace ? `, ${data.personal.birthPlace}` : ""}` : null,
        data.personal.nationality ? `${resumeText(data, "nationality")}: ${data.personal.nationality}` : null,
        data.personal.driversLicense ? `${resumeText(data, "driversLicense")}: ${data.personal.driversLicense}` : null,
        data.personal.gender ? `${resumeText(data, "gender")}: ${formatGender(data.personal.gender, data)}` : null,
        data.personal.maritalStatus ? `${resumeText(data, "maritalStatus")}: ${formatMaritalStatus(data.personal.maritalStatus, data)}` : null,
    ].filter((value): value is string => Boolean(value));
    const contactValues = contactFields
        .map((entry) => ({ ...entry, value: data.personal[entry.key] }))
        .filter((entry): entry is typeof entry & { value: string } => Boolean(entry.value?.trim()));
    return <div data-cv-edit="personal" className={inline ? "flex flex-wrap items-center gap-x-3 gap-y-1 text-[length:calc(11px*var(--cv-fs,1))] text-current/75" : "space-y-1 text-[length:calc(11px*var(--cv-fs,1))] text-current/75"}>
        {contactValues.map((entry, index) => <span key={entry.key} className={inline ? "inline-flex min-w-0 items-center gap-3 break-words" : "block break-words"}>
            {inline && index > 0 ? <span aria-hidden="true" className="text-current/50">·</span> : null}
            {"field" in entry ? <Editable path={`personal.${entry.key}`} value={entry.value} field={entry.field} fallback={<LinkText value={entry.value} />} /> : <LinkText value={entry.value} />}
        </span>)}
        {personalDetails.length > 0 ? <div className="mt-2 w-full space-y-0.5 text-[length:calc(10px*var(--cv-fs,1))]">{personalDetails.map((value) => <div key={value}>{value}</div>)}</div> : null}
    </div>;
}

function Photo({ data, theme, visualStyle, centered = true }: { data: CVData; theme: ColorTheme; visualStyle: TemplateVisualStyle; centered?: boolean }) {
    if (visualStyle.photo === "hidden") return null;
    const radius = visualStyle.photo === "circle" ? "rounded-full" : visualStyle.photo === "rounded" ? "rounded-lg" : "rounded-none";
    const alignment = centered ? "mx-auto" : "";
    if (!data.personal.photo) return null;
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img data-cv-edit="personal" src={data.personal.photo} alt={data.personal.name || resumeText(data, "profilePhotoAlt")} className={`${alignment} mb-3 h-20 w-20 object-cover ${radius}`} style={{ border: `3px solid ${theme.primary}` }} />
    );
}

function Identity({ data, visualStyle, compact = false }: { data: CVData; visualStyle: TemplateVisualStyle; compact?: boolean }) {
    return <div data-cv-edit="personal" className={visualStyle.headerAlign === "center" ? "text-center" : "text-left"}><CvDocumentHeading className={compact ? "text-[length:calc(20px*var(--cv-fs,1))] font-bold leading-[calc(1.25*var(--cv-lh,1))]" : "text-[length:calc(31px*var(--cv-fs,1))] font-extrabold leading-[calc(1.25*var(--cv-lh,1))]"}><Editable path="personal.name" value={data.personal.name} field="name" fallback={data.personal.name || resumeText(data, "nameFallback")} /></CvDocumentHeading><WhenFilledOrEditing value={data.personal.title}><p className={`${compact ? "text-[length:calc(12px*var(--cv-fs,1))] leading-[calc(16px*var(--cv-fs,1)*var(--cv-lh,1))]" : "text-[length:calc(15px*var(--cv-fs,1))]"} mt-1 font-medium text-current/65`}><Editable path="personal.title" value={data.personal.title} field="title" /></p></WhenFilledOrEditing></div>;
}

function Profile({ data, visualStyle }: { data: CVData; visualStyle: TemplateVisualStyle }) {
    return <WhenFilledOrEditing value={data.personal.summary}><section data-cv-edit="profile" className="mb-[calc(1.5rem*var(--cv-gap,1))]"><h2 className={headingClass(visualStyle.heading)} style={{ color: "var(--cv-primary)", borderColor: "var(--cv-border)" }}><SectionHeading path="sectionTitles.profile" override={data.sectionTitles?.profile} fallback={resumeText(data, "profile")} /></h2><p className="whitespace-pre-wrap text-[length:calc(12.5px*var(--cv-fs,1))] leading-[calc(1.65*var(--cv-lh,1))]"><Editable path="personal.summary" value={data.personal.summary} field="summary" multiline /></p></section></WhenFilledOrEditing>;
}

/** A section heading the user can rename in place; empty or typed back to the default = default. */
function SectionHeading({ path, override, fallback }: { path: string; override?: string; fallback: string }) {
    const own = override?.trim();
    return <Editable path={path} value={own || fallback} field="heading" placeholder={fallback} fallback={own || fallback} normalize={(text) => (text.trim() === fallback ? "" : text)} />;
}

function BodySections({ data, templateId, lane, visualStyle, renderSection, inverse = false }: { data: CVData; templateId: string; lane: "main" | "sidebar"; visualStyle: TemplateVisualStyle; renderSection: (props: TemplateSectionRenderProps) => ReactElement; inverse?: boolean }) {
    const resolved = resolveCvSectionLayout(data, templateId);
    const ids = lane === "sidebar" ? resolved.sidebar : resolved.main;
    const sections = ids.flatMap((id) => {
        if (!cvSectionHasSubstantiveContent(data, id)) return [];
        if (id === "customSections") {
            const fallback = resumeText(data, "customSection");
            return (data.customSections ?? []).map((item, index) => item.title?.trim() || item.items?.some((line) => line.trim())
                ? cloneElement(renderSection({
                    id,
                    title: <Editable path={`customSections.${index}.title`} value={item.title} field="heading" placeholder={fallback} fallback={item.title?.trim() || fallback} />,
                    children: item.items?.length ? <ArrayList items={item.items} listPath={`customSections.${index}.items`} /> : null,
                    inverse,
                }), { key: `customSections-${index}` })
                : null).filter((section) => section !== null);
        }
        const fallback = resumeText(data, id === "sideActivities" ? "sideActivities" : id as Parameters<typeof resumeText>[1]);
        return [cloneElement(renderSection({ id, title: <SectionHeading path={`sectionTitles.${id}`} override={data.sectionTitles?.[id]} fallback={fallback} />, children: <SectionBody id={id} data={data} visualStyle={visualStyle} />, inverse }), { key: id })];
    });
    return <OrderedSectionContainer data={data} templateId={templateId} lane={lane} className={lane === "sidebar" ? "space-y-5" : "space-y-1"}>{sections}</OrderedSectionContainer>;
}

export default function CanonicalCvTemplate({ data, theme, templateId, visualStyle, renderSection }: CanonicalCvTemplateProps) {
    const resolved = resolveCvSectionLayout(data, templateId);
    const layout = data.layout;
    const variables = {
        color: theme.text, "--cv-primary": theme.primary, "--cv-border": theme.border, "--cv-soft": `${theme.primary}18`,
        // Document-mode layout settings (1 = the design as made).
        "--cv-fs": layout?.fontScale ?? 1, "--cv-lh": layout?.lineSpacing ?? 1, "--cv-gap": layout?.sectionSpacing ?? 1,
        fontFamily: fontFamilyFor(visualStyle.font, layout?.font),
    } as React.CSSProperties;
    const styleSignature = [visualStyle.font, visualStyle.headerAlign, visualStyle.heading, visualStyle.sidebar, visualStyle.identity, visualStyle.photo, visualStyle.skills].join(":");

    if (resolved.layout === "single-column") return <div className={`mx-auto min-h-[297mm] w-[210mm] bg-white px-10 py-11 text-[length:calc(12px*var(--cv-fs,1))] leading-[calc(1.45*var(--cv-lh,1))] ${fontClass(visualStyle.font)}`} style={variables} data-cv-template={templateId} data-cv-visual-style={visualStyle.id} data-cv-style-signature={styleSignature} data-cv-layout="single-column"><header className={`mb-[calc(1.75rem*var(--cv-gap,1))] border-b-2 pb-6 ${visualStyle.headerAlign === "center" ? "text-center" : "text-left"}`} style={{ borderColor: theme.primary }}><Photo data={data} theme={theme} visualStyle={visualStyle} centered={visualStyle.headerAlign === "center"} /><Identity data={data} visualStyle={visualStyle} /><div className={`mt-3 ${visualStyle.headerAlign === "center" ? "mx-auto max-w-[150mm]" : ""}`}><ContactDetails data={data} inline={visualStyle.headerAlign !== "center"} /></div></header><Profile data={data} visualStyle={visualStyle} /><main data-cv-lane="main"><BodySections data={data} templateId={templateId} lane="main" visualStyle={visualStyle} renderSection={renderSection} /></main></div>;

    const inverse = visualStyle.sidebar === "solid";
    const sidebarStyle: React.CSSProperties = visualStyle.sidebar === "solid" ? { backgroundColor: theme.primary, color: "#ffffff", "--cv-soft": "rgba(255,255,255,.16)" } as React.CSSProperties : visualStyle.sidebar === "outline" ? { borderLeft: resolved.layout === "two-column-right" ? `1px solid ${theme.border}` : undefined, borderRight: resolved.layout === "two-column-left" ? `1px solid ${theme.border}` : undefined } : { backgroundColor: `${theme.primary}10` };
    const sidebar = <aside key="sidebar" data-cv-lane="sidebar" className="w-[34%] shrink-0 p-7" style={sidebarStyle}><Photo data={data} theme={theme} visualStyle={visualStyle} />{visualStyle.identity === "sidebar" ? <div className="mb-[calc(1.25rem*var(--cv-gap,1))]"><Identity data={data} visualStyle={visualStyle} compact /></div> : null}<ContactDetails data={data} /><div className="mt-6"><BodySections data={data} templateId={templateId} lane="sidebar" visualStyle={visualStyle} renderSection={renderSection} inverse={inverse} /></div></aside>;
    const main = <main key="main" data-cv-lane="main" className="min-w-0 flex-1 p-8">{visualStyle.identity === "main" ? <header className="mb-[calc(1.75rem*var(--cv-gap,1))] border-b-2 pb-6" style={{ borderColor: theme.primary }}><Identity data={data} visualStyle={visualStyle} /></header> : null}<Profile data={data} visualStyle={visualStyle} /><BodySections data={data} templateId={templateId} lane="main" visualStyle={visualStyle} renderSection={renderSection} /></main>;
    const columns = resolved.layout === "two-column-right" ? [main, sidebar] : [sidebar, main];

    return <div className={`mx-auto flex min-h-[297mm] w-[210mm] bg-white text-[length:calc(12px*var(--cv-fs,1))] leading-[calc(1.45*var(--cv-lh,1))] ${fontClass(visualStyle.font)}`} style={variables} data-cv-template={templateId} data-cv-visual-style={visualStyle.id} data-cv-style-signature={styleSignature} data-cv-layout={resolved.layout}>{columns}</div>;
}
