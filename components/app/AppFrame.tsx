'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Icon, type IconName } from '@/components/app/icons';
import { NewCvDialogProvider, useNewCvDialog } from '@/components/app/NewCvDialog';
import { appPaths, type AppLocale } from '@/lib/app-v2-paths';

export type AppSection = 'cvs' | 'letters' | 'jobs' | 'applications' | 'cvCheck' | 'vacancyMatch' | 'profilePhoto' | 'examples' | 'help' | 'account' | 'none';

// "responsive": icon rail from 520px, full sidebar with labels from 1280px.
// "rail": always the icon rail (the editor needs the width for the form and preview).
export type SidebarMode = 'responsive' | 'rail';

type NavItem = { href: string; label: string; icon: IconName; section?: AppSection };

function navFor(locale: AppLocale) {
    const paths = appPaths(locale);
    const en = locale === 'en';
    const main: NavItem[] = [
        { href: paths.dashboard, label: en ? 'My CVs' : "Mijn CV's", icon: 'file', section: 'cvs' },
        { href: paths.letters, label: en ? 'Cover letters' : 'Sollicitatiebrieven', icon: 'mail', section: 'letters' },
        { href: paths.jobs, label: en ? 'Jobs for you' : 'Vacatures voor jou', icon: 'search', section: 'jobs' },
        { href: paths.applications, label: en ? 'My applications' : 'Mijn sollicitaties', icon: 'check', section: 'applications' },
    ];
    const tools: NavItem[] = [
        { href: paths.cvCheck, label: en ? 'CV check' : 'CV-check', icon: 'shieldCheck', section: 'cvCheck' },
        { href: paths.vacancyMatch, label: en ? 'Job match' : 'Vacature-match', icon: 'target', section: 'vacancyMatch' },
        { href: paths.profilePhoto, label: en ? 'Profile photo' : 'Profielfoto', icon: 'camera', section: 'profilePhoto' },
        { href: paths.examples, label: en ? 'Examples' : 'Voorbeelden', icon: 'grid', section: 'examples' },
    ];
    const help: NavItem = { href: paths.help, label: en ? 'Help' : 'Hulp', icon: 'help', section: 'help' };
    return { main, tools, help };
}

// Tailwind needs complete class names, so each mode spells its classes out.
const MODE = {
    responsive: {
        aside: 'gap-3 py-4 min-[520px]:w-[76px] min-[520px]:px-2.5 xl:w-[248px] xl:gap-5 xl:px-3.5 xl:py-5',
        label: 'sr-only xl:not-sr-only',
        link: 'justify-center px-0 xl:justify-start xl:px-3',
        wordmark: 'hidden xl:inline-flex',
        mark: 'inline-flex xl:hidden',
        newCv: 'h-11 w-11 self-center px-0 xl:h-auto xl:w-auto xl:self-stretch xl:px-4',
        toolsHeading: 'hidden xl:block',
        account: 'flex-col xl:flex-row',
        email: 'hidden xl:block',
    },
    rail: {
        aside: 'w-[76px] gap-3 px-2.5 py-4',
        label: 'sr-only',
        link: 'justify-center px-0',
        wordmark: 'hidden',
        mark: 'inline-flex',
        newCv: 'h-11 w-11 self-center px-0',
        toolsHeading: 'hidden',
        account: 'flex-col',
        email: 'hidden',
    },
} as const;

function Logo({ locale, mode }: { locale: AppLocale; mode?: SidebarMode }) {
    const href = appPaths(locale).dashboard;
    if (!mode) {
        return (
            <Link href={href} className="inline-flex items-center gap-0.5 rounded-md px-2 py-1 text-xl font-extrabold tracking-tight text-[var(--wk-ink)]">
                Werk<span className="rounded-[5px] bg-[#9fe5dc] px-1">CV</span>.nl
            </Link>
        );
    }
    const m = MODE[mode];
    return (
        <Link href={href} aria-label="WerkCV.nl" className={`flex justify-center ${mode === 'responsive' ? 'xl:justify-start' : ''}`}>
            <span aria-hidden="true" className={`${m.wordmark} items-center gap-0.5 rounded-md px-2 py-1 text-xl font-extrabold tracking-tight text-[var(--wk-ink)]`}>
                Werk<span className="rounded-[5px] bg-[#9fe5dc] px-1">CV</span>.nl
            </span>
            <span aria-hidden="true" className={`${m.mark} h-10 w-10 items-center justify-center rounded-[10px] bg-[var(--wk-primary)] text-[15px] font-extrabold text-white`}>W</span>
        </Link>
    );
}

