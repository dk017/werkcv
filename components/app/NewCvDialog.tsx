'use client';

import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Icon, type IconName } from '@/components/app/icons';
import { createCvFromDashboard, type NewCvStart } from '@/app/mijn-cvs/actions';
import { getUserCVs } from '@/app/actions';
import { getTargetVacancySessionKey } from '@/lib/cover-letter-session';
import { track } from '@/lib/analytics';
import { appPaths, type AppLocale } from '@/lib/app-v2-paths';

type NewCvDialogContextValue = { openNewCv: (source: string) => void };

const NewCvDialogContext = createContext<NewCvDialogContextValue | null>(null);

export function useNewCvDialog(): NewCvDialogContextValue {
    const value = useContext(NewCvDialogContext);
    if (!value) throw new Error('useNewCvDialog must be used inside NewCvDialogProvider');
    return value;
}

const COPY = {
    nl: {
        title: 'Nieuw CV',
        close: 'Sluiten',
        name: 'Naam van dit CV',
        namePlaceholder: 'bv. Marketing – Bol',
        nameHint: 'Alleen voor jou, dit staat niet op je CV.',
        startLegend: 'Hoe wil je beginnen?',
        copyWhich: 'Welk CV wil je kopiëren?',
        loading: 'Laden…',
        noCopy: 'Je hebt nog geen CV om te kopiëren',
        chooseCopy: 'Kies het CV dat je wilt kopiëren.',
        target: 'Afstemmen op een vacature',
        targetHint: 'We tonen welke eisen nog ontbreken terwijl je schrijft.',
        vacancy: 'Vacaturetekst',
        vacancyPlaceholder: 'Plak hier de tekst van de vacature',
        cancel: 'Annuleren',
        submit: 'CV maken',
        busy: 'Bezig…',
        untitled: 'Naamloos CV',
        starts: [
            { id: 'blank', title: 'Leeg beginnen', text: 'Vul je CV stap voor stap in.', icon: 'file' },
            { id: 'upload', title: 'CV uploaden', text: 'PDF of Word. Wij zetten alles op de juiste plek.', icon: 'upload' },
            { id: 'copy', title: 'Kopie van een CV', text: 'Begin vanaf een CV dat je al hebt.', icon: 'copy' },
        ] as Array<{ id: NewCvStart; title: string; text: string; icon: IconName }>,
    },
    en: {
        title: 'New CV',
        close: 'Close',
        name: 'Name of this CV',
        namePlaceholder: 'e.g. Marketing – Booking.com',
        nameHint: 'Only for you; it does not appear on your CV.',
        startLegend: 'How do you want to start?',
        copyWhich: 'Which CV do you want to copy?',
        loading: 'Loading…',
        noCopy: 'You have no CV to copy yet',
        chooseCopy: 'Choose the CV you want to copy.',
        target: 'Tailor to a vacancy',
        targetHint: 'We show which requirements are still missing while you write.',
        vacancy: 'Job description',
        vacancyPlaceholder: 'Paste the job description here',
        cancel: 'Cancel',
        submit: 'Create CV',
        busy: 'Working…',
        untitled: 'Untitled CV',
        starts: [
            { id: 'blank', title: 'Start blank', text: 'Fill in your CV step by step.', icon: 'file' },
            { id: 'upload', title: 'Upload a CV', text: 'PDF or Word. We put everything in the right place.', icon: 'upload' },
            { id: 'copy', title: 'Copy a CV', text: 'Start from a CV you already have.', icon: 'copy' },
        ] as Array<{ id: NewCvStart; title: string; text: string; icon: IconName }>,
    },
} as const;

const MAX_VACANCY_LENGTH = 20_000;

