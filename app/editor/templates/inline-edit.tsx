"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useRef, type ElementType, type KeyboardEvent, type ReactNode } from "react";

// In-place editing of the CV document (stepped editor, Afronden step). Templates wrap their
// text in <Editable>. Without an InlineEditProvider (thumbnails, gallery, PDF, the normal
// preview) <Editable> renders the plain value, so nothing changes outside edit mode.

export type InlineEditApi = {
    onChange: (path: string, value: string) => void;
    /** Enter in a bullet: add an empty bullet after it. */
    insertListItem: (listPath: string, afterIndex: number) => void;
    /** Backspace in an empty bullet: remove it. */
    removeListItem: (listPath: string, index: number) => void;
    /** True once for the path that should get focus when it mounts (a new bullet, or the one before a removed bullet). */
    takeFocusRequest: (path: string) => boolean;
    /** Add an item at the end of a list and focus the given path once it renders. */
    appendListItem: (listPath: string, item: unknown, focusPath: string) => void;
    /** Accessible name and empty-field hint, in the app language. */
    label: (field: InlineField) => string;
};

export type InlineField =
    | "name" | "title" | "summary" | "email" | "phone" | "city" | "linkedIn" | "github" | "website"
    | "role" | "company" | "location" | "start" | "end" | "description" | "bullet"
    | "degree" | "school" | "skill" | "language" | "heading"
    | "addExperience" | "addEducation" | "addInternship" | "addBullet";

const InlineEditContext = createContext<InlineEditApi | null>(null);

export function InlineEditProvider({ value, children }: { value: InlineEditApi; children: ReactNode }) {
    return <InlineEditContext.Provider value={value}>{children}</InlineEditContext.Provider>;
}

export function useInlineEditing(): boolean {
    return useContext(InlineEditContext) !== null;
}

type EditableProps = {
    path: string;
    value: string | undefined | null;
    /** Which field this is: gives the accessible name and the hint shown while it is empty. */
    field: InlineField;
    multiline?: boolean;
    as?: ElementType;
    className?: string;
    /** For bullets: the list it belongs to and its position, so Enter/Backspace can add or remove. */
    list?: { path: string; index: number };
    /** What to render outside edit mode, when it differs from the plain value (a link, a fallback name). */
    fallback?: ReactNode;
    /** Hint while empty, when it should differ from the field label (e.g. the default heading). */
    placeholder?: string;
    /** Applied before storing (e.g. a heading typed back to its default is stored as "use default"). */
    normalize?: (text: string) => string;
};

const EDITABLE_CLASS = "cursor-text rounded-[2px] outline-none transition-colors hover:bg-[#4ecdc4]/10 focus:bg-[#4ecdc4]/15 focus:shadow-[0_0_0_2px_#4ecdc4] empty:inline-block empty:min-w-[3ch] empty:before:text-[#94a3b8] empty:before:content-[attr(data-placeholder)]";

export function Editable(props: EditableProps) {
    const api = useContext(InlineEditContext);
    if (!api) return <>{props.fallback ?? props.value ?? ""}</>;
    return <EditableField {...props} api={api} />;
}

function readText(element: HTMLElement, multiline: boolean): string {
    // The raw text, not innerText: innerText returns what CSS shows, so an uppercase heading
    // would be stored in capitals. Line breaks (<br>, or block elements in browsers without
    // plaintext-only) become newlines.
    const clone = element.cloneNode(true) as HTMLElement;
    clone.querySelectorAll("br").forEach((br) => br.replaceWith("\n"));
    clone.querySelectorAll("div, p").forEach((block) => block.prepend("\n"));
    let text = (clone.textContent ?? "").replace(/\u00a0/g, " ");
    if (text.startsWith("\n") && !(element.firstChild instanceof Text)) text = text.slice(1);
    // A trailing <br> keeps the caret on an empty last line; it is not content.
    if (text.endsWith("\n") && element.lastChild instanceof HTMLBRElement) text = text.slice(0, -1);
    return multiline ? text : text.replace(/\s*\n+\s*/g, " ");
}

function placeCaretAtEnd(element: HTMLElement) {
    const selection = window.getSelection();
    if (!selection) return;
    const range = document.createRange();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
}

