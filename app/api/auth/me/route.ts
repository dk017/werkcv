import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUserFromRequest } from '@/lib/auth';
import { getWorkspaceEntitlementsForUser, isWorkspaceSwitcherEnabled } from '@/lib/workspace/entitlements';

export async function GET(request: NextRequest) {
    const user = await getCurrentUserFromRequest(request);
    if (!user) return NextResponse.json({ authenticated: false }, {
        status: 401,
        headers: { 'Cache-Control': 'private, no-store' },
    });
    const workspaces = await getWorkspaceEntitlementsForUser(user.id);
    return NextResponse.json({
        authenticated: true,
        user: {
            id: user.id,
            email: user.email,
        },
        workspaces,
        workspaceSwitcherEnabled: isWorkspaceSwitcherEnabled(workspaces),
    }, {
        headers: { 'Cache-Control': 'private, no-store' },
    });
}
