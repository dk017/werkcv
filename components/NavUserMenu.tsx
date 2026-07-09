'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { UiLanguage } from '@/lib/ui-language';

export default function NavUserMenu({ uiLanguage = 'nl' }: { uiLanguage?: UiLanguage }) {
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

    if (!email) {
        const currentPath = pathname || (isEnglish ? '/en' : '/');
        const loginNext = currentPath.startsWith('/en') ? '/en/editor' : '/editor';

        return (
            <Link
                href={`/login?next=${encodeURIComponent(loginNext)}`}
                className="font-bold text-sm text-black hover:text-yellow-600 transition-colors"
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
                className="font-bold text-sm text-black hover:text-yellow-600 transition-colors"
            >
                {isEnglish ? 'My CVs' : "Mijn CV's"}
            </Link>
            <Link
                href={isEnglish ? '/en/profile-photo' : '/profielfoto-cv-maken'}
                className="font-bold text-sm text-black hover:text-yellow-600 transition-colors"
            >
                {isEnglish ? 'Profile photos' : "Profielfoto's"}
            </Link>
            <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="text-xs font-bold text-gray-500 hover:text-black transition-colors disabled:opacity-50"
            >
                {loggingOut ? '...' : isEnglish ? 'Log out' : 'Uitloggen'}
            </button>
        </div>
    );
}
