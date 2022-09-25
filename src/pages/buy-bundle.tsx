import { GetStaticProps } from 'next';
import { getGlobalSettings } from '../contentful';
import BuyBundle from '../containers/BuyBundle';

export const getStaticProps: GetStaticProps = async () => {
  const globalSettings = await getGlobalSettings();
  const props = { globalSettings, title: 'Buy Bundle' };

  return { props };
};

export default BuyBundle;
