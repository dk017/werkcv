export const editorFocusTargets = ["profile", "skills"] as const;

export type EditorFocusTarget = (typeof editorFocusTargets)[number];

export function normalizeEditorFocus(value: unknown): EditorFocusTarget | null {
  if (typeof value !== "string") return null;
  if (value !== "profile" && value !== "skills") return null;
  return value;
}

export function editorFocusAnchor(
  target: EditorFocusTarget,
): "section-personal" | "section-skills" {
  return target === "profile" ? "section-personal" : "section-skills";
}
