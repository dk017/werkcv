
'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { SampleCVPreview } from '@/components/seo/SampleCVPreview';
import { deleteCV, duplicateCV, getUserCVs, renameCV } from '@/app/actions';
import { getTemplateConfig } from '@/lib/templates/registry';
import { getEditorPathForCv } from '@/lib/editor-path';
import type { PersonalCvLibraryItem, PersonalCvLibraryResult, PersonalCvLibrarySort } from '@/lib/cv-library';

type CvItem = PersonalCvLibraryItem;

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('nl-NL', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}
function CvCard({ cv, onChanged, onDuplicated }: { cv: CvItem; onChanged: () => Promise<void>; onDuplicated: (id: string) => Promise<void> }) {
    const [confirming, setConfirming] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [editingTitle, setEditingTitle] = useState(false);
    const [draftTitle, setDraftTitle] = useState(cv.title || '');
    const [savingTitle, setSavingTitle] = useState(false);
    const [duplicating, setDuplicating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const templateConfig = getTemplateConfig(cv.templateId);
    const displayName = cv.title?.trim() && cv.title.trim() !== 'Mijn CV' ? cv.title.trim() : cv.previewData.personal.name || 'Naamloos CV';
    const editorPath = getEditorPathForCv(cv.previewData, cv.id);

    const handleDelete = async () => {
        setDeleting(true);
        setError(null);
        const result = await deleteCV(cv.id);
        if (!result.success) {
            setError('Dit CV kon niet worden verwijderd.');
            setDeleting(false);
            return;
        }
        await onChanged();
    };

    const handleRename = async () => {
        const nextTitle = draftTitle.trim();
        if (!nextTitle) {
            setError('Geef het CV een naam.');
            return;
        }
        setSavingTitle(true);
        setError(null);
        const result = await renameCV(cv.id, nextTitle);
        if (!result.success) {
            setError('De naam kon niet worden opgeslagen.');
            setSavingTitle(false);
            return;
        }
        setEditingTitle(false);
        setSavingTitle(false);
        await onChanged();
    };

    const handleDuplicate = async () => {
        setDuplicating(true);
        setError(null);
        const result = await duplicateCV(cv.id);
        if (!result.success || !result.id) {
            setError('Dit CV kon niet worden gedupliceerd.');
            setDuplicating(false);
            return;
        }
        await onDuplicated(result.id);
    };

    return (
        <article id={`cv-card-${cv.id}`} tabIndex={-1} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <Link href={editorPath} className="block h-[220px] overflow-hidden bg-slate-50 border-b border-slate-200" aria-label={displayName + ' bewerken'}>
                <SampleCVPreview
                    data={cv.previewData}
                    templateId={cv.templateId}
                    colorThemeId={cv.colorThemeId}
                    scale={0.32}
                    maxHeight={220}
                />
            </Link>

            <div className="p-4 flex flex-col gap-3 flex-1">
                <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                        {editingTitle ? (
                            <div className="flex items-center gap-1.5">
                                <label htmlFor={'cv-title-' + cv.id} className="sr-only">Naam van dit CV</label>
                                <input
                                    id={'cv-title-' + cv.id}
                                    value={draftTitle}
                                    onChange={(event) => setDraftTitle(event.target.value)}
                                    maxLength={80}
                                    autoFocus
                                    className="min-w-0 w-full rounded-md border border-emerald-300 px-2 py-1 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                                <button type="button" onClick={handleRename} disabled={savingTitle} className="shrink-0 rounded-md bg-emerald-600 px-2 py-1 text-[11px] font-bold text-white disabled:opacity-60">
                                    {savingTitle ? '…' : 'Opslaan'}
                                </button>
                            </div>
                        ) : (
                            <>
                                <p className="font-semibold text-slate-900 text-sm truncate">{displayName}</p>
                                <p className="text-xs text-slate-400 mt-0.5">{templateConfig.nameDutch} · {formatDate(cv.updatedAt)}</p>
                            </>
                        )}
                    </div>
                    {cv.isPaid && (
                        <span className="shrink-0 inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            ✓ Gedownload
                        </span>
                    )}
                </div>

                {error ? <p role="alert" className="text-xs font-semibold text-rose-600">{error}</p> : null}

                <div className="flex flex-wrap items-center gap-2 mt-auto">
                    <Link
                        href={editorPath}
                        className="flex-1 min-w-[100px] text-center bg-emerald-600 text-white text-xs font-semibold py-2 rounded-md border border-emerald-700 hover:bg-emerald-700 transition-colors"
                    >
                        Bewerken
                    </Link>
                    {!editingTitle ? (
                        <button
                            type="button"
                            onClick={() => {
                                setDraftTitle(cv.title || displayName);
                                setEditingTitle(true);
                            }}
                            className="text-xs font-semibold text-slate-500 hover:text-slate-900 px-2 py-2 rounded-md hover:bg-slate-100 transition-colors"
                        >
                            Naam
                        </button>
                    ) : (
                        <button type="button" onClick={() => setEditingTitle(false)} className="text-xs font-semibold text-slate-500 hover:text-slate-900 px-2 py-2 rounded-md hover:bg-slate-100 transition-colors">
                            Annuleer
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={handleDuplicate}
                        disabled={duplicating}
                        className="text-xs font-semibold text-slate-500 hover:text-emerald-700 px-2 py-2 rounded-md hover:bg-emerald-50 transition-colors disabled:opacity-60"
                    >
                        {duplicating ? '…' : 'Dupliceer'}
                    </button>
                    {!confirming ? (
                        <button
                            type="button"
                            onClick={() => setConfirming(true)}
                            className="text-xs font-semibold text-slate-400 hover:text-rose-600 px-2 py-2 rounded-md hover:bg-rose-50 transition-colors"
                        >
                            Verwijder
                        </button>
                    ) : (
                        <>
                            <span className="basis-full text-[11px] font-semibold text-rose-700">Dit verwijdert “{displayName}” definitief. Dit kan niet ongedaan worden gemaakt.</span>
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={deleting}
                                className="text-[10px] font-bold text-white bg-rose-600 hover:bg-rose-700 px-2 py-1.5 rounded-md transition-colors disabled:opacity-60"
                            >
                                {deleting ? '…' : 'Bevestig verwijderen'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setConfirming(false)}
                                className="text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1.5 rounded-md transition-colors"
                            >
                                Annuleer
                            </button>
                        </>
                    )}
                </div>
            </div>
        </article>
    );
}

export default function CvGrid({ initialResult }: { initialResult: PersonalCvLibraryResult }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialSuccess = initialResult.ok ? initialResult : null;
    const [items, setItems] = useState<CvItem[]>(initialSuccess?.items || []);
    const [query, setQuery] = useState(initialSuccess?.query || '');
    const [appliedQuery, setAppliedQuery] = useState(initialSuccess?.query || '');
    const [sort, setSort] = useState<PersonalCvLibrarySort>(initialSuccess?.sort || 'updated_desc');
    const [nextCursor, setNextCursor] = useState(initialSuccess?.nextCursor || null);
    const [totalCount, setTotalCount] = useState(initialSuccess?.totalCount || 0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(initialResult.ok ? null : initialResult.message);

    useEffect(() => {
        const focusId = searchParams.get('focus');
        if (!focusId) return;
        window.requestAnimationFrame(() => document.getElementById(`cv-card-${focusId}`)?.focus());
    }, [items, searchParams]);

    const load = async ({
        nextQuery = appliedQuery,
        nextSort = sort,
        cursor,
        append = false,
    }: {
        nextQuery?: string;
        nextSort?: PersonalCvLibrarySort;
        cursor?: string;
        append?: boolean;
    } = {}) => {
        setLoading(true);
        setError(null);
        const result = await getUserCVs({ query: nextQuery, sort: nextSort, ...(cursor ? { cursor } : {}) });
        setLoading(false);
        if (!result.ok) {
            setError(result.message);
            return;
        }
        setItems((current) => append ? [...current, ...result.items] : result.items);
        setNextCursor(result.nextCursor);
        setTotalCount(result.totalCount);
        setAppliedQuery(result.query);
        setQuery(result.query);
        setSort(result.sort);
    };

    const submitSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        void load({ nextQuery: query.trim(), nextSort: sort });
    };

    const clearFilters = () => {
        setQuery('');
        void load({ nextQuery: '', nextSort: 'updated_desc' });
    };

    return (
        <section aria-labelledby="personal-cv-list" aria-busy={loading}>
            <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 id="personal-cv-list" className="text-base font-bold text-slate-900">Je persoonlijke CV&apos;s</h2>
                    <p className="text-xs text-slate-500">{totalCount} {totalCount === 1 ? 'CV' : 'CV’s'} gevonden</p>
                </div>
                <form onSubmit={submitSearch} className="flex flex-col gap-2 sm:flex-row">
                    <label className="sr-only" htmlFor="cv-search">Zoek op CV-titel</label>
                    <input
                        id="cv-search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value.slice(0, 100))}
                        maxLength={100}
                        placeholder="Zoek op CV-titel"
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:w-56"
                    />
                    <button type="submit" disabled={loading} className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-sm font-bold text-slate-700 disabled:opacity-50">Zoeken</button>
                    <label className="sr-only" htmlFor="cv-sort">Sorteer je CV&apos;s</label>
                    <select
                        id="cv-sort"
                        value={sort}
                        onChange={(event) => void load({ nextQuery: appliedQuery, nextSort: event.target.value as PersonalCvLibrarySort })}
                        disabled={loading}
                        className="min-h-11 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                    >
                        <option value="updated_desc">Laatst gewijzigd</option>
                        <option value="created_desc">Nieuwste</option>
                        <option value="created_asc">Oudste</option>
                        <option value="title_asc">Naam A–Z</option>
                    </select>
                </form>
            </div>

            {error ? (
                <div className="rounded-2xl border border-rose-300 bg-rose-50 px-6 py-10 text-center" role="alert">
                    <p className="font-bold text-rose-900">{error}</p>
                    <button type="button" onClick={() => void load()} className="mt-4 min-h-11 rounded-md border border-rose-300 bg-white px-4 text-sm font-bold text-rose-800">Opnieuw proberen</button>
                </div>
            ) : items.length === 0 && !appliedQuery ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                    <p className="font-bold text-slate-800">Je hebt nog geen persoonlijke CV&apos;s</p>
                    <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">Kies een template of upload een bestaand CV om te beginnen.</p>
                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                        <Link href="/templates?startSource=personal_library" className="inline-flex min-h-11 items-center rounded-md bg-emerald-600 px-4 text-sm font-bold text-white">Nieuw CV</Link>
                        <Link href="/editor?template=professional&startSource=my_cvs_upload&upload=1" className="inline-flex min-h-11 items-center rounded-md border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700">CV uploaden</Link>
                    </div>
                </div>
            ) : items.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                    <p className="font-semibold text-slate-700">Geen CV&apos;s gevonden</p>
                    <p className="mt-1 text-sm text-slate-500">Er is geen CV-titel die bij “{appliedQuery}” past.</p>
                    <button type="button" onClick={clearFilters} className="mt-4 min-h-11 rounded-md border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700">Filters wissen</button>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((cv) => <CvCard
                            key={cv.id}
                            cv={cv}
                            onChanged={() => load()}
                            onDuplicated={async (id) => {
                                await load({ nextQuery: '', nextSort: 'updated_desc' });
                                router.push(`/mijn-cvs?focus=${encodeURIComponent(id)}`);
                            }}
                        />)}
                    </div>
                    {nextCursor ? (
                        <div className="mt-6 flex justify-center">
                            <button type="button" disabled={loading} onClick={() => void load({ cursor: nextCursor, append: true })} className="min-h-11 rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:border-emerald-500 hover:text-emerald-700 disabled:opacity-50">
                                {loading ? 'Laden…' : 'Toon nog 12 CV’s'}
                            </button>
                        </div>
                    ) : null}
                </>
            )}
        </section>
    );
}
