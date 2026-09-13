import Link from "next/link";

export default function CvUnavailable({ locale }: { locale: "nl" | "en" }) {
  const english = locale === "en";
  return (
    <main className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="text-3xl font-semibold">{english ? "This CV is unavailable" : "Dit CV is niet beschikbaar"}</h1>
      <p className="my-5">{english
        ? "We could not open this CV in your account. Choose a CV from your library or start a new one."
        : "We konden dit CV niet openen in je account. Kies een CV uit je overzicht of begin een nieuw CV."}</p>
      <nav aria-label={english ? "Next steps" : "Volgende stappen"} className="flex flex-wrap gap-4">
        <Link href="/mijn-cvs" className="underline">{english ? "My CVs" : "Mijn CV’s"}</Link>
        <Link href={english ? "/en/editor" : "/editor"} className="underline">{english ? "Start a new CV" : "Begin een nieuw CV"}</Link>
        <a href="mailto:contact@werkcv.nl" className="underline">{english ? "Contact support" : "Neem contact op"}</a>
      </nav>
    </main>
  );
}
