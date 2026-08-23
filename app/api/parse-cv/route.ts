import { NextRequest, NextResponse } from 'next/server';
import { parseCV } from '@/lib/cv-parser';
import { getCvParsePublicMessage, recordCvParseFailure } from '@/lib/cv-upload-observability';
import { sanitizeAttribution } from '@/lib/attribution';
import { Prisma } from '@prisma/client';
import { getCurrentUserFromRequest } from '@/lib/auth';
import { createPersonalCvDocument } from '@/lib/workspace/cv-document-service';

export async function POST(request: NextRequest) {
    let file: File | null = null;
    let userId: string | null = null;
    let stage = 'auth';

    try {
        const user = await getCurrentUserFromRequest(request);
        if (!user) {
            return NextResponse.json(
                { error: 'Authentication required', code: 'AUTH_REQUIRED' },
                { status: 401 }
            );
        }
        userId = user.id;

        stage = 'read_form_data';
        const formData = await request.formData();
        file = formData.get('file') as File | null;
        const attributionRaw = formData.get('attribution');
        let attribution = null;
        if (typeof attributionRaw === 'string') {
            try {
                attribution = sanitizeAttribution(JSON.parse(attributionRaw));
            } catch {
                attribution = null;
            }
        }

        if (!file) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/msword',
        ];

        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Invalid file type. Please upload a PDF or Word document.' },
                { status: 400 }
            );
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'File too large. Maximum size is 10MB.' },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Parse CV
        stage = 'parse_cv';
        const cvData = await parseCV(buffer, file.name);

        // Create CV document in database
        stage = 'create_cv_document';
        const baseData = {
            title: cvData.personal.name ? `CV - ${cvData.personal.name}` : 'Geüpload CV',
            data: cvData,
            templateId: 'professional',
        };

        const cv = await createPersonalCvDocument(user.id, {
            ...baseData,
            attribution: attribution as unknown as Prisma.InputJsonValue | undefined,
            sourceCluster: attribution?.firstTouchCluster || null,
            sourceLocale: attribution?.locale || null,
            startSource: 'home_upload',
        } as Omit<Prisma.CVDocumentUncheckedCreateInput, 'userId' | 'agencySubscriptionId'>);

        return NextResponse.json({
            success: true,
            cvId: cv.id,
            message: 'CV successfully parsed',
        });

    } catch (error) {
        console.error('CV parse error:', { stage, userId, fileName: file?.name, error });
        await recordCvParseFailure({
            route: '/api/parse-cv',
            stage,
            userId,
            file,
            error,
        });

        const locale = request.headers.get('referer')?.includes('/en/') ? 'en' : 'nl';
        const message = getCvParsePublicMessage(error, locale);

        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}
