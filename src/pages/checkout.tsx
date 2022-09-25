import { GetStaticProps } from 'next';
import { CheckoutPage } from '../containers/Checkout';
import getGlobalSettings from '../contentful/getGlobalSettings';

export const getStaticProps: GetStaticProps = async () => {
  const globalSettings = await getGlobalSettings();
  return { props: { globalSettings, title: 'Checkout', isProtected: true } };
};

export default CheckoutPage;
