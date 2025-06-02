import React from "react";
import { type Metadata } from "next";
import { BlogLayout } from "@/components/blog-layout";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { generateMetadataObject } from '@/lib/shared/metadata';
import { ArticleContent } from "@/components/article-content";
import ClientSlugHandler from "../../ClientSlugHandler";

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const article = await fetchContentType(
    "articles",
    {
      filters: {
        slug: params.slug,
        locale: params.locale,
      },
      populate: "seo.metaImage",
    },
    true,
  );

  const seo = article?.seo || {
    metaTitle: article?.title || "Article - iConta24",
    metaDescription: article?.description || "Citește articolul nostru despre contabilitate și fiscalitate."
  };
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function SingleArticlePage({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const article = await fetchContentType(
    "articles",
    {
      filters: {
        slug: params.slug,
        locale: params.locale,
      },
      populate: ['image', 'categories', 'dynamic_zone']
    },
    true,
  );

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Articolul nu a fost găsit</h1>
          <a href={`/${params.locale}/blog`} className="text-primary hover:underline">
            Înapoi la blog
          </a>
        </div>
      </div>
    );
  }

  // Safely handle localizations
  const localizedSlugs = article.localizations?.reduce(
    (acc: Record<string, string>, localization: any) => {
      acc[localization.locale] = localization.slug;
      return acc;
    },
    { [params.locale]: params.slug }
  ) || { [params.locale]: params.slug };

  // Get related articles
  const relatedArticles = await fetchContentType(
    "articles",
    {
      filters: {
        locale: params.locale,
        slug: {
          $ne: params.slug
        },
        ...(article.categories && article.categories.length > 0 ? {
          categories: {
            id: {
              $in: article.categories.map((cat: any) => cat.id)
            }
          }
        } : {})
      },
      populate: ['image', 'categories'],
      pagination: {
        limit: 3
      },
      sort: ['publishedAt:desc']
    },
    false,
  );

  return (
    <BlogLayout article={article} locale={params.locale} relatedArticles={relatedArticles?.data || []}>
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      <ArticleContent content={article.content} />
    </BlogLayout>
  );
}
