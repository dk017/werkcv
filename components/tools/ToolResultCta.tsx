import Link from "next/link";

export function ToolResultCta() {
  return (
    <div className="border-2 border-black bg-black p-5 text-white">
      <p className="text-sm font-medium text-slate-200">
        Klaar voor de volgende stap? Maak direct een ATS-vriendelijk CV.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/editor"
          className="inline-flex flex-1 items-center justify-center gap-2 border-2 border-white bg-[#4ECDC4] px-5 py-3 text-sm font-black text-slate-900 transition-colors hover:bg-teal-300"
        >
          Maak gratis je CV
        </Link>
        <Link
          href="/templates"
          className="inline-flex flex-1 items-center justify-center gap-2 border-2 border-white bg-transparent px-5 py-3 text-sm font-black text-white transition-colors hover:bg-white hover:text-black"
        >
          Bekijk CV templates
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
