import type { CVData } from "@/lib/cv";
import type { ColorTheme } from "@/lib/templates";
import CanonicalCvTemplate, {
    type TemplateSectionRenderProps,
    type TemplateVisualStyle,
} from "./CanonicalCvTemplate";

const visualStyle: TemplateVisualStyle = {
    id: "formal",
    font: "sans",
    headerAlign: "left",
    heading: "line",
    sidebar: "solid",
    identity: "main",
    photo: "circle",
    skills: "dots",
};

function renderSection({ id, title, children, inverse }: TemplateSectionRenderProps) {
    return (
        <section data-cv-section={id} className="mb-6 break-inside-avoid">
            <h2
                className="mb-3 border-b-2 pb-2 text-[12px] font-bold uppercase tracking-[0.16em]"
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

export default function FormalTemplate(props: TemplateProps) {
    return <CanonicalCvTemplate {...props} templateId="formal" visualStyle={visualStyle} renderSection={renderSection} />;
}
