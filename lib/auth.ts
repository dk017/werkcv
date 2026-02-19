import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const SESSION_COOKIE_NAME = 'werkcv_session';
const LOGIN_CODE_TTL_MINUTES = 15;
const SESSION_TTL_DAYS = 30;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getAuthSecret(): string {
    return process.env.AUTH_SESSION_SECRET || 'dev-auth-secret-change-me';
}

function hashValue(value: string): string {
    return crypto
        .createHash('sha256')
        .update(`${getAuthSecret()}:${value}`)
        .digest('hex');
}

function generateCode(): string {
    return String(Math.floor(100000 + Math.random() * 900000));
}

function normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
}

function getEmailTransporter() {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!host || !user || !pass) return null;

    return nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
    });
}

export function isValidEmail(email: string): boolean {
    return emailRegex.test(email);
}

export async function requestEmailLoginCode(emailInput: string): Promise<{ devCode?: string }> {
    const email = normalizeEmail(emailInput);
    if (!isValidEmail(email)) {
        throw new Error('INVALID_EMAIL');
    }

    const code = generateCode();
    const codeHash = hashValue(code);
    const expiresAt = new Date(Date.now() + LOGIN_CODE_TTL_MINUTES * 60 * 1000);

    await prisma.loginCode.create({
        data: {
            email,
            codeHash,
            expiresAt,
        },
    });

    const transporter = getEmailTransporter();
    const from = process.env.AUTH_FROM_EMAIL || process.env.SMTP_USER || 'noreply@werkcv.nl';
    if (transporter) {
        await transporter.sendMail({
            from,
            to: email,
            subject: 'WerkCV login code',
            text: `Je login code is ${code}. Deze code verloopt over ${LOGIN_CODE_TTL_MINUTES} minuten.`,
            html: `<p>Je login code is <strong>${code}</strong>.</p><p>Deze code verloopt over ${LOGIN_CODE_TTL_MINUTES} minuten.</p>`,
        });
        return {};
    }

    console.log(`auth_dev_code ${email} ${code}`);
    if (process.env.NODE_ENV !== 'production') {
        return { devCode: code };
    }
    return {};
}

export async function verifyEmailLoginCode(emailInput: string, codeInput: string): Promise<{ token: string; userId: string } | null> {
    const email = normalizeEmail(emailInput);
    const code = codeInput.trim();
    if (!isValidEmail(email) || !/^\d{6}$/.test(code)) return null;

    const now = new Date();
    const record = await prisma.loginCode.findFirst({
        where: {
            email,
            usedAt: null,
            expiresAt: { gt: now },
        },
        orderBy: { createdAt: 'desc' },
    });

    if (!record) return null;
    if (record.codeHash !== hashValue(code)) return null;

    const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: { email },
    });

    await prisma.loginCode.update({
        where: { id: record.id },
        data: { usedAt: now },
    });

    const token = crypto.randomBytes(32).toString('hex');
    await prisma.session.create({
        data: {
            tokenHash: hashValue(token),
            userId: user.id,
            expiresAt: new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000),
        },
    });

    return { token, userId: user.id };
}

export function applySessionCookie(response: NextResponse, token: string) {
    response.cookies.set({
        name: SESSION_COOKIE_NAME,
        value: token,
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: SESSION_TTL_DAYS * 24 * 60 * 60,
    });
}

export function clearSessionCookie(response: NextResponse) {
    response.cookies.set({
        name: SESSION_COOKIE_NAME,
        value: '',
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 0,
    });
}

async function findSessionByToken(token: string) {
    const tokenHash = hashValue(token);
    const now = new Date();
    const session = await prisma.session.findUnique({
        where: { tokenHash },
        include: { user: true },
    });
    if (!session) return null;
    if (session.expiresAt <= now) return null;
    return session;
}

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;
    const session = await findSessionByToken(token);
    return session?.user ?? null;
}

export async function getCurrentUserFromRequest(request: NextRequest) {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;
    const session = await findSessionByToken(token);
    return session?.user ?? null;
}

export async function deleteCurrentSession(request: NextRequest) {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return;
    const tokenHash = hashValue(token);
    await prisma.session.deleteMany({ where: { tokenHash } });
}
