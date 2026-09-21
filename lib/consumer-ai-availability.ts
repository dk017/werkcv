/** Evaluate at request time; never infer activation from a deployed migration. */
export function consumerAiEnabled(value = process.env.CONSUMER_AI_REVIEW_ENABLED): boolean {
  return value === "true";
}