function NavLink({ item, active, mode }: { item: NavItem; active: boolean; mode?: SidebarMode }) {
    const m = mode ? MODE[mode] : null;
    return (
        <Link
            href={item.href}
            aria-current={active ? 'page' : undefined}
            title={m ? item.label : undefined}
            className={`flex min-h-11 items-center gap-3 rounded-[10px] text-sm font-semibold transition-colors ${m ? m.link : 'px-3'} ${active
                ? 'bg-[var(--wk-accent-soft)] text-[var(--wk-primary)]'
                : 'text-[#3c4744] hover:bg-[var(--wk-surface-subtle)] hover:text-[var(--wk-ink)]'}`}
        >
            <Icon name={item.icon} size={19} className="shrink-0" />
            <span className={m ? m.label : ''}>{item.label}</span>
        </Link>
    );
}

function NewCvButton({ source, locale, mode, className = '' }: { source: string; locale: AppLocale; mode?: SidebarMode; className?: string }) {
    const { openNewCv } = useNewCvDialog();
    const label = locale === 'en' ? 'New CV' : 'Nieuw CV';
    const m = mode ? MODE[mode] : null;
    return (
        <button
            type="button"
            onClick={() => openNewCv(source)}
            title={m ? label : undefined}
            className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[var(--wk-primary)] text-[15px] font-bold text-[var(--wk-primary-contrast)] transition-colors hover:bg-[var(--wk-primary-hover)] ${m ? m.newCv : 'px-4'} ${className}`}
        >
            <Icon name="plus" strokeWidth={2.2} className="shrink-0" />
            <span className={m ? m.label : ''}>{label}</span>
        </button>
    );
}

function LogoutButton({ locale }: { locale: AppLocale }) {
    const router = useRouter();
    const [busy, setBusy] = useState(false);
    const label = locale === 'en' ? 'Log out' : 'Uitloggen';
    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            disabled={busy}
            onClick={async () => {
                setBusy(true);
                await fetch('/api/auth/logout', { method: 'POST' }).catch(() => null);
                router.push(locale === 'en' ? '/en' : '/');
            }}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[var(--wk-ink-muted)] hover:bg-[var(--wk-surface-subtle)] disabled:opacity-50"
        >
            <Icon name="logout" />
        </button>
    );
}

function NavContent({ active, email, locale, mode }: { active: AppSection; email: string; locale: AppLocale; mode?: SidebarMode }) {
    const nav = navFor(locale);
    const m = mode ? MODE[mode] : null;
    return (
        <>
            <nav aria-label={locale === 'en' ? 'Main menu' : 'Hoofdmenu'} className="flex flex-col gap-0.5">
                {nav.main.map((item) => <NavLink key={item.href} item={item} active={item.section === active} mode={mode} />)}
                <div className="mx-2 my-2.5 h-px bg-[#e6ebe7]" />
                <p className={`mx-3 mb-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[var(--wk-ink-muted)] ${m ? m.toolsHeading : ''}`}>Tools</p>
                {nav.tools.map((item) => <NavLink key={item.href} item={item} active={item.section === active} mode={mode} />)}
            </nav>
            <div className="mt-auto flex flex-col gap-0.5 pt-6">
                <NavLink item={nav.help} active={active === 'help'} mode={mode} />
                <div className={`mt-2 flex items-center gap-2.5 border-t border-[#e6ebe7] pt-3 ${m ? `${m.account} ${mode === 'responsive' ? 'px-0 xl:px-3' : 'px-0'}` : 'px-3'}`}>
                    <Link
                        href={appPaths(locale).account}
                        aria-current={active === 'account' ? 'page' : undefined}
                        aria-label={`Account: ${email}`}
                        title={`Account (${email})`}
                        className={`flex min-h-11 min-w-0 flex-1 items-center gap-2.5 rounded-[10px] ${m ? m.account : ''} ${active === 'account' ? 'bg-[var(--wk-accent-soft)]' : 'hover:bg-[var(--wk-surface-subtle)]'}`}
                    >
                        <span
                            aria-hidden="true"
                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--wk-primary)] text-[13px] font-extrabold uppercase text-white"
                        >
                            {email.slice(0, 1) || '?'}
                        </span>
                        <span className={`min-w-0 flex-1 truncate text-[13px] text-[#3c4744] ${m ? m.email : ''}`}>
                            {email}
                        </span>
                    </Link>
                    <LogoutButton locale={locale} />
                </div>
            </div>
        </>
    );
}

