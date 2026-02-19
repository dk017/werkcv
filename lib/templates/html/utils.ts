// HTML Utilities for PDF Generation

import { ColorTheme } from '@/lib/templates';

export const escapeHtml = (str: string) =>
    str.replace(/&/g, '&amp;')
       .replace(/</g, '&lt;')
       .replace(/>/g, '&gt;')
       .replace(/"/g, '&quot;')
       .replace(/'/g, '&#039;');

export const nl2br = (str: string) => escapeHtml(str).replace(/\n/g, '<br>');

export function wrapPage(content: string, theme: ColorTheme): string {
    return `<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* Add breathing room on continued pages while keeping page 1 unchanged */
        @page { margin: 10mm 0 0 0; size: A4; }
        @page :first { margin-top: 0; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
        /* Page break utilities for PDF generation */
        h2, h3 { page-break-after: avoid; }
        .cv-item { page-break-inside: avoid; }
        .cv-section-small { page-break-inside: avoid; }
        :root {
            --color-primary: ${theme.primary};
            --color-secondary: ${theme.secondary};
            --color-text: ${theme.text};
            --color-text-muted: ${theme.textMuted};
            --color-background: ${theme.background};
            --color-border: ${theme.border};
        }
    </style>
</head>
<body>
    ${content}
</body>
</html>`;
}
