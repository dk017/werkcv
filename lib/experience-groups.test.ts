import assert from "node:assert/strict";
import test from "node:test";
import { groupExperienceByCompany } from "./experience-groups";

const job = (company: string, location = "") => ({ company, location });

test("consecutive jobs at the same company form one group", () => {
    const groups = groupExperienceByCompany([job("Acme BV"), job(" acme  bv "), job("Other"), job("Acme BV")]);
    assert.deepEqual(groups.map((group) => group.indexes), [[0, 1], [2], [3]]);
});

test("jobs without a company never group", () => {
    assert.deepEqual(groupExperienceByCompany([job(""), job("")]).map((group) => group.indexes), [[0], [1]]);
});

test("the location moves to the heading only when all roles share it", () => {
    assert.equal(groupExperienceByCompany([job("Acme", "Utrecht"), job("Acme", "utrecht")])[0].sharedLocation, true);
    assert.equal(groupExperienceByCompany([job("Acme", "Utrecht"), job("Acme", "")])[0].sharedLocation, false);
    assert.equal(groupExperienceByCompany([job("Acme"), job("Acme")])[0].sharedLocation, true);
});
