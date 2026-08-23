
import type { ReactNode } from 'react';
import { BrandShell } from '@/components/brand/BrandShell';
import { SiteHeader } from '@/components/brand/SiteHeader';
import NavUserMenu from '@/components/NavUserMenu';

export default function PersonalAppShell({ children }: { children: ReactNode }) {
    return (
        <BrandShell className="wk-app-shell wk-app-shell--personal">
            <SiteHeader
                logoHref="/"
                context="Persoonlijke CV's"
                currentPath="/mijn-cvs"
                navItems={[
                    { href: '/mijn-cvs', label: "Mijn CV's" },
                    { href: '/templates', label: 'Templates' },
                    { href: '/cv-tips', label: 'CV-tips' },
                    { href: '/tools', label: 'Tools' },
                ]}
                navAriaLabel="Persoonlijke CV-navigatie"
                primaryHref="/templates?startSource=personal_library"
                primaryLabel="Nieuw CV"
                rightContent={<NavUserMenu uiLanguage="nl" tone="brand" />}
            />
            {children}
        </BrandShell>
    );
}
