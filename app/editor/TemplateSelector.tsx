"use client";

import { useState } from 'react';
import { templateList, getThemeById } from '@/lib/templates/registry';
import { TemplateConfig } from '@/lib/templates';
import { getTemplateComponent } from '@/app/editor/templates';
import { sampleCV } from '@/lib/cv';
import { LinkTextProvider } from '@/app/editor/templates/link-utils';

interface TemplateSelectorProps {
    currentTemplateId: string;
    onSelectTemplate: (templateId: string, defaultThemeId: string) => void;
}

export default function TemplateSelector({ currentTemplateId, onSelectTemplate }: TemplateSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);

    const currentTemplate = templateList.find(t => t.id === currentTemplateId);

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                <span className="hidden sm:inline">{currentTemplate?.nameDutch || 'Template'}</span>
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Kies een template</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Template Grid */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {templateList.map((template) => (
                                    <TemplateCard
                                        key={template.id}
                                        template={template}
                                        isSelected={template.id === currentTemplateId}
                                        onSelect={() => {
                                            onSelectTemplate(template.id, template.defaultThemeId);
                                            setIsOpen(false);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function TemplateCard({
    template,
    isSelected,
    onSelect,
}: {
    template: TemplateConfig;
    isSelected: boolean;
    onSelect: () => void;
}) {
    const TemplateComponent = getTemplateComponent(template.id);
    const theme = getThemeById(template.defaultThemeId);

    return (
        <button
            onClick={onSelect}
            className={`text-left p-3 rounded-xl border-2 transition-all hover:shadow-md ${
                isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
            }`}
        >
            {/* Real template preview */}
            <div className="h-[200px] rounded-lg mb-2 overflow-hidden bg-gray-50 border border-gray-100 flex items-start justify-center">
                <div style={{ zoom: 0.22, pointerEvents: 'none', flexShrink: 0 }}>
                    <LinkTextProvider disableAnchors>
                        <TemplateComponent data={sampleCV} theme={theme} />
                    </LinkTextProvider>
                </div>
            </div>

            {/* Template name */}
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{template.nameDutch}</span>
                {isSelected && (
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                )}
            </div>
        </button>
    );
}
