/**
 * Before/after examples for the AI profile photo pages. Fictional people only: the "selfie" was generated
 * as a casual phone photo, then run through the production photo call (gpt-image-2 images.edit with
 * buildProfilePhotoPrompt, 4 variants) on 20 Oct 2026; the result shown is one of those 4, unedited.
 * Pages label them as AI examples (EU AI Act transparency; no real customer photos).
 */
export type ProfilePhotoExample = {
  id: string;
  selfie: string;
  result: string;
  style: { nl: string; en: string };
  selfieNote: { nl: string; en: string };
};

export const profilePhotoExamples: ProfilePhotoExample[] = [
  {
    id: "sanne",
    selfie: "/profile-photo-examples/sanne-selfie.jpg",
    result: "/profile-photo-examples/sanne-result.jpg",
    style: { nl: "Strak LinkedIn", en: "Clean LinkedIn" },
    selfieNote: { nl: "Selfie in de keuken", en: "Kitchen selfie" },
  },
  {
    id: "daniel",
    selfie: "/profile-photo-examples/daniel-selfie.jpg",
    result: "/profile-photo-examples/daniel-result.jpg",
    style: { nl: "Zakelijk", en: "Executive" },
    selfieNote: { nl: "Selfie in de auto", en: "Car selfie" },
  },
  {
    id: "yasmin",
    selfie: "/profile-photo-examples/yasmin-selfie.jpg",
    result: "/profile-photo-examples/yasmin-result.jpg",
    style: { nl: "Strak LinkedIn, eigen kleding", en: "Clean LinkedIn, own clothing" },
    selfieNote: { nl: "Foto op straat", en: "Street photo" },
  },
  {
    id: "peter",
    selfie: "/profile-photo-examples/peter-selfie.jpg",
    result: "/profile-photo-examples/peter-result.jpg",
    style: { nl: "Consultant", en: "Consultant" },
    selfieNote: { nl: "Webcamfoto thuis", en: "Home office photo" },
  },
  {
    id: "mei",
    selfie: "/profile-photo-examples/mei-selfie.jpg",
    result: "/profile-photo-examples/mei-result.jpg",
    style: { nl: "Modern tech", en: "Modern tech" },
    selfieNote: { nl: "Foto op de bank", en: "Living-room photo" },
  },
];

export const profilePhotoExampleLabel = {
  nl: "AI-voorbeelden met fictieve testpersonen, gemaakt met dezelfde tool. Geen klantfoto's.",
  en: "AI examples with fictional test people, made with the same tool. No customer photos.",
};
