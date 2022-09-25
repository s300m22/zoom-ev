import { GetStaticProps } from 'next';
import Page, { PageProps } from '../../containers/Page/Page';
import { getGlobalSettings, getPageByUrlSlug } from '../../contentful';

export const getServerSideProps: GetStaticProps = async ({ params }) => {
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
    getPageByUrlSlug(urlSlug, true),
    getGlobalSettings(),
  ]);
  const props: PageProps = { page, globalSettings };

  return { props };
};

export default Page;
