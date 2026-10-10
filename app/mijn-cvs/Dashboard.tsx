'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteCV, duplicateCV, getUserCVs, renameCV } from '@/app/actions';
import { Icon, type IconName } from '@/components/app/icons';
import { CvThumbnail } from '@/components/app/CvThumbnail';
import { useNewCvDialog } from '@/components/app/NewCvDialog';
import { getEditorPathForCv } from '@/lib/editor-path';
import { getCompletionState } from '@/lib/cv-completion';
import type { PersonalCvLibraryItem, PersonalCvLibraryResult, PersonalCvLibrarySort } from '@/lib/cv-library';
import type { CoverLetterListItem } from './actions';

export type DashboardTab = 'cvs' | 'brieven';

function displayName(cv: PersonalCvLibraryItem): string {
    const title = cv.title?.trim();
    if (title && title !== 'Mijn CV') return title;
    return cv.previewData.personal.name || 'Naamloos CV';
}

export function editedLabel(iso: string, now: number = Date.now()): string {
    const minutes = Math.max(0, Math.round((now - new Date(iso).getTime()) / 60_000));
    const rtf = new Intl.RelativeTimeFormat('nl', { numeric: 'auto' });
    if (minutes < 1) return 'Zojuist bewerkt';
    if (minutes < 60) return `Bewerkt ${rtf.format(-minutes, 'minute')}`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `Bewerkt ${rtf.format(-hours, 'hour')}`;
    const days = Math.round(hours / 24);
    if (days < 7) return `Bewerkt ${rtf.format(-days, 'day')}`;
    return `Bewerkt op ${new Date(iso).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' })}`;
}

type Status = { label: string; tone: 'success' | 'info' | 'warning' };

export function cvStatus(cv: Pick<PersonalCvLibraryItem, 'isPaid' | 'previewData'>): Status {
    if (cv.isPaid) return { label: 'Betaald', tone: 'success' };
    const completion = getCompletionState(cv.previewData, 'nl');
    if (completion.isReady) return { label: 'Klaar om te downloaden', tone: 'info' };
    const done = completion.steps.filter((step) => step.complete).length;
    return { label: `Concept · ${done}/${completion.steps.length}`, tone: 'warning' };
}

const TONE_CLASS: Record<Status['tone'], string> = {
    success: 'bg-[var(--wk-success-soft)] text-[#1f5c43]',
    info: 'bg-[var(--wk-info-soft)] text-[#2a5276]',
    warning: 'bg-[var(--wk-warning-soft)] text-[#7a5214]',
};

function CardMenu({ cv, onRename, onDuplicate, onDelete }: {
    cv: PersonalCvLibraryItem;
    onRename: () => void;
    onDuplicate: () => void;
    onDelete: () => void;
}) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const name = displayName(cv);

    useEffect(() => {
        if (!open) return;
        const onPointer = (event: PointerEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
        };
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false);
        };
        document.addEventListener('pointerdown', onPointer);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('pointerdown', onPointer);
            document.removeEventListener('keydown', onKey);
        };
    }, [open]);

    const item = 'flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-semibold hover:bg-[var(--wk-surface-subtle)]';
    const run = (action: () => void) => () => {
        setOpen(false);
        action();
    };

    return (
        <div ref={rootRef} className="relative shrink-0">
            <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label={`Meer acties voor ${name}`}
                onClick={() => setOpen((value) => !value)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[var(--wk-ink-muted)] hover:bg-[var(--wk-surface-subtle)]"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
            </button>
            {open ? (
                <div role="menu" aria-label={`Acties voor ${name}`} className="absolute bottom-11 right-0 z-20 w-56 rounded-xl border border-[var(--wk-border)] bg-[var(--wk-surface)] p-1.5 shadow-[0_14px_34px_rgb(24_33_31/0.12)]">
                    <Link role="menuitem" href={getEditorPathForCv(cv.previewData, cv.id)} className={item}><Icon name="pencil" />Bewerken</Link>
                    <button role="menuitem" type="button" onClick={run(onRename)} className={item}><Icon name="file" />Naam wijzigen</button>
                    <button role="menuitem" type="button" onClick={run(onDuplicate)} className={item}><Icon name="copy" />Kopie maken</button>
                    <Link role="menuitem" href={`/sollicitatiebrief?id=${encodeURIComponent(cv.id)}`} className={item}><Icon name="mail" />Sollicitatiebrief</Link>
                    <div className="my-1 h-px bg-[#e6ebe7]" />
                    <button role="menuitem" type="button" onClick={run(onDelete)} className={`${item} text-[var(--wk-danger)]`}><Icon name="trash" />Verwijderen</button>
                </div>
            ) : null}
        </div>
    );
}