export function NewCvDialogProvider({ locale = 'nl', children }: { locale?: AppLocale; children: ReactNode }) {
    const router = useRouter();
    const c = COPY[locale];
    const dialogRef = useRef<HTMLDialogElement>(null);
    const titleId = useId();
    const [title, setTitle] = useState('');
    const [start, setStart] = useState<NewCvStart>('blank');
    const [sourceCvId, setSourceCvId] = useState('');
    const [copyOptions, setCopyOptions] = useState<Array<{ id: string; label: string }> | null>(null);
    const [targetVacancy, setTargetVacancy] = useState(false);
    const [vacancy, setVacancy] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const openNewCv = useCallback((source: string) => {
        setTitle('');
        setStart('blank');
        setSourceCvId('');
        setTargetVacancy(false);
        setVacancy('');
        setError(null);
        setSubmitting(false);
        dialogRef.current?.showModal();
        track('cta_clicked', { location: source, label: 'open_new_cv' });
    }, []);

    useEffect(() => {
        if (start !== 'copy' || copyOptions !== null) return;
        let cancelled = false;
        void getUserCVs({ sort: 'updated_desc' }).then((result) => {
            if (cancelled) return;
            const options = result.ok
                ? result.items.map((cv) => ({ id: cv.id, label: cv.title?.trim() || cv.previewData.personal.name || c.untitled }))
                : [];
            setCopyOptions(options);
            if (options[0]) setSourceCvId((current) => current || options[0].id);
        });
        return () => { cancelled = true; };
    }, [start, copyOptions, c.untitled]);

    const close = () => dialogRef.current?.close();

    const submit = async () => {
        if (start === 'copy' && !sourceCvId) {
            setError(c.chooseCopy);
            return;
        }
        setSubmitting(true);
        setError(null);
        const result = await createCvFromDashboard({
            title: title.trim(),
            start,
            locale,
            ...(start === 'copy' ? { sourceCvId } : {}),
        });
        if (!result.ok) {
            setError(result.message);
            setSubmitting(false);
            return;
        }
        const vacancyText = targetVacancy ? vacancy.trim() : '';
        if (vacancyText) {
            try {
                window.sessionStorage.setItem(getTargetVacancySessionKey(result.id), vacancyText);
            } catch {
                // Private mode: the CV still opens, the vacancy can be pasted again in the editor.
            }
        }
        track('cta_clicked', { location: 'dashboard_new_cv', label: `${start}${vacancyText ? '_with_vacancy' : ''}` });
        const params = new URLSearchParams({ id: result.id, startSource: `dashboard_${start}` });
        if (start === 'upload') params.set('upload', '1');
        router.push(`${appPaths(locale).editorBase}?${params.toString()}`);
    };

    const contextValue = useMemo(() => ({ openNewCv }), [openNewCv]);

    return (
        <NewCvDialogContext.Provider value={contextValue}>
            {children}
            <dialog
                ref={dialogRef}
                aria-labelledby={titleId}
                className="m-auto w-[calc(100%-32px)] max-w-[600px] rounded-[20px] bg-[var(--wk-surface)] p-0 text-[var(--wk-ink)] shadow-[0_24px_60px_rgb(24_33_31/0.25)] backdrop:bg-[rgb(24_33_31/0.45)]"
            >
                <form
                    method="dialog"
                    onSubmit={(event) => {
                        event.preventDefault();
                        void submit();
                    }}
                    className="flex flex-col"
                >
                    <div className="flex items-center justify-between px-6 pt-5">
                        <h2 id={titleId} className="text-[22px] font-extrabold">{c.title}</h2>
                        <button type="button" onClick={close} aria-label={c.close} className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] text-[var(--wk-ink-muted)] hover:bg-[var(--wk-surface-subtle)]">
                            <Icon name="close" size={20} strokeWidth={2} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-5 px-6 pb-6 pt-4">
                        <label className="flex flex-col gap-2 text-sm font-bold">
                            {c.name}
                            <input
                                type="text"
                                value={title}
                                onChange={(event) => setTitle(event.target.value.slice(0, 80))}
                                maxLength={80}
                                placeholder={c.namePlaceholder}
                                className="min-h-[46px] rounded-[10px] border border-[var(--wk-border-strong)] px-3.5 text-[15px] font-medium focus:border-[var(--wk-focus)] focus:outline-2 focus:outline-offset-1 focus:outline-[var(--wk-focus)]"
                            />
                            <span className="text-[13px] font-medium text-[var(--wk-ink-muted)]">{c.nameHint}</span>
                        </label>

                        <fieldset className="flex flex-col gap-2.5">
                            <legend className="mb-2.5 text-sm font-bold">{c.startLegend}</legend>
                            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                                {c.starts.map((option) => {
                                    const selected = start === option.id;
                                    return (
                                        <button
                                            key={option.id}
                                            type="button"
                                            aria-pressed={selected}
                                            onClick={() => setStart(option.id)}
                                            className={`flex flex-col items-start gap-1.5 rounded-xl p-3.5 text-left transition-colors ${selected
                                                ? 'border-2 border-[var(--wk-primary)] bg-[var(--wk-surface-subtle)]'
                                                : 'border border-[var(--wk-border)] bg-[var(--wk-surface)] hover:border-[var(--wk-border-strong)]'}`}
                                        >
                                            <Icon name={option.icon} className="text-[var(--wk-primary)]" />
                                            <span className="text-sm font-extrabold">{option.title}</span>
                                            <span className="text-[13px] leading-snug text-[var(--wk-ink-muted)]">{option.text}</span>
                                        </button>
                                    );
                                })}
                            </div>
                            {start === 'copy' ? (
                                <label className="mt-1 flex flex-col gap-1.5 text-[13px] font-bold">
                                    {c.copyWhich}
                                    <select
                                        value={sourceCvId}
                                        onChange={(event) => setSourceCvId(event.target.value)}
                                        disabled={copyOptions === null || copyOptions.length === 0}
                                        className="min-h-11 rounded-[10px] border border-[var(--wk-border-strong)] bg-[var(--wk-surface)] px-3 text-sm font-semibold disabled:opacity-60"
                                    >
                                        {copyOptions === null ? <option>{c.loading}</option> : null}
                                        {copyOptions?.length === 0 ? <option value="">{c.noCopy}</option> : null}
                                        {copyOptions?.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                                    </select>
                                </label>
                            ) : null}
                        </fieldset>

                        <div className="flex flex-col gap-3 rounded-xl bg-[var(--wk-surface-subtle)] p-4">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-extrabold">{c.target}</p>
                                    <p className="mt-1 text-[13px] leading-snug text-[var(--wk-ink-muted)]">{c.targetHint}</p>
                                </div>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={targetVacancy}
                                    aria-label={c.target}
                                    onClick={() => setTargetVacancy((current) => !current)}
                                    className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${targetVacancy ? 'bg-[var(--wk-primary)]' : 'bg-[var(--wk-border-strong)]'}`}
                                >
                                    <span className={`absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow transition-[left] ${targetVacancy ? 'left-[23px]' : 'left-[3px]'}`} />
                                </button>
                            </div>
                            {targetVacancy ? (
                                <label className="flex flex-col gap-1.5 text-[13px] font-bold">
                                    {c.vacancy}
                                    <textarea
                                        rows={4}
                                        value={vacancy}
                                        onChange={(event) => setVacancy(event.target.value.slice(0, MAX_VACANCY_LENGTH))}
                                        placeholder={c.vacancyPlaceholder}
                                        className="resize-y rounded-[10px] border border-[var(--wk-border-strong)] bg-[var(--wk-surface)] px-3.5 py-3 text-sm font-normal"
                                    />
                                </label>
                            ) : null}
                        </div>

                        {error ? <p role="alert" className="text-sm font-semibold text-[var(--wk-danger)]">{error}</p> : null}

                        <div className="flex justify-end gap-2.5">
                            <button type="button" onClick={close} className="min-h-[46px] rounded-[10px] border border-[var(--wk-border)] bg-[var(--wk-surface)] px-4 text-[15px] font-bold hover:bg-[var(--wk-surface-subtle)]">
                                {c.cancel}
                            </button>
                            <button type="submit" disabled={submitting} className="inline-flex min-h-[46px] items-center gap-2 rounded-[10px] bg-[var(--wk-primary)] px-5 text-[15px] font-bold text-[var(--wk-primary-contrast)] hover:bg-[var(--wk-primary-hover)] disabled:opacity-60">
                                {submitting ? c.busy : c.submit}
                            </button>
                        </div>
                    </div>
                </form>
            </dialog>
        </NewCvDialogContext.Provider>
    );
}
