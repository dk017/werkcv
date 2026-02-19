import OpenAI from 'openai';
import mammoth from 'mammoth';
import { CVData, cvSchema } from './cv';

// pdfjs-dist types
type PDFDocumentProxy = {
    numPages: number;
    getPage(pageNumber: number): Promise<PDFPageProxy>;
};

type PDFPageProxy = {
    getTextContent(): Promise<{ items: Array<{ str?: string }> }>;
};

type GetDocumentParams = {
    data: Uint8Array;
    useWorkerFetch?: boolean;
    isEvalSupported?: boolean;
    useSystemFonts?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pdfjs: any = null;

async function getPdfjs() {
    if (!pdfjs) {
        pdfjs = await import('pdfjs-dist/legacy/build/pdf.js');
        // Disable worker for server-side usage
        pdfjs.GlobalWorkerOptions.workerSrc = '';
    }
    return pdfjs;
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
    const pdfjsLib = await getPdfjs();
    const data = new Uint8Array(buffer);
    const pdf: PDFDocumentProxy = await pdfjsLib.getDocument({
        data,
        useWorkerFetch: false,
        isEvalSupported: false,
        useSystemFonts: true
    } as GetDocumentParams).promise;

    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
        const page: PDFPageProxy = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
            .map((item) => (item.str || ''))
            .join(' ');
        text += pageText + '\n';
    }

    return text;
}

export async function extractTextFromDOCX(buffer: Buffer): Promise<string> {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
}

export async function extractTextFromFile(buffer: Buffer, filename: string): Promise<string> {
    const ext = filename.toLowerCase().split('.').pop();

    if (ext === 'pdf') {
        return extractTextFromPDF(buffer);
    } else if (ext === 'docx' || ext === 'doc') {
        return extractTextFromDOCX(buffer);
    } else {
        throw new Error(`Unsupported file type: ${ext}`);
    }
}

export async function parseCVWithAI(text: string): Promise<CVData> {
    const systemPrompt = `You are a CV parser. Extract structured data from CV text and return ONLY valid JSON.

CRITICAL: Capture ALL information from the CV. Do not summarize or truncate. Include EVERY bullet point, tech stack detail, and achievement.

The output format must exactly follow this schema:
{
  "personal": {
    "name": "full name",
    "title": "current/desired job title",
    "email": "email address",
    "phone": "phone number",
    "location": "city/town",
    "address": "full address/street",
    "postalCode": "postal code and city",
    "summary": "professional summary or profile - INCLUDE FULL TEXT",
    "birthDate": "date of birth",
    "birthPlace": "place of birth",
    "nationality": "nationality",
    "driversLicense": "driver's license type",
    "gender": "gender (Male/Female/Other)",
    "maritalStatus": "marital status",
    "linkedIn": "LinkedIn URL",
    "github": "GitHub URL",
    "website": "website URL"
  },
  "experience": [
    {
      "role": "job title",
      "company": "company name",
      "location": "location",
      "start": "start date (e.g., jun 2024)",
      "end": "end date or 'present'",
      "description": "brief description combining job context and any tech stack mentioned",
      "highlights": ["EVERY bullet point as a separate item", "Include ALL achievements", "Include tech stack details"]
    }
  ],
  "education": [
    {
      "degree": "degree/diploma",
      "school": "educational institution",
      "location": "location",
      "start": "start year",
      "end": "end year",
      "description": "description including CGPA, relevant coursework, projects"
    }
  ],
  "skills": [
    { "name": "skill name", "level": 3 }
  ],
  "languages": [
    { "name": "Language", "level": "Fluent" }
  ],
  "internships": [
    {
      "role": "internship role",
      "company": "company name",
      "location": "location",
      "start": "start date",
      "end": "end date",
      "description": "description",
      "highlights": []
    }
  ],
  "interests": ["interest1", "interest2"],
  "courses": [
    {
      "name": "course name",
      "institution": "institution",
      "year": "year"
    }
  ],
  "awards": ["award or achievement 1", "award or achievement 2"]
}

CRITICAL RULES:
- Return ONLY the JSON, no other text
- Use empty strings "" for missing fields
- Use empty arrays [] if there are no items
- Convert dates to readable format (e.g., "jun 2024", "2018")
- IMPORTANT: Preserve the ORIGINAL LANGUAGE of the CV. Do NOT translate. If CV is in English, keep English. If in Dutch, keep Dutch.
- For skills: Extract ALL skills mentioned including in "Technologies & Tools" sections. Level is 1-5 (1=basic, 3=good, 5=expert). For technical skills from experienced professionals, default to level 4-5.
- For languages: level must be "Native", "Fluent", "Good", or "Basic" (English) OR "Moedertaal", "Vloeiend", "Goed", or "Basis" (Dutch)
- For experience: capture EVERY bullet point in highlights array. Include tech stack info in description.
- For awards: Extract from "Awards", "Certificates", "Achievements", "Honors" sections
- Internships separate from work experience
- github: Extract GitHub profile URL if present`;

    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Parse dit CV:\n\n${text}` }
        ],
        temperature: 0.1,
        response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
        throw new Error('No response from AI');
    }

    const parsed = JSON.parse(content);

    // Validate and provide defaults
    const result = cvSchema.safeParse(parsed);
    if (!result.success) {
        console.error('CV parsing validation errors:', result.error);
        // Return parsed data anyway, schema defaults will fill gaps
        return cvSchema.parse({
            personal: parsed.personal || {},
            experience: parsed.experience || [],
            education: parsed.education || [],
            skills: parsed.skills || [],
            languages: parsed.languages || [],
            internships: parsed.internships || [],
            interests: parsed.interests || [],
            courses: parsed.courses || [],
            awards: parsed.awards || [],
        });
    }

    return result.data;
}

export async function parseCV(buffer: Buffer, filename: string): Promise<CVData> {
    const text = await extractTextFromFile(buffer, filename);

    if (!text.trim()) {
        throw new Error('Could not extract text from file');
    }

    return parseCVWithAI(text);
}
