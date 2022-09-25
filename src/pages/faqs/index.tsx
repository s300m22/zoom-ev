import { GetStaticProps } from 'next';
import { getFaqPage } from '../../contentful';
import Page, { PageProps } from '../../containers/Faq/Page/Page';
import getGlobalSettings from '../../contentful/getGlobalSettings';

export const getStaticProps: GetStaticProps = async () => {
  const [page, globalSettings] = await Promise.all([getFaqPage(), getGlobalSettings()]);

  const props: PageProps = { page, globalSettings };

  return { props };
};

export default Page;
