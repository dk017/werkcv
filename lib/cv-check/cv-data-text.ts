import type { CVData } from "@/lib/cv";
import { formatLanguageLevel, formatResumeDateRange, resumeText } from "@/lib/resume-language";

/**
 * The text of a WerkCV CV as a system reads it from our PDF: contact block first, then each section
 * under the heading the templates print. Used to grade an editor CV with the CV-check engine.
 */
export function cvDataToCheckText(data: CVData): string {
  const lines: string[] = [];
  const add = (...values: Array<string | undefined | null>) => {
    for (const value of values) {
      const trimmed = value?.trim();
      if (trimmed) lines.push(trimmed);
    }
  };
  const section = (heading: string, body: () => void) => {
    const start = lines.length;
    body();
    if (lines.length > start) lines.splice(start, 0, "", heading);
  };
  const bullets = (items: string[] | undefined) => add(...(items ?? []).map((item) => (item.trim() ? `• ${item.trim()}` : "")));

  const p = data.personal;
  add(p.name, p.title);
  add([p.email, p.phone, [p.address, p.postalCode, p.location].filter((part) => part?.trim()).join(", ")].filter((part) => part?.trim()).join(" | "));
  add(p.linkedIn, p.github, p.website);
  if (p.birthDate) add(`${resumeText(data, "birthDate")}: ${p.birthDate}${p.birthPlace ? `, ${p.birthPlace}` : ""}`);
  if (p.nationality) add(`${resumeText(data, "nationality")}: ${p.nationality}`);
  if (p.driversLicense) add(`${resumeText(data, "driversLicense")}: ${p.driversLicense}`);

  section(resumeText(data, "profile"), () => add(p.summary));

  const job = (entry: { role: string; company: string; location: string; start: string; end: string; description: string; highlights: string[] }) => {
    add(entry.role, [entry.company, entry.location].filter((part) => part.trim()).join(", "), formatResumeDateRange(entry.start, entry.end, data));
    add(entry.description);
    bullets(entry.highlights);
  };
  section(resumeText(data, "experience"), () => data.experience.forEach(job));
  section(resumeText(data, "internships"), () => (data.internships ?? []).forEach(job));

  section(resumeText(data, data.education.length > 1 ? "education" : "educationSingle"), () =>
    data.education.forEach((entry) => {
      add(entry.degree, [entry.school, entry.location].filter((part) => part.trim()).join(", "), formatResumeDateRange(entry.start, entry.end, data));
      add(entry.description);
    }),
  );
  section(resumeText(data, "skills"), () => add(...data.skills.map((skill) => skill.name)));
  section(resumeText(data, "languages"), () =>
    add(...data.languages.map((language) => (language.name.trim() ? `${language.name.trim()}: ${formatLanguageLevel(language.level, data)}` : ""))),
  );
  section(resumeText(data, "courses"), () =>
    add(...(data.courses ?? []).map((course) => [course.name, course.institution, course.year].filter((part) => part.trim()).join(", "))),
  );
  section(resumeText(data, "sideActivities"), () =>
    (data.sideActivities ?? []).forEach((activity) => {
      add([activity.title, activity.organization].filter((part) => part.trim()).join(", "), formatResumeDateRange(activity.start, activity.end, data));
      add(activity.description);
    }),
  );
  section(resumeText(data, "awards"), () => bullets(data.awards));
  section(resumeText(data, "interests"), () => add((data.interests ?? []).filter((item) => item.trim()).join(", ")));
  section(resumeText(data, "properties"), () => add((data.properties ?? []).filter((item) => item.trim()).join(", ")));
  for (const custom of data.customSections ?? []) section(custom.title || resumeText(data, "customSection"), () => bullets(custom.items));
  section(resumeText(data, "references"), () =>
    add(...(data.references ?? []).map((reference) => [reference.name, reference.role, reference.company].filter((part) => part.trim()).join(", "))),
  );

  return lines.join("\n").trim();
}
