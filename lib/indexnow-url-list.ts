export function parseIndexNowUrlList(text: string, host: string): string[] {
  const urls = text.split(/\r?\n/).map(x => x.trim()).filter(Boolean);
  for (const value of urls) {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.host !== host || url.username || url.password || url.hash || url.search || /^\/(?:en\/)?(api|admin|editor|login|success|mijn-cvs|agency\/account)(\/|$)/.test(url.pathname)) throw new Error("URL list must contain canonical public HTTPS URLs on the selected host");
  }
  return [...new Set(urls)];
}
