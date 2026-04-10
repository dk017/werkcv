import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { cvDownloadPrice } from "@/lib/site-content";

const pageUrl = "https://werkcv.nl/over-ons";
const contactEmail = "contact@werkcv.nl";
const xProfileUrl = "https://x.com/dk_r017";

const principles = [
  {
    title: "Nederlandse sollicitaties eerst",
    description:
      "We bouwen WerkCV voor de Nederlandse arbeidsmarkt: rustige opmaak, duidelijke secties en templates die recruiter- en ATS-proof moeten blijven.",
  },
  {
    title: "Eerlijke prijs zonder maandmodel",
    description:
      "Je start gratis, vergelijkt templates en betaalt pas als je je PDF wilt downloaden. Geen automatische verlengingen en geen verborgen abonnementslaag.",
  },
  {
    title: "Praktisch boven theoretisch",
    description:
      "De editor, templates, voorbeeldteksten en gidsen zijn bedoeld om werkzoekenden sneller naar een verzendbare sollicitatieversie te brengen.",
  },
];

const teamAreas = [
  {
    title: "Templates en ATS-veiligheid",
    description:
      "We testen layouts op scanbaarheid, rust en bruikbaarheid voor Nederlandse vacatures, zodat inhoud niet sneuvelt door onnodige designkeuzes.",
  },
  {
    title: "Content en uitleg",
    description:
      "We schrijven gidsen, voorbeeldpagina's en tools die aansluiten op echte vragen van werkzoekenden: van profieltekst tot vacaturekeywords en opmaakkeuzes.",
  },
  {
    title: "Support en feedback",
    description:
      "Feedback uit e-mail, contactverzoeken en gebruikspatronen gebruiken we om templates, copy en productflows concreet te verbeteren.",
  },
];

const commitments = [
  "Je kunt WerkCV gratis gebruiken totdat je wilt downloaden.",
  "We richten de productcopy op duidelijkheid, niet op upsell-frictie.",
  "Contact, privacy en prijsinformatie horen zichtbaar te zijn op de site.",
  "We verbeteren het product iteratief op basis van gebruik en feedback.",
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://werkcv.nl/#organization",
  name: "WerkCV",
  alternateName: "WerkCV.nl",
  url: "https://werkcv.nl",
  logo: "https://werkcv.nl/logo.png",
  description:
    "Nederlandse CV builder voor ATS-vriendelijke sollicitaties, zonder abonnement en met eenmalige PDF-download.",
  email: contactEmail,
  sameAs: [xProfileUrl],
  areaServed: {
    "@type": "Country",
    name: "Netherlands",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: contactEmail,
    url: "https://werkcv.nl/contact",
    availableLanguage: ["Dutch", "English"],
  },
  knowsAbout: [
    "Nederlandse CV templates",
    "ATS-vriendelijke CV's",
    "CV schrijven voor Nederlandse vacatures",
  ],
};

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Over WerkCV.nl",
  url: pageUrl,
  inLanguage: "nl-NL",
  description:
    "Lees waarom WerkCV.nl is gebouwd, hoe het team werkt aan templates en content, en hoe je direct contact kunt opnemen.",
  about: {
    "@id": "https://werkcv.nl/#organization",
  },
  mainEntity: {
    "@id": "https://werkcv.nl/#organization",
  },
};

export const metadata: Metadata = {
  title: {
    absolute: "Over WerkCV | Missie, aanpak en contact",
  },
  description:
    "Lees waarom WerkCV.nl is gebouwd, hoe we omgaan met templates, privacy en prijzen, en hoe je direct contact opneemt met het team.",
  keywords: [
    "over werkcv",
    "werkcv missie",
    "werkcv contact",
    "cv builder nederland",
    "nederlandse cv maker",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Over WerkCV | Missie, aanpak en contact",
    description:
      "Lees waarom WerkCV.nl is gebouwd, hoe we omgaan met templates, privacy en prijzen, en hoe je direct contact opneemt met het team.",
    url: pageUrl,
    siteName: "WerkCV",
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "WerkCV.nl over-ons pagina",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@werkcvnl",
    title: "Over WerkCV | Missie, aanpak en contact",
    description:
      "Lees waarom WerkCV.nl is gebouwd, hoe we omgaan met templates, privacy en prijzen, en hoe je direct contact opneemt met het team.",
    images: ["/opengraph-image"],
  },
};

