import type { CVData } from "@/lib/cv";
import type { ColorTheme } from "@/lib/templates";
import CanonicalCvTemplate, {
    type TemplateSectionRenderProps,
    type TemplateVisualStyle,
} from "./CanonicalCvTemplate";

const visualStyle: TemplateVisualStyle = {
    id: "simple",
    font: "sans",
    headerAlign: "left",
    heading: "minimal",
    sidebar: "outline",
    identity: "main",
    photo: "circle",
    skills: "plain",
};

function renderSection({ id, title, children, inverse }: TemplateSectionRenderProps) {
    return (
        <section data-cv-section={id} className="mb-[calc(1.5rem*var(--cv-gap,1))] break-inside-avoid">
            <h2
                className="mb-2 text-[length:calc(12px*var(--cv-fs,1))] font-bold uppercase tracking-[0.1em]"
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

export default function SimpleTemplate(props: TemplateProps) {
    return <CanonicalCvTemplate {...props} templateId="simple" visualStyle={visualStyle} renderSection={renderSection} />;
}
