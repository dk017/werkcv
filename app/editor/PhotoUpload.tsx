"use client";

import { useState, useRef, useCallback, type CSSProperties } from "react";
import { track } from "@/lib/analytics";
import { UiLanguage } from "@/lib/ui-language";

interface PhotoUploadProps {
  currentPhoto: string;
  onPhotoChange: (base64: string) => void;
  uiLanguage?: UiLanguage;
  /** "steps": the app v2 stepped editor look (brand tokens from .werkcv-brand). */
  variant?: "classic" | "steps";
}

// The classic strings are the original ones, unchanged.
const PHOTO_STYLES = {
  classic: {
    box: "relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden border-3 border-black transition-all group sm:h-28 sm:w-28",
    boxDragging: "border-dashed bg-yellow-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
    boxPhoto: "bg-gray-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
    boxEmpty: "bg-gray-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-gray-200 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
    boxStyle: { borderWidth: "3px" } as CSSProperties | undefined,
    remove: "absolute -right-1.5 -top-1.5 z-10 flex h-6 w-6 items-center justify-center border-2 border-black bg-red-400 text-xs font-black text-black opacity-0 transition-opacity hover:bg-red-500 group-hover:opacity-100",
    plusIcon: "h-6 w-6 text-gray-400 transition-colors group-hover:text-gray-600",
    plusLabel: "text-center text-[10px] font-bold leading-tight text-gray-500",
    error: "max-w-[7rem] text-center text-[10px] font-bold text-red-600 sm:text-left",
    editCrop: "text-[10px] font-bold text-gray-700 underline hover:text-black",
    panel: "mt-2 w-[216px] border-3 border-black bg-white p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
    panelStyle: { borderWidth: "3px" } as CSSProperties | undefined,
    panelTitle: "text-[11px] font-black text-black",
    panelHint: "mb-2 text-[10px] text-gray-600",
    cropArea: "relative overflow-hidden border-2 border-black touch-none select-none",
    btnCenter: "border-2 border-black bg-gray-100 px-2 py-1 text-[10px] font-black hover:bg-gray-200",
    btnCancel: "border-2 border-black bg-red-100 px-2 py-1 text-[10px] font-black hover:bg-red-200",
    btnApply: "border-2 border-black bg-green-300 px-2 py-1 text-[10px] font-black hover:bg-green-400",
  },
  steps: {
    box: "relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-[14px] border-2 transition-colors group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--wk-focus)] sm:h-28 sm:w-28",
    boxDragging: "border-dashed border-[var(--wk-primary)] bg-[var(--wk-accent-soft)]",
    boxPhoto: "border-[var(--wk-border)] bg-[var(--wk-surface-subtle)]",
    boxEmpty: "border-dashed border-[var(--wk-border-strong)] bg-white hover:border-[var(--wk-primary)] hover:bg-[var(--wk-surface-subtle)]",
    boxStyle: undefined,
    remove: "absolute right-1 top-1 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--wk-border)] bg-white text-xs font-bold text-[var(--wk-danger)] opacity-0 shadow-sm transition-opacity hover:bg-[var(--wk-danger-soft)] focus-visible:opacity-100 group-hover:opacity-100",
    plusIcon: "h-6 w-6 text-[var(--wk-ink-muted)] transition-colors group-hover:text-[var(--wk-primary)]",
    plusLabel: "text-center text-xs font-bold leading-tight text-[var(--wk-ink-muted)]",
    error: "max-w-[7rem] text-center text-xs font-bold text-[var(--wk-danger)] sm:text-left",
    editCrop: "inline-flex min-h-8 items-center text-xs font-bold text-[var(--wk-primary)] underline underline-offset-2",
    panel: "mt-2 w-[216px] rounded-[14px] border border-[var(--wk-border)] bg-white p-3 shadow-[var(--wk-shadow-md)]",
    panelStyle: undefined,
    panelTitle: "text-[13px] font-bold text-[var(--wk-ink)]",
    panelHint: "mb-2 text-xs text-[var(--wk-ink-muted)]",
    cropArea: "relative overflow-hidden rounded-[10px] border border-[var(--wk-border-strong)] touch-none select-none",
    btnCenter: "min-h-9 rounded-lg border border-[var(--wk-border)] bg-white px-2 text-xs font-bold text-[var(--wk-ink)] hover:bg-[var(--wk-surface-subtle)]",
    btnCancel: "min-h-9 rounded-lg px-2 text-xs font-bold text-[var(--wk-danger)] hover:bg-[var(--wk-danger-soft)]",
    btnApply: "min-h-9 rounded-lg bg-[var(--wk-primary)] px-2 text-xs font-bold text-[var(--wk-primary-contrast)] hover:bg-[var(--wk-primary-hover)]",
  },
};

