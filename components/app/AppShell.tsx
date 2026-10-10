import type { ReactNode } from 'react';
import { getCurrentUser } from '@/lib/auth';
import { AppFrame, type AppSection } from '@/components/app/AppFrame';

export default async function AppShell({ active, children }: { active: AppSection; children: ReactNode }) {
    const user = await getCurrentUser();
    return (
        <AppFrame active={active} email={user?.email || ''}>
            {children}
        </AppFrame>
    );
}
