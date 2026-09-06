export const agencyPrivacyFacts = {
  content: {
    originalUploadStored: false,
    storedAfterAnalysis: [
      "complete extracted CV text, source map and source digest",
      "extracted vacancy text",
      "structured candidate data",
      "contact-free derived candidate data",
      "evidence references and analysis result",
      "revisions, approval snapshot and outcome metrics",
    ],
  },
  retention: {
    defaultDays: 90,
    options: [30, 90, 180, 365],
    appliesTo: "MatchPack candidate content and derived CV documents",
    excludes: "billing, subscription, payment and non-content usage records",
  },
  processors: [
    {
      name: "OpenAI",
      purpose: "AI-assisted extraction and vacancy-evidence analysis",
      region: null,
      verificationStatus: "deployment verification required",
    },
    {
      name: "Dodo Payments",
      purpose: "Agency subscription checkout and payment status",
      region: null,
      verificationStatus: "deployment verification required",
    },
    {
      name: "Configured email provider",
      purpose: "Login-code delivery",
      region: null,
      verificationStatus: "deployment verification required",
    },
    {
      name: "Configured hosting/PostgreSQL provider",
      purpose: "Account, MatchPack and revision storage",
      region: null,
      verificationStatus: "deployment verification required",
    },
  ],
  dpa: {
    status: "legal review required",
    publicWording: "Current DPA and subprocessor details are available on request after factual and legal verification.",
  },
} as const;

export function getAgencyStorageDescription(locale: "nl" | "en"): string {
  return locale === "en"
    ? "The uploaded PDF or DOCX is used to extract text; WerkCV does not retain the original file. MatchPack does store the complete extracted CV text, source map and checksum, vacancy text, original and edited structured candidate data, contact-reduced versions, analysis, evidence references, revisions and approval information. These records remain until deletion under the agency retention policy. The free checker does not save these inputs or results in the MatchPack database."
    : "Het PDF- of DOCX-bestand wordt gebruikt om tekst uit te lezen; WerkCV bewaart het originele bestand niet. MatchPack bewaart wel de volledige uitgelezen CV-tekst, bronindeling en controlesom, vacaturetekst, oorspronkelijke en bewerkte gestructureerde kandidaatdata, versies zonder directe contactgegevens, analyse, bewijsverwijzingen, revisies en goedkeuringsinformatie. Deze gegevens blijven bewaard tot verwijdering volgens het bewaarbeleid van het bureau. De gratis checker slaat deze invoer en uitslagen niet op in de MatchPack-database.";
}
