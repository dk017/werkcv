import { checkWritingFacts } from "./ai-writing-facts";

/** Section generation cannot establish a new ordering or donate facts across bullets. */
export function preserveSafeBulletPositions(original: string[], proposed: string[]): string[] {
  if (original.length !== proposed.length) return [...original];
  if (proposed.some((text, index) => text !== original[index] && original.some((other, sourceIndex) => sourceIndex !== index && other === text))) return [...original];
  return proposed.map((text, index) => !text.trim() || checkWritingFacts(original[index], text).length ? original[index] : text);
}
