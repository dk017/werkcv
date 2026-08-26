import type { CVData } from "@/lib/cv";
import type { ColorTheme } from "@/lib/templates";
import CanonicalCvTemplate, {
    type TemplateSectionRenderProps,
    type TemplateVisualStyle,
} from "./CanonicalCvTemplate";

const visualStyle: TemplateVisualStyle = {
    id: "modern",
    font: "sans",
    headerAlign: "left",
    heading: "accent",
    sidebar: "solid",
    identity: "sidebar",
    photo: "rounded",
    skills: "bars",
};

function renderSection({ id, title, children, inverse }: TemplateSectionRenderProps) {
    return (
        <section data-cv-section={id} className="mb-6 break-inside-avoid">
            <h2
                className="mb-3 border-l-4 pl-3 text-[12px] font-bold uppercase tracking-[0.16em]"
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

export default function ModernTemplate(props: TemplateProps) {
    return <CanonicalCvTemplate {...props} templateId="modern" visualStyle={visualStyle} renderSection={renderSection} />;
}
