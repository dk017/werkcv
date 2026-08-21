import { buildHTML, generatePDFFromHTML } from "@/lib/pdf";
import type { ApprovedMatchPackOutput } from "@/lib/agency-output-projection";
import { escapeHtml, nl2br } from "@/lib/templates/html/utils";
import { getThemeForTemplate } from "@/lib/templates";
import { templateRegistry } from "@/lib/templates/registry";

type SubmissionPdfOptions = {
  output: ApprovedMatchPackOutput;
  templateId: string;
  colorThemeId: string;
  companyName?: string | null;
};

function valueRow(label: string, value: string): string {
  if (!value.trim()) return "";
  return `<div style="border-top:1px solid #dbe3ea;padding:10px 0;display:grid;grid-template-columns:145px 1fr;gap:18px;">
    <span style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:#64748b;">${escapeHtml(label)}</span>
    <span style="font-size:12px;font-weight:650;color:#0f172a;">${nl2br(value)}</span>
  </div>`;
}

function buildCoverPage(options: SubmissionPdfOptions): string {
  const { output } = options;
  const { submission, locale } = output;
  const isEnglish = locale === "en";
  const theme = getThemeForTemplate(templateRegistry, options.templateId, options.colorThemeId);
  const role = output.vacancyTitle.trim() || output.candidateData.personal.title.trim();
  const candidateName = output.variant === "contact_free"
    ? (isEnglish ? "Candidate profile" : "Kandidaatprofiel")
    : output.candidateData.personal.name.trim() || (isEnglish ? "Candidate" : "Kandidaat");
  const reviewedEvidence = output.evidence.slice(0, 4);
  const openItems = output.openItems.slice(0, 3);
  const labels = isEnglish
    ? {
      eyebrow: "Candidate submission",
      forRole: "For the role",
      introduction: "Recruiter introduction",
      evidence: "Reviewed evidence",
      strong: "Supported",
      partial: "Partly supported — verify",
      open: "Items to verify",
      details: "Submission details",
      availability: "Availability",
      notice: "Notice period",
      salary: "Salary / rate indication",
      hours: "Hours per week",
      location: "Work location",
      preferences: "Candidate preferences",
      warning: "Prepared for human review. Missing information is not inferred.",
    }
    : {
      eyebrow: "Kandidaatvoorstel",
      forRole: "Voor de rol",
      introduction: "Introductie door recruiter",
      evidence: "Gecontroleerd bewijs",
      strong: "Onderbouwd",
      partial: "Deels onderbouwd — verifiëren",
      open: "Nog te verifiëren",
      details: "Voorstelgegevens",
      availability: "Beschikbaarheid",
      notice: "Opzegtermijn",
      salary: "Salaris- of tariefindicatie",
      hours: "Uren per week",
      location: "Werklocatie",
      preferences: "Wensen kandidaat",
      warning: "Opgesteld voor menselijke controle. Ontbrekende informatie wordt niet ingevuld.",
    };
  const warning = output.variant === "contact_free"
    ? output.contactFreeWarning
    : labels.warning;

  return `<section style="width:210mm;min-height:297mm;padding:20mm 18mm 16mm;background:#fff;page-break-after:always;font-family:Inter,Arial,sans-serif;color:#0f172a;position:relative;">
    <div style="height:8px;background:${theme.primary};margin:-20mm -18mm 18mm;"></div>
    <div style="display:flex;justify-content:space-between;gap:24px;align-items:flex-start;">
      <div>
        <p style="font-size:10px;font-weight:900;letter-spacing:.18em;text-transform:uppercase;color:${theme.primary};">${escapeHtml(labels.eyebrow)}</p>
        <h1 style="font-size:30px;line-height:1.08;margin:8px 0 0;font-weight:850;">${escapeHtml(candidateName)}</h1>
        <p style="font-size:14px;margin-top:9px;color:#475569;"><strong>${escapeHtml(labels.forRole)}:</strong> ${escapeHtml(role)}</p>
      </div>
      <div style="text-align:right;font-size:11px;color:#64748b;font-weight:700;">${escapeHtml(options.companyName?.trim() || "WerkCV Agency")}</div>
    </div>

    <div style="margin-top:24px;padding:18px;border:2px solid #0f172a;background:#f8fafc;">
      <p style="font-size:10px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:${theme.primary};">${escapeHtml(labels.introduction)}</p>
      <p style="font-size:13px;line-height:1.65;margin-top:10px;">${nl2br(submission.clientIntroduction)}</p>
    </div>

    ${reviewedEvidence.length ? `<div style="margin-top:22px;">
      <h2 style="font-size:15px;margin:0 0 10px;font-weight:850;">${escapeHtml(labels.evidence)}</h2>
      ${reviewedEvidence.map((item) => `<div style="margin-top:8px;padding-left:12px;border-left:4px solid ${item.qualification === "strong" ? theme.primary : "#f59e0b"};">
        <p style="font-size:12px;font-weight:800;">${escapeHtml(item.requirement)} <span style="margin-left:5px;padding:2px 5px;background:${item.qualification === "strong" ? "#dcfce7" : "#fef3c7"};color:${item.qualification === "strong" ? "#166534" : "#92400e"};font-size:8px;text-transform:uppercase;letter-spacing:.05em;">${escapeHtml(item.qualification === "strong" ? labels.strong : labels.partial)}</span></p>
        <p style="font-size:11px;line-height:1.45;margin-top:3px;color:#475569;">${escapeHtml(item.evidence)}</p>
        <p style="font-size:9px;line-height:1.4;margin-top:3px;color:#64748b;">${escapeHtml(item.source.page ? `PDF p. ${item.source.page}` : `Regel ${item.source.line}`)} · ${escapeHtml(item.source.section)}${item.source.match === "approximate" ? " · benaderde bronmatch" : ""}</p>
      </div>`).join("")}
    </div>` : ""}

    ${openItems.length ? `<div style="margin-top:22px;padding:14px;background:#fffbeb;border:1px solid #fbbf24;">
      <h2 style="font-size:13px;margin:0;font-weight:850;">${escapeHtml(labels.open)}</h2>
      <ul style="margin:8px 0 0;padding-left:18px;font-size:11px;line-height:1.5;color:#713f12;">${openItems.map((item) => `<li>${escapeHtml(item.requirement)} - ${escapeHtml(item.action)}</li>`).join("")}</ul>
    </div>` : ""}

    <div style="margin-top:22px;">
      <h2 style="font-size:15px;margin:0 0 4px;font-weight:850;">${escapeHtml(labels.details)}</h2>
      ${valueRow(labels.availability, submission.commercial.availability)}
      ${valueRow(labels.notice, submission.commercial.noticePeriod)}
      ${valueRow(labels.salary, submission.commercial.salaryIndication)}
      ${valueRow(labels.hours, submission.commercial.hoursPerWeek)}
      ${valueRow(labels.location, submission.commercial.workLocation)}
      ${valueRow(labels.preferences, submission.commercial.candidatePreferences)}
    </div>

    <p style="position:absolute;left:18mm;right:18mm;bottom:12mm;padding-top:8px;border-top:1px solid #cbd5e1;font-size:9px;color:#64748b;">${escapeHtml(warning)}</p>
  </section>`;
}

export async function generateAgencySubmissionPDF(options: SubmissionPdfOptions): Promise<Buffer> {
  const cvHtml = buildHTML(options.output.candidateData, options.templateId, options.colorThemeId);
  const coverPage = buildCoverPage(options);
  const combinedHtml = cvHtml
    .replace("</style>", `@page { margin: 0; size: A4; }</style>`)
    .replace("<body>", `<body>${coverPage}<div class="agency-submission-cv">`)
    .replace("</body>", "</div></body>");
  return generatePDFFromHTML(combinedHtml);
}
