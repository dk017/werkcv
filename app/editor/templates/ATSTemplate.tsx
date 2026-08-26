import type { CVData } from "@/lib/cv";
import type { ColorTheme } from "@/lib/templates";
import CanonicalCvTemplate, {
    type TemplateSectionRenderProps,
    type TemplateVisualStyle,
} from "./CanonicalCvTemplate";

const visualStyle: TemplateVisualStyle = {
    id: "ats",
    font: "sans",
    headerAlign: "left",
    heading: "minimal",
    sidebar: "outline",
    identity: "main",
    photo: "hidden",
    skills: "plain",
};

function renderSection({ id, title, children, inverse }: TemplateSectionRenderProps) {
    return (
        <section data-cv-section={id} className="mb-5 break-inside-avoid">
            <h2
                className="mb-2 border-b border-slate-400 pb-1 text-[11px] font-bold uppercase tracking-[0.12em]"
                style={{
                    color: inverse ? "inherit" : "var(--cv-primary)",
                    borderColor: inverse ? "rgba(255,255,255,.4)" : "var(--cv-border)",
                    backgroundColor: undefined,
                }}
            >
                {title}
            </h2>
            {children}
        </section>
    );
}

export interface TemplateProps {
    data: CVData;
    theme: ColorTheme;
}

export default function ATSTemplate(props: TemplateProps) {
    return <CanonicalCvTemplate {...props} templateId="ats" visualStyle={visualStyle} renderSection={renderSection} />;
}
