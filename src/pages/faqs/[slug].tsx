import { GetStaticPaths, GetStaticProps } from 'next';
import { IFaqPageFields } from '../../interfaces/contentful.types.generated';
import { getFaqArticle } from '../../contentful';
import contentfulClient from '../../contentful/client';
import Article, { PageProps } from '../../containers/Faq/Article/Article';
import getGlobalSettings from '../../contentful/getGlobalSettings';

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await contentfulClient.getEntries<IFaqPageFields>({
    content_type: 'faq',
    resolveLinks: true,
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

  const [{ article, articleSection, banner }, globalSettings] = await Promise.all([
    getFaqArticle(urlSlug),
    getGlobalSettings(),
  ]);

  const props: PageProps = { article, articleSection, banner, globalSettings };

  return { props };
};

export default Article;
