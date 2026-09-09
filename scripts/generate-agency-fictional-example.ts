import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { agencyFictionalExample, fictionalFullCvText, fictionalVacancyText, fictionalExampleVersion, fictionalExampleSourceDigest } from "@/lib/agency-fictional-example";
import { getFictionalOutput } from "@/lib/agency-fictional-output";
import { generateAgencySubmissionPDF } from "@/lib/agency-submission-pdf";
import { generateAgencySubmissionDOCX } from "@/lib/agency-docx";
import { generatePDFFromHTML } from "@/lib/pdf";
import { escapeHtml } from "@/lib/templates/html/utils";

// No database, payment, candidate records or AI calls. Stage, never publish.
async function main() {
  const directory = path.resolve(".codex-tmp/agency-discovery/artifacts");
  await mkdir(directory, { recursive: true });
  const artifacts: { name: string; purpose: string; sha256: string }[] = [];
  async function save(name: string, content: Buffer | string, purpose: string) {
    await writeFile(path.join(directory, name), content);
    artifacts.push({ name, purpose, sha256: createHash("sha256").update(content).digest("hex") });
  }
  await save("agency-sample-vacature-hr-adviseur.txt", fictionalVacancyText, "fictional vacancy, not candidate facts");
  const numberedSource = fictionalFullCvText.split("\n").map((line, index) => `<div class="line"><span class="number">${index + 1}</span><span>${escapeHtml(line) || "&nbsp;"}</span></div>`).join("");
  const html = `<!doctype html><html lang="nl"><head><meta charset="utf-8"><style>@page{size:A4;margin:18mm}body{font:12px/1.55 sans-serif;color:#193c36}h1{font-size:24px}.line{display:flex;gap:12px}.number{color:#687972;min-width:22px;font-size:10px}p{font-size:11px}</style></head><body><h1>Fictief bron CV</h1><p>Volledig fictief voorbeeld. De regelnummers komen overeen met de bronverwijzingen in het kandidaatvoorstel.</p>${numberedSource}</body></html>`;
  await save("agency-sample-bron-cv-hr-adviseur.pdf", await generatePDFFromHTML(html), "complete original fictional CV");
  for (const variant of ["full", "contact_free"] as const) {
    const output = getFictionalOutput(variant);
    const stem = `werkcv-voorbeeld-kandidaatvoorstel-hr-adviseur${variant === "full" ? "" : "-geanonimiseerd"}`;
    await save(`${stem}.pdf`, await generateAgencySubmissionPDF({ output, templateId: "professional", colorThemeId: "classic-blue", companyName: "WerkCV · volledig fictief voorbeeld" }), `${variant} fictional client proposal`);
    await save(`${stem}.docx`, await generateAgencySubmissionDOCX({ output, headerText: agencyFictionalExample.notice, footerText: "WerkCV · volledig fictief voorbeeld" }), `${variant} fictional client proposal`);
  }
  await writeFile(path.join(directory, "manifest.json"), JSON.stringify({ fixtureVersion: fictionalExampleVersion, sourcePassagesDigest: fictionalExampleSourceDigest, fullSourceDigest: createHash("sha256").update(fictionalFullCvText).digest("hex"), status: "STAGED_NOT_VISUALLY_CERTIFIED", artifacts }, null, 2));
  console.log(`Staged ${artifacts.length} artifacts for review; public assets unchanged.`);
}
main().catch((error: unknown) => { console.error(error instanceof Error ? error.message : "Fixture generation failed"); process.exitCode = 1; });
