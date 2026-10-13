import type { CVData } from "@/lib/cv";
import type { ColorTheme } from "@/lib/templates";
import CanonicalCvTemplate, {
    type TemplateSectionRenderProps,
    type TemplateVisualStyle,
} from "./CanonicalCvTemplate";

const visualStyle: TemplateVisualStyle = {
    id: "professional",
    font: "sans",
    headerAlign: "center",
    heading: "line",
    sidebar: "outline",
    identity: "main",
    photo: "circle",
    skills: "pills",
};

function renderSection({ id, title, children, inverse }: TemplateSectionRenderProps) {
    return (
        <section data-cv-section={id} className="mb-[calc(1.5rem*var(--cv-gap,1))] break-inside-avoid">
            <h2
                className="mb-3 border-b pb-2 text-[length:calc(13px*var(--cv-fs,1))] font-bold uppercase tracking-[0.1em]"
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

export default function ProfessionalTemplate(props: TemplateProps) {
    return <CanonicalCvTemplate {...props} templateId="professional" visualStyle={visualStyle} renderSection={renderSection} />;
}
