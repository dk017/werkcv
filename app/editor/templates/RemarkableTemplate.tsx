import type { CVData } from "@/lib/cv";
import type { ColorTheme } from "@/lib/templates";
import CanonicalCvTemplate, {
    type TemplateSectionRenderProps,
    type TemplateVisualStyle,
} from "./CanonicalCvTemplate";

const visualStyle: TemplateVisualStyle = {
    id: "remarkable",
    font: "sans",
    headerAlign: "left",
    heading: "boxed",
    sidebar: "solid",
    identity: "sidebar",
    photo: "circle",
    skills: "pills",
};

function renderSection({ id, title, children, inverse }: TemplateSectionRenderProps) {
    return (
        <section data-cv-section={id} className="mb-6 break-inside-avoid">
            <h2
                className="mb-3 border-l-4 px-3 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.18em]"
                style={{
                    color: inverse ? "inherit" : "var(--cv-primary)",
                    borderColor: inverse ? "rgba(255,255,255,.4)" : "var(--cv-border)",
                    backgroundColor: inverse ? "rgba(255,255,255,.1)" : "var(--cv-soft)",
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

export default function RemarkableTemplate(props: TemplateProps) {
    return <CanonicalCvTemplate {...props} templateId="remarkable" visualStyle={visualStyle} renderSection={renderSection} />;
}
