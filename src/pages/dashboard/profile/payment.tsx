import { GetStaticProps } from 'next';
// import { PaymentMethod } from '../../../containers/UserDashboards';
import { PaymentMethod } from '../../../containers/UserDashboards/Profile/components';
import getGlobalSettings from '../../../contentful/getGlobalSettings';

export const getStaticProps: GetStaticProps = async () => {
  const globalSettings = await getGlobalSettings();
  const props = { globalSettings, title: 'Payment method', isProtected: true };

  return { props };
};

export default PaymentMethod;
