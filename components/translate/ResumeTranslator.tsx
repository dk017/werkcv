'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type TranslateResult = {
  cvId: string;
  templateId: string;
  colorThemeId: string;
  data: {
    personal: {
      name: string;
      title: string;
      summary: string;
    };
  };
};

const translatorPath = '/en/guides/translate-resume-to-dutch-format';

export default function ResumeTranslator() {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [result, setResult] = useState<TranslateResult | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleFile = async (file: File) => {
    if (!file) return;

    setError('');
    setStatus('uploading');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/translate-resume', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 401) {
        const next = encodeURIComponent(translatorPath);
        router.push(`/login?next=${next}`);
        return;
      }

      const payload = await response.json();

      if (!response.ok) {
        setError(payload?.error || 'Something went wrong. Try again.');
        setStatus('idle');
        return;
      }

      setResult(payload);
      setStatus('success');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (fetchError) {
      console.error('Translate resume upload failed:', fetchError);
      setError('Unable to reach the translator. Please try again.');
      setStatus('idle');
    }
  };

  return (
    <section className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-2">Resume translator</p>
        <h2 className="text-2xl font-black text-gray-900">Translate your current resume into Dutch format</h2>
        <p className="text-sm text-slate-600 mt-2">
          Upload a PDF and WerkCV will parse the sections, keep the original language, and reorganize the
          entire resume into the Dutch format that works with our templates.
        </p>
      </div>

      <div className="space-y-4">
        <label className="block border-2 border-dashed border-slate-400 p-4 text-center rounded-md cursor-pointer">
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                handleFile(file);
              }
            }}
          />
          <span className="text-sm text-slate-500">Click to upload PDF (max 10MB)</span>
        </label>
        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
          <span>✅ PDF only</span>
          <span>✅ Reformatted in seconds</span>
          <span>✅ Saves as a regular CV</span>
        </div>
      </div>

      {status === 'uploading' && (
        <p className="text-sm text-slate-600">Parsing your PDF… hang tight for a few seconds.</p>
      )}

      {error && <p className="text-sm text-red-600">Error: {error}</p>}

      {result && (
        <div className="bg-slate-50 border-2 border-slate-200 p-4 rounded-md space-y-3">
          <h3 className="text-lg font-black text-slate-900">Translation ready</h3>
          {result.data.personal.summary && (
            <p className="text-sm text-slate-700">{result.data.personal.summary}</p>
          )}
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/editor?id=${encodeURIComponent(result.cvId)}`}
              className="px-4 py-2 bg-black text-white font-bold text-sm border-3 border-black"
            >
              Open translated CV
            </Link>
            <Link
              href="/templates"
              className="px-4 py-2 bg-white text-black font-bold text-sm border-3 border-black"
            >
              Choose a different template
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
