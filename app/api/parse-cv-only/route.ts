import { NextRequest, NextResponse } from 'next/server';
import { parseCV } from '@/lib/cv-parser';
import { getCurrentUserFromRequest } from '@/lib/auth';

/**
 * API endpoint that parses a CV file and returns the structured data
 * WITHOUT saving to the database. Used by the editor upload feature.
 */
export async function POST(request: NextRequest) {
    try {
        if (!(await getCurrentUserFromRequest(request))) {
            return NextResponse.json(
                { error: 'Authentication required', code: 'AUTH_REQUIRED' },
                { status: 401 }
            );
        }

        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json(
                { error: 'Geen bestand geüpload' },
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
                { error: 'Ongeldig bestandstype. Upload een PDF of Word document.' },
                { status: 400 }
            );
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'Bestand is te groot. Maximale grootte is 10MB.' },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Parse CV with OpenAI
        const cvData = await parseCV(buffer, file.name);

        return NextResponse.json({
            success: true,
            data: cvData,
            message: 'CV succesvol verwerkt',
        });

    } catch (error) {
        console.error('CV parse error:', error);

        const message = error instanceof Error ? error.message : 'Kon CV niet verwerken';

        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}
