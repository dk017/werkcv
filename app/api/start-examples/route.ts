import { NextResponse } from "next/server";
import { getAllCategories, getAllExamples } from "@/lib/cv-voorbeelden/registry";
import { englishRoleExamples } from "@/lib/english-role-examples";
import type { StartExampleSummary } from "@/lib/start-choice";

// "Begin met een voorbeeld voor je functie" in the editor's start choice (lib/start-choice.ts).
// Without ?key: a light list to search in the browser. With ?key: that one example CV.
// Public data (the same examples as the /cv-voorbeelden pages), so no login is needed.

const CACHE = { "Cache-Control": "public, max-age=3600, s-maxage=3600" };

function dutchList(): StartExampleSummary[] {
  const groups = new Map(getAllCategories().map((category) => [category.slug, category.name]));
  return getAllExamples().map((example) => ({
    key: `${example.categorySlug}/${example.slug}`,
    name: example.name,
    group: groups.get(example.categorySlug) || "",
    terms: example.keywords.join(" ").toLowerCase(),
  }));
}

function englishList(): StartExampleSummary[] {
  return Object.values(englishRoleExamples).map((example) => ({
    key: `en:${example.roleSlug}`,
    name: example.sampleCV.personal.title || example.roleSlug,
    group: "English CV",
    terms: `${example.roleSlug.replace(/-/g, " ")} ${example.h1}`.toLowerCase(),
  }));
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") === "en" ? "en" : "nl";
  const key = url.searchParams.get("key");

  if (!key) {
    // English visitors see the English examples first; the Dutch ones remain available.
    const examples = locale === "en" ? [...englishList(), ...dutchList()] : dutchList();
    return NextResponse.json({ examples }, { headers: CACHE });
  }

  if (key.startsWith("en:")) {
    const example = Object.values(englishRoleExamples).find((entry) => entry.roleSlug === key.slice(3));
    if (!example) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    return NextResponse.json(
      { key, name: example.sampleCV.personal.title, sampleCV: example.sampleCV, templateId: example.templateId, colorThemeId: example.colorThemeId },
      { headers: CACHE },
    );
  }

  const [categorySlug, slug] = key.split("/");
  const example = getAllExamples().find((entry) => entry.categorySlug === categorySlug && entry.slug === slug);
  if (!example) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  return NextResponse.json(
    { key, name: example.name, sampleCV: example.sampleCV, templateId: example.templateId, colorThemeId: example.colorThemeId },
    { headers: CACHE },
  );
}
