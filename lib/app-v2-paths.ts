// Language-aware links for the logged-in app (app v2). Dutch is the default;
// English users get the /en/ counterparts that exist on the site.
export type AppLocale = "nl" | "en";

export function appPaths(locale: AppLocale) {
  const en = locale === "en";
  return {
    dashboard: en ? "/en/my-cvs" : "/mijn-cvs",
    letters: en ? "/en/my-cvs?tab=letters" : "/mijn-cvs?tab=brieven",
    editorBase: en ? "/en/editor" : "/editor",
    // The app's own cover letter workspace; the classic /sollicitatiebrief and /en/cover-letter stay as they are.
    coverLetter: (cvId: string) => `${en ? "/en/my-cvs/letter" : "/mijn-cvs/brief"}?id=${encodeURIComponent(cvId)}`,
    classicCoverLetter: (cvId: string) => `${en ? "/en/cover-letter" : "/sollicitatiebrief"}?id=${encodeURIComponent(cvId)}`,
    cvCheck: en ? "/en/cv-check" : "/cv-check",
    vacancyMatch: en ? "/en/cv-check/job-match" : "/cv-check/vacature",
    profilePhoto: en ? "/en/profile-photo" : "/profielfoto-cv-maken",
    examples: en ? "/en/dutch-cv-examples" : "/cv-voorbeelden",
    help: en ? "/contact" : "/faq",
  };
}

// The dashboard tab parameter accepts both languages' spelling.
export function isLettersTab(tab: string | undefined): boolean {
  return tab === "brieven" || tab === "letters";
}
