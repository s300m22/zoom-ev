import { GetStaticProps } from 'next';
import { Payouts } from '../../containers/UserDashboards';
import getGlobalSettings from '../../contentful/getGlobalSettings';

export const getStaticProps: GetStaticProps = async () => {
  const globalSettings = await getGlobalSettings();
  const props = { globalSettings, title: 'Payouts', isProtected: true };

  return { props };
};

export default Payouts;
