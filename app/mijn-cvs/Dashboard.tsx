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
import { appPaths, type AppLocale } from '@/lib/app-v2-paths';
import type { PersonalCvLibraryItem, PersonalCvLibraryResult, PersonalCvLibrarySort } from '@/lib/cv-library';
import type { CoverLetterListItem } from './actions';

export type DashboardTab = 'cvs' | 'letters';

const COPY = {
    nl: {
        cvsTitle: "Mijn CV's",
        lettersTitle: 'Sollicitatiebrieven',
        cvCount: (n: number) => `${n} ${n === 1 ? 'CV' : "CV's"} · je betaalt per CV, eenmalig`,
        letterCount: (n: number) => `${n} ${n === 1 ? 'brief' : 'brieven'}`,
        tabsLabel: 'Documenten',
        tabCvs: "CV's",
        tabLetters: 'Brieven',
        searchLabel: 'Zoek op CV-naam',
        searchPlaceholder: 'Zoek op naam',
        sort: 'Sorteer',
        sortOptions: { updated_desc: 'Laatst bewerkt', created_desc: 'Nieuwste', created_asc: 'Oudste', title_asc: 'Naam A–Z' },
        loadFailed: "Je CV's konden niet worden geladen. Probeer het opnieuw.",
        retry: 'Opnieuw proberen',
        noneFound: "Geen CV's gevonden",
        noMatch: (q: string) => `Geen CV-naam past bij “${q}”.`,
        clearSearch: 'Zoekopdracht wissen',
        loading: 'Laden…',
        more: "Meer CV's tonen",
        untitled: 'Naamloos CV',
        defaultTitles: ['Mijn CV'],
        edited: {
            now: 'Zojuist bewerkt',
            prefix: 'Bewerkt',
            on: 'Bewerkt op',
            dateLocale: 'nl-NL',
        },
        status: { paid: 'Betaald', ready: 'Klaar om te downloaden', draft: 'Concept' },
        menu: { more: (n: string) => `Meer acties voor ${n}`, actions: (n: string) => `Acties voor ${n}`, edit: 'Bewerken', rename: 'Naam wijzigen', copy: 'Kopie maken', letter: 'Sollicitatiebrief', delete: 'Verwijderen' },
        card: {
            open: (n: string) => `${n} openen`,
            nameLabel: 'Naam van dit CV',
            save: 'Opslaan',
            cancel: 'Annuleren',
            nameRequired: 'Geef het CV een naam.',
            renameFailed: 'De naam kon niet worden opgeslagen.',
            copyFailed: 'Er kon geen kopie worden gemaakt.',
            deleteFailed: 'Dit CV kon niet worden verwijderd.',
            deleteTitle: (n: string) => `${n} verwijderen`,
            deleteWarning: (n: string) => `“${n}” wordt definitief verwijderd. Dit kun je niet ongedaan maken.`,
            deleting: 'Bezig…',
            delete: 'Verwijderen',
        },
        tile: { title: 'Nieuw CV', text: 'Leeg beginnen, je oude CV uploaden of een kopie maken' },
        toolsTitle: 'Meer uit je CV halen',
        tools: [
            { key: 'cvCheck', title: 'CV-check', text: 'Een cijfer en concrete verbeterpunten voor je CV.', tag: 'Gratis', icon: 'shieldCheck' },
            { key: 'vacancyMatch', title: 'Vacature-match', text: 'Zie per eis uit de vacature wat je CV nog mist.', tag: 'Gratis', icon: 'target' },
            { key: 'profilePhoto', title: 'Profielfoto', text: 'Een zakelijke foto voor je CV, gemaakt van een selfie.', tag: 'AI', icon: 'camera' },
            { key: 'examples', title: 'Voorbeelden', text: "CV's per beroep om inspiratie uit te halen.", tag: 'Gratis', icon: 'grid' },
        ],
        letters: {
            which: 'Nieuwe brief bij welk CV?',
            createCvFirst: 'Maak eerst een CV',
            write: 'Brief schrijven',
            emptyTitle: 'Nog geen sollicitatiebrieven',
            emptyText: 'Een brief hoort bij een CV. Kies hierboven een CV, dan schrijven we de brief op basis van je ervaring.',
            letterFor: (t: string) => `Brief bij ${t}`,
        },
    },
    en: {
        cvsTitle: 'My CVs',
        lettersTitle: 'Cover letters',
        cvCount: (n: number) => `${n} ${n === 1 ? 'CV' : 'CVs'} · you pay once per CV`,
        letterCount: (n: number) => `${n} ${n === 1 ? 'letter' : 'letters'}`,
        tabsLabel: 'Documents',
        tabCvs: 'CVs',
        tabLetters: 'Letters',
        searchLabel: 'Search by CV name',
        searchPlaceholder: 'Search by name',
        sort: 'Sort',
        sortOptions: { updated_desc: 'Last edited', created_desc: 'Newest', created_asc: 'Oldest', title_asc: 'Name A–Z' },
        loadFailed: 'Your CVs could not be loaded. Please try again.',
        retry: 'Try again',
        noneFound: 'No CVs found',
        noMatch: (q: string) => `No CV name matches “${q}”.`,
        clearSearch: 'Clear search',
        loading: 'Loading…',
        more: 'Show more CVs',
        untitled: 'Untitled CV',
        defaultTitles: ['Mijn CV', 'My CV'],
        edited: {
            now: 'Edited just now',
            prefix: 'Edited',
            on: 'Edited on',
            dateLocale: 'en-GB',
        },
        status: { paid: 'Paid', ready: 'Ready to download', draft: 'Draft' },
        menu: { more: (n: string) => `More actions for ${n}`, actions: (n: string) => `Actions for ${n}`, edit: 'Edit', rename: 'Rename', copy: 'Make a copy', letter: 'Cover letter', delete: 'Delete' },
        card: {
            open: (n: string) => `Open ${n}`,
            nameLabel: 'Name of this CV',
            save: 'Save',
            cancel: 'Cancel',
            nameRequired: 'Give the CV a name.',
            renameFailed: 'The name could not be saved.',
            copyFailed: 'A copy could not be made.',
            deleteFailed: 'This CV could not be deleted.',
            deleteTitle: (n: string) => `Delete ${n}`,
            deleteWarning: (n: string) => `“${n}” will be deleted permanently. This cannot be undone.`,
            deleting: 'Working…',
            delete: 'Delete',
        },
        tile: { title: 'New CV', text: 'Start blank, upload your old CV or make a copy' },
        toolsTitle: 'Get more out of your CV',
        tools: [
            { key: 'cvCheck', title: 'CV check', text: 'A grade and concrete improvements for your CV.', tag: 'Free', icon: 'shieldCheck' },
            { key: 'vacancyMatch', title: 'Job match', text: 'See, requirement by requirement, what your CV still misses.', tag: 'Free', icon: 'target' },
            { key: 'profilePhoto', title: 'Profile photo', text: 'A professional photo for your CV, made from a selfie.', tag: 'AI', icon: 'camera' },
            { key: 'examples', title: 'Examples', text: 'Dutch CV examples to take inspiration from.', tag: 'Free', icon: 'grid' },
        ],
        letters: {
            which: 'New letter for which CV?',
            createCvFirst: 'Create a CV first',
            write: 'Write letter',
            emptyTitle: 'No cover letters yet',
            emptyText: 'A letter belongs to a CV. Choose a CV above and we write the letter based on your experience.',
            letterFor: (t: string) => `Letter for ${t}`,
        },
    },
} as const;

