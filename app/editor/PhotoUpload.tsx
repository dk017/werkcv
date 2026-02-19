"use client";

import { useState, useRef, useCallback } from "react";
import { track } from "@/lib/analytics";

interface PhotoUploadProps {
    currentPhoto: string;
    onPhotoChange: (base64: string) => void;
}

const MAX_SIZE_MB = 5;
const CROP_SIZE = 192; // px preview crop box
const OUTPUT_SIZE = 700; // px exported square photo
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
type Offset = { x: number; y: number };

/**
 * Profile photo upload for the CV editor.
 * - Click or drag to upload
 * - Client-side resize to max 800×800
 * - Outputs base64 data URL
 * - Neobrutalist design
 */
export default function PhotoUpload({ currentPhoto, onPhotoChange }: PhotoUploadProps) {
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
        const img = await loadImage(source);
        const scale = Math.max(CROP_SIZE / img.width, CROP_SIZE / img.height);
        const centeredOffset = getCenteredOffset(img, scale);

        setEditorSrc(source);
        setEditorImage(img);
        setEditorScale(scale);
        setEditorOffset(centeredOffset);
    }, []);

    const processFile = useCallback(async (file: File) => {
        setError(null);

        // Validate type
        if (!ACCEPTED_TYPES.includes(file.type)) {
            setError("Alleen JPG, PNG of WebP bestanden.");
            return;
        }

        // Validate size
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            setError(`Maximaal ${MAX_SIZE_MB}MB.`);
            return;
        }

        try {
            const source = await readFileAsDataURL(file);
            await openCropEditor(source);
        } catch {
            setError("Foto kon niet worden geladen.");
        }
    }, [openCropEditor]);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            track('photo_uploaded', { method: 'click' });
            processFile(file);
        }
        // Reset input so same file can be re-selected
        e.target.value = '';
    };

    const handleEditCurrent = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setError(null);

        if (!currentPhoto) return;
        try {
            await openCropEditor(currentPhoto);
            track('photo_edit_opened', { source: 'existing' });
        } catch {
            setError("Foto kon niet worden geladen.");
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            track('photo_uploaded', { method: 'drag' });
            processFile(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        onPhotoChange('');
        setEditorSrc(null);
        setEditorImage(null);
        track('photo_removed', {});
    };

    const clampEditorOffset = useCallback((next: Offset): Offset => {
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
    }, [editorImage, editorScale]);

    const handleEditorPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!editorImage) return;
        e.preventDefault();

        dragStateRef.current = {
            pointerId: e.pointerId,
            startX: e.clientX,
            startY: e.clientY,
            originOffset: editorOffset,
        };
        setIsDraggingEditor(true);
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handleEditorPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const drag = dragStateRef.current;
        if (!drag || !editorImage) return;

        const dx = e.clientX - drag.startX;
        const dy = e.clientY - drag.startY;
        const next = clampEditorOffset({
            x: drag.originOffset.x + dx,
            y: drag.originOffset.y + dy,
        });
        setEditorOffset(next);
    };

    const handleEditorPointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
        const drag = dragStateRef.current;
        if (!drag || drag.pointerId !== e.pointerId) return;

        dragStateRef.current = null;
        setIsDraggingEditor(false);
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
        }
    };

    const handleRecenter = () => {
        if (!editorImage) return;
        setEditorOffset(getCenteredOffset(editorImage, editorScale));
    };

    const handleCancelEditor = () => {
        setEditorSrc(null);
        setEditorImage(null);
        setIsDraggingEditor(false);
        dragStateRef.current = null;
    };

    const handleApplyEditor = () => {
        if (!editorImage) return;

        const centered = getCenteredOffset(editorImage, editorScale);
        const moved = Math.abs(editorOffset.x - centered.x) > 1 || Math.abs(editorOffset.y - centered.y) > 1;
        const cropped = cropToSquare(editorImage, editorScale, editorOffset);

        onPhotoChange(cropped);
        setEditorSrc(null);
        setEditorImage(null);
        setIsDraggingEditor(false);
        dragStateRef.current = null;
        track('photo_repositioned', { moved });
    };

    return (
        <div className="flex flex-col items-center sm:items-start gap-1">
            <div
                onClick={handleClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`
                    relative w-24 h-24 sm:w-28 sm:h-28
                    border-3 border-black cursor-pointer
                    flex items-center justify-center
                    transition-all group overflow-hidden
                    ${isDragging
                        ? 'bg-yellow-100 border-dashed shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                        : currentPhoto
                            ? 'bg-gray-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                            : 'bg-gray-100 hover:bg-gray-200 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]'
                    }
                `}
                style={{ borderWidth: '3px' }}
                title={currentPhoto ? "Klik om foto te wijzigen" : "Klik of sleep om een foto toe te voegen"}
            >
                {currentPhoto ? (
                    <>
                        {/* Photo preview */}
                        <img
                            src={currentPhoto}
                            alt="Profielfoto"
                            className="w-full h-full object-cover"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                            <span className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                Wijzigen
                            </span>
                        </div>
                        {/* Remove button */}
                        <button
                            onClick={handleRemove}
                            className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-red-400 border-2 border-black text-black text-xs font-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 z-10"
                            title="Foto verwijderen"
                        >
                            ✕
                        </button>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-1 px-2">
                        <svg className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span className="text-[10px] text-center text-gray-500 font-bold leading-tight">
                            Foto
                        </span>
                    </div>
                )}
            </div>

            {/* Error message */}
            {error && (
                <p className="text-[10px] text-red-600 font-bold max-w-[7rem] text-center sm:text-left">
                    {error}
                </p>
            )}

            {currentPhoto && !editorSrc && (
                <button
                    type="button"
                    onClick={handleEditCurrent}
                    className="text-[10px] font-bold underline text-gray-700 hover:text-black"
                >
                    Uitsnede bewerken
                </button>
            )}

            {editorSrc && editorImage && (
                <div
                    className="mt-2 w-[216px] bg-white border-3 border-black p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    style={{ borderWidth: "3px" }}
                >
                    <p className="text-[11px] font-black text-black">Foto positioneren</p>
                    <p className="text-[10px] text-gray-600 mb-2">Sleep om je gezicht te centreren.</p>

                    <div
                        className={`relative border-2 border-black overflow-hidden touch-none select-none ${
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
                            alt="Foto uitsnede voorbeeld"
                            draggable={false}
                            className="absolute max-w-none pointer-events-none"
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
                            onClick={handleRecenter}
                            className="text-[10px] font-black px-2 py-1 border-2 border-black bg-gray-100 hover:bg-gray-200"
                        >
                            Centreren
                        </button>
                        <button
                            type="button"
                            onClick={handleCancelEditor}
                            className="text-[10px] font-black px-2 py-1 border-2 border-black bg-red-100 hover:bg-red-200"
                        >
                            Annuleren
                        </button>
                        <button
                            type="button"
                            onClick={handleApplyEditor}
                            className="text-[10px] font-black px-2 py-1 border-2 border-black bg-green-300 hover:bg-green-400"
                        >
                            Gebruik foto
                        </button>
                    </div>
                </div>
            )}

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
}

function readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = () => reject(new Error("File read failed"));
        reader.readAsDataURL(file);
    });
}

function loadImage(source: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Image load failed"));
        img.src = source;
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

    const ctx = canvas.getContext("2d");
    if (!ctx) {
        throw new Error("Canvas context unavailable");
    }

    const ratio = OUTPUT_SIZE / CROP_SIZE;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, OUTPUT_SIZE, OUTPUT_SIZE);
    ctx.drawImage(
        image,
        offset.x * ratio,
        offset.y * ratio,
        image.width * scale * ratio,
        image.height * scale * ratio,
    );

    return canvas.toDataURL("image/jpeg", 0.9);
}
