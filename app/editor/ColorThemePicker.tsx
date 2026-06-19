"use client";

import { useEffect, useRef, useState } from "react";
import { getTemplateConfig } from '@/lib/templates/registry';
import type { UiLanguage } from "@/lib/ui-language";

interface ColorThemePickerProps {
    templateId: string;
    currentThemeId: string;
    onSelectTheme: (themeId: string) => void;
    uiLanguage?: UiLanguage;
}

export default function ColorThemePicker({
    templateId,
    currentThemeId,
    onSelectTheme,
    uiLanguage = "nl",
}: ColorThemePickerProps) {
    const template = getTemplateConfig(templateId);
    const themes = template?.colorThemes || [];
    const currentTheme = themes.find((theme) => theme.id === currentThemeId) ?? themes[0];
    const [isOpen, setIsOpen] = useState(false);
    const pickerRef = useRef<HTMLDivElement>(null);
    const label = uiLanguage === "en" ? "Choose CV color" : "Kies CV-kleur";

    useEffect(() => {
        if (!isOpen) return;

        const closePicker = (event: MouseEvent) => {
            if (!pickerRef.current?.contains(event.target as Node)) setIsOpen(false);
        };
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        document.addEventListener("mousedown", closePicker);
        document.addEventListener("keydown", closeOnEscape);
        return () => {
            document.removeEventListener("mousedown", closePicker);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [isOpen]);

    if (!currentTheme) return null;

    return (
        <div ref={pickerRef} className="relative shrink-0">
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 bg-white transition-colors hover:bg-slate-50"
                title={label}
                aria-label={label}
                aria-expanded={isOpen}
            >
                <span
                    className="h-5 w-5 rounded-full ring-2 ring-slate-200 ring-offset-1"
                    style={{ backgroundColor: currentTheme.primary }}
                />
            </button>

            {isOpen ? (
                <div className="absolute left-0 top-full z-40 mt-2 flex min-w-max items-center gap-2 rounded-md border border-slate-200 bg-white p-3 shadow-lg">
                    {themes.map((theme) => (
                        <button
                            key={theme.id}
                            type="button"
                            onClick={() => {
                                onSelectTheme(theme.id);
                                setIsOpen(false);
                            }}
                            className={`h-7 w-7 rounded-full transition-transform hover:scale-110 ${
                                currentThemeId === theme.id
                                    ? "ring-2 ring-blue-500 ring-offset-2"
                                    : "ring-1 ring-slate-200"
                            }`}
                            style={{ backgroundColor: theme.primary }}
                            title={theme.name}
                            aria-label={theme.name}
                            aria-pressed={currentThemeId === theme.id}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    );
}
