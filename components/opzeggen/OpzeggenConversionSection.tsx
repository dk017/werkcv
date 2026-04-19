import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";

type OpzeggenConversionSectionProps = {
  pageKey: string;
  compareHref: string;
  compareTitle: string;
  compareBody: string;
};

export default function OpzeggenConversionSection({
  pageKey,
  compareHref,
  compareTitle,
  compareBody,
}: OpzeggenConversionSectionProps) {
  return (
    <section className="mb-14 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
      <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
          Beste volgende stap
        </p>
        <h2 className="mt-2 text-3xl font-black text-black">
          Ga eerst naar het alternatief zonder abonnement
        </h2>
        <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-slate-700">
          Deze cancel-intentie gaat meestal niet over nog meer vergelijken. De primaire vraag is
          of je een eenvoudiger model kunt gebruiken zonder proefperiode of maandelijkse verlenging.
        </p>
        <TrackedLandingLink
          href="/cv-maken-zonder-abonnement"
          trackingLocation={`${pageKey}:next_primary`}
          trackingLabel="Bekijk alternatief zonder abonnement"
          className="mt-6 inline-block border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        >
          Bekijk alternatief zonder abonnement
        </TrackedLandingLink>
      </div>

      <div className="border-4 border-black bg-white p-6">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
          Daarna pas vergelijken
        </p>
        <div className="mt-4 space-y-4">
          <TrackedLandingLink
            href={compareHref}
            trackingLocation={`${pageKey}:next_compare`}
            trackingLabel={compareTitle}
            className="block border-2 border-black bg-[#FFFEF0] p-4 transition-colors hover:bg-yellow-100"
          >
            <span className="text-sm font-black text-black">{compareTitle}</span>
            <span className="mt-1 block text-sm font-medium leading-relaxed text-slate-700">
              {compareBody}
            </span>
          </TrackedLandingLink>

          <TrackedLandingLink
            href="/prijzen"
            trackingLocation={`${pageKey}:next_pricing`}
            trackingLabel="WerkCV prijzen"
            className="block border-2 border-black bg-[#FFFEF0] p-4 transition-colors hover:bg-yellow-100"
          >
            <span className="text-sm font-black text-black">WerkCV prijzen</span>
            <span className="mt-1 block text-sm font-medium leading-relaxed text-slate-700">
              Bekijk daarna het eenmalige prijsmodel als je vooral wilt begrijpen wat je betaalt en
              wanneer.
            </span>
          </TrackedLandingLink>
        </div>
      </div>
    </section>
  );
}
