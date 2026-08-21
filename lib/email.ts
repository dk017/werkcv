import nodemailer from "nodemailer";

export type AgencyTransactionalEmailKind = "agency_welcome_v1";

function transporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: { user, pass },
  });
}

export function agencyTransactionalEmailTemplate(kind: AgencyTransactionalEmailKind, locale: string) {
  if (kind !== "agency_welcome_v1") throw new Error("EMAIL_TEMPLATE_NOT_FOUND");
  if (locale === "en") {
    return {
      subject: "Your WerkCV MatchPack workspace is ready",
      text: [
        "Your MatchPack workspace is ready.",
        "",
        "MatchPack turns one vacancy and one candidate CV into a recruiter-reviewed candidate proposal with source evidence and visible gaps.",
        "Analysis and draft review do not use a slot. A new standalone CV or final MatchPack approval uses one shared slot from the monthly allowance of 50.",
        "Your default retention period is 90 days and can be changed to 30, 90, 180 or 365 days in Agency settings.",
        "",
        "View the fictional example: https://werkcv.nl/agency#voorbeeld",
        "Open your workspace: https://werkcv.nl/agency/account",
        "Privacy and retention: https://werkcv.nl/agency/privacy",
        "Read the guide: https://werkcv.nl/voor-bureaus/kennisbank/matchpack-handleiding",
      ].join("\n"),
    };
  }
  return {
    subject: "Je WerkCV MatchPack-workspace staat klaar",
    text: [
      "Je MatchPack-workspace staat klaar.",
      "",
      "MatchPack maakt van één vacature en één kandidaat-CV een door de recruiter gecontroleerd kandidaatvoorstel met bronbewijs en zichtbare ontbrekende informatie.",
      "Analyse en conceptreview gebruiken geen slot. Een nieuw los CV of definitieve MatchPack-goedkeuring gebruikt één gedeeld slot uit de maandlimiet van 50.",
      "Je standaard bewaartermijn is 90 dagen en kan in Agency-instellingen worden gewijzigd naar 30, 90, 180 of 365 dagen.",
      "",
      "Bekijk het fictieve voorbeeld: https://werkcv.nl/agency#voorbeeld",
      "Open je workspace: https://werkcv.nl/agency/account",
      "Privacy en retentie: https://werkcv.nl/agency/privacy",
      "Lees de handleiding: https://werkcv.nl/voor-bureaus/kennisbank/matchpack-handleiding",
    ].join("\n"),
  };
}

export async function sendAgencyTransactionalEmail(input: {
  kind: AgencyTransactionalEmailKind;
  recipientEmail: string;
  locale: string;
}) {
  const smtp = transporter();
  if (!smtp) throw new Error("SMTP_NOT_CONFIGURED");
  const template = agencyTransactionalEmailTemplate(input.kind, input.locale);
  await smtp.sendMail({
    from: process.env.AUTH_FROM_EMAIL || process.env.SMTP_USER || "noreply@werkcv.nl",
    to: input.recipientEmail,
    subject: template.subject,
    text: template.text,
  });
}
