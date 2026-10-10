'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Icon, type IconName } from '@/components/app/icons';
import { NewCvDialogProvider, useNewCvDialog } from '@/components/app/NewCvDialog';
import { appPaths, type AppLocale } from '@/lib/app-v2-paths';

export type AppSection = 'cvs' | 'letters' | 'none';

type NavItem = { href: string; label: string; icon: IconName; section?: AppSection };

function navFor(locale: AppLocale) {
    const paths = appPaths(locale);
    const en = locale === 'en';
    const main: NavItem[] = [
        { href: paths.dashboard, label: en ? 'My CVs' : "Mijn CV's", icon: 'file', section: 'cvs' },
        { href: paths.letters, label: en ? 'Cover letters' : 'Sollicitatiebrieven', icon: 'mail', section: 'letters' },
    ];
    const tools: NavItem[] = [
        { href: paths.cvCheck, label: en ? 'CV check' : 'CV-check', icon: 'shieldCheck' },
        { href: paths.vacancyMatch, label: en ? 'Job match' : 'Vacature-match', icon: 'target' },
        { href: paths.profilePhoto, label: en ? 'Profile photo' : 'Profielfoto', icon: 'camera' },
        { href: paths.examples, label: en ? 'Examples' : 'Voorbeelden', icon: 'grid' },
    ];
    const help: NavItem = { href: paths.help, label: en ? 'Help' : 'Hulp', icon: 'help' };
    return { main, tools, help };
}

function Logo({ locale }: { locale: AppLocale }) {
    return (
        <Link href={appPaths(locale).dashboard} className="inline-flex items-center gap-0.5 rounded-md px-2 py-1 text-xl font-extrabold tracking-tight text-[var(--wk-ink)]">
            Werk<span className="rounded-[5px] bg-[#9fe5dc] px-1">CV</span>.nl
        </Link>
    );
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
    return (
        <Link
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={`flex min-h-11 items-center gap-3 rounded-[10px] px-3 text-sm font-semibold transition-colors ${active
                ? 'bg-[var(--wk-accent-soft)] text-[var(--wk-primary)]'
                : 'text-[#3c4744] hover:bg-[var(--wk-surface-subtle)] hover:text-[var(--wk-ink)]'}`}
        >
            <Icon name={item.icon} size={19} />
            {item.label}
        </Link>
    );
}

function NewCvButton({ source, locale, className = '' }: { source: string; locale: AppLocale; className?: string }) {
    const { openNewCv } = useNewCvDialog();
    return (
        <button
            type="button"
            onClick={() => openNewCv(source)}
            className={`inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[var(--wk-primary)] px-4 text-[15px] font-bold text-[var(--wk-primary-contrast)] transition-colors hover:bg-[var(--wk-primary-hover)] ${className}`}
        >
            <Icon name="plus" strokeWidth={2.2} />
            {locale === 'en' ? 'New CV' : 'Nieuw CV'}
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

function SidebarContent({ active, email, locale }: { active: AppSection; email: string; locale: AppLocale }) {
    const nav = navFor(locale);
    return (
        <>
            <nav aria-label={locale === 'en' ? 'Main menu' : 'Hoofdmenu'} className="flex flex-col gap-0.5">
                {nav.main.map((item) => <NavLink key={item.href} item={item} active={item.section === active} />)}
                <div className="mx-2 my-2.5 h-px bg-[#e6ebe7]" />
                <p className="mx-3 mb-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[var(--wk-ink-muted)]">Tools</p>
                {nav.tools.map((item) => <NavLink key={item.href} item={item} active={false} />)}
            </nav>
            <div className="mt-auto flex flex-col gap-0.5 pt-6">
                <NavLink item={nav.help} active={false} />
                <div className="mt-2 flex items-center gap-2.5 border-t border-[#e6ebe7] px-3 pt-3">
                    <span aria-hidden="true" className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--wk-primary)] text-[13px] font-extrabold uppercase text-white">
                        {email.slice(0, 1) || '?'}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[13px] text-[#3c4744]" title={email}>{email}</span>
                    <LogoutButton locale={locale} />
                </div>
            </div>
        </>
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
            <div className="min-h-screen bg-[var(--wk-canvas)] font-sans text-[var(--wk-ink)] lg:flex">
                <aside className="sticky top-0 hidden h-screen w-[248px] shrink-0 flex-col gap-5 overflow-y-auto border-r border-[var(--wk-border)] bg-[var(--wk-surface)] px-3.5 py-5 lg:flex">
                    <Logo locale={locale} />
                    <NewCvButton source="app_sidebar" locale={locale} />
                    <SidebarContent active={active} email={email} locale={locale} />
                </aside>

                <header className="sticky top-0 z-30 border-b border-[var(--wk-border)] bg-[var(--wk-surface)] lg:hidden">
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
                            <SidebarContent active={active} email={email} locale={locale} />
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
