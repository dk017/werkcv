import assert from "node:assert/strict";
import test from "node:test";
import { defaultCV } from "../lib/cv";
import {
  applyVoiceCvChanges,
  buildVoiceCvChanges,
  getVoiceFollowUpQuestions,
  VoiceCandidate,
} from "../lib/voice-cv";

function candidate(overrides: Partial<VoiceCandidate> = {}): VoiceCandidate {
  return {
    personal: { name: "", title: "", email: "", phone: "", location: "", summary: "" },
    experience: [],
    education: [],
    skills: [],
    languages: [],
    warnings: [],
    followUpQuestions: [],
    ...overrides,
  };
}

const answers = [
  { promptId: "contact-1", section: "contact" as const, transcript: "Mijn naam is Noor." },
  { promptId: "experience-1", section: "experience" as const, transcript: "Ik werkte bij Acme." },
];

test("voice changes add facts without deleting current CV data", () => {
  const current = structuredClone(defaultCV);
  current.personal.email = "kept@example.com";
  current.skills = [{ name: "Excel", level: 4 }];
  const changes = buildVoiceCvChanges(current, candidate({
    personal: { name: "Noor Jansen", title: "Analist", email: "", phone: "", location: "Utrecht", summary: "" },
    skills: [{ name: "SQL", level: 3, levelConfirmed: false }],
  }), answers);
  const result = applyVoiceCvChanges(current, changes);

  assert.equal(result.personal.name, "Noor Jansen");
  assert.equal(result.personal.email, "kept@example.com");
  assert.deepEqual(result.skills.map((skill) => skill.name), ["Excel", "SQL"]);
});

test("strong work anchor updates an entry instead of duplicating it", () => {
  const current = structuredClone(defaultCV);
  current.experience = [{ role: "Developer", company: "Acme", location: "", start: "2022", end: "", description: "", highlights: [] }];
  const changes = buildVoiceCvChanges(current, candidate({
    experience: [{ role: " developer ", company: "ACME", location: "Amsterdam", start: "", end: "heden", description: "", highlights: ["Built a portal"] }],
  }), answers);
  const result = applyVoiceCvChanges(current, changes);

  assert.equal(changes.length, 1);
  assert.equal(changes[0].action, "update");
  assert.equal(result.experience.length, 1);
  assert.equal(result.experience[0].start, "2022");
  assert.equal(result.experience[0].location, "Amsterdam");
});

test("weak work anchor is added and never overwrites an existing entry", () => {
  const current = structuredClone(defaultCV);
  current.experience = [{ role: "Developer", company: "Acme", location: "", start: "", end: "", description: "", highlights: [] }];
  const changes = buildVoiceCvChanges(current, candidate({
    experience: [{ role: "Developer", company: "", location: "", start: "", end: "", description: "New detail", highlights: [] }],
  }), answers);
  const result = applyVoiceCvChanges(current, changes);

  assert.equal(changes[0].action, "add");
  assert.equal(result.experience.length, 2);
});

test("skills are deduplicated case-insensitively", () => {
  const current = structuredClone(defaultCV);
  current.skills = [{ name: "Excel", level: 3 }];
  const changes = buildVoiceCvChanges(current, candidate({
    skills: [{ name: " excel ", level: 4, levelConfirmed: true }],
  }), answers);
  const result = applyVoiceCvChanges(current, changes);

  assert.equal(result.skills.length, 1);
  assert.equal(result.skills[0].level, 4);
});

test("only selected changes need to be applied", () => {
  const current = structuredClone(defaultCV);
  const changes = buildVoiceCvChanges(current, candidate({
    personal: { name: "Noor", title: "Analist", email: "", phone: "", location: "", summary: "" },
  }), answers);
  const selected = changes.filter((change) => change.targetPath === "personal.name");
  const result = applyVoiceCvChanges(current, selected);

  assert.equal(result.personal.name, "Noor");
  assert.equal(result.personal.title, "");
});

test("an unstated neutral skill level never overwrites an existing level", () => {
  const current = structuredClone(defaultCV);
  current.skills = [{ name: "Java", level: 5 }];
  const changes = buildVoiceCvChanges(current, candidate({
    skills: [{ name: "Java", level: 3, levelConfirmed: false }],
  }), answers);

  assert.equal(changes.length, 0);
  assert.equal(current.skills[0].level, 5);
});

