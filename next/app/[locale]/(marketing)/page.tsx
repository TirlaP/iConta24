import { Metadata } from 'next';

import { generateMetadataObject } from '@/lib/shared/metadata';
import PageContent from '@/lib/shared/PageContent';
import fetchContentType from '@/lib/strapi/fetchContentType';
import ClientSlugHandler from './ClientSlugHandler';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {

  const pageData = await fetchContentType(
    'pages',
    {
      filters: {
        slug: "",
        locale: params.locale,
      },
      populate: "seo.metaImage",
    },
    true
  );

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function HomePage({ params }: { params: { locale: string } }) {

  const pageData = await fetchContentType(
    'pages',
    {
      filters: {
        slug: "",
        locale: params.locale,
      },
      populate: {
        dynamic_zone: {
          populate: "*"
        },
        seo: {
          populate: "*"
        },
        localizations: {
          populate: "*"
        }
      }
    },
    true
  );

  const localizedSlugs = pageData?.localizations?.reduce(
    (acc: Record<string, string>, localization: any) => {
      acc[localization.locale] = "";
      return acc;
    },
    { [params.locale]: "" }
  );

  return <>
    <ClientSlugHandler localizedSlugs={localizedSlugs} />
    <PageContent pageData={pageData} />
  </>;
}
