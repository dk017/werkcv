import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { getTemplateComponent, getTheme } from "@/app/editor/templates";
import { defaultCV, type CVData } from "./cv";
import { CV_BODY_SECTION_IDS, resolveCvSectionLayout } from "./cv-sections";
import { buildHTML } from "./pdf";
import { templateRegistry } from "./templates/registry";

function fixture(): CVData {
  return {
    ...defaultCV,
    personal: {
      ...defaultCV.personal,
      name: "Cross Renderer Candidate",
      email: "candidate@example.test",
      summary: "A deliberately long profile summary used only for deterministic renderer tests.",
    },
    experience: [{ role: "EXPERIENCE_MARKER", company: "Example", location: "", start: "2020", end: "2024", description: "", highlights: [] }],
    education: [{ degree: "EDUCATION_MARKER", school: "Example", location: "", start: "2016", end: "2020", description: "" }],
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

function sectionIds(html: string): string[] {
  return [...html.matchAll(/data-cv-section="([^"]+)"/g)].map((match) => match[1]);
}

function expectedDomOrder(data: CVData, templateId: string): string[] {
  const resolved = resolveCvSectionLayout(data, templateId);
  if (resolved.layout === "two-column-left") return [...resolved.sidebar, ...resolved.main];
  if (resolved.layout === "two-column-right") return [...resolved.main, ...resolved.sidebar];
  return resolved.main;
}

test("all 13 PDF builders emit the complete section contract in the resolved lane order", () => {
  const data = fixture();

  for (const [templateId, template] of Object.entries(templateRegistry)) {
    const html = buildHTML(data, templateId, template.defaultThemeId);
    const ids = sectionIds(html);
    assert.deepEqual(ids, expectedDomOrder(data, templateId), `${templateId}: PDF section/lane order`);
    assert.deepEqual([...ids].sort(), [...CV_BODY_SECTION_IDS].sort(), `${templateId}: complete PDF section set`);
    for (const id of CV_BODY_SECTION_IDS) {
      assert.equal(ids.filter((candidate) => candidate === id).length, 1, `${templateId}: PDF ${id} emitted once`);
    }
    assert.equal((html.match(/Cross Renderer Candidate/g) ?? []).length, 1, `${templateId}: PDF identity emitted once`);
    assert.match(html, /data-cv-lane="main"/);
    if (template.layout !== "single-column") assert.match(html, /data-cv-lane="sidebar"/);
  }

  assert.equal(Object.keys(templateRegistry).length, 13);
});

test("React preview and PDF export agree for every template", () => {
  const data = fixture();

  for (const [templateId, template] of Object.entries(templateRegistry)) {
    const Template = getTemplateComponent(templateId);
    const reactHtml = renderToStaticMarkup(createElement(Template, {
      data,
      theme: getTheme(templateId, template.defaultThemeId),
    }));
    const pdfHtml = buildHTML(data, templateId, template.defaultThemeId);

    assert.deepEqual(sectionIds(reactHtml), sectionIds(pdfHtml), `${templateId}: React/PDF parity`);
  }
});
