import Image from "next/image";

const beforeFlags = [
  "Volledige contactgegevens en extra persoonsgegevens staan nog bovenin.",
  "Profieltekst is breed en generiek, zonder scherpe positionering voor voorstel.",
  "Werkervaring staat als lange tekstblokken en vraagt nog handmatige redactie.",
];

const afterWins = [
  "Bovenkant is teruggebracht naar wat recruiter en opdrachtgever echt nodig hebben.",
  "Zelfde kandidaat, maar nu scanbaar gepositioneerd op HR-advies, verzuim en onboarding.",
  "Werkervaring is herschreven naar kortere bullets met context en resultaat.",
  "Contact loopt via bureau, zodat privacy en presentatie direct kloppen.",
];

const sampleFiles = {
  beforePdf: "/downloads/agency-sample-bron-cv-hr-adviseur.pdf",
  afterPdf: "/downloads/agency-sample-client-ready-cv-hr-adviseur.pdf",
  beforePreview: "/agency-previews/agency-sample-bron-cv-hr-adviseur-page-1.png",
  afterPreview: "/agency-previews/agency-sample-client-ready-cv-hr-adviseur-page-1.png",
};

export default function AgencyCvSamplePair() {
  return (
    <div className="mt-6 space-y-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <article className="border-4 border-black bg-[#FFF4EF] p-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-600">
                Voor
              </p>
              <h3 className="mt-1 text-2xl font-black text-black">
                Echte preview van het bron-CV zoals het binnenkomt
              </h3>
            </div>
            <span className="border-2 border-rose-500 bg-white px-2 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-rose-700">
              Bronbestand
            </span>
          </div>

          <a
            href={sampleFiles.beforePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            <Image
              src={sampleFiles.beforePreview}
              alt="Preview van een fictief bron-CV van een Nederlandse HR-adviseur"
              width={1310}
              height={1853}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </a>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={sampleFiles.beforePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-3 border-black bg-white px-4 py-2 text-sm font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              Bekijk bron-PDF
            </a>
          </div>

          <ul className="mt-4 space-y-2 text-sm font-bold leading-relaxed text-black">
            {beforeFlags.map((item) => (
              <li key={item}>&bull; {item}</li>
            ))}
          </ul>
        </article>

        <article className="border-4 border-black bg-[#EEF8FF] p-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-700">
                Na
              </p>
              <h3 className="mt-1 text-2xl font-black text-black">
                Dezelfde kandidaat, maar nu client-ready voor voorstel
              </h3>
            </div>
            <span className="border-2 border-sky-500 bg-white px-2 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-sky-700">
              Client-ready
            </span>
          </div>

          <a
            href={sampleFiles.afterPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            <Image
              src={sampleFiles.afterPreview}
              alt="Preview van een fictief client-ready kandidaatprofiel voor een Nederlandse HR-adviseur"
              width={1310}
              height={1853}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </a>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={sampleFiles.afterPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-3 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              Bekijk client-ready PDF
            </a>
          </div>

          <ul className="mt-4 space-y-2 text-sm font-bold leading-relaxed text-black">
            {afterWins.map((item) => (
              <li key={item}>&bull; {item}</li>
            ))}
          </ul>
        </article>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="border-3 border-black bg-white px-4 py-3 text-sm font-bold leading-relaxed text-black">
          Fictieve maar realistische Nederlandse kandidaat: Sanne Vermeer, HR-adviseur. Gemaakt
          als agency sample, niet als klantcase.
        </div>
        <div className="border-3 border-black bg-yellow-200 px-4 py-3 text-sm font-bold leading-relaxed text-black">
          Deze twee previews linken naar echte PDFs. Dat maakt dit blok bruikbaar voor de site,
          outreach en bureaugesprekken.
        </div>
      </div>
    </div>
  );
}
