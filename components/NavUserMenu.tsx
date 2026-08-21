'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { UiLanguage } from '@/lib/ui-language';

export default function NavUserMenu({
    uiLanguage = 'nl',
    tone = 'default',
}: {
    uiLanguage?: UiLanguage;
    tone?: 'default' | 'brand';
}) {
    const router = useRouter();
    const pathname = usePathname();
    const isEnglish = uiLanguage === 'en';
    const [email, setEmail] = useState<string | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    useEffect(() => {
        fetch('/api/auth/me')
            .then(r => r.ok ? r.json() : null)
            .then(data => { if (data?.authenticated) setEmail(data.user.email); })
            .catch(() => {})
            .finally(() => setLoaded(true));
    }, []);

    if (!loaded) return null;

    const linkClass = tone === 'brand'
        ? 'wk-user-menu-link'
        : 'font-bold text-sm text-black hover:text-yellow-600 transition-colors';
    const quietClass = tone === 'brand'
        ? 'wk-user-menu-quiet'
        : 'text-xs font-bold text-gray-500 hover:text-black transition-colors disabled:opacity-50';

    if (!email) {
        const currentPath = pathname || (isEnglish ? '/en' : '/');
        const loginNext = currentPath.startsWith('/en') ? '/en/editor' : '/editor';

        return (
            <Link
                href={`/login?next=${encodeURIComponent(loginNext)}`}
                className={linkClass}
            >
                {isEnglish ? 'Log in' : 'Inloggen'}
            </Link>
        );
    }

    const handleLogout = async () => {
        setLoggingOut(true);
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push(isEnglish ? '/en' : '/');
        router.refresh();
    };

    return (
        <div className="flex items-center gap-3">
            <Link
                href="/mijn-cvs"
                className={linkClass}
            >
                {isEnglish ? 'My CVs' : "Mijn CV's"}
            </Link>
            <Link
                href={isEnglish ? '/en/profile-photo' : '/profielfoto-cv-maken'}
                className={linkClass}
            >
                {isEnglish ? 'Profile photos' : "Profielfoto's"}
            </Link>
            <button
                onClick={handleLogout}
                disabled={loggingOut}
                className={`${quietClass} disabled:opacity-50`}
            >
                {loggingOut ? '...' : isEnglish ? 'Log out' : 'Uitloggen'}
            </button>
        </div>
    );
}
