import { type Metadata } from "next";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { generateMetadataObject } from '@/lib/shared/metadata';
import ClientSlugHandler from "../ClientSlugHandler";
import { BlogPageClient } from "@/components/blog-page-client";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const pageData = await fetchContentType('blog-page', {
    filters: { locale: params.locale },
    populate: "seo.metaImage",
  }, true)

  const seo = pageData?.seo || {
    metaTitle: "Blog - iConta24",
    metaDescription: "Articole utile despre contabilitate, fiscalitate și legislație pentru antreprenori."
  };
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function Blog({
  params,
}: {
  params: { locale: string };
}) {
  const blogPage = await fetchContentType('blog-page', {
    filters: { locale: params.locale },
  }, true)
  
  const articles = await fetchContentType('articles', {
    filters: { locale: params.locale },
    populate: ['image', 'categories'],
    sort: ['publishedAt:desc']
  }, false)

  const categories = await fetchContentType('categories', {
    filters: { locale: params.locale },
  }, false)

  // Safely handle localizations
  const localizedSlugs = blogPage?.localizations?.reduce(
    (acc: Record<string, string>, localization: any) => {
      acc[localization.locale] = "blog";
      return acc;
    },
    { [params.locale]: "blog" }
  ) || { [params.locale]: "blog" };

  const featuredArticle = articles?.data?.[0];
  const recentArticles = articles?.data?.slice(1) || [];

  return (
    <>
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      <BlogPageClient
        blogPage={blogPage}
        featuredArticle={featuredArticle}
        recentArticles={recentArticles}
        categories={categories}
        locale={params.locale}
        totalArticles={articles?.data?.length || 0}
      />
    </>
  );
}
