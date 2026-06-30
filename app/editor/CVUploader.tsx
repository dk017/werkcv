"use client";

import { useState, useRef, useCallback } from "react";
import { CVData } from "@/lib/cv";
import { UiLanguage } from "@/lib/ui-language";
import { track, type CvUploadSource } from "@/lib/analytics";

interface CVUploaderProps {
  cvId: string;
  source: CvUploadSource;
  onParsed: (data: CVData) => void;
  onClose: () => void;
  uiLanguage?: UiLanguage;
}

type UploadFileType = "pdf" | "doc" | "docx";

function getUploadFileType(file: File): UploadFileType | null {
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (file.type === "application/pdf" || extension === "pdf") return "pdf";
  if (file.type === "application/msword" || extension === "doc") return "doc";
  if (
    file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    || extension === "docx"
  ) {
    return "docx";
  }
  return null;
}

function getSizeBucket(size: number): "under_1mb" | "1_to_5mb" | "5_to_10mb" | "over_10mb" {
  if (size < 1024 * 1024) return "under_1mb";
  if (size < 5 * 1024 * 1024) return "1_to_5mb";
  if (size <= 10 * 1024 * 1024) return "5_to_10mb";
  return "over_10mb";
}

export default function CVUploader({
  cvId,
  source,
  onParsed,
  onClose,
  uiLanguage = "nl",
}: CVUploaderProps) {
  const isEnglish = uiLanguage === "en";
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      const fileType = getUploadFileType(file);
      if (!fileType) {
        track("cv_upload_failed", {
          cvId,
          source,
          uiLanguage,
          fileType: "unknown",
          reason: "invalid_type",
        });
        setError(
          isEnglish
            ? "Invalid file type. Upload a PDF or Word document."
            : "Ongeldig bestandstype. Upload een PDF of Word document.",
        );
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        track("cv_upload_failed", {
          cvId,
          source,
          uiLanguage,
          fileType,
          reason: "too_large",
        });
        setError(
          isEnglish
            ? "File is too large. Maximum size is 10MB."
            : "Bestand is te groot. Maximale grootte is 10MB.",
        );
        return;
      }

      setError(null);
      setIsUploading(true);
      setProgress(isEnglish ? "Uploading file..." : "Bestand wordt geüpload...");
      const startedAt = Date.now();
      track("cv_upload_started", {
        cvId,
        source,
        uiLanguage,
        fileType,
        sizeBucket: getSizeBucket(file.size),
      });

      try {
        const formData = new FormData();
        formData.append("file", file);

        setProgress(
          isEnglish ? "Analyzing CV with AI..." : "CV wordt geanalyseerd met AI...",
        );

        const response = await fetch("/api/parse-cv-only", {
          method: "POST",
          body: formData,
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
          track("cv_upload_failed", {
            cvId,
            source,
            uiLanguage,
            fileType,
            reason: "parse_error",
          });
          setError(
            result.error ||
            (isEnglish
              ? "Something went wrong while processing the file."
              : "Er ging iets mis bij het verwerken"),
          );
          return;
        }

        setProgress(
          isEnglish ? "Filling in your data..." : "Gegevens worden ingevuld...",
        );

        await new Promise((resolve) => setTimeout(resolve, 500));

        track("cv_upload_completed", {
          cvId,
          source,
          uiLanguage,
          fileType,
          durationMs: Date.now() - startedAt,
        });
        onParsed(result.data);
      } catch (err) {
        track("cv_upload_failed", {
          cvId,
          source,
          uiLanguage,
          fileType,
          reason: "network_error",
        });
        setError(
          err instanceof Error
            ? err.message
            : isEnglish
              ? "Something went wrong."
              : "Er ging iets mis",
        );
      } finally {
        setIsUploading(false);
        setProgress("");
      }
    },
    [cvId, isEnglish, onParsed, source, uiLanguage],
  );

  const handleClose = useCallback(() => {
    track("cv_upload_cancelled", {
      cvId,
      source,
      uiLanguage,
      hadError: Boolean(error),
    });
    onClose();
  }, [cvId, error, onClose, source, uiLanguage]);

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setIsDragging(false);

      const file = event.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile],
  );

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile],
  );

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/55 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-950">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.25}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </span>
              {isEnglish ? "Upload your current CV" : "Upload je huidige CV"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {isEnglish
                ? "We will extract the details so you can review and edit them."
                : "We halen de gegevens eruit, zodat je ze kunt controleren en aanpassen."}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={isUploading}
            aria-label={isEnglish ? "Close CV upload" : "CV-upload sluiten"}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50"
          >
            ×
          </button>
        </div>

        <div className="p-5 sm:p-6">
          {isUploading ? (
            <div className="py-8 text-center" role="status" aria-live="polite">
              <div className="mb-4 inline-block h-11 w-11 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600" />
              <p className="font-semibold text-slate-950">{progress}</p>
              <p className="mt-2 text-sm text-slate-500">
                {isEnglish
                  ? "Keep this window open. This usually takes a few seconds."
                  : "Laat dit venster open. Dit duurt meestal enkele seconden."}
              </p>
            </div>
          ) : (
            <>
              <div
                role="button"
                tabIndex={0}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`cursor-pointer rounded-lg border-2 border-dashed p-7 text-center outline-none transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${
                  isDragging
                    ? "border-teal-500 bg-teal-50"
                    : "border-slate-300 bg-slate-50 hover:border-teal-400 hover:bg-teal-50/60"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleInputChange}
                  className="hidden"
                />

                <div className="flex flex-col items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
                      isDragging ? "bg-teal-200 text-teal-800" : "bg-white text-slate-600 shadow-sm"
                    }`}
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-base font-bold text-slate-950">
                      {isDragging
                        ? isEnglish
                          ? "Drop your CV here"
                          : "Laat je CV hier los"
                        : isEnglish
                          ? "Choose a CV or drag it here"
                          : "Kies een CV of sleep het hierheen"}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-teal-700 underline underline-offset-2">
                      {isEnglish ? "Browse files" : "Bestand kiezen"}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500">
                    {isEnglish
                      ? "PDF or Word · Maximum 10MB · Dutch or English"
                      : "PDF of Word · Maximaal 10MB · Nederlands of Engels"}
                  </p>
                </div>
              </div>

              {error && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
                  <span className="font-bold">
                    {isEnglish ? "Upload failed:" : "Upload mislukt:"}
                  </span>{" "}
                  {error}
                </div>
              )}

              <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-sm leading-relaxed text-slate-600">
                  <span className="font-semibold text-slate-900">
                    {isEnglish ? "You stay in control." : "Jij houdt de controle."}
                  </span>{" "}
                  {isEnglish
                    ? "AI fills the editor from your document. Review every field and change anything before downloading."
                    : "AI vult de editor vanuit je document. Controleer elk veld en pas alles aan voordat je downloadt."}
                </p>
              </div>
            </>
          )}
        </div>

        {!isUploading && (
          <div className="flex justify-end border-t border-slate-200 bg-slate-50 px-5 py-3 sm:px-6">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              {isEnglish ? "Cancel" : "Annuleren"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
