import { applicationHelpArticles } from "@/lib/sollicitatiehulp/articles";
import { ApplicationHelpArticle, ApplicationHelpCategory } from "@/lib/sollicitatiehulp/types";

const sortedArticles = [...applicationHelpArticles].sort((a, b) => a.order - b.order);
const articleBySlug = new Map(sortedArticles.map((article) => [article.slug, article]));

export function getAllApplicationHelpArticles(): ApplicationHelpArticle[] {
  return sortedArticles;
}

export function getApplicationHelpArticle(slug: string): ApplicationHelpArticle | undefined {
  return articleBySlug.get(slug);
}

export function getApplicationHelpArticleParams(): Array<{ slug: string }> {
  return sortedArticles.map((article) => ({ slug: article.slug }));
}

export function getApplicationHelpArticlesByCategory(
  category: ApplicationHelpCategory,
): ApplicationHelpArticle[] {
  return sortedArticles.filter((article) => article.category === category);
}
