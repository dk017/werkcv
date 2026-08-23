
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { getUserCVs } from '@/app/actions';
import CvGrid from './CvGrid';
import PersonalAppShell from '@/components/workspace/PersonalAppShell';

export const metadata = {
    title: 'Mijn CV\'s | WerkCV',
};

export default async function MijnCvsPage() {
    const user = await getCurrentUser();
    if (!user) {
        redirect('/login?next=/mijn-cvs');
    }

    const library = await getUserCVs();

    return (
        <PersonalAppShell>
            <main className="min-h-[calc(100vh-86px)] px-4 pb-16 pt-4 sm:px-6">
                <div className="mx-auto max-w-6xl">
                    <section className="mb-8 rounded-3xl border border-slate-200 bg-white px-5 py-7 shadow-sm sm:px-8">
                        <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">Persoonlijke CV-ruimte</p>
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Mijn CV&apos;s</h1>
                                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                                    Werk aan je eigen CV&apos;s en bewaar elke versie op één plek. Voor vacaturegerichte kandidaatvoorstellen ga je naar MatchPack.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Link href="/templates?startSource=personal_library" className="inline-flex min-h-11 items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-emerald-700">
                                    Nieuw persoonlijk CV
                                </Link>
                                <Link href="/voor-bureaus" className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:border-emerald-500 hover:text-emerald-700">
                                    Bekijk MatchPack
                                </Link>
                            </div>
                        </div>
                    </section>

                    <CvGrid initialResult={library} />
                </div>
            </main>
        </PersonalAppShell>
    );
}
