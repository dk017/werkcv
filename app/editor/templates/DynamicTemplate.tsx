import type { CVData } from "@/lib/cv";
import type { ColorTheme } from "@/lib/templates";
import CanonicalCvTemplate, {
    type TemplateSectionRenderProps,
    type TemplateVisualStyle,
} from "./CanonicalCvTemplate";

const visualStyle: TemplateVisualStyle = {
    id: "dynamic",
    font: "sans",
    headerAlign: "left",
    heading: "boxed",
    sidebar: "solid",
    identity: "sidebar",
    photo: "rounded",
    skills: "pills",
};

function renderSection({ id, title, children, inverse }: TemplateSectionRenderProps) {
    return (
        <section data-cv-section={id} className="mb-6 break-inside-avoid">
            <h2
                className="mb-3 rounded-sm border px-2 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.14em]"
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

export default function DynamicTemplate(props: TemplateProps) {
    return <CanonicalCvTemplate {...props} templateId="dynamic" visualStyle={visualStyle} renderSection={renderSection} />;
}