type DashboardCopy = (typeof COPY)[AppLocale];
type ToolKey = 'cvCheck' | 'vacancyMatch' | 'profilePhoto' | 'examples';

function displayName(cv: PersonalCvLibraryItem, c: DashboardCopy): string {
    const title = cv.title?.trim();
    if (title && !(c.defaultTitles as readonly string[]).includes(title)) return title;
    return cv.previewData.personal.name || c.untitled;
}

export function editedLabel(iso: string, locale: AppLocale = 'nl', now: number = Date.now()): string {
    const e = COPY[locale].edited;
    const minutes = Math.max(0, Math.round((now - new Date(iso).getTime()) / 60_000));
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    if (minutes < 1) return e.now;
    if (minutes < 60) return `${e.prefix} ${rtf.format(-minutes, 'minute')}`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${e.prefix} ${rtf.format(-hours, 'hour')}`;
    const days = Math.round(hours / 24);
    if (days < 7) return `${e.prefix} ${rtf.format(-days, 'day')}`;
    return `${e.on} ${new Date(iso).toLocaleDateString(e.dateLocale, { day: 'numeric', month: 'short', year: 'numeric' })}`;
}

type Status = { label: string; tone: 'success' | 'info' | 'warning' };

export function cvStatus(cv: Pick<PersonalCvLibraryItem, 'isPaid' | 'previewData'>, locale: AppLocale = 'nl'): Status {
    const s = COPY[locale].status;
    if (cv.isPaid) return { label: s.paid, tone: 'success' };
    const completion = getCompletionState(cv.previewData, locale);
    if (completion.isReady) return { label: s.ready, tone: 'info' };
    const done = completion.steps.filter((step) => step.complete).length;
    return { label: `${s.draft} · ${done}/${completion.steps.length}`, tone: 'warning' };
}

const TONE_CLASS: Record<Status['tone'], string> = {
    success: 'bg-[var(--wk-success-soft)] text-[#1f5c43]',
    info: 'bg-[var(--wk-info-soft)] text-[#2a5276]',
    warning: 'bg-[var(--wk-warning-soft)] text-[#7a5214]',
};

function CardMenu({ cv, locale, onRename, onDuplicate, onDelete }: {
    cv: PersonalCvLibraryItem;
    locale: AppLocale;
    onRename: () => void;
    onDuplicate: () => void;
    onDelete: () => void;
}) {
    const c = COPY[locale];
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const name = displayName(cv, c);

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
                aria-label={c.menu.more(name)}
                onClick={() => setOpen((value) => !value)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[var(--wk-ink-muted)] hover:bg-[var(--wk-surface-subtle)]"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
            </button>
            {open ? (
                <div role="menu" aria-label={c.menu.actions(name)} className="absolute bottom-11 right-0 z-20 w-56 rounded-xl border border-[var(--wk-border)] bg-[var(--wk-surface)] p-1.5 shadow-[0_14px_34px_rgb(24_33_31/0.12)]">
                    <Link role="menuitem" href={getEditorPathForCv(cv.previewData, cv.id)} className={item}><Icon name="pencil" />{c.menu.edit}</Link>
                    <button role="menuitem" type="button" onClick={run(onRename)} className={item}><Icon name="file" />{c.menu.rename}</button>
                    <button role="menuitem" type="button" onClick={run(onDuplicate)} className={item}><Icon name="copy" />{c.menu.copy}</button>
                    <Link role="menuitem" href={appPaths(locale).coverLetter(cv.id)} className={item}><Icon name="mail" />{c.menu.letter}</Link>
                    <div className="my-1 h-px bg-[#e6ebe7]" />
                    <button role="menuitem" type="button" onClick={run(onDelete)} className={`${item} text-[var(--wk-danger)]`}><Icon name="trash" />{c.menu.delete}</button>
                </div>
            ) : null}
        </div>
    );
}

function CvCard({ cv, locale, onChanged, onDuplicated }: { cv: PersonalCvLibraryItem; locale: AppLocale; onChanged: () => Promise<void>; onDuplicated: (id: string) => Promise<void> }) {
    const c = COPY[locale];
    const [mode, setMode] = useState<'view' | 'rename' | 'confirm-delete'>('view');
    const [draftTitle, setDraftTitle] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const name = displayName(cv, c);
    const editorPath = getEditorPathForCv(cv.previewData, cv.id);
    const status = cvStatus(cv, locale);

    const rename = async (event: FormEvent) => {
        event.preventDefault();
        const next = draftTitle.trim();
        if (!next) {
            setError(c.card.nameRequired);
            return;
        }
        setBusy(true);
        setError(null);
        const result = await renameCV(cv.id, next);
        setBusy(false);
        if (!result.success) {
            setError(c.card.renameFailed);
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
            setError(c.card.copyFailed);
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
            setError(c.card.deleteFailed);
            return;
        }
        await onChanged();
    };

    return (
        <article id={`cv-card-${cv.id}`} tabIndex={-1} className="flex flex-col overflow-hidden rounded-2xl border border-[var(--wk-border)] bg-[var(--wk-surface)] transition-[box-shadow,border-color] hover:border-[var(--wk-border-strong)] hover:shadow-[var(--wk-shadow-md)] focus:outline-2 focus:outline-[var(--wk-focus)]">
            <Link href={editorPath} aria-label={c.card.open(name)} className="block bg-[#eef1ed] px-2.5 pt-2.5 sm:px-[18px] sm:pt-[18px]">
                <CvThumbnail data={cv.previewData} templateId={cv.templateId} colorThemeId={cv.colorThemeId} />
            </Link>
            <div className="flex flex-col gap-2 border-t border-[#e6ebe7] py-3 pl-3 pr-1.5 sm:py-3.5 sm:pl-4 sm:pr-2.5">
                {mode === 'rename' ? (
                    <form onSubmit={rename} className="flex items-center gap-1.5 pr-1.5">
                        <label htmlFor={`cv-title-${cv.id}`} className="sr-only">{c.card.nameLabel}</label>
                        <input
                            id={`cv-title-${cv.id}`}
                            value={draftTitle}
                            onChange={(event) => setDraftTitle(event.target.value.slice(0, 80))}
                            maxLength={80}
                            autoFocus
                            className="min-h-10 min-w-0 flex-1 rounded-lg border border-[var(--wk-border-strong)] px-2.5 text-sm"
                        />
                        <button type="submit" disabled={busy} className="min-h-10 rounded-lg bg-[var(--wk-primary)] px-3 text-[13px] font-bold text-white disabled:opacity-60">{c.card.save}</button>
                        <button type="button" onClick={() => setMode('view')} aria-label={c.card.cancel} className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[var(--wk-ink-muted)] hover:bg-[var(--wk-surface-subtle)]"><Icon name="close" /></button>
                    </form>
                ) : (
                    <div className="flex items-start gap-2">
                        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                            <Link href={editorPath} className="truncate text-[15px] font-bold text-[var(--wk-ink)] hover:underline">{name}</Link>
                            <span className="text-[13px] text-[var(--wk-ink-muted)]" suppressHydrationWarning>{editedLabel(cv.updatedAt, locale)}</span>
                            <span className={`self-start rounded-full px-2.5 py-0.5 text-xs font-bold ${TONE_CLASS[status.tone]}`}>{status.label}</span>
                        </div>
                        <CardMenu
                            cv={cv}
                            locale={locale}
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
                    <div role="alertdialog" aria-label={c.card.deleteTitle(name)} className="mr-1.5 flex flex-col gap-2 rounded-xl bg-[var(--wk-danger-soft)] p-3">
                        <p className="text-[13px] font-semibold text-[#7d2a33]">{c.card.deleteWarning(name)}</p>
                        <div className="flex gap-2">
                            <button type="button" onClick={() => void remove()} disabled={busy} className="min-h-10 rounded-lg bg-[var(--wk-danger)] px-3 text-[13px] font-bold text-white disabled:opacity-60">{busy ? c.card.deleting : c.card.delete}</button>
                            <button type="button" onClick={() => setMode('view')} className="min-h-10 rounded-lg border border-[var(--wk-border)] bg-white px-3 text-[13px] font-bold">{c.card.cancel}</button>
                        </div>
                    </div>
                ) : null}
                {error ? <p role="alert" className="text-[13px] font-semibold text-[var(--wk-danger)]">{error}</p> : null}
            </div>
        </article>
    );
}

function NewCvTile({ locale }: { locale: AppLocale }) {
    const c = COPY[locale];
    const { openNewCv } = useNewCvDialog();
    return (
        <button
            type="button"
            onClick={() => openNewCv('dashboard_tile')}
            className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[var(--wk-border-strong)] p-3 text-[var(--wk-primary)] transition-colors hover:bg-[var(--wk-surface)] sm:min-h-[300px]"
        >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--wk-accent-soft)]"><Icon name="plus" size={22} strokeWidth={2.2} /></span>
            <span className="text-base font-bold">{c.tile.title}</span>
            <span className="hidden max-w-[190px] text-center text-[13px] leading-snug text-[var(--wk-ink-muted)] sm:block">{c.tile.text}</span>
        </button>
    );
}

function ToolsSection({ locale }: { locale: AppLocale }) {
    const c = COPY[locale];
    const paths = appPaths(locale);
    return (
        <section aria-labelledby="tools-title" className="flex flex-col gap-3.5">
            <h2 id="tools-title" className="text-lg font-extrabold">{c.toolsTitle}</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3.5">
                {c.tools.map((tool) => (
                    <Link key={tool.key} href={paths[tool.key as ToolKey]} className="flex flex-col gap-1.5 rounded-[14px] border border-[var(--wk-border)] bg-[#fbfcfa] p-[18px] text-[var(--wk-ink)] transition-colors hover:border-[var(--wk-border-strong)] hover:bg-[var(--wk-surface)]">
                        <span className="flex items-center justify-between gap-2">
                            <span className="flex items-center gap-2 text-[15px] font-extrabold"><Icon name={tool.icon as IconName} className="text-[var(--wk-primary)]" />{tool.title}</span>
                            <span className={`rounded-full px-2 py-0.5 text-[11px] font-extrabold ${tool.tag === 'AI' ? TONE_CLASS.info : TONE_CLASS.success}`}>{tool.tag}</span>
                        </span>
                        <span className="text-sm leading-normal text-[var(--wk-ink-muted)]">{tool.text}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}

function CoverLettersTab({ letters, locale }: { letters: CoverLetterListItem[]; locale: AppLocale }) {
    const c = COPY[locale];
    const paths = appPaths(locale);
    const router = useRouter();
    const [cvOptions, setCvOptions] = useState<Array<{ id: string; label: string }> | null>(null);
    const [chosen, setChosen] = useState('');

    useEffect(() => {
        let cancelled = false;
        void getUserCVs({ sort: 'updated_desc' }).then((result) => {
            if (cancelled) return;
            const options = result.ok ? result.items.map((cv) => ({ id: cv.id, label: displayName(cv, COPY[locale]) })) : [];
            setCvOptions(options);
            setChosen(options[0]?.id || '');
        });
        return () => { cancelled = true; };
    }, [locale]);

    return (
        <div className="flex flex-col gap-6">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    if (chosen) router.push(paths.coverLetter(chosen));
                }}
                className="flex flex-col gap-3 rounded-2xl border border-[var(--wk-border)] bg-[var(--wk-surface)] p-5 sm:flex-row sm:items-end"
            >
                <label className="flex flex-1 flex-col gap-1.5 text-sm font-bold">
                    {c.letters.which}
                    <select
                        value={chosen}
                        onChange={(event) => setChosen(event.target.value)}
                        disabled={!cvOptions?.length}
                        className="min-h-11 rounded-[10px] border border-[var(--wk-border-strong)] bg-[var(--wk-surface)] px-3 text-sm font-semibold disabled:opacity-60"
                    >
                        {cvOptions === null ? <option>{c.loading}</option> : null}
                        {cvOptions?.length === 0 ? <option value="">{c.letters.createCvFirst}</option> : null}
                        {cvOptions?.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                    </select>
                </label>
                <button type="submit" disabled={!chosen} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] bg-[var(--wk-primary)] px-4 text-sm font-bold text-white disabled:opacity-50">
                    <Icon name="plus" strokeWidth={2.2} />{c.letters.write}
                </button>
            </form>

            {letters.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[var(--wk-border-strong)] px-6 py-12 text-center">
                    <p className="font-bold">{c.letters.emptyTitle}</p>
                    <p className="mx-auto mt-1 max-w-md text-sm text-[var(--wk-ink-muted)]">{c.letters.emptyText}</p>
                </div>
            ) : (
                <ul className="flex flex-col divide-y divide-[#e6ebe7] overflow-hidden rounded-2xl border border-[var(--wk-border)] bg-[var(--wk-surface)]">
                    {letters.map((letter) => (
                        <li key={letter.cvId}>
                            <Link href={paths.coverLetter(letter.cvId)} className="flex min-h-16 items-center gap-4 px-5 py-3 hover:bg-[var(--wk-surface-subtle)]">
                                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--wk-accent-soft)] text-[var(--wk-primary)]"><Icon name="mail" /></span>
                                <span className="flex min-w-0 flex-1 flex-col">
                                    <span className="truncate text-[15px] font-bold">{c.letters.letterFor(letter.cvTitle || letter.name || c.untitled)}</span>
                                    <span className="text-[13px] text-[var(--wk-ink-muted)]" suppressHydrationWarning>{letter.name ? `${letter.name} · ` : ''}{editedLabel(letter.updatedAt, locale)}</span>
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

export default function Dashboard({ tab, initialResult, letters, locale = 'nl' }: {
    tab: DashboardTab;
    initialResult: PersonalCvLibraryResult;
    letters: CoverLetterListItem[];
    locale?: AppLocale;
}) {
    const c = COPY[locale];
    const paths = appPaths(locale);
    const router = useRouter();
    const initial = initialResult.ok ? initialResult : null;
    const [items, setItems] = useState<PersonalCvLibraryItem[]>(initial?.items || []);
    const [query, setQuery] = useState(initial?.query || '');
    const [appliedQuery, setAppliedQuery] = useState(initial?.query || '');
    const [sort, setSort] = useState<PersonalCvLibrarySort>(initial?.sort || 'updated_desc');
    const [nextCursor, setNextCursor] = useState(initial?.nextCursor || null);
    const [totalCount, setTotalCount] = useState(initial?.totalCount || 0);
    const [loading, setLoading] = useState(false);
    // Server messages are Dutch; English users get the English equivalent.
    const loadError = (message: string) => (locale === 'en' ? c.loadFailed : message);
    const [error, setError] = useState(initialResult.ok ? null : loadError(initialResult.message));

    const load = async ({ nextQuery = appliedQuery, nextSort = sort, cursor, append = false }: {
        nextQuery?: string; nextSort?: PersonalCvLibrarySort; cursor?: string; append?: boolean;
    } = {}) => {
        setLoading(true);
        setError(null);
        const result = await getUserCVs({ query: nextQuery, sort: nextSort, ...(cursor ? { cursor } : {}) });
        setLoading(false);
        if (!result.ok) {
            setError(loadError(result.message));
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
                        <h1 className="text-[30px] font-extrabold tracking-tight">{tab === 'letters' ? c.lettersTitle : c.cvsTitle}</h1>
                        <p className="mt-1.5 text-[15px] text-[var(--wk-ink-muted)]">
                            {tab === 'letters' ? c.letterCount(letters.length) : c.cvCount(totalCount)}
                        </p>
                    </div>
                    <nav aria-label={c.tabsLabel} className="flex gap-1 rounded-xl bg-[#e9ede9] p-1">
                        <Link href={paths.dashboard} aria-current={tab === 'cvs' ? 'page' : undefined} className={tabClass(tab === 'cvs')}>{c.tabCvs}</Link>
                        <Link href={paths.letters} aria-current={tab === 'letters' ? 'page' : undefined} className={tabClass(tab === 'letters')}>{c.tabLetters}</Link>
                    </nav>
                </header>

                {tab === 'letters' ? <CoverLettersTab letters={letters} locale={locale} /> : (
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
                                <span className="sr-only">{c.searchLabel}</span>
                                <input
                                    type="search"
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value.slice(0, 100))}
                                    placeholder={c.searchPlaceholder}
                                    className="min-w-0 flex-1 bg-transparent text-sm text-[var(--wk-ink)] outline-none"
                                />
                            </label>
                            <label className="flex items-center gap-2 text-sm text-[var(--wk-ink-muted)]">
                                {c.sort}
                                <select
                                    value={sort}
                                    disabled={loading}
                                    onChange={(event) => void load({ nextSort: event.target.value as PersonalCvLibrarySort })}
                                    className="min-h-[42px] rounded-[10px] border border-[var(--wk-border)] bg-[var(--wk-surface)] px-2.5 text-sm font-semibold text-[var(--wk-ink)]"
                                >
                                    {(Object.keys(c.sortOptions) as PersonalCvLibrarySort[]).map((key) => (
                                        <option key={key} value={key}>{c.sortOptions[key]}</option>
                                    ))}
                                </select>
                            </label>
                        </form>

                        <section aria-label={c.cvsTitle} aria-busy={loading}>
                            {error ? (
                                <div role="alert" className="rounded-2xl border border-[#e7b9bf] bg-[var(--wk-danger-soft)] px-6 py-10 text-center">
                                    <p className="font-bold text-[#7d2a33]">{error}</p>
                                    <button type="button" onClick={() => void load()} className="mt-4 min-h-11 rounded-[10px] border border-[#e7b9bf] bg-white px-4 text-sm font-bold">{c.retry}</button>
                                </div>
                            ) : items.length === 0 && appliedQuery ? (
                                <div className="rounded-2xl border border-dashed border-[var(--wk-border-strong)] px-6 py-12 text-center">
                                    <p className="font-bold">{c.noneFound}</p>
                                    <p className="mt-1 text-sm text-[var(--wk-ink-muted)]">{c.noMatch(appliedQuery)}</p>
                                    <button type="button" onClick={() => void load({ nextQuery: '', nextSort: 'updated_desc' })} className="mt-4 min-h-11 rounded-[10px] border border-[var(--wk-border)] bg-white px-4 text-sm font-bold">{c.clearSearch}</button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] sm:gap-5">
                                    {!appliedQuery ? <NewCvTile locale={locale} /> : null}
                                    {items.map((cv) => (
                                        <CvCard
                                            key={cv.id}
                                            cv={cv}
                                            locale={locale}
                                            onChanged={() => load()}
                                            onDuplicated={async (id) => {
                                                await load({ nextQuery: '', nextSort: 'updated_desc' });
                                                router.replace(`${paths.dashboard}?focus=${encodeURIComponent(id)}`);
                                                window.requestAnimationFrame(() => document.getElementById(`cv-card-${id}`)?.focus());
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                            {nextCursor ? (
                                <div className="mt-6 flex justify-center">
                                    <button type="button" disabled={loading} onClick={() => void load({ cursor: nextCursor, append: true })} className="min-h-11 rounded-[10px] border border-[var(--wk-border)] bg-white px-4 text-sm font-bold disabled:opacity-50">
                                        {loading ? c.loading : c.more}
                                    </button>
                                </div>
                            ) : null}
                        </section>

                        <ToolsSection locale={locale} />
                    </>
                )}
            </div>
        </main>
    );
}
