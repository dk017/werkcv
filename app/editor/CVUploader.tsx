"use client";

import { useState, useRef, useCallback } from "react";
import { CVData } from "@/lib/cv";

interface CVUploaderProps {
    onParsed: (data: CVData) => void;
    onClose: () => void;
}

export default function CVUploader({ onParsed, onClose }: CVUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = useCallback(async (file: File) => {
        // Validate file type
        const allowedTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/msword',
        ];

        if (!allowedTypes.includes(file.type)) {
            setError("Ongeldig bestandstype. Upload een PDF of Word document.");
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError("Bestand is te groot. Maximale grootte is 10MB.");
            return;
        }

        setError(null);
        setIsUploading(true);
        setProgress("Bestand wordt geüpload...");

        try {
            const formData = new FormData();
            formData.append('file', file);

            setProgress("CV wordt geanalyseerd met AI...");

            const response = await fetch('/api/parse-cv-only', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Er ging iets mis bij het verwerken');
            }

            setProgress("Gegevens worden ingevuld...");

            // Small delay for UX
            await new Promise(resolve => setTimeout(resolve, 500));

            onParsed(result.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Er ging iets mis");
        } finally {
            setIsUploading(false);
            setProgress("");
        }
    }, [onParsed]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFile(file);
        }
    }, [handleFile]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    }, [handleFile]);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b-4 border-black bg-blue-400">
                    <h2 className="text-lg font-black text-black uppercase flex items-center gap-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        CV Uploaden
                    </h2>
                    <button
                        onClick={onClose}
                        disabled={isUploading}
                        className="w-8 h-8 flex items-center justify-center bg-white border-3 border-black font-black text-lg hover:bg-red-400 transition-colors disabled:opacity-50"
                        style={{ borderWidth: '3px' }}
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {isUploading ? (
                        <div className="text-center py-8">
                            <div className="inline-block w-12 h-12 border-4 border-black border-t-yellow-400 rounded-full animate-spin mb-4" />
                            <p className="font-bold text-black">{progress}</p>
                            <p className="text-sm text-gray-600 mt-2">
                                Dit kan enkele seconden duren...
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Drop Zone */}
                            <div
                                onClick={handleClick}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                className={`
                                    border-4 border-dashed cursor-pointer transition-all p-8 text-center
                                    ${isDragging
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-black bg-gray-50 hover:bg-gray-100'
                                    }
                                `}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleInputChange}
                                    className="hidden"
                                />

                                <div className="flex flex-col items-center gap-3">
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${isDragging ? 'bg-blue-200' : 'bg-yellow-400'}`}>
                                        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-black text-black text-lg">
                                            {isDragging ? "Laat los om te uploaden" : "Sleep je CV hier"}
                                        </p>
                                        <p className="text-sm text-gray-600 mt-1">
                                            of <span className="text-blue-600 font-bold underline">klik om te selecteren</span>
                                        </p>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        PDF of Word • Max 10MB • Nederlands of Engels
                                    </p>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mt-4 p-3 bg-red-100 border-3 border-red-500 text-red-700 font-medium text-sm" style={{ borderWidth: '3px' }}>
                                    <span className="font-black">Fout:</span> {error}
                                </div>
                            )}

                            {/* Info */}
                            <div className="mt-4 p-4 bg-yellow-50 border-3 border-yellow-400" style={{ borderWidth: '3px' }}>
                                <p className="text-sm font-medium text-black">
                                    <span className="font-black">💡 Tip:</span> Upload je bestaande CV en wij vullen automatisch alle velden in met AI. Je kunt daarna alles aanpassen.
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                {!isUploading && (
                    <div className="px-6 py-4 border-t-4 border-black bg-gray-50 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 font-black text-sm border-3 border-black bg-white hover:bg-gray-100 transition-colors"
                            style={{ borderWidth: '3px' }}
                        >
                            Annuleren
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
