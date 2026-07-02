"use client";

import type { CVData } from "@/lib/cv";
import { getTemplateConfig } from "@/lib/templates/registry";
import type { UiLanguage } from "@/lib/ui-language";
import { TemplateGallery } from "./TemplateSelector";

interface PreviewDesignPanelProps {
  data: CVData;
  currentTemplateId: string;
  currentThemeId: string;
  uiLanguage: UiLanguage;
  onClose: () => void;
  onSelectTemplate: (templateId: string, defaultThemeId: string) => void;
  onSelectTheme: (themeId: string) => void;
}

export default function PreviewDesignPanel({
  data,
  currentTemplateId,
  currentThemeId,
  uiLanguage,
  onClose,
  onSelectTemplate,
  onSelectTheme,
}: PreviewDesignPanelProps) {
  const isEnglish = uiLanguage === "en";
  const template = getTemplateConfig(currentTemplateId);
  const themes = template?.colorThemes ?? [];

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 px-4">
        <h2 className="text-sm font-bold text-slate-950">
          {isEnglish ? "Choose a design" : "Kies een ontwerp"}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label={isEnglish ? "Close design options" : "Ontwerpopties sluiten"}
          title={isEnglish ? "Close design options" : "Ontwerpopties sluiten"}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
        <TemplateGallery
          currentTemplateId={currentTemplateId}
          data={data}
          onSelectTemplate={onSelectTemplate}
          uiLanguage={uiLanguage}
          compact
          idPrefix="full-preview-template"
        />

        {themes.length > 0 ? (
          <section className="mt-7 border-t border-slate-200 pt-5" aria-labelledby="full-preview-colour-heading">
            <h3 id="full-preview-colour-heading" className="text-sm font-bold text-slate-950">
              {isEnglish ? "Accent colour" : "Accentkleur"}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              {isEnglish
                ? "Changes apply immediately. Your content stays unchanged."
                : "Wijzigingen worden direct toegepast. Je inhoud blijft ongewijzigd."}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {themes.map((theme) => {
                const isSelected = theme.id === currentThemeId;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => onSelectTheme(theme.id)}
                    className={`h-9 w-9 rounded-full border-[3px] border-white transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                      isSelected
                        ? "ring-2 ring-blue-600 ring-offset-2"
                        : "ring-1 ring-slate-300"
                    }`}
                    style={{ backgroundColor: theme.primary }}
                    aria-label={theme.name}
                    title={theme.name}
                    aria-pressed={isSelected}
                  />
                );
              })}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
