import { cvDownloadPrice } from "@/lib/site-content";

/**
 * Exit question for people who come back from the payment page without paying ("Wat hield je
 * tegen?"). One question, a few fixed answers plus optional short text: the format that gets
 * 10–40% response in exit surveys. Plan: docs/product/2026-09-28-price-copy-exit-plan.md.
 */
export const CHECKOUT_EXIT_REASONS = [
  "too_expensive",
  "expected_free",
  "payment_method",
  "checkout_trust",
  "not_ready",
  "other",
] as const;
export type CheckoutExitReason = (typeof CHECKOUT_EXIT_REASONS)[number];
export type CheckoutExitTrigger = "cancel_button" | "returned";

/** Properties of checkout_exit_prompt_shown; checkout_exit_reason adds reason and detail. */
export type CheckoutExitEventContext = {
  cvId: string;
  uiLanguage: "nl" | "en";
  trigger: CheckoutExitTrigger;
  amountCents: number;
  priceCopyVariant?: "plain" | "pizza" | "competitor";
  secondsSinceCheckout?: number;
};

/** Dodo's back button (cancel_url) lands on the editor with this parameter. */
export const CHECKOUT_CANCEL_PARAM = "checkout";
export const CHECKOUT_CANCEL_VALUE = "cancelled";

export const CHECKOUT_EXIT_DETAIL_MAX = 200;
const PENDING_KEY = "werkcv_checkout_pending";
const SHOWN_KEY_PREFIX = "werkcv_checkout_exit_shown:";
/** A pending checkout older than this is not "just came back from the payment page". */
const PENDING_MAX_AGE_MS = 6 * 60 * 60 * 1000;
/** Ask at most once per CV per day. */
const SHOW_INTERVAL_MS = 24 * 60 * 60 * 1000;

export type PendingCheckout = { cvId: string; at: number };

export function decideExitPrompt(input: {
  cvId: string;
  now: number;
  cancelMarker: boolean;
  pending: PendingCheckout | null;
  lastShownAt: number | null;
}): CheckoutExitTrigger | null {
  const { cvId, now, cancelMarker, pending, lastShownAt } = input;
  if (lastShownAt !== null && now - lastShownAt < SHOW_INTERVAL_MS) return null;
  if (cancelMarker) return "cancel_button";
  if (pending && pending.cvId === cvId && now - pending.at >= 0 && now - pending.at < PENDING_MAX_AGE_MS) return "returned";
  return null;
}

// Browser storage. Every access is guarded: private mode or blocked storage just means no prompt.
export function markCheckoutPending(cvId: string, now = Date.now()) {
  try {
    window.localStorage.setItem(PENDING_KEY, JSON.stringify({ cvId, at: now } satisfies PendingCheckout));
  } catch {
    // ignore
  }
}

export function readPendingCheckout(): PendingCheckout | null {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(PENDING_KEY) ?? "null");
    if (parsed && typeof parsed === "object" && typeof (parsed as PendingCheckout).cvId === "string" && typeof (parsed as PendingCheckout).at === "number") {
      return parsed as PendingCheckout;
    }
  } catch {
    // ignore
  }
  return null;
}

/** Called on the success page and once the prompt has been shown. */
export function clearPendingCheckout(cvId?: string | null) {
  try {
    const pending = readPendingCheckout();
    if (!cvId || !pending || pending.cvId === cvId) window.localStorage.removeItem(PENDING_KEY);
  } catch {
    // ignore
  }
}

export function readExitPromptShownAt(cvId: string): number | null {
  try {
    const value = Number(window.localStorage.getItem(`${SHOWN_KEY_PREFIX}${cvId}`));
    return Number.isFinite(value) && value > 0 ? value : null;
  } catch {
    return null;
  }
}

export function markExitPromptShown(cvId: string, now = Date.now()) {
  try {
    window.localStorage.setItem(`${SHOWN_KEY_PREFIX}${cvId}`, String(now));
  } catch {
    // ignore
  }
}

/** Free text is optional and short; strip anything that looks like contact details or links. */
export function scrubExitDetail(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const cleaned = value
    .replace(/[\p{Cc}]/gu, " ")
    .replace(/\S+@\S+/g, "[verwijderd]")
    .replace(/(?:https?:\/\/|www\.)\S+/gi, "[verwijderd]")
    .replace(/\+?\d[\d\s().-]{5,}\d/g, "[verwijderd]")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, CHECKOUT_EXIT_DETAIL_MAX);
  return cleaned || undefined;
}

const PRICE_COPY_ARMS = ["plain", "pizza", "competitor"];

