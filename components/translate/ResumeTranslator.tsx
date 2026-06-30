'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getStoredAttribution } from '@/lib/analytics';

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
const resumeUploadPath = `${translatorPath}?resumeUpload=continue#resume-translator`;

export default function ResumeTranslator() {
  const [status, setStatus] = useState<'idle' | 'checking-auth' | 'uploading' | 'success'>('idle');
  const [result, setResult] = useState<TranslateResult | null>(null);
  const [error, setError] = useState('');
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get('resumeUpload') !== 'continue') return;

    setShowResumePrompt(true);
    url.searchParams.delete('resumeUpload');
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  }, []);

  const redirectToLogin = () => {
    setStatus('idle');
    router.push(`/login?next=${encodeURIComponent(resumeUploadPath)}`);
  };

  const requestFileSelection = async () => {
    if (status === 'checking-auth' || status === 'uploading') return;

    setError('');
    setStatus('checking-auth');

    try {
      const response = await fetch('/api/auth/me', { cache: 'no-store' });
      if (response.status === 401) {
        redirectToLogin();
        return;
      }
      if (!response.ok) {
        throw new Error('Unable to verify authentication');
      }

      setStatus('idle');
      fileInputRef.current?.click();
    } catch {
      setStatus('idle');
      setError('Unable to verify your sign-in. Please try again.');
    }
  };

  const handleFile = async (file: File) => {
    if (!file) return;

    setError('');
    setShowResumePrompt(false);
    setStatus('uploading');

    const formData = new FormData();
    formData.append('file', file);
    const attribution = getStoredAttribution();
    if (attribution) {
      formData.append('attribution', JSON.stringify(attribution));
    }

    try {
      const response = await fetch('/api/translate-resume', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 401) {
        redirectToLogin();
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
    <section
      id="resume-translator"
      className="scroll-mt-6 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 space-y-6"
    >
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-2">Resume translator</p>
        <h2 className="text-2xl font-black text-gray-900">Translate your current resume into Dutch format</h2>
        <p className="text-sm text-slate-600 mt-2">
          Upload a PDF and WerkCV will parse the sections, keep the original language, and reorganize the
          entire resume into the Dutch format that works with our templates.
        </p>
      </div>

      {showResumePrompt ? (
        <div role="status" className="border-2 border-emerald-700 bg-emerald-50 p-4 text-emerald-950">
          <p className="font-black">You’re signed in. Select your PDF to continue.</p>
          <p className="mt-1 text-sm">
            For security, files must be selected after sign-in. Choose your PDF now and we’ll continue
            immediately.
          </p>
        </div>
      ) : null}

      <div className="space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              handleFile(file);
            }
          }}
        />
        <button
          type="button"
          onClick={requestFileSelection}
          disabled={status === 'checking-auth' || status === 'uploading'}
          className="block w-full rounded-md border-2 border-dashed border-slate-400 p-4 text-center text-sm font-bold text-slate-700 transition-colors hover:border-black hover:bg-slate-50 disabled:cursor-wait disabled:bg-slate-100 disabled:text-slate-500"
        >
          {status === 'checking-auth'
            ? 'Checking sign-in...'
            : status === 'uploading'
              ? 'Processing your PDF...'
              : showResumePrompt
                ? 'Select PDF to continue'
                : 'Select PDF to translate (max 10MB)'}
        </button>
        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
          <span>PDF only</span>
          <span>Reformatted in seconds</span>
          <span>Saves as a regular CV</span>
        </div>
      </div>

      {status === 'uploading' ? (
        <p className="text-sm text-slate-600">Parsing your PDF… hang tight for a few seconds.</p>
      ) : null}

      {error ? <p role="alert" className="text-sm text-red-600">Error: {error}</p> : null}

      {result ? (
        <div className="bg-slate-50 border-2 border-slate-200 p-4 rounded-md space-y-3">
          <h3 className="text-lg font-black text-slate-900">Translation ready</h3>
          {result.data.personal.summary ? (
            <p className="text-sm text-slate-700">{result.data.personal.summary}</p>
          ) : null}
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/en/editor?id=${encodeURIComponent(result.cvId)}`}
              className="px-4 py-2 bg-black text-white font-bold text-sm border-3 border-black"
            >
              Open translated CV
            </Link>
            <Link
              href="/en/templates"
              className="px-4 py-2 bg-white text-black font-bold text-sm border-3 border-black"
            >
              Choose a different template
            </Link>
          </div>
        </div>
      ) : null}
    </section>
  );
}
