// Shared words such as "in" and "of" cannot distinguish Dutch from English.
// This is a conservative mismatch signal, not a language-quality assessment.
const dutch = new Set("de het een en van voor met op ik je voerde beantwoordde gebruikte verwerkte hielp ondersteunde facturen bestellingen opleiding onder begeleiding geen niet zonder".split(" "));
const english = new Set("the and an for with to i you entered answered used processed helped supported invoices orders education under supervision not without".split(" "));

export function detectWritingLanguage(text: string): "nl" | "en" | "unknown" {
  const words = new Set(text.toLocaleLowerCase("en").match(/[\p{L}]+/gu) || []);
  const nl = [...words].filter(word => dutch.has(word)).length;
  const en = [...words].filter(word => english.has(word)).length;
  if (nl === en) return "unknown";
  return nl > en ? "nl" : "en";
}
