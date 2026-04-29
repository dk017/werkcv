import { getAllArticles } from "@/lib/cv-tips/registry";
import { primaryAiPages, siteBaseUrl } from "@/lib/ai-discovery";

export const revalidate = 3600;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const coreItems = primaryAiPages.slice(0, 12).map((page) => ({
    title: page.title,
    link: page.url,
    description: page.description,
    pubDate: new Date().toUTCString(),
  }));

  const articleItems = getAllArticles()
    .slice(0, 40)
    .map((article) => ({
      title: article.title,
      link: `${siteBaseUrl}/cv-tips/${article.slug}`,
      description: article.description,
      pubDate: new Date(article.updatedAt ?? article.publishedAt).toUTCString(),
    }));

  const items = [...coreItems, ...articleItems]
    .map((item) => [
      "    <item>",
      `      <title>${escapeXml(item.title)}</title>`,
      `      <link>${escapeXml(item.link)}</link>`,
      `      <guid>${escapeXml(item.link)}</guid>`,
      `      <description>${escapeXml(item.description)}</description>`,
      `      <pubDate>${item.pubDate}</pubDate>`,
      "    </item>",
    ].join("\n"))
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "  <channel>",
    "    <title>WerkCV updates</title>",
    `    <link>${siteBaseUrl}</link>`,
    "    <description>CV builder, CV tips, templates and tools for the Dutch job market.</description>",
    "    <language>nl-NL</language>",
    `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    "    <ttl>60</ttl>",
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
