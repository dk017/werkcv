import nodemailer from "nodemailer";

export type AgencyTransactionalEmailKind = "agency_welcome_v1" | "candidate_acknowledgement_invite_v1";

export type CandidateAcknowledgementEmailPayload = {
  invitationUrl: string;
  agencyName: string;
  recipientOrganization: string;
  vacancyTitle: string;
  expiresAt: string;
};

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

export function agencyTransactionalEmailTemplate(kind: AgencyTransactionalEmailKind, locale: string, payload?: CandidateAcknowledgementEmailPayload) {
  if (kind === "candidate_acknowledgement_invite_v1") {
    if (!payload) throw new Error("EMAIL_PAYLOAD_MISSING");
    if (locale === "en") return {
      subject: `${payload.agencyName} asks you to check a candidate proposal`,
      text: [
        `${payload.agencyName} plans to present your information to ${payload.recipientOrganization} for the vacancy ${payload.vacancyTitle}.`,
        "",
        "Open the secure review to check the exact CV and client-facing information, suggest corrections, confirm the displayed version or decline sharing this version.",
        payload.invitationUrl,
        "",
        `The invitation expires on ${new Date(payload.expiresAt).toLocaleString("en-GB", { timeZone: "Europe/Amsterdam" })}.`,
        "Opening the link confirms control of this mailbox only. It is not identity verification or an electronic signature.",
      ].join("\n"),
    };
    return {
      subject: `${payload.agencyName} vraagt je een kandidaatvoorstel te controleren`,
      text: [
        `${payload.agencyName} wil jouw informatie voorstellen aan ${payload.recipientOrganization} voor de vacature ${payload.vacancyTitle}.`,
        "",
        "Open de beveiligde review om het exacte CV en de klantinformatie te controleren, correcties voor te stellen, deze versie te bevestigen of het delen van deze versie af te wijzen.",
        payload.invitationUrl,
        "",
        `De uitnodiging verloopt op ${new Date(payload.expiresAt).toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam" })}.`,
        "Het openen van de link bevestigt alleen toegang tot deze mailbox. Het is geen identiteitscontrole of elektronische handtekening.",
      ].join("\n"),
    };
  }
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
  payload?: CandidateAcknowledgementEmailPayload;
}) {
  const smtp = transporter();
  if (!smtp) throw new Error("SMTP_NOT_CONFIGURED");
  const template = agencyTransactionalEmailTemplate(input.kind, input.locale, input.payload);
  await smtp.sendMail({
    from: process.env.AUTH_FROM_EMAIL || process.env.SMTP_USER || "noreply@werkcv.nl",
    to: input.recipientEmail,
    subject: template.subject,
    text: template.text,
  });
}
