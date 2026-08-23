
import Link from "next/link";

export default function AgencyPrimaryActions({
  canCreate,
  hasSavedDocuments,
}: {
  canCreate: boolean;
  hasSavedDocuments: boolean;
}) {
  return (
    <section className="wk-agency-primary-actions" aria-labelledby="agency-primary-actions-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Werkruimte</p>
          <h2 id="agency-primary-actions-title" className="mt-1 text-2xl font-black">Wat wil je vandaag maken?</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">Kies één duidelijke route. MatchPack is voor vacaturegerichte voorstellen; een los bureau-CV blijft een aparte documentstroom.</p>
        </div>
        <Link href="/agency/account/settings" className="text-sm font-bold text-emerald-800 underline underline-offset-4">Instellingen</Link>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <Link href="/agency/account/matchpack" className="wk-agency-action-card wk-agency-action-card-primary">
          <span className="text-xs font-black uppercase tracking-[0.14em]">Aanbevolen</span>
          <strong>Nieuw MatchPack</strong>
          <span>CV + vacature → gecontroleerd kandidaatvoorstel.</span>
          <span className="wk-agency-action-card-link">Start workflow →</span>
        </Link>

        <Link
          href="/editor?template=professional&startSource=agency_plan&workspace=agency"
          className={"wk-agency-action-card " + (!canCreate ? "wk-agency-action-card-disabled" : "")}
          aria-disabled={!canCreate}
        >
          <span className="text-xs font-black uppercase tracking-[0.14em]">Los document</span>
          <strong>Nieuw bureau-CV</strong>
          <span>Maak een los kandidaat-CV met je Agency-route.</span>
          <span className="wk-agency-action-card-link">{canCreate ? "Nieuw CV maken →" : "Niet beschikbaar"}</span>
        </Link>

        <Link href={hasSavedDocuments ? "/agency/account/matchpack" : "/agency#voorbeeld"} className="wk-agency-action-card">
          <span className="text-xs font-black uppercase tracking-[0.14em]">Oriënteren</span>
          <strong>{hasSavedDocuments ? "Ga verder met werk" : "Bekijk een voorbeeld"}</strong>
          <span>{hasSavedDocuments ? "Open je laatste MatchPack en werk verder." : "Zie eerst hoe bewijs en review samenkomen."}</span>
          <span className="wk-agency-action-card-link">{hasSavedDocuments ? "Open MatchPacks →" : "Bekijk voorbeeld →"}</span>
        </Link>
      </div>
    </section>
  );
}
