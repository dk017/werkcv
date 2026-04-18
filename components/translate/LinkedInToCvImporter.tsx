'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getStoredAttribution, track } from '@/lib/analytics';
import { UiLanguage } from '@/lib/ui-language';

type ImportMode = 'text' | 'pdf';

type ImportResult = {
  cvId: string;
  editorPath: string;
  documentLanguage: 'nl' | 'en';
  data: {
    personal: {
      name: string;
      title: string;
      summary: string;
    };
  };
};

interface LinkedInToCvImporterProps {
  uiLanguage?: UiLanguage;
  sourcePath: string;
}

export default function LinkedInToCvImporter({
  uiLanguage = 'en',
  sourcePath,
}: LinkedInToCvImporterProps) {
  const isEnglish = uiLanguage === 'en';
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [mode, setMode] = useState<ImportMode>('text');
  const [profileText, setProfileText] = useState('');
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [error, setError] = useState('');
  const [result, setResult] = useState<ImportResult | null>(null);

  const tr = (dutch: string, english: string) => (isEnglish ? english : dutch);
  const nextPath = encodeURIComponent(sourcePath);

  const submitImport = async ({
    inputMode,
    file,
    text,
  }: {
    inputMode: ImportMode;
    file?: File;
    text?: string;
  }) => {
    setError('');
    setStatus('uploading');

    const formData = new FormData();
    const attribution = getStoredAttribution();
    if (attribution) {
      formData.append('attribution', JSON.stringify(attribution));
    }

    if (inputMode === 'text') {
      formData.append('profileText', text || '');
    } else if (file) {
      formData.append('file', file);
    }

    track('cta_clicked', {
      location: sourcePath,
      label: inputMode === 'text' ? 'linkedin_import_text' : 'linkedin_import_pdf',
    });

    try {
      const response = await fetch('/api/linkedin-to-cv', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 401) {
        router.push(`/login?next=${nextPath}`);
        return;
      }

      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        setError(payload?.error || tr('Import mislukt. Probeer het opnieuw.', 'Import failed. Please try again.'));
        setStatus('idle');
        return;
      }

      if (inputMode === 'pdf') {
        track('cv_uploaded', { fileType: 'linkedin_pdf' });
      }
      track('start_cv', {
        entryPoint: inputMode === 'text' ? 'linkedin_import_text' : 'linkedin_import_pdf',
        cvId: payload.cvId,
      });

      setResult(payload as ImportResult);
      setStatus('success');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (fetchError) {
      console.error('LinkedIn import failed:', fetchError);
      setError(
        tr(
          'De LinkedIn-import kon niet worden bereikt. Probeer het opnieuw.',
          'The LinkedIn importer could not be reached. Please try again.',
        )
      );
      setStatus('idle');
    }
  };

  return (
    <section className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
      <div>
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-slate-500">
          {tr('LinkedIn import', 'LinkedIn import')}
        </p>
        <h2 className="text-2xl font-black text-gray-900">
          {tr(
            'Zet je LinkedIn-profiel om naar een Nederlands CV-format',
            'Turn your LinkedIn profile into a Dutch-format CV',
          )}
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          {tr(
            'Plak je profieltekst of upload je LinkedIn-PDF. WerkCV houdt de brontaal vast, zet je inhoud in Nederlandse CV-structuur en opent daarna automatisch de juiste editor.',
            'Paste your profile text or upload your LinkedIn PDF export. WerkCV keeps the source language, rewrites the structure for Dutch applications, and then opens the right editor automatically.',
          )}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setMode('text')}
          className={`border-2 border-black px-4 py-2 text-sm font-black ${
            mode === 'text' ? 'bg-black text-white' : 'bg-white text-black'
          }`}
        >
          {tr('Profieltekst plakken', 'Paste profile text')}
        </button>
        <button
          type="button"
          onClick={() => setMode('pdf')}
          className={`border-2 border-black px-4 py-2 text-sm font-black ${
            mode === 'pdf' ? 'bg-black text-white' : 'bg-white text-black'
          }`}
        >
          {tr('LinkedIn-PDF uploaden', 'Upload LinkedIn PDF')}
        </button>
      </div>

      {mode === 'text' ? (
        <div className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-800">
              {tr('Plak je LinkedIn-profieltekst', 'Paste your LinkedIn profile text')}
            </span>
            <textarea
              value={profileText}
              onChange={(event) => setProfileText(event.target.value)}
              placeholder={tr(
                'Kopieer je kopregel, About, werkervaring, opleidingen en skills uit LinkedIn en plak ze hier.',
                'Copy your headline, About, experience, education, and skills from LinkedIn and paste them here.',
              )}
              className="min-h-[220px] w-full border-2 border-black p-4 text-sm text-slate-800 outline-none"
            />
          </label>

          <button
            type="button"
            disabled={status === 'uploading' || !profileText.trim()}
            onClick={() => submitImport({ inputMode: 'text', text: profileText })}
            className="border-2 border-black bg-yellow-400 px-5 py-3 text-sm font-black text-black disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
          >
            {status === 'uploading'
              ? tr('Bezig met importeren...', 'Importing...')
              : tr('Maak CV van profieltekst', 'Create CV from profile text')}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-md border-2 border-dashed border-slate-400 p-4">
            <p className="text-sm font-bold text-slate-800">
              {tr('Zo exporteer je je LinkedIn-profiel als PDF', 'How to export your LinkedIn profile as a PDF')}
            </p>
            <ol className="mt-3 space-y-2 text-sm text-slate-600">
              <li>{tr('1. Open je LinkedIn-profiel.', '1. Open your LinkedIn profile.')}</li>
              <li>{tr('2. Klik op Meer of de drie puntjes bij je profiel.', '2. Click More or the three dots on your profile.')}</li>
              <li>{tr('3. Kies Profiel opslaan als PDF.', '3. Choose Save to PDF.')}</li>
              <li>{tr('4. Zie je die optie niet? Gebruik dan de tekst-plakoptie hierboven.', '4. If you do not see that option, use the paste-text option instead.')}</li>
            </ol>
          </div>

          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  submitImport({ inputMode: 'pdf', file });
                }
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={status === 'uploading'}
              className="border-2 border-black bg-slate-900 px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {status === 'uploading'
                ? tr('PDF wordt verwerkt...', 'Processing PDF...')
                : tr('Kies LinkedIn-PDF', 'Choose LinkedIn PDF')}
            </button>
            <p className="text-xs text-slate-500">
              {tr('Alleen PDF, maximaal 10MB.', 'PDF only, maximum 10MB.')}
            </p>
          </div>
        </div>
      )}

      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

      {result && (
        <div className="space-y-3 border-2 border-slate-200 bg-slate-50 p-4">
          <h3 className="text-lg font-black text-slate-900">
            {tr('Import klaar', 'Import ready')}
          </h3>
          {(result.data.personal.name || result.data.personal.title) && (
            <p className="text-sm text-slate-700">
              {[result.data.personal.name, result.data.personal.title].filter(Boolean).join(' • ')}
            </p>
          )}
          {result.data.personal.summary && (
            <p className="text-sm text-slate-700">{result.data.personal.summary}</p>
          )}
          <div className="flex flex-wrap gap-3">
            <Link
              href={result.editorPath}
              className="border-2 border-black bg-black px-4 py-2 text-sm font-black text-white"
            >
              {tr(
                result.documentLanguage === 'en' ? 'Open Engelse editor' : 'Open editor',
                result.documentLanguage === 'en' ? 'Open English editor' : 'Open Dutch editor',
              )}
            </Link>
            <Link
              href={result.documentLanguage === 'en' ? '/en/templates' : '/templates'}
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              {tr('Bekijk templates', 'Browse templates')}
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
