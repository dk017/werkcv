import test from "node:test";
import assert from "node:assert/strict";
import { getMeaningfulCvState, hasMeaningfulCvContent } from "./cv-meaningful";

test("blank auto-created document is not meaningful", () => {
    assert.equal(hasMeaningfulCvContent({ personal: {}, experience: [], education: [], skills: [] }), false);
});

test("profile identity alone is not meaningful", () => {
    assert.equal(hasMeaningfulCvContent({ personal: { name: "Sam" }, experience: [] }), false);
});

test("substantive experience is meaningful and reports signals", () => {
    const state = getMeaningfulCvState({
        personal: { name: "Sam" },
        experience: [{ role: "Designer", company: "Studio", highlights: [] }],
    });

    assert.equal(state.isMeaningful, true);
    assert.equal(state.signals.profileSummary, false);
    assert.equal(state.signals.experience, true);
});

test("a sufficiently detailed summary is meaningful", () => {
    assert.equal(hasMeaningfulCvContent({
        personal: { summary: "Experienced product designer focused on accessible digital services." },
    }), true);
});

test("malformed legacy section values are treated as empty instead of throwing", () => {
    const malformedCases = [
        { experience: {} },
        { education: "education" },
        { skills: "TypeScript" },
        { languages: 42 },
        { references: { name: "Reference" } },
        { customSections: null },
    ];

    for (const value of malformedCases) {
        assert.doesNotThrow(() => getMeaningfulCvState(value));
        assert.equal(hasMeaningfulCvContent(value), false);
    }
});

test("valid sections remain meaningful when unrelated legacy fields are malformed", () => {
    const state = getMeaningfulCvState({
        experience: {},
        skills: "invalid",
        education: [{ degree: "BSc", school: "Example University" }],
    });

    assert.equal(state.isMeaningful, true);
    assert.equal(state.signals.experience, false);
    assert.equal(state.signals.skills, false);
    assert.equal(state.signals.education, true);
});
