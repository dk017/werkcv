import { skillGuideArticles } from "@/lib/vaardigheden-gids/articles";
import type { SkillGuideArticle, SkillGuideCategory } from "@/lib/vaardigheden-gids/types";

const sortedArticles = [...skillGuideArticles].sort((a, b) => a.order - b.order);
const articleBySlug = new Map(sortedArticles.map((article) => [article.slug, article]));

export function getAllSkillGuideArticles(): SkillGuideArticle[] {
  return sortedArticles;
}

export function getSkillGuideArticle(slug: string): SkillGuideArticle | undefined {
  return articleBySlug.get(slug);
}

export function getSkillGuideParams(): Array<{ slug: string }> {
  return sortedArticles.map((article) => ({ slug: article.slug }));
}

export function getSkillGuidesByCategory(category: SkillGuideCategory): SkillGuideArticle[] {
  return sortedArticles.filter((article) => article.category === category);
}
