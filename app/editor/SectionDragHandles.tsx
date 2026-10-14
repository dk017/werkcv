"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import type { CvBodySectionId } from "@/lib/cv-sections";
import { Icon } from "@/components/app/icons";

type Hover = { id: CvBodySectionId; lane: HTMLElement; top: number; left: number };
type Drag = { id: CvBodySectionId; lane: HTMLElement; ids: CvBodySectionId[]; from: number; target: number; indicatorTop: number };

const COPY = {
    nl: { move: (name: string) => `Verplaats ${name}: sleep, of gebruik pijltje omhoog en omlaag. Tijdens het typen: Alt + pijltje.` },
    en: { move: (name: string) => `Move ${name}: drag, or use the up and down arrow keys. While typing: Alt + arrow.` },
} as const;

/** The sections shown in a lane, in order (custom sections share one id and move together). */
function laneSections(lane: HTMLElement) {
    const groups = new Map<CvBodySectionId, { top: number; bottom: number }>();
    for (const element of Array.from(lane.querySelectorAll<HTMLElement>("[data-cv-section]"))) {
        if (element.closest("[data-cv-lane]") !== lane) continue;
        const id = element.dataset.cvSection as CvBodySectionId;
        const rect = element.getBoundingClientRect();
        const group = groups.get(id);
        groups.set(id, group ? { top: Math.min(group.top, rect.top), bottom: Math.max(group.bottom, rect.bottom) } : { top: rect.top, bottom: rect.bottom });
    }
    return Array.from(groups, ([id, rect]) => ({ id, ...rect }));
}