const MAX_SIZE_MB = 5;
const CROP_SIZE = 192;
const OUTPUT_SIZE = 700;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
type Offset = { x: number; y: number };

export default function PhotoUpload({
  currentPhoto,
  onPhotoChange,
  uiLanguage = "nl",
  variant = "classic",
}: PhotoUploadProps) {
  const isEnglish = uiLanguage === "en";
  const v = PHOTO_STYLES[variant];
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editorSrc, setEditorSrc] = useState<string | null>(null);
  const [editorImage, setEditorImage] = useState<HTMLImageElement | null>(null);
  const [editorScale, setEditorScale] = useState(1);
  const [editorOffset, setEditorOffset] = useState<Offset>({ x: 0, y: 0 });
  const [isDraggingEditor, setIsDraggingEditor] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragStateRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originOffset: Offset;
  } | null>(null);

  const openCropEditor = useCallback(async (source: string) => {
    const image = await loadImage(source);
    const scale = Math.max(CROP_SIZE / image.width, CROP_SIZE / image.height);
    const centeredOffset = getCenteredOffset(image, scale);

    setEditorSrc(source);
    setEditorImage(image);
    setEditorScale(scale);
    setEditorOffset(centeredOffset);
  }, []);

  const processFile = useCallback(
    async (file: File) => {
      setError(null);

      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError(
          isEnglish
            ? "Only JPG, PNG, or WebP files are allowed."
            : "Alleen JPG, PNG of WebP bestanden.",
        );
        return;
      }

      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(
          isEnglish ? `Maximum ${MAX_SIZE_MB}MB.` : `Maximaal ${MAX_SIZE_MB}MB.`,
        );
        return;
      }

      try {
        const source = await readFileAsDataURL(file);
        await openCropEditor(source);
      } catch {
        setError(isEnglish ? "Photo could not be loaded." : "Foto kon niet worden geladen.");
      }
    },
    [isEnglish, openCropEditor],
  );

  const handleEditCurrent = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setError(null);

    if (!currentPhoto) return;
    try {
      await openCropEditor(currentPhoto);
      track("photo_edit_opened", { source: "existing" });
    } catch {
      setError(isEnglish ? "Photo could not be loaded." : "Foto kon niet worden geladen.");
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      track("photo_uploaded", { method: "drag" });
      processFile(file);
    }
  };

  const handleEditorPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!editorImage) return;
    event.preventDefault();

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originOffset: editorOffset,
    };
    setIsDraggingEditor(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const clampEditorOffset = useCallback(
    (next: Offset): Offset => {
      if (!editorImage) return next;

      const width = editorImage.width * editorScale;
      const height = editorImage.height * editorScale;

      const minX = Math.min(0, CROP_SIZE - width);
      const minY = Math.min(0, CROP_SIZE - height);
      const maxX = width <= CROP_SIZE ? (CROP_SIZE - width) / 2 : 0;
      const maxY = height <= CROP_SIZE ? (CROP_SIZE - height) / 2 : 0;

      return {
        x: Math.min(maxX, Math.max(minX, next.x)),
        y: Math.min(maxY, Math.max(minY, next.y)),
      };
    },
    [editorImage, editorScale],
  );

  const handleEditorPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current;
    if (!drag || !editorImage) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    const next = clampEditorOffset({
      x: drag.originOffset.x + dx,
      y: drag.originOffset.y + dy,
    });
    setEditorOffset(next);
  };

  const handleEditorPointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    dragStateRef.current = null;
    setIsDraggingEditor(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleApplyEditor = () => {
    if (!editorImage) return;

    const centered = getCenteredOffset(editorImage, editorScale);
    const moved =
      Math.abs(editorOffset.x - centered.x) > 1 ||
      Math.abs(editorOffset.y - centered.y) > 1;
    const cropped = cropToSquare(editorImage, editorScale, editorOffset);

    onPhotoChange(cropped);
    setEditorSrc(null);
    setEditorImage(null);
    setIsDraggingEditor(false);
    dragStateRef.current = null;
    track("photo_repositioned", { moved });
  };

  return (
    <div className="flex flex-col items-center gap-1 sm:items-start">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setIsDragging(false);
        }}
        role="button"
        tabIndex={0}
        aria-label={currentPhoto ? (isEnglish ? "Change photo" : "Foto wijzigen") : (isEnglish ? "Add a photo" : "Foto toevoegen")}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget || (event.key !== "Enter" && event.key !== " ")) return;
          event.preventDefault();
          fileInputRef.current?.click();
        }}
        className={`
          ${v.box}
          ${
            isDragging
              ? v.boxDragging
              : currentPhoto
                ? v.boxPhoto
                : v.boxEmpty
          }
        `}
        style={v.boxStyle}
        title={
          currentPhoto
            ? isEnglish
              ? "Click to change photo"
              : "Klik om foto te wijzigen"
            : isEnglish
              ? "Click or drag to add a photo"
              : "Klik of sleep om een foto toe te voegen"
        }
      >
        {currentPhoto ? (
          <>
            <img
              src={currentPhoto}
              alt={isEnglish ? "Profile photo" : "Profielfoto"}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/40">
              <span className="text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
                {isEnglish ? "Change" : "Wijzigen"}
              </span>
            </div>
            <button
              type="button"
              aria-label={isEnglish ? "Remove photo" : "Foto verwijderen"}
              onClick={(event) => {
                event.stopPropagation();
                onPhotoChange("");
                setEditorSrc(null);
                setEditorImage(null);
                track("photo_removed", {});
              }}
              className={v.remove}
              title={isEnglish ? "Remove photo" : "Foto verwijderen"}
            >
              ✕
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1 px-2">
            <svg className={v.plusIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className={v.plusLabel}>
              {isEnglish ? "Photo" : "Foto"}
            </span>
          </div>
        )}
      </div>

      {error && (
        <p className={v.error}>
          {error}
        </p>
      )}

      {currentPhoto && !editorSrc && (
        <button
          type="button"
          onClick={handleEditCurrent}
          className={v.editCrop}
        >
          {isEnglish ? "Edit crop" : "Uitsnede bewerken"}
        </button>
      )}

      {editorSrc && editorImage && (
        <div
          className={v.panel}
          style={v.panelStyle}
        >
          <p className={v.panelTitle}>
            {isEnglish ? "Position photo" : "Foto positioneren"}
          </p>
          <p className={v.panelHint}>
            {isEnglish ? "Drag to center your face." : "Sleep om je gezicht te centreren."}
          </p>

          <div
            className={`${v.cropArea} ${
              isDraggingEditor ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{ width: `${CROP_SIZE}px`, height: `${CROP_SIZE}px` }}
            onPointerDown={handleEditorPointerDown}
            onPointerMove={handleEditorPointerMove}
            onPointerUp={handleEditorPointerEnd}
            onPointerCancel={handleEditorPointerEnd}
            onPointerLeave={handleEditorPointerEnd}
          >
            <img
              src={editorSrc}
              alt={isEnglish ? "Photo crop preview" : "Foto uitsnede voorbeeld"}
              draggable={false}
              className="pointer-events-none absolute max-w-none"
              style={{
                width: `${editorImage.width * editorScale}px`,
                height: `${editorImage.height * editorScale}px`,
                left: `${editorOffset.x}px`,
                top: `${editorOffset.y}px`,
              }}
            />
          </div>

          <div className="mt-2 grid grid-cols-3 gap-1">
            <button
              type="button"
              onClick={() => setEditorOffset(getCenteredOffset(editorImage, editorScale))}
              className={v.btnCenter}
            >
              {isEnglish ? "Center" : "Centreren"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditorSrc(null);
                setEditorImage(null);
                setIsDraggingEditor(false);
                dragStateRef.current = null;
              }}
              className={v.btnCancel}
            >
              {isEnglish ? "Cancel" : "Annuleren"}
            </button>
            <button
              type="button"
              onClick={handleApplyEditor}
              className={v.btnApply}
            >
              {isEnglish ? "Use photo" : "Gebruik foto"}
            </button>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            track("photo_uploaded", { method: "click" });
            processFile(file);
          }
          event.target.value = "";
        }}
      />
    </div>
  );
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target?.result as string);
    reader.onerror = () => reject(new Error("File read failed"));
    reader.readAsDataURL(file);
  });
}

function loadImage(source: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Image load failed"));
    image.src = source;
  });
}

function getCenteredOffset(image: HTMLImageElement, scale: number): Offset {
  return {
    x: (CROP_SIZE - image.width * scale) / 2,
    y: (CROP_SIZE - image.height * scale) / 2,
  };
}

function cropToSquare(image: HTMLImageElement, scale: number, offset: Offset): string {
  const canvas = document.createElement("canvas");
  canvas.width = OUTPUT_SIZE;
  canvas.height = OUTPUT_SIZE;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas context unavailable");
  }

  const ratio = OUTPUT_SIZE / CROP_SIZE;
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, OUTPUT_SIZE, OUTPUT_SIZE);
  context.drawImage(
    image,
    offset.x * ratio,
    offset.y * ratio,
    image.width * scale * ratio,
    image.height * scale * ratio,
  );

  return canvas.toDataURL("image/jpeg", 0.9);
}
