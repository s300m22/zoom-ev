import { GetStaticProps } from 'next';
import { TellUsMorePage } from '../../containers/Auth';
import getGlobalSettings from '../../contentful/getGlobalSettings';

export const getStaticProps: GetStaticProps = async () => {
  const globalSettings = await getGlobalSettings();
  return { props: { globalSettings, title: 'Tell us more', isProtected: true } };
};

export default TellUsMorePage;
