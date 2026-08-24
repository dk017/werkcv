import assert from "node:assert/strict";
import test from "node:test";
import { defaultCV, type CVData } from "@/lib/cv";
import { buildHTML } from "@/lib/pdf";
import { getDefaultThemeId, templateList } from "@/lib/templates/registry";

const fixture: CVData = {
  ...structuredClone(defaultCV),
  personal: { ...structuredClone(defaultCV.personal), name: "Test Kandidaat", resumeLanguage: "nl" },
  properties: ["Analytisch"],
  references: [{ name: "Sam Reviewer", role: "Recruitment manager", company: "Voorbeeld BV", email: "sam@example.com", phone: "+31 6 12345678" }],
  sideActivities: [{ title: "Vrijwilliger jeugdactiviteiten", organization: "Fictieve stichting", start: "2018", end: "heden", description: "Begeleidt maandelijkse activiteiten voor jongeren." }],
  customSections: [{ title: "Aanvullende informatie", items: ["Beschikbaar na één maand opzegtermijn.", "<script>must be escaped</script>"] }],
};

test("PDF exports keep optional CV sections in every template", () => {
  for (const template of templateList) {
    const html = buildHTML(fixture, template.id, getDefaultThemeId(template.id));
    assert.match(html, /Nevenactiviteiten/, `${template.id} should label side activities`);
    assert.match(html, /Vrijwilliger jeugdactiviteiten/, `${template.id} should render side activities`);
    assert.match(html, /Eigenschappen/, `${template.id} should label properties`);
    assert.match(html, /Analytisch/, `${template.id} should render properties`);
    assert.match(html, /Referenties/, `${template.id} should label references`);
    assert.match(html, /Sam Reviewer/, `${template.id} should render references`);
    assert.match(html, /Aanvullende informatie/, `${template.id} should render custom section titles`);
    assert.match(html, /Beschikbaar na één maand opzegtermijn/, `${template.id} should render custom section items`);
    assert.match(html, /&lt;script&gt;must be escaped&lt;\/script&gt;/, `${template.id} should escape custom section text`);
    assert.doesNotMatch(html, /<script>must be escaped<\/script>/, `${template.id} must not inject custom section HTML`);
  }
});
