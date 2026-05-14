"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { GlobePointRow } from "@/lib/admin-analytics";

type AnalyticsGlobeProps = {
  points: GlobePointRow[];
  generatedAt: string;
};

type LeafletMap = {
  setView: (center: [number, number], zoom: number) => LeafletMap;
  fitBounds: (bounds: unknown, options?: { padding?: [number, number]; maxZoom?: number }) => LeafletMap;
  remove: () => void;
};

type LeafletMarker = {
  addTo: (map: LeafletMap) => LeafletMarker;
  bindPopup: (content: string) => LeafletMarker;
};

type LeafletGlobal = {
  map: (element: HTMLElement, options: Record<string, unknown>) => LeafletMap;
  tileLayer: (url: string, options: Record<string, unknown>) => { addTo: (map: LeafletMap) => unknown };
  marker: (latLng: [number, number], options: Record<string, unknown>) => LeafletMarker;
  divIcon: (options: Record<string, unknown>) => unknown;
  latLngBounds: (latLngs: Array<[number, number]>) => unknown;
};

declare global {
  interface Window {
    L?: LeafletGlobal;
  }
}

const sourceColors: Record<string, string> = {
  ai: "#a78bfa",
  search: "#38bdf8",
  social: "#f472b6",
  referral: "#fbbf24",
  direct: "#34d399",
  email: "#fb7185",
  unknown: "#94a3b8",
};

