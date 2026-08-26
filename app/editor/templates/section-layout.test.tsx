import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { defaultCV, type CVData } from "@/lib/cv";
import { CV_BODY_SECTION_IDS, resolveCvSectionLayout } from "@/lib/cv-sections";
import { templateRegistry } from "@/lib/templates/registry";
import { getTemplateComponent, getTheme } from "./index";

export function allSectionsFixture(): CVData {
    return {
        ...defaultCV,
        personal: {
            ...defaultCV.personal,
            name: "Section Order Candidate",
            email: "candidate@example.test",
            summary: "A deliberately long profile summary used only for deterministic renderer tests.",
        },
        experience: [{ role: "EXPERIENCE_MARKER", company: "Example", location: "", start: "2020", end: "2024", description: "", highlights: [] }],
        education: [{ degree: "EDUCATION_MARKER", school: "Example School", location: "", start: "2016", end: "2020", description: "" }],
        internships: [{ role: "INTERNSHIPS_MARKER", company: "Example", location: "", start: "2019", end: "2020", description: "", highlights: [] }],
        courses: [{ name: "COURSES_MARKER", institution: "Example", year: "2024" }],
        awards: ["AWARDS_MARKER"],
        skills: [{ name: "SKILLS_MARKER", level: 3 }],
        languages: [{ name: "LANGUAGES_MARKER", level: "Good" }],
        interests: ["INTERESTS_MARKER"],
        properties: ["PROPERTIES_MARKER"],
        references: [{ name: "REFERENCES_MARKER", role: "", company: "", email: "", phone: "" }],
        sideActivities: [{ title: "SIDE_ACTIVITIES_MARKER", organization: "", start: "", end: "", description: "" }],
        customSections: [{ title: "CUSTOM_SECTIONS_MARKER", items: ["custom item"] }],
        sectionOrder: [
            "education", "experience", "properties", "skills", "languages", "references",
            "sideActivities", "customSections", "internships", "courses", "awards", "interests",
        ],
    } as CVData;
}

export function renderedSectionIds(html: string): string[] {
    return [...html.matchAll(/data-cv-section="([^"]+)"/g)].map((match) => match[1]);
}

function expectedDomOrder(data: CVData, templateId: string): string[] {
    const resolved = resolveCvSectionLayout(data, templateId);
    if (resolved.layout === "two-column-left") return [...resolved.sidebar, ...resolved.main];
    if (resolved.layout === "two-column-right") return [...resolved.main, ...resolved.sidebar];
    return resolved.main;
}

test("all 13 React templates preserve exact lane order and emit each section once", () => {
    const data = allSectionsFixture();
    const styleSignatures = new Set<string>();

    for (const [templateId, template] of Object.entries(templateRegistry)) {
        const Template = getTemplateComponent(templateId);
        const html = renderToStaticMarkup(<Template data={data} theme={getTheme(templateId, template.defaultThemeId)} />);
        const resolved = resolveCvSectionLayout(data, templateId);
        const ids = renderedSectionIds(html);

        assert.deepEqual(ids, expectedDomOrder(data, templateId), `${templateId}: section/lane order`);
        assert.deepEqual([...ids].sort(), [...CV_BODY_SECTION_IDS].sort(), `${templateId}: complete section set`);
        for (const id of CV_BODY_SECTION_IDS) {
            assert.equal(ids.filter((candidate) => candidate === id).length, 1, `${templateId}: ${id} emitted once`);
        }
        assert.equal((html.match(/Section Order Candidate/g) ?? []).length, 1, `${templateId}: identity emitted once`);
        assert.match(html, new RegExp(`data-cv-visual-style="${templateId}"`));

        const signature = html.match(/data-cv-style-signature="([^"]+)"/)?.[1];
        assert.ok(signature, `${templateId}: visual signature`);
        styleSignatures.add(signature);

        const mainPosition = html.indexOf('data-cv-lane="main"');
        const sidebarPosition = html.indexOf('data-cv-lane="sidebar"');
        if (resolved.layout === "two-column-right") assert.ok(mainPosition < sidebarPosition, `${templateId}: right sidebar orientation`);
        if (resolved.layout === "two-column-left") assert.ok(sidebarPosition < mainPosition, `${templateId}: left sidebar orientation`);
        if (resolved.layout === "single-column") assert.equal(sidebarPosition, -1, `${templateId}: no sidebar`);
    }

    assert.equal(Object.keys(templateRegistry).length, 13);
    assert.equal(styleSignatures.size, 13, "every template must retain a distinct visual profile");
});
