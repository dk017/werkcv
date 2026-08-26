import type { CVData } from "@/lib/cv";
import type { ColorTheme } from "@/lib/templates";
import CanonicalCvTemplate, {
    type TemplateSectionRenderProps,
    type TemplateVisualStyle,
} from "./CanonicalCvTemplate";

const visualStyle: TemplateVisualStyle = {
    id: "jobboss",
    font: "sans",
    headerAlign: "left",
    heading: "accent",
    sidebar: "soft",
    identity: "main",
    photo: "rounded",
    skills: "pills",
};

function renderSection({ id, title, children, inverse }: TemplateSectionRenderProps) {
    return (
        <section data-cv-section={id} className="mb-6 break-inside-avoid">
            <h2
                className="mb-3 inline-block rounded-full border px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em]"
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

export default function JobBossTemplate(props: TemplateProps) {
    return <CanonicalCvTemplate {...props} templateId="jobboss" visualStyle={visualStyle} renderSection={renderSection} />;
}