function CvCard({ cv, onChanged, onDuplicated }: { cv: PersonalCvLibraryItem; onChanged: () => Promise<void>; onDuplicated: (id: string) => Promise<void> }) {
    const [mode, setMode] = useState<'view' | 'rename' | 'confirm-delete'>('view');
    const [draftTitle, setDraftTitle] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const name = displayName(cv);
    const editorPath = getEditorPathForCv(cv.previewData, cv.id);
    const status = cvStatus(cv);

    const rename = async (event: FormEvent) => {
        event.preventDefault();
        const next = draftTitle.trim();
        if (!next) {
            setError('Geef het CV een naam.');
            return;
        }
        setBusy(true);
        setError(null);
        const result = await renameCV(cv.id, next);
        setBusy(false);
        if (!result.success) {
            setError('De naam kon niet worden opgeslagen.');
            return;
        }
        setMode('view');
        await onChanged();
    };

    const duplicate = async () => {
        setBusy(true);
        setError(null);
        const result = await duplicateCV(cv.id);
        setBusy(false);
        if (!result.success || !result.id) {
            setError('Er kon geen kopie worden gemaakt.');
            return;
        }
        await onDuplicated(result.id);
    };

    const remove = async () => {
        setBusy(true);
        setError(null);
        const result = await deleteCV(cv.id);
        if (!result.success) {
            setBusy(false);
            setError('Dit CV kon niet worden verwijderd.');
            return;
        }
        await onChanged();
    };

    return (
        <article id={`cv-card-${cv.id}`} tabIndex={-1} className="flex flex-col overflow-hidden rounded-2xl border border-[var(--wk-border)] bg-[var(--wk-surface)] transition-[box-shadow,border-color] hover:border-[var(--wk-border-strong)] hover:shadow-[var(--wk-shadow-md)] focus:outline-2 focus:outline-[var(--wk-focus)]">
            <Link href={editorPath} aria-label={`${name} openen`} className="block bg-[#eef1ed] px-2.5 pt-2.5 sm:px-[18px] sm:pt-[18px]">
                <CvThumbnail data={cv.previewData} templateId={cv.templateId} colorThemeId={cv.colorThemeId} />
            </Link>
            <div className="flex flex-col gap-2 border-t border-[#e6ebe7] py-3 pl-3 pr-1.5 sm:py-3.5 sm:pl-4 sm:pr-2.5">
                {mode === 'rename' ? (
                    <form onSubmit={rename} className="flex items-center gap-1.5 pr-1.5">
                        <label htmlFor={`cv-title-${cv.id}`} className="sr-only">Naam van dit CV</label>
                        <input
                            id={`cv-title-${cv.id}`}
                            value={draftTitle}
                            onChange={(event) => setDraftTitle(event.target.value.slice(0, 80))}
                            maxLength={80}
                            autoFocus
                            className="min-h-10 min-w-0 flex-1 rounded-lg border border-[var(--wk-border-strong)] px-2.5 text-sm"
                        />
                        <button type="submit" disabled={busy} className="min-h-10 rounded-lg bg-[var(--wk-primary)] px-3 text-[13px] font-bold text-white disabled:opacity-60">Opslaan</button>
                        <button type="button" onClick={() => setMode('view')} aria-label="Annuleren" className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[var(--wk-ink-muted)] hover:bg-[var(--wk-surface-subtle)]"><Icon name="close" /></button>
                    </form>
                ) : (
                    <div className="flex items-start gap-2">
                        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                            <Link href={editorPath} className="truncate text-[15px] font-bold text-[var(--wk-ink)] hover:underline">{name}</Link>
                            <span className="text-[13px] text-[var(--wk-ink-muted)]" suppressHydrationWarning>{editedLabel(cv.updatedAt)}</span>
                            <span className={`self-start rounded-full px-2.5 py-0.5 text-xs font-bold ${TONE_CLASS[status.tone]}`}>{status.label}</span>
                        </div>
                        <CardMenu
                            cv={cv}
                            onRename={() => {
                                setDraftTitle(cv.title?.trim() || name);
                                setError(null);
                                setMode('rename');
                            }}
                            onDuplicate={() => void duplicate()}
                            onDelete={() => {
                                setError(null);
                                setMode('confirm-delete');
                            }}
                        />
                    </div>
                )}
                {mode === 'confirm-delete' ? (
                    <div role="alertdialog" aria-label={`${name} verwijderen`} className="mr-1.5 flex flex-col gap-2 rounded-xl bg-[var(--wk-danger-soft)] p-3">
                        <p className="text-[13px] font-semibold text-[#7d2a33]">“{name}” wordt definitief verwijderd. Dit kun je niet ongedaan maken.</p>
                        <div className="flex gap-2">
                            <button type="button" onClick={() => void remove()} disabled={busy} className="min-h-10 rounded-lg bg-[var(--wk-danger)] px-3 text-[13px] font-bold text-white disabled:opacity-60">{busy ? 'Bezig…' : 'Verwijderen'}</button>
                            <button type="button" onClick={() => setMode('view')} className="min-h-10 rounded-lg border border-[var(--wk-border)] bg-white px-3 text-[13px] font-bold">Annuleren</button>
                        </div>
                    </div>
                ) : null}
                {error ? <p role="alert" className="text-[13px] font-semibold text-[var(--wk-danger)]">{error}</p> : null}
            </div>
        </article>
    );
}