export default function OverOnsPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />

      <header className="relative z-10 border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-black">
              Werk<span className="bg-yellow-400 px-1">CV</span>.nl
            </span>
          </Link>
          <Link
            href="/templates"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-bold text-black transition-colors hover:bg-yellow-300"
          >
            Bekijk templates
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-12">
        <section className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:p-10">
          <span className="inline-block border-2 border-black bg-yellow-300 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-black">
            Over WerkCV
          </span>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-black">
            WerkCV.nl is gebouwd om Nederlandse CVs sneller, duidelijker en zonder abonnementsval te maken
          </h1>
          <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
            WerkCV ontstond vanuit een simpel probleem: veel werkzoekenden willen
            snel een professioneel CV maken, maar lopen vast op verborgen
            abonnementen, rommelige templates of tools die niet goed aansluiten op
            Nederlandse vacatures.
          </p>
          <p className="mt-4 max-w-3xl text-base font-medium leading-relaxed text-slate-700">
            Daarom bouwen we een CV-platform dat gratis laat starten, ATS-vriendelijke
            keuzes centraal zet en pas geld vraagt wanneer iemand echt een PDF wil
            downloaden. De focus ligt op bruikbaarheid, rustige opmaak en een
            productflow die werkzoekenden niet onnodig vertraagt.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-black uppercase tracking-[0.18em] text-black">
            <span className="border-2 border-black bg-[#FFFEF9] px-3 py-1">Nederlandse vacatures</span>
            <span className="border-2 border-black bg-[#FFFEF9] px-3 py-1">ATS-vriendelijke templates</span>
            <span className="border-2 border-black bg-[#FFFEF9] px-3 py-1">Eenmalig {cvDownloadPrice.display} per CV</span>
            <span className="border-2 border-black bg-[#FFFEF9] px-3 py-1">Contact binnen 1-2 werkdagen</span>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Waarom we zijn gestart
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Een beter alternatief voor opmaakgedoe en onduidelijke prijsmodellen
            </h2>
            <div className="mt-4 space-y-4 text-sm font-medium leading-relaxed text-slate-700">
              <p>
                WerkCV is opgezet voor mensen die een helder CV willen bouwen zonder
                eerst een designer, recruiter of maandabonnement nodig te hebben.
                De basisvraag was eenvoudig: hoe maak je een tool die snel genoeg is
                voor een echte sollicitatie, maar toch professioneel en betrouwbaar
                aanvoelt?
              </p>
              <p>
                Dat betekent dat we keuzes maken in het voordeel van de gebruiker:
                rustige templates, duidelijke secties, Nederlandse marktfit en een
                prijsmodel dat begrijpelijk blijft. We proberen geen langdurige
                funnel te bouwen rond een CV; we proberen iemand zo snel mogelijk aan
                een goede sollicitatieversie te helpen.
              </p>
            </div>
          </div>

          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Wat je van ons mag verwachten
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Vertrouwen moet zichtbaar zijn in productkeuzes
            </h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-200">
              {commitments.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-yellow-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Productprincipes
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Waar WerkCV inhoudelijk op stuurt
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {principles.map((item) => (
              <article
                key={item.title}
                className="border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{item.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Team en werkwijze
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Waar het team dagelijks aan werkt
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {teamAreas.map((item) => (
              <article
                key={item.title}
                className="border-4 border-black bg-[#FFF7E8] p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{item.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Contact en vertrouwen
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Zichtbaar contact, duidelijke routes
          </h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
            Vragen, feedback of een probleem met je CV? Dan moet contact niet verstopt
            zitten. Hieronder staan de directe routes die we zelf ook op andere paginas
            gebruiken.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="border-3 border-black bg-[#FFFEF0] p-5" style={{ borderWidth: "3px" }}>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                E-mail
              </p>
              <a
                href={`mailto:${contactEmail}`}
                className="mt-2 inline-block text-lg font-black text-black underline decoration-2 underline-offset-4"
              >
                {contactEmail}
              </a>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                Voor vragen over het product, feedback, support en algemene verzoeken.
              </p>
            </div>

            <div className="border-3 border-black bg-[#FFFEF0] p-5" style={{ borderWidth: "3px" }}>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                Publieke updates
              </p>
              <a
                href={xProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-lg font-black text-black underline decoration-2 underline-offset-4"
              >
                @dk_r017
              </a>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                Handig voor productupdates, feedbacksignalen en openbare contactmomenten.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-block border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
            >
              Open contactpagina
            </Link>
            <Link
              href="/privacy"
              className="inline-block border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Bekijk privacybeleid
            </Link>
            <Link
              href="/prijzen"
              className="inline-block border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Bekijk prijzen
            </Link>
          </div>

          <p className="mt-4 text-sm font-medium text-slate-600">
            Reactietijd: doorgaans binnen 1-2 werkdagen.
          </p>
        </section>

        <div className="mt-12 text-center">
          <Link
            href="/templates"
            className="inline-block border-4 border-black bg-yellow-400 px-8 py-4 text-lg font-black text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          >
            Vergelijk direct de templates
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