function EditableField({ path, value, field, multiline = false, as: Tag = "span", className = "", list, placeholder, normalize, api }: Omit<EditableProps, "fallback"> & { api: InlineEditApi }) {
    const label = placeholder ? `${api.label(field)}: ${placeholder}` : api.label(field);
    const store = (raw: string) => api.onChange(path, normalize ? normalize(raw) : raw);
    const ref = useRef<HTMLElement>(null);
    const valueAtFocus = useRef("");
    const text = value ?? "";

    // Uncontrolled while focused: the browser owns the text the user is typing, so React never
    // rewrites it (that is what makes the caret jump). Outside focus, follow the form value.
    useLayoutEffect(() => {
        const element = ref.current;
        if (element && document.activeElement !== element && element.textContent !== text) element.textContent = text;
    }, [text]);

    // Checked after every render: list items are keyed by position, so the element that must take
    // focus (a new bullet in the middle of a list) may be an existing element whose value changed.
    useEffect(() => {
        const element = ref.current;
        if (element && api.takeFocusRequest(path)) {
            element.focus();
            placeCaretAtEnd(element);
        }
    });

    const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        const element = event.currentTarget;
        if (event.key === "Escape") {
            event.preventDefault();
            element.textContent = valueAtFocus.current;
            store(valueAtFocus.current);
            element.blur();
            return;
        }
        if (event.key === "Enter" && !(multiline && event.shiftKey)) {
            if (multiline && !list) return; // new line inside the profile text
            event.preventDefault();
            if (list) api.insertListItem(list.path, list.index);
            else element.blur();
            return;
        }
        if (event.key === "Backspace" && list && readText(element, false) === "") {
            event.preventDefault();
            api.removeListItem(list.path, list.index);
        }
    };

    return (
        <Tag
            ref={ref}
            contentEditable="plaintext-only"
            suppressContentEditableWarning
            role="textbox"
            aria-label={label}
            aria-multiline={multiline || undefined}
            tabIndex={0}
            spellCheck
            data-cv-inline=""
            data-placeholder={placeholder ?? label}
            className={`${className} ${EDITABLE_CLASS}`.trim()}
            onFocus={() => { valueAtFocus.current = text; }}
            onInput={(event: React.FormEvent<HTMLElement>) => store(readText(event.currentTarget, multiline))}
            onKeyDown={onKeyDown}
            onPaste={(event: React.ClipboardEvent<HTMLElement>) => {
                // Plain text only, also in browsers without contenteditable="plaintext-only".
                event.preventDefault();
                const pasted = event.clipboardData.getData("text/plain");
                document.execCommand("insertText", false, multiline ? pasted : pasted.replace(/\s*\n+\s*/g, " "));
            }}
        />
    );
}

/** Separator between two values ("Company | City"): shown when both are filled, or always while editing. */
export function InlineSeparator({ show, text }: { show: boolean; text: string }) {
    const editing = useInlineEditing();
    return show || editing ? <>{text}</> : null;
}

/** Renders children when the value is filled, or while editing (so an empty field can be filled in place). */
export function WhenFilledOrEditing({ value, children }: { value: unknown; children: ReactNode }) {
    const editing = useInlineEditing();
    const filled = typeof value === "string" ? value.trim().length > 0 : Boolean(value);
    return filled || editing ? <>{children}</> : null;
}

/** "+ add" in the document (edit mode only): a new entry or bullet, focused right away. */
export function InlineAddButton({ kind, listPath, count }: { kind: "experience" | "education" | "internship" | "bullet"; listPath: string; count: number }) {
    const api = useContext(InlineEditContext);
    if (!api) return null;
    const field: InlineField = kind === "experience" ? "addExperience" : kind === "education" ? "addEducation" : kind === "internship" ? "addInternship" : "addBullet";
    const add = () => {
        // Same shapes as the step forms create (sections.tsx), including the experience entry id
        // that AI writing uses to apply changes to the right job.
        const item = kind === "bullet"
            ? ""
            : kind === "education"
                ? { degree: "", school: "", start: "", end: "", location: "", description: "" }
                : { ...(kind === "experience" ? { entryId: crypto.randomUUID() } : {}), role: "", company: "", description: "", start: "", end: "", location: "", highlights: [] };
        const focus = kind === "bullet" ? `${listPath}.${count}` : `${listPath}.${count}.${kind === "education" ? "degree" : "role"}`;
        api.appendListItem(listPath, item, focus);
    };
    return (
        <button
            type="button"
            data-cv-inline-add=""
            onClick={add}
            className="mt-2 inline-flex items-center gap-1 rounded-full border border-dashed border-[#4ecdc4] bg-white px-3 py-1 text-[11px] font-bold text-[#173f38] hover:bg-[#e8f8f6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173f38]"
        >
            <span aria-hidden="true">+</span> {api.label(field)}
        </button>
    );
}