test("a new skill with an unstated level is transparently marked for review", () => {
  const changes = buildVoiceCvChanges(defaultCV, candidate({
    skills: [{ name: "Microservices", level: 3, levelConfirmed: false }],
  }), answers);

  assert.equal(changes[0].reviewNote, "SKILL_LEVEL_NOT_STATED");
  assert.deepEqual(changes[0].after, { name: "Microservices", level: 3 });
});

test("missing job titles and dates produce specific follow-up questions without guessing", () => {
  const questions = getVoiceFollowUpQuestions(candidate({
    experience: [{
      role: "",
      company: "Sopra Steria",
      location: "",
      start: "2018",
      end: "",
      description: "Developed Java and Spring Boot microservices for Tesco backend systems.",
      highlights: [],
    }],
  }), "en");

  assert.ok(questions.includes("What was your exact job title at Sopra Steria?"));
  assert.ok(questions.some((question) => question.includes("start and end dates")));
});

test("writer prompt requires evidence-bound profiles, substantive bullets, and no fabricated metrics", async () => {
  process.env.OPENAI_API_KEY ||= "test-key-not-used";
  const { buildVoiceCvWriterPrompt } = await import("../lib/voice-cv-ai");
  const prompt = buildVoiceCvWriterPrompt("en");

  assert.match(prompt, /Create a profile whenever there is enough evidence/i);
  assert.match(prompt, /action \+ context or method \+ supported result or purpose/i);
  assert.match(prompt, /Never add a number/i);
  assert.match(prompt, /Preserve all useful supported details/i);
});

test("quality checks reject compressed AI-style copy and task-like skill names", async () => {
  process.env.OPENAI_API_KEY ||= "test-key-not-used";
  const { getVoiceCvQualityIssues } = await import("../lib/voice-cv-ai");
  const weak = candidate({
    personal: {
      name: "Dhineshkumar R",
      title: "Senior Software Developer",
      email: "dhinesh217@gmail.com",
      phone: "",
      location: "Bangalore",
      summary: "Results-driven developer with a proven track record.",
    },
    experience: [{
      role: "Automation Developer",
      company: "Cognizant",
      location: "",
      start: "2014",
      end: "2018",
      description: "Worked as an automation developer.",
      highlights: ["Contributed to Simple Loan."],
    }],
    skills: [{ name: "writing microservices", level: 3, levelConfirmed: false }],
  });
  const issues = getVoiceCvQualityIssues(weak, [{
    promptId: "experience-1",
    section: "experience",
    transcript: "At Cognizant from 2014 to 2018 I was an automation developer and supported backend execution for existing US bank customers in Simple Loan.",
  }]);

  assert.ok(issues.some((issue) => issue.includes("too compressed")));
  assert.ok(issues.some((issue) => issue.includes("clichés")));
  assert.ok(issues.some((issue) => issue.includes("weak description")));
  assert.ok(issues.some((issue) => issue.includes("skill phrases")));
});

test("quality checks reject implied proficiency when skill levels were not stated", async () => {
  process.env.OPENAI_API_KEY ||= "test-key-not-used";
  const { getVoiceCvQualityIssues } = await import("../lib/voice-cv-ai");
  const result = candidate({
    personal: {
      name: "Arun Rao",
      title: "Software Developer",
      email: "",
      phone: "",
      location: "Bengaluru",
      summary: "Software Developer focused on backend systems and automation. Experienced in Java and Spring Boot delivery across banking and retail platforms. Built microservices and Angular workflows for form processing. Proficient in Kafka and Amazon S3.",
    },
    skills: [
      { name: "Kafka", level: 3, levelConfirmed: false },
      { name: "Amazon S3", level: 3, levelConfirmed: false },
    ],
  });

  const issues = getVoiceCvQualityIssues(result, [{
    promptId: "skills-1",
    section: "skills",
    transcript: "My skills include Kafka and Amazon S3. I did not state skill levels.",
  }]);

  assert.ok(issues.some((issue) => issue.includes("implies a skill level")));
});
