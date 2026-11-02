import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import type { CVData } from "@/lib/cv";
import { templateRegistry } from "@/lib/templates/registry";
import { getTemplateComponent, getTheme } from "./index";
import { allSectionsFixture } from "./section-layout.test";

const job = (role: string, company: string, start: string, end: string) => ({ role, company, location: "Utrecht", start, end, description: "", highlights: [`${role} result`] });

test("all 13 React templates show roles at one company under one company heading", () => {
    const data: CVData = {
        ...allSectionsFixture(),
        experience: [
            job("Senior Planner", "Acme BV", "2022", "heden"),
            job("Planner", "acme bv", "2019", "2022"),
            job("Assistant", "Other BV", "2017", "2019"),
        ],
    };

    for (const [templateId, template] of Object.entries(templateRegistry)) {
        const Template = getTemplateComponent(templateId);
        const html = renderToStaticMarkup(<Template data={data} theme={getTheme(templateId, template.defaultThemeId)} />);
        assert.equal((html.match(/data-cv-experience-group=""/g) ?? []).length, 1, `${templateId}: one group`);
        assert.equal((html.match(/Acme BV/gi) ?? []).length, 1, `${templateId}: company shown once`);
        assert.equal((html.match(/Utrecht/g) ?? []).length, 2, `${templateId}: shared location in the heading, plus the other job`);
        for (const [index, role] of ["Senior Planner", "Planner", "Assistant"].entries()) {
            assert.equal((html.match(new RegExp(`data-cv-entry="experience:${index}"`, "g")) ?? []).length, 1, `${templateId}: entry ${index} target`);
            assert.match(html, new RegExp(`>${role}<`), `${templateId}: ${role} title`);
        }
        assert.ok(html.indexOf("Senior Planner") < html.indexOf(">Planner<") && html.indexOf(">Planner<") < html.indexOf("Assistant"), `${templateId}: CV order kept`);
    }
});
