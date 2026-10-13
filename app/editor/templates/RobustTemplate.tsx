import type { CVData } from "@/lib/cv";
import type { ColorTheme } from "@/lib/templates";
import CanonicalCvTemplate, {
    type TemplateSectionRenderProps,
    type TemplateVisualStyle,
} from "./CanonicalCvTemplate";

const visualStyle: TemplateVisualStyle = {
    id: "robust",
    font: "sans",
    headerAlign: "left",
    heading: "accent",
    sidebar: "soft",
    identity: "sidebar",
    photo: "rounded",
    skills: "bars",
};

function renderSection({ id, title, children, inverse }: TemplateSectionRenderProps) {
    return (
        <section data-cv-section={id} className="mb-[calc(1.25rem*var(--cv-gap,1))] break-inside-avoid">
            <h2
                className="mb-3 border-l-[6px] pl-3 text-[length:calc(13px*var(--cv-fs,1))] font-black uppercase tracking-[0.1em]"
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

export default function RobustTemplate(props: TemplateProps) {
    return <CanonicalCvTemplate {...props} templateId="robust" visualStyle={visualStyle} renderSection={renderSection} />;
}
