import { GetStaticProps } from 'next';
import { getGlobalSettings } from '../contentful';
import PageNotFound, { PageNotFoundProps } from '../containers/PageNotFound/PageNotFound';

export const getStaticProps: GetStaticProps = async () => {
  const globalSettings = await getGlobalSettings();
  const props: PageNotFoundProps = { globalSettings };

  return { props };
};

export default PageNotFound;
