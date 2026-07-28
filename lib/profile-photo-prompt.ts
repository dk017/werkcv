export type ProfilePhotoClothingPreference = "keep" | "adapt";
export type ProfilePhotoExpressionPreference = "keep" | "approachable";

export const profilePhotoClothingPreferences = new Set<ProfilePhotoClothingPreference>([
  "keep",
  "adapt",
]);

export const profilePhotoExpressionPreferences = new Set<ProfilePhotoExpressionPreference>([
  "keep",
  "approachable",
]);

const stylePrompts: Record<string, string> = {
  executive:
    "Executive style: neutral warm-charcoal or deep-slate studio background, restrained directional key light with soft fill, subtle depth, premium but natural business photography, slightly desaturated colour grade.",
  creatief:
    "Creative professional style: softly blurred modern workspace or studio background in cream, terracotta or muted sage, natural window-style light, gentle depth of field, warm editorial colour without exaggerated saturation.",
  tech:
    "Modern technology style: clean white, light concrete or softly blurred contemporary office background, even soft light, cool-neutral colour, high clarity and a modern professional atmosphere without corporate stiffness.",
  zorg:
    "Healthcare style: clean soft-white or very-light-grey background, even reassuring light, neutral colour with accurate skin tones and a calm professional atmosphere. Do not invent a medical uniform, white coat, scrubs, badge or stethoscope.",
  consultant:
    "Consultant and academic style: softly focused bookshelves, warm wood or a restrained study background, warm directional light balanced with soft fill, subtle film-like colour and credible professional depth without theatrical staging.",
  client:
    "Client-facing style: softly blurred modern office or collaborative workspace in warm neutral tones, open soft lighting and a friendly, energetic colour treatment that remains realistic.",
  linkedin:
    "Clean LinkedIn style: plain soft-neutral-grey or white background, even soft illumination, neutral accurate colour, minimal styling and a broadly professional result suitable for a CV and LinkedIn.",
};

export function buildProfilePhotoPrompt(
  style: string,
  clothingPreference: ProfilePhotoClothingPreference,
  expressionPreference: ProfilePhotoExpressionPreference
): string {
  const selectedStyle = stylePrompts[style] ?? stylePrompts.executive;
  const clothingInstruction =
    clothingPreference === "adapt"
      ? "CLOTHING: You may adapt the visible clothing into simple, believable professional clothing that fits the selected style. Keep the person’s body shape and proportions unchanged. Do not add uniforms, occupational badges, logos, medical garments or role-specific props."
      : "CLOTHING: Preserve the person’s original clothing, including its type, colour, neckline and visible accessories. Improve only lighting and presentation; do not replace or redesign the outfit.";
  const expressionInstruction =
    expressionPreference === "approachable"
      ? "EXPRESSION: Make the expression only slightly more approachable while preserving facial anatomy. A subtle natural softening is enough. Do not invent a broad smile, change teeth visibility or reshape the mouth."
      : "EXPRESSION: Preserve the original expression, mouth position and teeth visibility. Do not add a smile or make the expression more serious.";

  return [
    "TASK: Create a photorealistic professional profile photo for a CV and LinkedIn.",
    "IDENTITY — MUST REMAIN UNCHANGED: Preserve face geometry, age, skin tone, ethnicity, eye appearance, hairline, hairstyle, facial hair, glasses, distinguishing features and natural asymmetry. The result must be immediately recognizable as the same person.",
    "INPUT HIERARCHY: If multiple photos are supplied, use the first as the primary identity reference. Use later photos only to confirm current appearance and details; never blend identities.",
    clothingInstruction,
    expressionInstruction,
    "COMPOSITION: Create a square, chest-up portrait with both eyes visible, adequate headroom and the face occupying approximately 55–65% of the frame. Use a natural upright or near-front-facing pose suitable for circular cropping.",
    "REALISM: Preserve natural pores, skin texture, hair detail, fabric texture and minor asymmetry. Use believable business-photography lighting. No beauty filter, plastic skin, exaggerated eye brightness, glamour retouching or synthetic-looking perfection.",
    `SELECTED STYLE: ${selectedStyle}`,
    "OUTPUT CHECK: No text, logos, watermarks, malformed clothing, invented professional credentials, altered identity, cropped head or face-covering props.",
  ].join("\n");
}
