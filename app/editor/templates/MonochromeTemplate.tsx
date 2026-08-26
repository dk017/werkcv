import type { CVData } from "@/lib/cv";
import type { ColorTheme } from "@/lib/templates";
import CanonicalCvTemplate, {
    type TemplateSectionRenderProps,
    type TemplateVisualStyle,
} from "./CanonicalCvTemplate";

const visualStyle: TemplateVisualStyle = {
    id: "monochrome",
    font: "mono",
    headerAlign: "left",
    heading: "line",
    sidebar: "outline",
    identity: "main",
    photo: "square",
    skills: "plain",
};

function renderSection({ id, title, children, inverse }: TemplateSectionRenderProps) {
    return (
        <section data-cv-section={id} className="mb-6 break-inside-avoid font-mono">
            <h2
                className="mb-3 border-b-2 border-current pb-2 text-[11px] font-bold uppercase tracking-[0.18em]"
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

export default function MonochromeTemplate(props: TemplateProps) {
    return <CanonicalCvTemplate {...props} templateId="monochrome" visualStyle={visualStyle} renderSection={renderSection} />;
}
