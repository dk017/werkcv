import { z } from "zod";

export const consumerCvPricingModels = [
  "free",
  "one_time",
  "trial_subscription",
  "subscription",
  "mixed",
  "unverified",
] as const;

export type ConsumerCvPricingModel = (typeof consumerCvPricingModels)[number];

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

export const consumerCvPricingFactSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9_]+$/).max(60),
    providerName: z.string().min(1).max(80),
    officialUrl: z.string().url().startsWith("https://"),
    checkedAt: z.string().regex(isoDatePattern),
    status: z.enum(["verified", "temporarily_unverifiable"]),
    model: z.enum(consumerCvPricingModels),
    initialPriceTextNl: z.string().min(1).max(100).nullable(),
    recurringPriceTextNl: z.string().min(1).max(100).nullable(),
    renewalTextNl: z.string().min(1).max(220),
    cancellationRequired: z.boolean().nullable(),
    factualNoteNl: z.string().min(1).max(320),
    bestForNl: z.string().min(1).max(180),
  })
  .superRefine((fact, context) => {
    const checkedAt = new Date(`${fact.checkedAt}T00:00:00.000Z`);
    if (Number.isNaN(checkedAt.getTime()) || checkedAt.toISOString().slice(0, 10) !== fact.checkedAt) {
      context.addIssue({
        code: "custom",
        path: ["checkedAt"],
        message: "checkedAt must be a real ISO calendar date",
      });
    }

    if (
      fact.status === "temporarily_unverifiable" &&
      (fact.initialPriceTextNl !== null || fact.recurringPriceTextNl !== null)
    ) {
      context.addIssue({
        code: "custom",
        path: ["status"],
        message: "Unverifiable facts cannot retain exact price text",
      });
    }
  });

export type ConsumerCvPricingFact = z.infer<typeof consumerCvPricingFactSchema>;

const verifiedAt = "2026-08-30";

const rawConsumerCvPricingFacts: ConsumerCvPricingFact[] = [
  {
    id: "youngcapital",
    providerName: "YoungCapital",
    officialUrl: "https://www.youngcapital.nl/sollicitatietips/cv/gratis-cv-maken",
    checkedAt: verifiedAt,
    status: "verified",
    model: "free",
    initialPriceTextNl: "€0",
    recurringPriceTextNl: "Geen",
    renewalTextNl: "Geen betaald abonnement nodig voor de beschreven CV-makerroute.",
    cancellationRequired: false,
    factualNoteNl:
      "De officiële pagina zegt dat je met de YoungCapital CV-maker gratis een CV kunt maken en als PDF kunt downloaden.",
    bestForNl: "Wie een volledig gratis, eenvoudige CV-route zoekt.",
  },
  {
    id: "canva",
    providerName: "Canva",
    officialUrl: "https://www.canva.com/nl_nl/maken/cv/",
    checkedAt: verifiedAt,
    status: "verified",
    model: "mixed",
    initialPriceTextNl: "€0 voor gratis templates en PDF-download",
    recurringPriceTextNl: "Betaalde functies zijn optioneel",
    renewalTextNl: "De gratis CV-route vereist geen betaald abonnement; Pro-functies hebben eigen voorwaarden.",
    cancellationRequired: null,
    factualNoteNl:
      "Canva beschrijft gratis CV-templates en gratis PDF-downloads, naast optionele betaalde Pro-functies.",
    bestForNl: "Wie veel ontwerpvrijheid wil en zelf op leesbaarheid en ATS-eenvoud let.",
  },
  {
    id: "cv_nl",
    providerName: "CV.nl",
    officialUrl: "https://www.cv.nl/pricing",
    checkedAt: verifiedAt,
    status: "verified",
    model: "trial_subscription",
    initialPriceTextNl: "14 dagen voor €0,99",
    recurringPriceTextNl: "Daarna €19,99 per maand",
    renewalTextNl: "De officiële prijzenpagina vermeldt automatische maandelijkse verlenging.",
    cancellationRequired: true,
    factualNoteNl:
      "De proefroute omvat CV's, sollicitatiebrieven, vacatures en sollicitatiebeheer en wordt automatisch verlengd.",
    bestForNl: "Wie bewust een bredere, doorlopende carrièresuite wil gebruiken.",
  },
  {
    id: "cvmaker",
    providerName: "CVMaker",
    officialUrl: "https://www.cvmaker.nl/help/wat-kost-cvmaker-nl",
    checkedAt: verifiedAt,
    status: "verified",
    model: "trial_subscription",
    initialPriceTextNl: "14 dagen voor €2,99",
    recurringPriceTextNl: "Daarna €21,99 per maand",
    renewalTextNl: "De officiële helppagina vermeldt automatische maandelijkse verlenging na de proefperiode.",
    cancellationRequired: true,
    factualNoteNl:
      "Maken en live bekijken kan gratis; downloaden en alle platformfuncties vereisen de Pro-route.",
    bestForNl: "Wie CV's, brieven, vacatures en sollicitatiebeheer in één platform wil.",
  },
  {
    id: "cvster",
    providerName: "CVster",
    officialUrl: "https://cvster.nl/pricing",
    checkedAt: verifiedAt,
    status: "verified",
    model: "mixed",
    initialPriceTextNl: "Gratis beperkt of 7 dagen premium voor €2,95",
    recurringPriceTextNl: "Daarna €14,95 per 4 weken",
    renewalTextNl:
      "De premiumproef wordt automatisch per 4 weken verlengd als je niet annuleert; de pagina toont ook vaste-termijnopties.",
    cancellationRequired: true,
    factualNoteNl:
      "De gratis route heeft beperkte exports; premium biedt onbeperkte PDF-downloads en meerdere looptijden.",
    bestForNl: "Wie bewust meerdere premium documenten en langere toegang nodig heeft.",
  },
];

export const consumerCvPricingFacts = rawConsumerCvPricingFacts.map((fact) =>
  consumerCvPricingFactSchema.parse(fact),
);

export const consumerCvPricingFactsById = Object.fromEntries(
  consumerCvPricingFacts.map((fact) => [fact.id, fact]),
) as Record<string, ConsumerCvPricingFact>;

const DAY_MS = 24 * 60 * 60 * 1000;

export function isPricingFactFresh(
  fact: ConsumerCvPricingFact,
  now: Date,
  maxAgeDays = 45,
): boolean {
  if (fact.status !== "verified") return false;
  const checkedAt = new Date(`${fact.checkedAt}T00:00:00.000Z`);
  const ageMs = now.getTime() - checkedAt.getTime();
  return ageMs >= 0 && ageMs <= maxAgeDays * DAY_MS;
}

export type ConsumerCvPricingView = ConsumerCvPricingFact & {
  fresh: boolean;
  displayedInitialPriceTextNl: string | null;
  displayedRecurringPriceTextNl: string | null;
};

export function toConsumerCvPricingView(
  fact: ConsumerCvPricingFact,
  now: Date,
): ConsumerCvPricingView {
  const fresh = isPricingFactFresh(fact, now);
  return {
    ...fact,
    fresh,
    displayedInitialPriceTextNl: fresh ? fact.initialPriceTextNl : null,
    displayedRecurringPriceTextNl: fresh ? fact.recurringPriceTextNl : null,
  };
}

export function formatPricingCheckedAtNl(checkedAt: string): string {
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${checkedAt}T00:00:00.000Z`));
}
