import { GetStaticProps } from 'next';
import Search from '../../containers/Search';
import getGlobalSettings from '../../contentful/getGlobalSettings';

export const getStaticProps: GetStaticProps = async () => {
  const globalSettings = await getGlobalSettings();
  return { props: { globalSettings, title: 'Search' } };
};

export default Search;
