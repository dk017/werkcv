export const agencyPrivacyFacts = {
  content: {
    originalUploadStored: false,
    storedAfterAnalysis: [
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
