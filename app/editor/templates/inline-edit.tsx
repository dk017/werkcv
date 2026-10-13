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
    /** Accessible name and empty-field hint, in the app language. */
    label: (field: InlineField) => string;
};

export type InlineField =
    | "name" | "title" | "summary" | "email" | "phone" | "city" | "linkedIn" | "github" | "website"
    | "role" | "company" | "location" | "start" | "end" | "description" | "bullet"
    | "degree" | "school" | "skill" | "language";

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
};

const EDITABLE_CLASS = "cursor-text rounded-[2px] outline-none transition-colors hover:bg-[#4ecdc4]/10 focus:bg-[#4ecdc4]/15 focus:shadow-[0_0_0_2px_#4ecdc4] empty:inline-block empty:min-w-[3ch] empty:before:text-[#94a3b8] empty:before:content-[attr(data-placeholder)]";

export function Editable(props: EditableProps) {
    const api = useContext(InlineEditContext);
    if (!api) return <>{props.fallback ?? props.value ?? ""}</>;
    return <EditableField {...props} api={api} />;
}

function readText(element: HTMLElement, multiline: boolean): string {
    let text = (element.innerText ?? element.textContent ?? "").replace(/ /g, " ");
    // Browsers add a trailing newline for an empty or line-ending editable element.
    if (text.endsWith("\n") && !(element.textContent ?? "").endsWith("\n")) text = text.slice(0, -1);
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

function EditableField({ path, value, field, multiline = false, as: Tag = "span", className = "", list, api }: Omit<EditableProps, "fallback"> & { api: InlineEditApi }) {
    const label = api.label(field);
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
            api.onChange(path, valueAtFocus.current);
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
            data-placeholder={label}
            className={`${className} ${EDITABLE_CLASS}`.trim()}
            onFocus={() => { valueAtFocus.current = text; }}
            onInput={(event: React.FormEvent<HTMLElement>) => api.onChange(path, readText(event.currentTarget, multiline))}
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
