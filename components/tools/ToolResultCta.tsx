import Link from "next/link";

export function ToolResultCta() {
  return (
    <div className="border-2 border-black bg-black p-5 text-white">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#4ECDC4]">
        Zet je resultaat om in actie
      </p>
      <h3 className="mt-2 text-xl font-black leading-tight text-white">
        Maak nu een CV dat klaar is om te versturen
      </h3>
      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-200">
        Je hebt net inzicht gekregen. Gebruik dat moment om je CV direct scherper,
        rustiger en ATS-vriendelijker te maken.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/editor"
          className="inline-flex flex-1 items-center justify-center gap-2 border-2 border-white bg-[#4ECDC4] px-5 py-3 text-sm font-black text-slate-900 transition-colors hover:bg-teal-300"
        >
          Verbeter mijn CV nu
        </Link>
        <Link
          href="/templates"
          className="inline-flex flex-1 items-center justify-center gap-2 border-2 border-white bg-transparent px-5 py-3 text-sm font-black text-white transition-colors hover:bg-white hover:text-black"
        >
          Kies eerst een template
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-xs font-black text-slate-300">
        <span>✓ Gratis starten</span>
        <span>✓ Eenmalig €4,99</span>
        <span>✓ Geen abonnement</span>
      </div>
    </div>
  );
}