function NewCvTile() {
    const { openNewCv } = useNewCvDialog();
    return (
        <button
            type="button"
            onClick={() => openNewCv('dashboard_tile')}
            className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[var(--wk-border-strong)] p-3 text-[var(--wk-primary)] transition-colors hover:bg-[var(--wk-surface)] sm:min-h-[300px]"
        >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--wk-accent-soft)]"><Icon name="plus" size={22} strokeWidth={2.2} /></span>
            <span className="text-base font-bold">Nieuw CV</span>
            <span className="hidden max-w-[190px] text-center text-[13px] leading-snug text-[var(--wk-ink-muted)] sm:block">Leeg beginnen, je oude CV uploaden of een kopie maken</span>
        </button>
    );
}

const TOOLS: Array<{ href: string; title: string; text: string; tag: string; icon: IconName }> = [
    { href: '/cv-check', title: 'CV-check', text: 'Een cijfer en concrete verbeterpunten voor je CV.', tag: 'Gratis', icon: 'shieldCheck' },
    { href: '/cv-check/vacature', title: 'Vacature-match', text: 'Zie per eis uit de vacature wat je CV nog mist.', tag: 'Gratis', icon: 'target' },
    { href: '/profielfoto-cv-maken', title: 'Profielfoto', text: 'Een zakelijke foto voor je CV, gemaakt van een selfie.', tag: 'AI', icon: 'camera' },
    { href: '/cv-voorbeelden', title: 'Voorbeelden', text: "CV's per beroep om inspiratie uit te halen.", tag: 'Gratis', icon: 'grid' },
];