// The left navigation, shown from 520px wide. Use inside a NewCvDialogProvider.
export function AppSidebar({ active, email, locale, mode }: { active: AppSection; email: string; locale: AppLocale; mode: SidebarMode }) {
    return (
        <aside className={`sticky top-0 hidden h-screen shrink-0 flex-col overflow-y-auto overflow-x-hidden border-r border-[var(--wk-border)] bg-[var(--wk-surface)] [scrollbar-width:none] min-[520px]:flex ${MODE[mode].aside}`}>
            <Logo locale={locale} mode={mode} />
            <NewCvButton source="app_sidebar" locale={locale} mode={mode} />
            <NavContent active={active} email={email} locale={locale} mode={mode} />
        </aside>
    );
}

export function AppFrame({ active, email, locale = 'nl', children }: { active: AppSection; email: string; locale?: AppLocale; children: ReactNode }) {
    const pathname = usePathname();
    // The menu belongs to the page it was opened on, so navigating closes it.
    const [menuOpenOn, setMenuOpenOn] = useState<string | null>(null);
    const menuOpen = menuOpenOn === pathname;
    const en = locale === 'en';

    return (
        <div className="werkcv-brand">
        <NewCvDialogProvider locale={locale}>
            <div className="min-h-screen bg-[var(--wk-canvas)] font-sans text-[var(--wk-ink)] min-[520px]:flex">
                <AppSidebar active={active} email={email} locale={locale} mode="responsive" />

                <header className="sticky top-0 z-30 border-b border-[var(--wk-border)] bg-[var(--wk-surface)] min-[520px]:hidden">
                    <div className="flex items-center gap-2 px-4 py-2.5">
                        <Logo locale={locale} />
                        <div className="ml-auto flex items-center gap-2">
                            <NewCvButton source="app_topbar" locale={locale} className="min-h-10 px-3 text-sm" />
                            <button
                                type="button"
                                aria-expanded={menuOpen}
                                aria-controls="app-mobile-menu"
                                aria-label={menuOpen ? (en ? 'Close menu' : 'Menu sluiten') : (en ? 'Open menu' : 'Menu openen')}
                                onClick={() => setMenuOpenOn(menuOpen ? null : pathname)}
                                className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-[var(--wk-border)] text-[var(--wk-ink)]"
                            >
                                <Icon name={menuOpen ? 'close' : 'menu'} size={20} />
                            </button>
                        </div>
                    </div>
                    {menuOpen ? (
                        <div
                            id="app-mobile-menu"
                            onClick={(event) => {
                                if ((event.target as HTMLElement).closest('a')) setMenuOpenOn(null);
                            }}
                            className="flex flex-col border-t border-[var(--wk-border)] px-3 pb-4 pt-2"
                        >
                            <NavContent active={active} email={email} locale={locale} />
                        </div>
                    ) : null}
                </header>

                <div className="min-w-0 flex-1">{children}</div>
            </div>
        </NewCvDialogProvider>
        </div>
    );
}

export { NewCvButton };
