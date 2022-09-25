import { GetStaticProps } from 'next';
import { getGlobalSettings } from '../contentful';
import IntroduceYourself from '../containers/IntroduceYourself';

export const getStaticProps: GetStaticProps = async () => {
  const globalSettings = await getGlobalSettings();
  const props = { globalSettings, title: 'Introduce yourself', isProtected: true };

  return { props };
};

export default IntroduceYourself;