function ToolsSection() {
    return (
        <section aria-labelledby="tools-title" className="flex flex-col gap-3.5">
            <h2 id="tools-title" className="text-lg font-extrabold">Meer uit je CV halen</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3.5">
                {TOOLS.map((tool) => (
                    <Link key={tool.href} href={tool.href} className="flex flex-col gap-1.5 rounded-[14px] border border-[var(--wk-border)] bg-[#fbfcfa] p-[18px] text-[var(--wk-ink)] transition-colors hover:border-[var(--wk-border-strong)] hover:bg-[var(--wk-surface)]">
                        <span className="flex items-center justify-between gap-2">
                            <span className="flex items-center gap-2 text-[15px] font-extrabold"><Icon name={tool.icon} className="text-[var(--wk-primary)]" />{tool.title}</span>
                            <span className={`rounded-full px-2 py-0.5 text-[11px] font-extrabold ${tool.tag === 'AI' ? TONE_CLASS.info : TONE_CLASS.success}`}>{tool.tag}</span>
                        </span>
                        <span className="text-sm leading-normal text-[var(--wk-ink-muted)]">{tool.text}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}

function CoverLettersTab({ letters }: { letters: CoverLetterListItem[] }) {
    const router = useRouter();
    const [cvOptions, setCvOptions] = useState<Array<{ id: string; label: string }> | null>(null);
    const [chosen, setChosen] = useState('');

    useEffect(() => {
        let cancelled = false;
        void getUserCVs({ sort: 'updated_desc' }).then((result) => {
            if (cancelled || !result.ok) return;
            const options = result.items.map((cv) => ({ id: cv.id, label: displayName(cv) }));
            setCvOptions(options);
            setChosen(options[0]?.id || '');
        });
        return () => { cancelled = true; };
    }, []);

    return (
        <div className="flex flex-col gap-6">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    if (chosen) router.push(`/sollicitatiebrief?id=${encodeURIComponent(chosen)}`);
                }}
                className="flex flex-col gap-3 rounded-2xl border border-[var(--wk-border)] bg-[var(--wk-surface)] p-5 sm:flex-row sm:items-end"
            >
                <label className="flex flex-1 flex-col gap-1.5 text-sm font-bold">
                    Nieuwe brief bij welk CV?
                    <select
                        value={chosen}
                        onChange={(event) => setChosen(event.target.value)}
                        disabled={!cvOptions?.length}
                        className="min-h-11 rounded-[10px] border border-[var(--wk-border-strong)] bg-[var(--wk-surface)] px-3 text-sm font-semibold disabled:opacity-60"
                    >
                        {cvOptions === null ? <option>Laden…</option> : null}
                        {cvOptions?.length === 0 ? <option value="">Maak eerst een CV</option> : null}
                        {cvOptions?.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                    </select>
                </label>
                <button type="submit" disabled={!chosen} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] bg-[var(--wk-primary)] px-4 text-sm font-bold text-white disabled:opacity-50">
                    <Icon name="plus" strokeWidth={2.2} />Brief schrijven
                </button>
            </form>

            {letters.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[var(--wk-border-strong)] px-6 py-12 text-center">
                    <p className="font-bold">Nog geen sollicitatiebrieven</p>
                    <p className="mx-auto mt-1 max-w-md text-sm text-[var(--wk-ink-muted)]">Een brief hoort bij een CV. Kies hierboven een CV, dan schrijven we de brief op basis van je ervaring.</p>
                </div>
            ) : (
                <ul className="flex flex-col divide-y divide-[#e6ebe7] overflow-hidden rounded-2xl border border-[var(--wk-border)] bg-[var(--wk-surface)]">
                    {letters.map((letter) => (
                        <li key={letter.cvId}>
                            <Link href={`/sollicitatiebrief?id=${encodeURIComponent(letter.cvId)}`} className="flex min-h-16 items-center gap-4 px-5 py-3 hover:bg-[var(--wk-surface-subtle)]">
                                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--wk-accent-soft)] text-[var(--wk-primary)]"><Icon name="mail" /></span>
                                <span className="flex min-w-0 flex-1 flex-col">
                                    <span className="truncate text-[15px] font-bold">Brief bij {letter.cvTitle}</span>
                                    <span className="text-[13px] text-[var(--wk-ink-muted)]" suppressHydrationWarning>{letter.name ? `${letter.name} · ` : ''}{editedLabel(letter.updatedAt)}</span>
                                </span>
                                <Icon name="arrowRight" className="text-[var(--wk-ink-muted)]" />
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default function Dashboard({ tab, initialResult, letters }: { tab: DashboardTab; initialResult: PersonalCvLibraryResult; letters: CoverLetterListItem[] }) {
    const router = useRouter();
    const initial = initialResult.ok ? initialResult : null;
    const [items, setItems] = useState<PersonalCvLibraryItem[]>(initial?.items || []);
    const [query, setQuery] = useState(initial?.query || '');
    const [appliedQuery, setAppliedQuery] = useState(initial?.query || '');
    const [sort, setSort] = useState<PersonalCvLibrarySort>(initial?.sort || 'updated_desc');
    const [nextCursor, setNextCursor] = useState(initial?.nextCursor || null);
    const [totalCount, setTotalCount] = useState(initial?.totalCount || 0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(initialResult.ok ? null : initialResult.message);

    const load = async ({ nextQuery = appliedQuery, nextSort = sort, cursor, append = false }: {
        nextQuery?: string; nextSort?: PersonalCvLibrarySort; cursor?: string; append?: boolean;
    } = {}) => {
        setLoading(true);
        setError(null);
        const result = await getUserCVs({ query: nextQuery, sort: nextSort, ...(cursor ? { cursor } : {}) });
        setLoading(false);
        if (!result.ok) {
            setError(result.message);
            return;
        }
        setItems((current) => (append ? [...current, ...result.items] : result.items));
        setNextCursor(result.nextCursor);
        setTotalCount(result.totalCount);
        setAppliedQuery(result.query);
        setQuery(result.query);
        setSort(result.sort);
    };

    const tabClass = (active: boolean) => `inline-flex min-h-10 items-center gap-2 rounded-[10px] px-3.5 text-sm font-bold transition-colors ${active
        ? 'bg-[var(--wk-surface)] text-[var(--wk-ink)] shadow-[0_1px_2px_rgb(24_33_31/0.12)]'
        : 'text-[var(--wk-ink-muted)] hover:text-[var(--wk-ink)]'}`;

    return (
        <main className="px-4 pb-16 pt-8 sm:px-8 lg:px-14">
            <div className="mx-auto flex max-w-[1120px] flex-col gap-7">
                <header className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h1 className="text-[30px] font-extrabold tracking-tight">{tab === 'brieven' ? 'Sollicitatiebrieven' : "Mijn CV's"}</h1>
                        <p className="mt-1.5 text-[15px] text-[var(--wk-ink-muted)]">
                            {tab === 'brieven'
                                ? `${letters.length} ${letters.length === 1 ? 'brief' : 'brieven'}`
                                : `${totalCount} ${totalCount === 1 ? 'CV' : "CV's"} · je betaalt per CV, eenmalig`}
                        </p>
                    </div>
                    <nav aria-label="Documenten" className="flex gap-1 rounded-xl bg-[#e9ede9] p-1">
                        <Link href="/mijn-cvs" aria-current={tab === 'cvs' ? 'page' : undefined} className={tabClass(tab === 'cvs')}>CV&apos;s</Link>
                        <Link href="/mijn-cvs?tab=brieven" aria-current={tab === 'brieven' ? 'page' : undefined} className={tabClass(tab === 'brieven')}>Brieven</Link>
                    </nav>
                </header>

                {tab === 'brieven' ? <CoverLettersTab letters={letters} /> : (
                    <>
                        <form
                            role="search"
                            onSubmit={(event) => {
                                event.preventDefault();
                                void load({ nextQuery: query.trim() });
                            }}
                            className="flex flex-wrap items-center gap-2.5"
                        >
                            <label className="flex min-h-[42px] flex-1 items-center gap-2 rounded-[10px] border border-[var(--wk-border)] bg-[var(--wk-surface)] px-3 text-[var(--wk-ink-muted)] focus-within:outline-2 focus-within:outline-[var(--wk-focus)] sm:max-w-xs">
                                <Icon name="search" size={17} />
                                <span className="sr-only">Zoek op CV-naam</span>
                                <input
                                    type="search"
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value.slice(0, 100))}
                                    placeholder="Zoek op naam"
                                    className="min-w-0 flex-1 bg-transparent text-sm text-[var(--wk-ink)] outline-none"
                                />
                            </label>
                            <label className="flex items-center gap-2 text-sm text-[var(--wk-ink-muted)]">
                                Sorteer
                                <select
                                    value={sort}
                                    disabled={loading}
                                    onChange={(event) => void load({ nextSort: event.target.value as PersonalCvLibrarySort })}
                                    className="min-h-[42px] rounded-[10px] border border-[var(--wk-border)] bg-[var(--wk-surface)] px-2.5 text-sm font-semibold text-[var(--wk-ink)]"
                                >
                                    <option value="updated_desc">Laatst bewerkt</option>
                                    <option value="created_desc">Nieuwste</option>
                                    <option value="created_asc">Oudste</option>
                                    <option value="title_asc">Naam A–Z</option>
                                </select>
                            </label>
                        </form>

                        <section aria-label="CV's" aria-busy={loading}>
                            {error ? (
                                <div role="alert" className="rounded-2xl border border-[#e7b9bf] bg-[var(--wk-danger-soft)] px-6 py-10 text-center">
                                    <p className="font-bold text-[#7d2a33]">{error}</p>
                                    <button type="button" onClick={() => void load()} className="mt-4 min-h-11 rounded-[10px] border border-[#e7b9bf] bg-white px-4 text-sm font-bold">Opnieuw proberen</button>
                                </div>
                            ) : items.length === 0 && appliedQuery ? (
                                <div className="rounded-2xl border border-dashed border-[var(--wk-border-strong)] px-6 py-12 text-center">
                                    <p className="font-bold">Geen CV&apos;s gevonden</p>
                                    <p className="mt-1 text-sm text-[var(--wk-ink-muted)]">Geen CV-naam past bij “{appliedQuery}”.</p>
                                    <button type="button" onClick={() => void load({ nextQuery: '', nextSort: 'updated_desc' })} className="mt-4 min-h-11 rounded-[10px] border border-[var(--wk-border)] bg-white px-4 text-sm font-bold">Zoekopdracht wissen</button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] sm:gap-5">
                                    {!appliedQuery ? <NewCvTile /> : null}
                                    {items.map((cv) => (
                                        <CvCard
                                            key={cv.id}
                                            cv={cv}
                                            onChanged={() => load()}
                                            onDuplicated={async (id) => {
                                                await load({ nextQuery: '', nextSort: 'updated_desc' });
                                                router.replace(`/mijn-cvs?focus=${encodeURIComponent(id)}`);
                                                window.requestAnimationFrame(() => document.getElementById(`cv-card-${id}`)?.focus());
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                            {nextCursor ? (
                                <div className="mt-6 flex justify-center">
                                    <button type="button" disabled={loading} onClick={() => void load({ cursor: nextCursor, append: true })} className="min-h-11 rounded-[10px] border border-[var(--wk-border)] bg-white px-4 text-sm font-bold disabled:opacity-50">
                                        {loading ? 'Laden…' : "Meer CV's tonen"}
                                    </button>
                                </div>
                            ) : null}
                        </section>

                        <ToolsSection />
                    </>
                )}
            </div>
        </main>
    );
}
