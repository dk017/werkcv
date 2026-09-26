// English copy for the checks reused from lib/tools/cv-score.ts, which only has Dutch labels.
// Keyed by the cv-score check id.

export const SCORE_CHECK_COPY_EN: Record<string, { pass: string; fail: string; fix: string }> = {
  cv_length: { pass: "CV length is appropriate", fail: "CV length is outside the usual range", fix: "Keep your CV roughly between 300 and 1,600 words." },
  section_headers: { pass: "Standard section headings found", fail: "Section headings are unusual", fix: "Rename your sections to standard headings such as Experience, Education and Skills." },
  no_columns: { pass: "No columns or tables detected", fail: "Possible tables or columns detected", fix: "Use a simple single-column layout without tables or text boxes." },
  date_format_consistency: { pass: "Date format is consistent", fail: "Date format is inconsistent", fix: "Pick one date style (for example 'Jan 2022 – Dec 2023') and use it throughout your CV." },
  email_present: { pass: "Email address found", fail: "No email address found", fix: "Put a professional email address at the top of your CV." },
  phone_present: { pass: "Phone number found", fail: "No phone number found", fix: "Add a mobile number in Dutch or international format (+31 6 …)." },
  linkedin_present: { pass: "LinkedIn profile found", fail: "No LinkedIn profile found", fix: "Add your full LinkedIn profile URL at the top of your CV." },
  location_present: { pass: "City or region found", fail: "No city or region found", fix: "Add your city or region to your contact details." },
  profile_exists: { pass: "Profile summary present", fail: "No profile summary found", fix: "Add a short profile of 3–6 sentences at the top." },
  profile_length: { pass: "Profile summary has a strong length", fail: "Profile summary length could be sharper", fix: "Aim for 50–120 words in a few short sentences." },
  profile_years_experience: { pass: "Years of experience stated", fail: "Years of experience missing", fix: "Add a phrase such as '5 years of experience in…'." },
  profile_buzzwords: { pass: "Profile stays concrete", fail: "Profile contains empty buzzwords", fix: "Replace generic buzzwords with specific or measurable examples." },
  experience_exists: { pass: "Experience section found", fail: "No experience section found", fix: "Add an Experience section with roles in reverse chronological order." },
  quantified_achievement: { pass: "Measurable results found", fail: "No measurable results found", fix: "Add at least one bullet per role with a number, percentage or concrete outcome." },
  active_verbs: { pass: "Bullets open strongly", fail: "Experience could be phrased more actively", fix: "Rewrite task lists as results that start with a strong verb." },
  experience_dates: { pass: "Dates found for each role", fail: "Dates missing for roles", fix: "Add a start and end date to each role in one consistent format." },
  language_consistency: { pass: "Language is consistent", fail: "Language switches between Dutch and English", fix: "Use one language for your whole CV, including headings and bullets." },
  no_first_person: { pass: "No first-person phrasing", fail: "First-person phrasing found", fix: "Drop 'I', 'my' and 'me' from your profile and bullets." },
  no_all_caps_headers: { pass: "Headings are easy to read", fail: "Headings are in all capitals", fix: "Use normal capitalisation for your section headings." },
  no_placeholder_email: { pass: "Contact details look real", fail: "Example email address detected", fix: "Replace example or test data with your real contact details." },
  education_present: { pass: "Education present", fail: "No education section found", fix: "Add an Education section with qualification, school and years." },
  skills_present: { pass: "Skills section present", fail: "No skills section found", fix: "Add a separate Skills section with relevant hard and soft skills." },
  languages_present: { pass: "Languages section present", fail: "No languages section found", fix: "Add a Languages section with your levels." },
  interests_present: { pass: "Interests section present", fail: "No interests section found", fix: "Optionally add 2–4 relevant interests." },
};
