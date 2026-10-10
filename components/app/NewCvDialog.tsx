'use client';

import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Icon, type IconName } from '@/components/app/icons';
import { createCvFromDashboard, type NewCvStart } from '@/app/mijn-cvs/actions';
import { getUserCVs } from '@/app/actions';
import { getTargetVacancySessionKey } from '@/lib/cover-letter-session';
import { track } from '@/lib/analytics';

type NewCvDialogContextValue = { openNewCv: (source: string) => void };

const NewCvDialogContext = createContext<NewCvDialogContextValue | null>(null);

export function useNewCvDialog(): NewCvDialogContextValue {
    const value = useContext(NewCvDialogContext);
    if (!value) throw new Error('useNewCvDialog must be used inside NewCvDialogProvider');
    return value;
}

const START_OPTIONS: Array<{ id: NewCvStart; title: string; text: string; icon: IconName }> = [
    { id: 'blank', title: 'Leeg beginnen', text: 'Vul je CV stap voor stap in.', icon: 'file' },
    { id: 'upload', title: 'CV uploaden', text: 'PDF of Word. Wij zetten alles op de juiste plek.', icon: 'upload' },
    { id: 'copy', title: 'Kopie van een CV', text: 'Begin vanaf een CV dat je al hebt.', icon: 'copy' },
];

const MAX_VACANCY_LENGTH = 20_000;

export function NewCvDialogProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
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
                ? result.items.map((cv) => ({ id: cv.id, label: cv.title?.trim() || cv.previewData.personal.name || 'Naamloos CV' }))
                : [];
            setCopyOptions(options);
            if (options[0]) setSourceCvId((current) => current || options[0].id);
        });
        return () => { cancelled = true; };
    }, [start, copyOptions]);

    const close = () => dialogRef.current?.close();

    const submit = async () => {
        if (start === 'copy' && !sourceCvId) {
            setError('Kies het CV dat je wilt kopiëren.');
            return;
        }
        setSubmitting(true);
        setError(null);
        const result = await createCvFromDashboard({
            title: title.trim(),
            start,
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
        router.push(`/editor?${params.toString()}`);
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
                        <h2 id={titleId} className="text-[22px] font-extrabold">Nieuw CV</h2>
                        <button type="button" onClick={close} aria-label="Sluiten" className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] text-[var(--wk-ink-muted)] hover:bg-[var(--wk-surface-subtle)]">
                            <Icon name="close" size={20} strokeWidth={2} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-5 px-6 pb-6 pt-4">
                        <label className="flex flex-col gap-2 text-sm font-bold">
                            Naam van dit CV
                            <input
                                type="text"
                                value={title}
                                onChange={(event) => setTitle(event.target.value.slice(0, 80))}
                                maxLength={80}
                                placeholder="bv. Marketing – Bol"
                                className="min-h-[46px] rounded-[10px] border border-[var(--wk-border-strong)] px-3.5 text-[15px] font-medium focus:border-[var(--wk-focus)] focus:outline-2 focus:outline-offset-1 focus:outline-[var(--wk-focus)]"
                            />
                            <span className="text-[13px] font-medium text-[var(--wk-ink-muted)]">Alleen voor jou, dit staat niet op je CV.</span>
                        </label>

                        <fieldset className="flex flex-col gap-2.5">
                            <legend className="mb-2.5 text-sm font-bold">Hoe wil je beginnen?</legend>
                            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                                {START_OPTIONS.map((option) => {
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
                                    Welk CV wil je kopiëren?
                                    <select
                                        value={sourceCvId}
                                        onChange={(event) => setSourceCvId(event.target.value)}
                                        disabled={copyOptions === null || copyOptions.length === 0}
                                        className="min-h-11 rounded-[10px] border border-[var(--wk-border-strong)] bg-[var(--wk-surface)] px-3 text-sm font-semibold disabled:opacity-60"
                                    >
                                        {copyOptions === null ? <option>Laden…</option> : null}
                                        {copyOptions?.length === 0 ? <option value="">Je hebt nog geen CV om te kopiëren</option> : null}
                                        {copyOptions?.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                                    </select>
                                </label>
                            ) : null}
                        </fieldset>

                        <div className="flex flex-col gap-3 rounded-xl bg-[var(--wk-surface-subtle)] p-4">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-extrabold">Afstemmen op een vacature</p>
                                    <p className="mt-1 text-[13px] leading-snug text-[var(--wk-ink-muted)]">We tonen welke eisen nog ontbreken terwijl je schrijft.</p>
                                </div>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={targetVacancy}
                                    aria-label="Afstemmen op een vacature"
                                    onClick={() => setTargetVacancy((current) => !current)}
                                    className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${targetVacancy ? 'bg-[var(--wk-primary)]' : 'bg-[var(--wk-border-strong)]'}`}
                                >
                                    <span className={`absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow transition-[left] ${targetVacancy ? 'left-[23px]' : 'left-[3px]'}`} />
                                </button>
                            </div>
                            {targetVacancy ? (
                                <label className="flex flex-col gap-1.5 text-[13px] font-bold">
                                    Vacaturetekst
                                    <textarea
                                        rows={4}
                                        value={vacancy}
                                        onChange={(event) => setVacancy(event.target.value.slice(0, MAX_VACANCY_LENGTH))}
                                        placeholder="Plak hier de tekst van de vacature"
                                        className="resize-y rounded-[10px] border border-[var(--wk-border-strong)] bg-[var(--wk-surface)] px-3.5 py-3 text-sm font-normal"
                                    />
                                </label>
                            ) : null}
                        </div>

                        {error ? <p role="alert" className="text-sm font-semibold text-[var(--wk-danger)]">{error}</p> : null}

                        <div className="flex justify-end gap-2.5">
                            <button type="button" onClick={close} className="min-h-[46px] rounded-[10px] border border-[var(--wk-border)] bg-[var(--wk-surface)] px-4 text-[15px] font-bold hover:bg-[var(--wk-surface-subtle)]">
                                Annuleren
                            </button>
                            <button type="submit" disabled={submitting} className="inline-flex min-h-[46px] items-center gap-2 rounded-[10px] bg-[var(--wk-primary)] px-5 text-[15px] font-bold text-[var(--wk-primary-contrast)] hover:bg-[var(--wk-primary-hover)] disabled:opacity-60">
                                {submitting ? 'Bezig…' : 'CV maken'}
                            </button>
                        </div>
                    </div>
                </form>
            </dialog>
        </NewCvDialogContext.Provider>
    );
}
