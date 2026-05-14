"use client";

import { useEffect, useMemo, useRef } from "react";
import { GlobePointRow } from "@/lib/admin-analytics";

type AnalyticsGlobeProps = {
  points: GlobePointRow[];
  generatedAt: string;
};

const sourceColors: Record<string, string> = {
  ai: "#a78bfa",
  search: "#38bdf8",
  social: "#f472b6",
  referral: "#fbbf24",
  direct: "#34d399",
  email: "#fb7185",
  unknown: "#94a3b8",
};

function project(
  latitude: number,
  longitude: number,
  rotation: number,
  radius: number,
  centerX: number,
  centerY: number
) {
  const lat = (latitude * Math.PI) / 180;
  const lon = ((longitude + rotation) * Math.PI) / 180;
  const cosLat = Math.cos(lat);
  const x = radius * cosLat * Math.sin(lon);
  const y = -radius * Math.sin(lat);
  const z = radius * cosLat * Math.cos(lon);

  return {
    x: centerX + x,
    y: centerY + y,
    z,
    visible: z > -radius * 0.22,
    farSide: z <= -radius * 0.22,
  };
}

function initials(city: string, country: string): string {
  const source = [city, country].filter(Boolean).join(" ") || "WV";
  return source
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function drawGreatCircle(
  context: CanvasRenderingContext2D,
  points: Array<[number, number]>,
  rotation: number,
  radius: number,
  centerX: number,
  centerY: number
) {
  let drawing = false;
  context.beginPath();

  for (const [lat, lon] of points) {
    const point = project(lat, lon, rotation, radius, centerX, centerY);
    if (!point.visible) {
      drawing = false;
      continue;
    }

    if (!drawing) {
      context.moveTo(point.x, point.y);
      drawing = true;
    } else {
      context.lineTo(point.x, point.y);
    }
  }

  context.stroke();
}

export function AnalyticsGlobe({ points, generatedAt }: AnalyticsGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const normalizedPoints = useMemo(
    () =>
      points
        .filter((point) => Number.isFinite(point.latitude) && Number.isFinite(point.longitude))
        .slice(0, 90),
    [points]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;
    const canvasElement = canvas;
    const drawingContext = context;

    let animationFrame = 0;
    let rotation = -20;
    const devicePixelRatio = window.devicePixelRatio || 1;

    function resize() {
      const rect = canvasElement.getBoundingClientRect();
      canvasElement.width = Math.max(1, Math.floor(rect.width * devicePixelRatio));
      canvasElement.height = Math.max(1, Math.floor(rect.height * devicePixelRatio));
      drawingContext.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }

    function draw() {
      const rect = canvasElement.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = width * 0.47;
      const centerY = height * 0.5;
      const radius = Math.min(width * 0.34, height * 0.42);

      drawingContext.clearRect(0, 0, width, height);
      const background = drawingContext.createLinearGradient(0, 0, width, height);
      background.addColorStop(0, "#020617");
      background.addColorStop(0.48, "#0f172a");
      background.addColorStop(1, "#111827");
      drawingContext.fillStyle = background;
      drawingContext.fillRect(0, 0, width, height);

      const glow = drawingContext.createRadialGradient(centerX, centerY, radius * 0.35, centerX, centerY, radius * 1.35);
      glow.addColorStop(0, "rgba(56, 189, 248, 0.22)");
      glow.addColorStop(0.55, "rgba(15, 23, 42, 0.28)");
      glow.addColorStop(1, "rgba(15, 23, 42, 0)");
      drawingContext.fillStyle = glow;
      drawingContext.beginPath();
      drawingContext.arc(centerX, centerY, radius * 1.35, 0, Math.PI * 2);
      drawingContext.fill();

      const sphere = drawingContext.createRadialGradient(
        centerX - radius * 0.35,
        centerY - radius * 0.35,
        radius * 0.2,
        centerX,
        centerY,
        radius
      );
      sphere.addColorStop(0, "#1e3a8a");
      sphere.addColorStop(0.42, "#0f766e");
      sphere.addColorStop(0.74, "#0f172a");
      sphere.addColorStop(1, "#020617");
      drawingContext.fillStyle = sphere;
      drawingContext.beginPath();
      drawingContext.arc(centerX, centerY, radius, 0, Math.PI * 2);
      drawingContext.fill();

      drawingContext.save();
      drawingContext.beginPath();
      drawingContext.arc(centerX, centerY, radius, 0, Math.PI * 2);
      drawingContext.clip();

      drawingContext.strokeStyle = "rgba(125, 211, 252, 0.16)";
      drawingContext.lineWidth = 1;
      for (let lat = -60; lat <= 60; lat += 30) {
        const latitudeLine: Array<[number, number]> = [];
        for (let lon = -180; lon <= 180; lon += 4) latitudeLine.push([lat, lon]);
        drawGreatCircle(drawingContext, latitudeLine, rotation, radius, centerX, centerY);
      }
      for (let lon = -180; lon < 180; lon += 30) {
        const longitudeLine: Array<[number, number]> = [];
        for (let lat = -85; lat <= 85; lat += 4) longitudeLine.push([lat, lon]);
        drawGreatCircle(drawingContext, longitudeLine, rotation, radius, centerX, centerY);
      }

      drawingContext.strokeStyle = "rgba(16, 185, 129, 0.34)";
      drawingContext.lineWidth = 1.1;
      drawGreatCircle(drawingContext, [[63, -160], [48, -130], [40, -100], [25, -80], [5, -65], [-25, -60], [-48, -72]], rotation, radius, centerX, centerY);
      drawGreatCircle(drawingContext, [[72, -15], [55, 10], [43, 30], [25, 45], [8, 20], [-25, 25], [-34, 18]], rotation, radius, centerX, centerY);
      drawGreatCircle(drawingContext, [[55, 55], [35, 75], [22, 95], [5, 110], [-22, 135], [-38, 145]], rotation, radius, centerX, centerY);

      for (const point of normalizedPoints) {
        const projected = project(point.latitude, point.longitude, rotation, radius, centerX, centerY);
        const color = sourceColors[point.sourceType] || sourceColors.unknown;
        const size = point.isLive ? 18 : 14;
        const depthAlpha = Math.max(0.22, Math.min(1, (projected.z + radius) / (radius * 1.8)));
        const alpha = projected.farSide ? 0.34 : depthAlpha;

        drawingContext.globalAlpha = alpha;
        drawingContext.shadowColor = color;
        drawingContext.shadowBlur = point.isLive ? 22 : 10;

        if (projected.farSide) {
          drawingContext.setLineDash([4, 5]);
          drawingContext.strokeStyle = color;
          drawingContext.lineWidth = 1.2;
          drawingContext.beginPath();
          drawingContext.arc(projected.x, projected.y, size * 0.72, 0, Math.PI * 2);
          drawingContext.stroke();
          drawingContext.setLineDash([]);
          continue;
        }

        drawingContext.fillStyle = "#0f172a";
        drawingContext.beginPath();
        drawingContext.arc(projected.x, projected.y, size, 0, Math.PI * 2);
        drawingContext.fill();

        drawingContext.strokeStyle = color;
        drawingContext.lineWidth = 2.8;
        drawingContext.beginPath();
        drawingContext.arc(projected.x, projected.y, size, 0, Math.PI * 2);
        drawingContext.stroke();

        drawingContext.fillStyle = color;
        drawingContext.beginPath();
        drawingContext.arc(projected.x + size * 0.58, projected.y - size * 0.58, 4.5, 0, Math.PI * 2);
        drawingContext.fill();

        drawingContext.shadowBlur = 0;
        drawingContext.fillStyle = "#ffffff";
        drawingContext.font = "700 10px Inter, system-ui, sans-serif";
        drawingContext.textAlign = "center";
        drawingContext.textBaseline = "middle";
        drawingContext.fillText(initials(point.city, point.country), projected.x, projected.y + 0.5);

        if (point.isLive) {
          drawingContext.strokeStyle = color;
          drawingContext.lineWidth = 1.5;
          drawingContext.beginPath();
          drawingContext.arc(projected.x, projected.y, size + 8 + Math.sin(rotation / 12) * 2, 0, Math.PI * 2);
          drawingContext.stroke();
        }

        if (radius > 180) {
          const label = [point.city, point.country].filter(Boolean).join(", ");
          if (label) {
            drawingContext.fillStyle = "rgba(15, 23, 42, 0.82)";
            const labelWidth = Math.min(180, Math.max(72, label.length * 6.2));
            drawingContext.fillRect(projected.x - labelWidth / 2, projected.y + size + 8, labelWidth, 22);
            drawingContext.fillStyle = "#e2e8f0";
            drawingContext.font = "600 11px Inter, system-ui, sans-serif";
            drawingContext.fillText(label, projected.x, projected.y + size + 19);
          }
        }
      }

      drawingContext.restore();
      drawingContext.globalAlpha = 1;
      drawingContext.shadowBlur = 0;
      drawingContext.strokeStyle = "rgba(226, 232, 240, 0.22)";
      drawingContext.lineWidth = 1;
      drawingContext.beginPath();
      drawingContext.arc(centerX, centerY, radius, 0, Math.PI * 2);
      drawingContext.stroke();

      rotation += 0.06;
      animationFrame = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, [normalizedPoints]);

  const livePoints = normalizedPoints.filter((point) => point.isLive);
  const featuredPoints = livePoints.length > 0 ? livePoints : normalizedPoints.slice(0, 5);

  return (
    <section className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950 shadow-sm">
      <div className="grid min-h-[540px] lg:grid-cols-[1.5fr_0.85fr]">
        <div className="relative min-h-[380px]">
          <canvas ref={canvasRef} className="h-full min-h-[380px] w-full" />
          <div className="pointer-events-none absolute left-5 top-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">Live visitor globe</p>
            <h2 className="mt-2 max-w-sm text-2xl font-semibold text-white">Where WerkCV visitors are coming from right now</h2>
          </div>
          {normalizedPoints.length === 0 ? (
            <div className="absolute inset-x-5 top-1/2 -translate-y-1/2 rounded-lg border border-slate-700 bg-slate-950/82 p-5 text-center">
              <p className="text-sm font-semibold text-white">No mapped visitors yet</p>
              <p className="mt-2 text-sm text-slate-300">
                Pins appear after new page views include geolocation. The first visits after deployment may still be unmapped.
              </p>
            </div>
          ) : null}
          <div className="pointer-events-none absolute bottom-4 left-5 flex flex-wrap gap-2 text-xs">
            {Object.entries(sourceColors).slice(0, 6).map(([source, color]) => (
              <span key={source} className="flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-slate-200">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                {source}
              </span>
            ))}
          </div>
        </div>
        <aside className="border-t border-slate-800 bg-slate-950/96 p-5 lg:border-l lg:border-t-0">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-md border border-slate-800 bg-slate-900 p-3">
              <p className="text-xs text-slate-400">Live</p>
              <p className="mt-1 text-2xl font-semibold text-white">{livePoints.length}</p>
            </div>
            <div className="rounded-md border border-slate-800 bg-slate-900 p-3">
              <p className="text-xs text-slate-400">Mapped</p>
              <p className="mt-1 text-2xl font-semibold text-white">{normalizedPoints.length}</p>
            </div>
            <div className="rounded-md border border-slate-800 bg-slate-900 p-3">
              <p className="text-xs text-slate-400">Updated</p>
              <p className="mt-1 text-sm font-semibold text-white">{generatedAt}</p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {featuredPoints.length === 0 ? (
              <div className="rounded-md border border-slate-800 bg-slate-900 p-4 text-sm text-slate-400">
                New visits will appear here after geolocation is captured.
              </div>
            ) : (
              featuredPoints.map((point) => (
                <div key={point.id} className="rounded-md border border-slate-800 bg-slate-900 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">
                        {[point.city, point.country].filter(Boolean).join(", ") || "Unknown location"}
                      </p>
                      <p className="mt-1 max-w-[260px] truncate text-sm text-slate-400">{point.page}</p>
                    </div>
                    <span
                      className="rounded-full px-2 py-1 text-xs font-semibold text-white"
                      style={{ backgroundColor: sourceColors[point.sourceType] || sourceColors.unknown }}
                    >
                      {point.sourceType}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-300">{point.sourceLabel}</p>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
