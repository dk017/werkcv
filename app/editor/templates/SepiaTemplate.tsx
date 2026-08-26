import type { CVData } from "@/lib/cv";
import type { ColorTheme } from "@/lib/templates";
import CanonicalCvTemplate, {
    type TemplateSectionRenderProps,
    type TemplateVisualStyle,
} from "./CanonicalCvTemplate";

const visualStyle: TemplateVisualStyle = {
    id: "sepia",
    font: "serif",
    headerAlign: "left",
    heading: "line",
    sidebar: "solid",
    identity: "sidebar",
    photo: "circle",
    skills: "plain",
};

function renderSection({ id, title, children, inverse }: TemplateSectionRenderProps) {
    return (
        <section data-cv-section={id} className="mb-7 break-inside-avoid font-serif">
            <h2
                className="mb-3 border-b pb-2 text-[12px] font-semibold uppercase tracking-[0.2em] italic"
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

export default function SepiaTemplate(props: TemplateProps) {
    return <CanonicalCvTemplate {...props} templateId="sepia" visualStyle={visualStyle} renderSection={renderSection} />;
}
