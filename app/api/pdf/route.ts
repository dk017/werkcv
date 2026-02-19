import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generatePDF } from '@/lib/pdf';
import { CVData } from '@/lib/cv';
import { getCurrentUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
    const user = await getCurrentUserFromRequest(request);
    if (!user) {
        return NextResponse.json(
            { error: 'Authentication required', code: 'AUTH_REQUIRED' },
            { status: 401 }
        );
    }

    const cvId = request.nextUrl.searchParams.get('cvId');

    if (!cvId) {
        return NextResponse.json(
            { error: 'cvId is required' },
            { status: 400 }
        );
    }

    // Fetch CV document
    const cv = await prisma.cVDocument.findFirst({
        where: { id: cvId, userId: user.id },
    });

    if (!cv) {
        return NextResponse.json(
            { error: 'CV not found' },
            { status: 404 }
        );
    }

    // Payment gate — enabled via PAYMENT_ENABLED=true env var
    const paymentEnabled = process.env.PAYMENT_ENABLED === 'true';
    if (paymentEnabled) {
        const order = await prisma.order.findFirst({
            where: {
                cvId: cvId,
                paidAt: { not: null },
            },
        });

        if (!order) {
            return NextResponse.json(
                { error: 'Payment required', code: 'PAYMENT_REQUIRED' },
                { status: 402 }
            );
        }
    }

    // Generate PDF with template and color theme
    let pdfBuffer: Buffer;
    try {
        pdfBuffer = await generatePDF(
            cv.data as CVData,
            cv.templateId,
            cv.colorThemeId ?? 'classic-blue'
        );
    } catch (error) {
        console.error('PDF generation failed:', error);
        return NextResponse.json(
            { error: 'PDF generation failed', code: 'PDF_ERROR' },
            { status: 500 }
        );
    }

    // Create filename from CV name or default
    // Unicode-safe: keep letters (including diacritics like ë, ü, ö), numbers, hyphens, underscores, spaces
    // Only strip control characters, path separators, and special filesystem chars
    const cvData = cv.data as CVData;
    const name = cvData.personal?.name || 'cv';
    const safeName = name.replace(/[<>:"/\\|?*\x00-\x1F]/g, '').trim() || 'cv';
    const filename = `${safeName}-cv.pdf`;

    return new NextResponse(new Uint8Array(pdfBuffer), {
        status: 200,
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${filename}"`,
        },
    });
}
