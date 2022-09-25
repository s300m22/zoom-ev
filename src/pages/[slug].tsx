import { GetStaticPaths, GetStaticProps } from 'next';
import { IPageFields } from '../interfaces/contentful.types.generated';
import contentfulClient from '../contentful/client';
import Page, { PageProps } from '../containers/Page/Page';
import { getGlobalSettings, getPageByUrlSlug } from '../contentful';

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await contentfulClient.getEntries<IPageFields>({
    content_type: 'page',
    'fields.urlSlug[ne]': 'blog',
    limit: 1000,
    resolveLinks: false,
  });

  return {
    paths: pages.items.map(({ fields }) => ({
      params: {
        slug: fields.urlSlug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let urlSlug;

  if (params) {
    const { slug } = params;
    if (Array.isArray(slug)) {
      [urlSlug] = slug;
    } else {
      urlSlug = slug;
    }
  }

  if (!urlSlug) {
    throw new TypeError('Undefined urlSlug');
  }

  const [page, globalSettings] = await Promise.all([
    getPageByUrlSlug(urlSlug),
    getGlobalSettings(),
  ]);
  const props: PageProps = { page, globalSettings };

  return { props };
};

export default Page;