/** Server-side allowlist for the two exit events: only known fields, bounded values. */
export function sanitizeCheckoutExitProperties(event: string, value: Record<string, unknown>): Record<string, unknown> {
  const base = {
    ...(typeof value.cvId === "string" && value.cvId.length <= 64 ? { cvId: value.cvId } : {}),
    uiLanguage: value.uiLanguage === "en" ? "en" : "nl",
    trigger: value.trigger === "cancel_button" ? "cancel_button" : "returned",
    ...(typeof value.secondsSinceCheckout === "number" && Number.isFinite(value.secondsSinceCheckout)
      ? { secondsSinceCheckout: Math.max(0, Math.min(PENDING_MAX_AGE_MS / 1000, Math.round(value.secondsSinceCheckout))) }
      : {}),
    ...(PRICE_COPY_ARMS.includes(String(value.priceCopyVariant)) ? { priceCopyVariant: String(value.priceCopyVariant) } : {}),
    ...(typeof value.amountCents === "number" && Number.isInteger(value.amountCents) && value.amountCents > 0 && value.amountCents < 100000
      ? { amountCents: value.amountCents }
      : {}),
  };
  if (event !== "checkout_exit_reason") return base;
  const reason = (CHECKOUT_EXIT_REASONS as readonly string[]).includes(String(value.reason)) ? String(value.reason) : "other";
  const detail = reason === "other" || reason === "payment_method" ? scrubExitDetail(value.detail) : undefined;
  return { ...base, reason, ...(detail ? { detail } : {}) };
}

export type CheckoutExitCopy = {
  question: string;
  intro: string;
  dismiss: string;
  options: { reason: CheckoutExitReason; label: string }[];
  detailLabel: Partial<Record<CheckoutExitReason, string>>;
  detailPlaceholder: Partial<Record<CheckoutExitReason, string>>;
  submit: string;
  replies: Record<CheckoutExitReason, string>;
};

export function getCheckoutExitCopy(locale: "nl" | "en"): CheckoutExitCopy {
  if (locale === "en") {
    const price = cvDownloadPrice.displayEn;
    return {
      question: "What held you back?",
      intro: "You didn't finish the payment. One click helps us improve WerkCV. Your CV stays saved.",
      dismiss: "Close",
      options: [
        { reason: "too_expensive", label: "More expensive than I expected" },
        { reason: "expected_free", label: "I thought downloading was free" },
        { reason: "payment_method", label: "My payment method wasn't there" },
        { reason: "checkout_trust", label: "I wasn't sure about the payment page" },
        { reason: "not_ready", label: "My CV isn't finished yet" },
        { reason: "other", label: "Something else" },
      ],
      detailLabel: { payment_method: "Which payment method were you looking for? (optional)", other: "What was it? (optional)" },
      detailPlaceholder: { payment_method: "Name of the payment method", other: "Short, no personal details" },
      submit: "Send",
      replies: {
        too_expensive: `Thanks, this helps us set the price. For ${price} you download this CV as often as you like and keep editing it. No subscription, nothing renews.`,
        expected_free: `Creating, saving and previewing your CV is free. Only the PDF download costs ${price}, once for this CV. Your CV stays in your account, so you can download it later.`,
        payment_method: "Thanks. You can pay by card, Apple Pay or Google Pay, and with iDEAL in the Netherlands. We use your answer to decide which methods to add.",
        checkout_trust: "The payment runs through Dodo Payments, our payment provider. They process the payment and send your receipt; WerkCV never sees your card details. After paying you come straight back to WerkCV to download your PDF.",
        not_ready: "No problem. Your CV is saved automatically in your account. Download it when it's ready.",
        other: "Thanks, this helps us improve WerkCV.",
      },
    };
  }
  const price = cvDownloadPrice.display;
  return {
    question: "Wat hield je tegen?",
    intro: "Je hebt de betaling niet afgerond. Eén klik helpt ons WerkCV beter te maken. Je cv blijft bewaard.",
    dismiss: "Sluiten",
    options: [
      { reason: "too_expensive", label: "Duurder dan ik verwachtte" },
      { reason: "expected_free", label: "Ik dacht dat downloaden gratis was" },
      { reason: "payment_method", label: "Mijn betaalmethode stond er niet bij" },
      { reason: "checkout_trust", label: "Ik twijfelde over de betaalpagina" },
      { reason: "not_ready", label: "Mijn cv is nog niet klaar" },
      { reason: "other", label: "Iets anders" },
    ],
    detailLabel: { payment_method: "Welke betaalmethode zocht je? (optioneel)", other: "Wat was het? (optioneel)" },
    detailPlaceholder: { payment_method: "Naam van de betaalmethode", other: "Kort, zonder persoonsgegevens" },
    submit: "Versturen",
    replies: {
      too_expensive: `Dank je, dit helpt ons de prijs te bepalen. Voor ${price} download je dit cv zo vaak als je wilt en pas je het onbeperkt aan. Geen abonnement, niets wordt verlengd.`,
      expected_free: `Je cv maken, bewaren en bekijken is gratis. Alleen de PDF-download kost ${price}, één keer voor dit cv. Je cv blijft in je account staan, dus je kunt het later downloaden.`,
      payment_method: "Dank je. Je kunt betalen met creditcard, debitcard, Apple Pay en Google Pay, en in Nederland met iDEAL. Met je antwoord bepalen we welke betaalmethodes we toevoegen.",
      checkout_trust: "De betaling loopt via Dodo Payments, onze betaalpartner. Zij verwerken de betaling en sturen je de bon; WerkCV ziet je kaartgegevens niet. Na het betalen kom je direct terug op WerkCV om je PDF te downloaden.",
      not_ready: "Geen probleem. Je cv wordt automatisch bewaard in je account. Download het wanneer het klaar is.",
      other: "Dank je, dit helpt ons WerkCV beter te maken.",
    },
  };
}
