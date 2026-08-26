import type { CVData } from "@/lib/cv";
import type { ColorTheme } from "@/lib/templates";
import CanonicalCvTemplate, {
    type TemplateSectionRenderProps,
    type TemplateVisualStyle,
} from "./CanonicalCvTemplate";

const visualStyle: TemplateVisualStyle = {
    id: "classical",
    font: "serif",
    headerAlign: "center",
    heading: "line",
    sidebar: "outline",
    identity: "main",
    photo: "circle",
    skills: "plain",
};

function renderSection({ id, title, children, inverse }: TemplateSectionRenderProps) {
    return (
        <section data-cv-section={id} className="mb-7 break-inside-avoid font-serif">
            <h2
                className="mb-3 border-y py-1.5 text-center text-[12px] font-semibold uppercase tracking-[0.2em]"
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

export default function ClassicalTemplate(props: TemplateProps) {
    return <CanonicalCvTemplate {...props} templateId="classical" visualStyle={visualStyle} renderSection={renderSection} />;
}