// Drag-and-drop reordering of CV sections in document mode. A grip appears next to the section
// under the pointer; sections move within their lane (main column or sidebar), so two-column
// designs keep their structure. Keyboard: focus the grip and use the arrow keys.
export default function SectionDragHandles({ rootRef, sectionLabel, onReorder, locale }: {
    rootRef: RefObject<HTMLElement | null>;
    sectionLabel: (id: CvBodySectionId) => string;
    onReorder: (id: CvBodySectionId, visibleLane: CvBodySectionId[], targetIndex: number) => void;
    locale: "nl" | "en";
}) {
    const [hover, setHover] = useState<Hover | null>(null);
    const [drag, setDrag] = useState<Drag | null>(null);
    const gripRef = useRef<HTMLButtonElement>(null);

    const position = useCallback((element: HTMLElement): { top: number; left: number } | null => {
        const root = rootRef.current;
        if (!root) return null;
        const rootRect = root.getBoundingClientRect();
        const rect = element.getBoundingClientRect();
        return { top: rect.top - rootRect.top + root.scrollTop, left: rect.left - rootRect.left + root.scrollLeft };
    }, [rootRef]);

    const hoverSection = useCallback((id: CvBodySectionId, lane: HTMLElement) => {
        const element = lane.querySelector<HTMLElement>(`[data-cv-section="${id}"]`);
        const at = element ? position(element) : null;
        if (element && at) setHover({ id, lane, ...at });
    }, [position]);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        const onMove = (event: PointerEvent) => {
            if (drag) return;
            const target = event.target as HTMLElement | null;
            if (target?.closest("[data-section-grip]")) return;
            const section = target?.closest<HTMLElement>("[data-cv-section]");
            const lane = section?.closest<HTMLElement>("[data-cv-lane]");
            if (section && lane) hoverSection(section.dataset.cvSection as CvBodySectionId, lane);
            else if (document.activeElement !== gripRef.current) setHover(null);
        };
        // Keyboard: focus inside a section shows its grip, and Alt + arrow moves the section you are
        // typing in (the grip itself also takes the arrow keys).
        const onFocusIn = (event: FocusEvent) => {
            const target = event.target as HTMLElement | null;
            if (target?.closest("[data-section-grip]")) return;
            const section = target?.closest<HTMLElement>("[data-cv-section]");
            const lane = section?.closest<HTMLElement>("[data-cv-lane]");
            if (section && lane) hoverSection(section.dataset.cvSection as CvBodySectionId, lane);
        };
        const onKey = (event: KeyboardEvent) => {
            if (!event.altKey || (event.key !== "ArrowUp" && event.key !== "ArrowDown")) return;
            const target = event.target as HTMLElement | null;
            const section = target?.closest<HTMLElement>("[data-cv-section]");
            const lane = section?.closest<HTMLElement>("[data-cv-lane]");
            if (!section || !lane || target?.closest("[data-section-grip]")) return;
            event.preventDefault();
            const id = section.dataset.cvSection as CvBodySectionId;
            const ids = laneSections(lane).map((entry) => entry.id);
            const from = ids.indexOf(id);
            const to = from + (event.key === "ArrowUp" ? -1 : 1);
            if (from < 0 || to < 0 || to >= ids.length) return;
            const label = target?.getAttribute("aria-label");
            onReorder(id, ids, to);
            // Moving the section can drop focus; put it back on the same field.
            requestAnimationFrame(() => requestAnimationFrame(() => {
                const moved = lane.querySelector<HTMLElement>(`[data-cv-section="${id}"]`);
                const field = (label && moved?.querySelector<HTMLElement>(`[data-cv-inline][aria-label="${CSS.escape(label)}"]`)) || moved?.querySelector<HTMLElement>("[data-cv-inline]");
                field?.focus();
                hoverSection(id, lane);
            }));
        };
        root.addEventListener("pointermove", onMove);
        root.addEventListener("focusin", onFocusIn);
        root.addEventListener("keydown", onKey);
        return () => {
            root.removeEventListener("pointermove", onMove);
            root.removeEventListener("focusin", onFocusIn);
            root.removeEventListener("keydown", onKey);
        };
    }, [drag, hoverSection, onReorder, rootRef]);

    const indicatorFor = (sections: ReturnType<typeof laneSections>, target: number, dragged: CvBodySectionId) => {
        const others = sections.filter((section) => section.id !== dragged);
        const root = rootRef.current!;
        const rootTop = root.getBoundingClientRect().top - root.scrollTop;
        const y = target >= others.length ? others[others.length - 1].bottom + 4 : others[target].top - 4;
        return y - rootTop;
    };

    const startDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
        if (!hover || event.button !== 0) return;
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        const sections = laneSections(hover.lane);
        const ids = sections.map((section) => section.id);
        const from = ids.indexOf(hover.id);
        if (from < 0 || sections.length < 2) return;
        setDrag({ id: hover.id, lane: hover.lane, ids, from, target: from, indicatorTop: indicatorFor(sections, from, hover.id) });
    };

    const moveDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
        if (!drag) return;
        const sections = laneSections(drag.lane);
        const others = sections.filter((section) => section.id !== drag.id);
        const target = others.filter((section) => (section.top + section.bottom) / 2 < event.clientY).length;
        if (target !== drag.target) setDrag({ ...drag, target, indicatorTop: indicatorFor(sections, target, drag.id) });
    };

    const endDrag = () => {
        if (!drag) return;
        const { id, ids, from, target, lane } = drag;
        setDrag(null);
        if (target !== from) {
            onReorder(id, ids, target);
            requestAnimationFrame(() => requestAnimationFrame(() => hoverSection(id, lane)));
        }
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (!hover || (event.key !== "ArrowUp" && event.key !== "ArrowDown")) return;
        event.preventDefault();
        const ids = laneSections(hover.lane).map((section) => section.id);
        const from = ids.indexOf(hover.id);
        const target = from + (event.key === "ArrowUp" ? -1 : 1);
        if (from < 0 || target < 0 || target >= ids.length) return;
        onReorder(hover.id, ids, target);
        const { id, lane } = hover;
        requestAnimationFrame(() => requestAnimationFrame(() => hoverSection(id, lane)));
    };

    if (!hover) return null;
    const name = sectionLabel(hover.id);
    return (
        <>
            <button
                ref={gripRef}
                type="button"
                data-section-grip=""
                aria-label={COPY[locale].move(name)}
                title={name}
                onPointerDown={startDrag}
                onPointerMove={moveDrag}
                onPointerUp={endDrag}
                onPointerCancel={() => setDrag(null)}
                onKeyDown={onKeyDown}
                onBlur={() => { if (!drag) setHover(null); }}
                className={`absolute z-20 flex h-7 w-7 touch-none items-center justify-center rounded-md border border-[#4ecdc4] bg-white text-[#173f38] shadow-sm hover:bg-[#e8f8f6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173f38] ${drag ? "cursor-grabbing" : "cursor-grab"}`}
                style={{ top: hover.top, left: Math.max(4, hover.left - 34) }}
            >
                <Icon name="grip" size={16} aria-hidden="true" />
            </button>
            {drag ? (
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute z-20 h-[3px] rounded-full bg-[#4ecdc4]"
                    style={{ top: drag.indicatorTop, left: hover.left - 8, width: drag.lane.getBoundingClientRect().width - 16 }}
                />
            ) : null}
        </>
    );
}
