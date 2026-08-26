import type { CVData } from "@/lib/cv";
import type { ColorTheme } from "@/lib/templates";
import CanonicalCvTemplate, {
    type TemplateSectionRenderProps,
    type TemplateVisualStyle,
} from "./CanonicalCvTemplate";

const visualStyle: TemplateVisualStyle = {
    id: "elegant",
    font: "serif",
    headerAlign: "center",
    heading: "minimal",
    sidebar: "outline",
    identity: "main",
    photo: "circle",
    skills: "plain",
};

function renderSection({ id, title, children, inverse }: TemplateSectionRenderProps) {
    return (
        <section data-cv-section={id} className="mb-7 break-inside-avoid font-serif">
            <h2
                className="mb-3 border-b pb-2 text-[12px] font-normal uppercase tracking-[0.24em]"
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

export default function ElegantTemplate(props: TemplateProps) {
    return <CanonicalCvTemplate {...props} templateId="elegant" visualStyle={visualStyle} renderSection={renderSection} />;
}