function initials(city: string, country: string): string {
  const source = [city, country].filter(Boolean).join(" ") || "WV";
  return source
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function loadLeaflet(): Promise<LeafletGlobal> {
  if (window.L) return Promise.resolve(window.L);

  return new Promise((resolve, reject) => {
    if (!document.querySelector("link[data-werkcv-leaflet]")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.dataset.werkcvLeaflet = "true";
      document.head.appendChild(link);
    }

    const existingScript = document.querySelector<HTMLScriptElement>("script[data-werkcv-leaflet]");
    if (existingScript) {
      existingScript.addEventListener("load", () => {
        if (window.L) resolve(window.L);
      });
      existingScript.addEventListener("error", () => reject(new Error("Leaflet failed to load")));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.dataset.werkcvLeaflet = "true";
    script.onload = () => {
      if (window.L) resolve(window.L);
      else reject(new Error("Leaflet loaded without global"));
    };
    script.onerror = () => reject(new Error("Leaflet failed to load"));
    document.body.appendChild(script);
  });
}

function groupCounts(values: string[]): Array<[string, number]> {
  const counts = new Map<string, number>();
  for (const value of values) counts.set(value || "Unknown", (counts.get(value || "Unknown") || 0) + 1);
  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 4);
}

export function AnalyticsGlobe({ points, generatedAt }: AnalyticsGlobeProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const [mapStatus, setMapStatus] = useState<"loading" | "ready" | "failed">("loading");
  const mappedPoints = useMemo(
    () =>
      points
        .filter((point) => Number.isFinite(point.latitude) && Number.isFinite(point.longitude))
        .slice(0, 90),
    [points]
  );

  useEffect(() => {
    let cancelled = false;
    const element = mapRef.current;
    if (!element) return;

    loadLeaflet()
      .then((leaflet) => {
        if (cancelled || !mapRef.current) return;

        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }

        const map = leaflet.map(mapRef.current, {
          zoomControl: false,
          attributionControl: false,
          scrollWheelZoom: false,
          dragging: true,
          worldCopyJump: true,
        });

        mapInstanceRef.current = map;
        leaflet
          .tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
            subdomains: "abcd",
            maxZoom: 19,
          })
          .addTo(map);

        if (mappedPoints.length > 0) {
          const bounds: Array<[number, number]> = [];
          for (const point of mappedPoints) {
            const color = sourceColors[point.sourceType] || sourceColors.unknown;
            const label = [point.city, point.country].filter(Boolean).join(", ") || "Unknown location";
            const icon = leaflet.divIcon({
              className: "",
              html: `
                <div class="werkcv-live-marker ${point.isLive ? "is-live" : ""}" style="--pin-color:${color}">
                  <span>${escapeHtml(initials(point.city, point.country))}</span>
                  <i></i>
                </div>
              `,
              iconSize: [58, 58],
              iconAnchor: [29, 29],
            });

            leaflet
              .marker([point.latitude, point.longitude], { icon })
              .addTo(map)
              .bindPopup(
                `<strong>${escapeHtml(label)}</strong><br>${escapeHtml(point.sourceLabel)}<br>${escapeHtml(point.page)}`
              );
            bounds.push([point.latitude, point.longitude]);
          }

          if (bounds.length === 1) {
            map.setView(bounds[0], 4);
          } else {
            map.fitBounds(leaflet.latLngBounds(bounds), { padding: [90, 90], maxZoom: 4 });
          }
        } else {
          map.setView([25, 10], 2);
        }

        setMapStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setMapStatus("failed");
      });

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mappedPoints]);

  const livePoints = mappedPoints.filter((point) => point.isLive);
  const featuredPoints = livePoints.length > 0 ? livePoints : mappedPoints.slice(0, 5);
  const referrers = groupCounts(mappedPoints.map((point) => point.sourceLabel));
  const countries = groupCounts(mappedPoints.map((point) => point.country));
  const sourceTypes = groupCounts(mappedPoints.map((point) => point.sourceType));

  return (
    <section className="relative min-h-[620px] overflow-hidden rounded-lg border border-slate-800 bg-[#08111f] shadow-sm">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_42%,rgba(30,41,59,0.08),rgba(2,6,23,0.82)_58%,rgba(15,23,42,0.96)_100%)]" />
      <div ref={mapRef} className="absolute inset-0 z-0 min-h-[620px]" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,transparent_52%,rgba(15,23,42,0.48)_66%,rgba(2,6,23,0.92)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(15,23,42,0.86)_0%,rgba(15,23,42,0.34)_26%,rgba(15,23,42,0)_56%,rgba(15,23,42,0.52)_100%)]" />

      <style jsx global>{`
        .werkcv-live-marker {
          align-items: center;
          background: #0f172a;
          border: 3px solid var(--pin-color);
          border-radius: 999px;
          box-shadow: 0 0 0 5px rgba(15, 23, 42, 0.55), 0 0 22px var(--pin-color);
          color: white;
          display: flex;
          font-size: 13px;
          font-weight: 800;
          height: 44px;
          justify-content: center;
          position: relative;
          width: 44px;
        }

        .werkcv-live-marker i {
          background: var(--pin-color);
          border: 2px solid white;
          border-radius: 999px;
          height: 12px;
          position: absolute;
          right: -2px;
          top: -2px;
          width: 12px;
        }

        .werkcv-live-marker.is-live::after {
          animation: werkcvPulse 1.6s ease-out infinite;
          border: 2px solid var(--pin-color);
          border-radius: 999px;
          content: "";
          inset: -12px;
          position: absolute;
        }

        .leaflet-popup-content-wrapper,
        .leaflet-popup-tip {
          background: #111827;
          color: #e5e7eb;
        }

        @keyframes werkcvPulse {
          from {
            opacity: 0.8;
            transform: scale(0.72);
          }
          to {
            opacity: 0;
            transform: scale(1.18);
          }
        }
      `}</style>

      <div className="relative z-20 flex min-h-[620px] flex-col justify-between p-5">
        <div className="max-w-sm rounded-lg border border-white/10 bg-black/62 p-4 text-white shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-end gap-1 rounded-md bg-white/8 px-1.5 py-1">
                <span className="h-3 w-1.5 rounded bg-orange-300" />
                <span className="h-5 w-1.5 rounded bg-orange-400" />
                <span className="h-4 w-1.5 rounded bg-orange-200" />
              </div>
              <div>
                <p className="text-sm font-semibold">WerkCV</p>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Real-time analytics</p>
              </div>
            </div>
            <div className="rounded-full border border-white/10 bg-white/8 px-2 py-1 text-xs text-slate-300">{generatedAt}</div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-sky-300 shadow-[0_0_12px_rgba(125,211,252,0.9)]" />
            <strong>{livePoints.length}</strong>
            <span className="text-slate-300">live visitor{livePoints.length === 1 ? "" : "s"} on werkcv.nl</span>
          </div>

          <div className="mt-4 space-y-3 border-t border-white/10 pt-4 text-sm">
            <SummaryLine label="Referrers" items={referrers} />
            <SummaryLine label="Countries" items={countries} />
            <SummaryLine label="Sources" items={sourceTypes} />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(280px,385px)_1fr_minmax(160px,174px)]">
          <div className="rounded-lg border border-white/10 bg-black/54 p-4 text-white shadow-2xl backdrop-blur-md">
            <div className="space-y-3">
              {featuredPoints.length === 0 ? (
                <div>
                  <p className="text-sm font-semibold">No mapped visitors yet</p>
                  <p className="mt-2 text-sm text-slate-300">
                    New visits will appear here once the browser event includes geolocation.
                  </p>
                </div>
              ) : (
                featuredPoints.map((point) => (
                  <div key={point.id} className="flex items-start gap-3 text-sm">
                    <span
                      className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                      style={{ backgroundColor: sourceColors[point.sourceType] || sourceColors.unknown }}
                    >
                      {initials(point.city, point.country)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-white">
                        {[point.city, point.country].filter(Boolean).join(", ") || "Unknown location"}
                      </p>
                      <p className="truncate text-slate-300">
                        visited <code className="rounded bg-white/8 px-1 py-0.5 text-xs">{point.page}</code>
                      </p>
                      <p className="text-xs text-slate-500">{point.sourceLabel}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="hidden lg:block" />

          <div className="self-end justify-self-end rounded-full border border-white/10 bg-black/62 px-4 py-2 text-xs font-semibold text-white shadow-2xl backdrop-blur-md">
            Powered by WerkCV
          </div>
        </div>
      </div>

      {mapStatus === "loading" ? (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/70 text-sm font-semibold text-slate-200">
          Loading live map...
        </div>
      ) : null}
      {mapStatus === "failed" ? (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/86 p-5 text-center text-sm text-slate-200">
          Map tiles could not load. The analytics data is still available in the tables below.
        </div>
      ) : null}
    </section>
  );
}

function SummaryLine({ label, items }: { label: string; items: Array<[string, number]> }) {
  return (
    <div className="grid grid-cols-[76px_1fr] gap-3">
      <p className="text-slate-400">{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.length === 0 ? (
          <span className="text-slate-500">-</span>
        ) : (
          items.map(([item, count]) => (
            <span key={item} className="rounded bg-white/8 px-2 py-1 text-xs text-slate-100">
              {item} ({count})
            </span>
          ))
        )}
      </div>
    </div>
  );
}
