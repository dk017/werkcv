import { siteBaseUrl } from "@/lib/ai-discovery";

export const revalidate = 86400;

// A route instead of app/robots.ts because MetadataRoute.Robots has no field for Content-Signal.
// Keep the private paths in sync with app/.well-known/ai.txt/route.ts.
const privatePaths = ['/api/', '/admin', '/editor', '/en/editor', '/mijn-cvs', '/en/my-cvs', '/login', '/success', '/agency/account', '/pdf-render'];

const userAgents = ['*', 'OAI-SearchBot', 'ChatGPT-User', 'GPTBot', 'PerplexityBot', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'Google-Extended'];

// contentsignals.org: public pages may be used for search, answers (ai-input) and training. Repeated in every group,
// because a crawler with its own group does not read the * group.
const contentSignal = 'search=yes, ai-input=yes, ai-train=yes';

export function GET() {
    const groups = userAgents.map((userAgent) =>
        [`User-Agent: ${userAgent}`, `Content-Signal: ${contentSignal}`, 'Allow: /', ...privatePaths.map((path) => `Disallow: ${path}`)].join('\n'),
    );
    const body = [
        `# Guides for language models: ${siteBaseUrl}/llms.txt and ${siteBaseUrl}/ai.txt`,
        '',
        groups.join('\n\n'),
        '',
        `Sitemap: ${siteBaseUrl}/sitemap.xml`,
        '',
    ].join('\n');

    return new Response(body, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
    });
}
