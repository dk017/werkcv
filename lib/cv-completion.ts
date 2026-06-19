import type { CVData } from "@/lib/cv";
import type { UiLanguage } from "@/lib/ui-language";

export type CompletionStepId = "contact" | "summary" | "experience" | "education" | "skills";

export type CompletionStep = {
  id: CompletionStepId;
  label: string;
  hint: string;
  anchorId: string;
  complete: boolean;
  score: number;
};

export type CompletionState = {
  score: number;
  steps: CompletionStep[];
  nextStep: CompletionStep | null;
  isReady: boolean;
  isComplete: boolean;
};

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function ratio(completed: number, total: number): number {
  return total > 0 ? Math.min(1, completed / total) : 0;
}

function hasContactMethod(data: CVData): boolean {
  const email = text(data.personal.email);
  const phoneDigits = text(data.personal.phone).replace(/\D/g, "");
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phoneDigits.length >= 7;
}

function hasMeaningfulExperience(data: CVData): { complete: boolean; scoreRatio: number } {
  const experienceRatios = data.experience.map((item) => {
    const content = [text(item.description), ...item.highlights.map(text)].find((value) => value.length >= 20);
    return ratio(
      Number(text(item.role).length >= 2) +
        Number(text(item.company).length >= 2) +
        Number(Boolean(content)),
      3,
    );
  });
  const internshipRatios = data.internships.map((item) => {
    const content = [text(item.description), ...item.highlights.map(text)].find((value) => value.length >= 20);
    return ratio(
      Number(text(item.role).length >= 2) +
        Number(text(item.company).length >= 2) +
        Number(Boolean(content)),
      3,
    );
  });
  const sideActivityRatios = (data.sideActivities ?? []).map((item) =>
    ratio(
      Number(text(item.title).length >= 2) +
        Number(text(item.organization).length >= 2) +
        Number(text(item.description).length >= 20),
      3,
    ),
  );
  const scoreRatio = Math.max(0, ...experienceRatios, ...internshipRatios, ...sideActivityRatios);
  return { complete: scoreRatio === 1, scoreRatio };
}

export function getCompletionState(data: CVData, uiLanguage: UiLanguage): CompletionState {
  const tr = (dutch: string, english: string) => (uiLanguage === "en" ? english : dutch);
  const contactParts = [
    text(data.personal.name).length >= 2,
    text(data.personal.title).length >= 2,
    hasContactMethod(data),
  ];
  const contactRatio = ratio(contactParts.filter(Boolean).length, contactParts.length);
  const summaryRatio = Math.min(1, text(data.personal.summary).length / 80);
  const experience = hasMeaningfulExperience(data);
  const educationRatios = data.education.map((item) =>
    ratio(Number(text(item.degree).length >= 2) + Number(text(item.school).length >= 2), 2),
  );
  const educationRatio = Math.max(0, ...educationRatios);
  const uniqueSkills = new Set(data.skills.map((skill) => text(skill.name).toLowerCase()).filter(Boolean));
  const skillsRatio = ratio(uniqueSkills.size, 3);

  const steps: CompletionStep[] = [
    {
      id: "contact",
      label: tr("Contactgegevens", "Contact details"),
      hint: tr("Naam, gewenste functie en e-mail of telefoon", "Name, target role, and email or phone"),
      anchorId: "section-personal",
      complete: contactRatio === 1,
      score: Math.round(contactRatio * 20),
    },
    {
      id: "summary",
      label: tr("Profieltekst", "Profile summary"),
      hint: tr("Schrijf minimaal 2-3 zinnen over je ervaring", "Write at least 2-3 sentences about your experience"),
      anchorId: "section-personal",
      complete: summaryRatio === 1,
      score: Math.round(summaryRatio * 20),
    },
    {
      id: "experience",
      label: tr("Ervaring", "Experience"),
      hint: tr("Voeg een functie, stage of nevenactiviteit met inhoud toe", "Add a role, internship, or activity with meaningful details"),
      anchorId: "section-experience",
      complete: experience.complete,
      score: Math.round(experience.scoreRatio * 20),
    },
    {
      id: "education",
      label: tr("Opleiding", "Education"),
      hint: tr("Voeg een opleiding en onderwijsinstelling toe", "Add a degree and school"),
      anchorId: "section-education",
      complete: educationRatio === 1,
      score: Math.round(educationRatio * 20),
    },
    {
      id: "skills",
      label: tr("Vaardigheden", "Skills"),
      hint: tr("Voeg minimaal 3 unieke vaardigheden toe", "Add at least 3 unique skills"),
      anchorId: "section-skills",
      complete: skillsRatio === 1,
      score: Math.round(skillsRatio * 20),
    },
  ];

  const score = Math.min(100, steps.reduce((total, step) => total + step.score, 0));
  const completedStepCount = steps.filter((step) => step.complete).length;
  const contactComplete = steps.find((step) => step.id === "contact")?.complete === true;
  const hasExperienceOrEducation = steps.some(
    (step) => (step.id === "experience" || step.id === "education") && step.complete,
  );
  const isComplete = completedStepCount === steps.length;
  const isReady = score >= 80 && completedStepCount >= 4 && contactComplete && hasExperienceOrEducation;

  return {
    score,
    steps,
    nextStep: steps.find((step) => !step.complete) ?? null,
    isReady,
    isComplete,
  };
}
