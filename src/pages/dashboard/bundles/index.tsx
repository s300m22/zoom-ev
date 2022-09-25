import { GetStaticProps } from 'next';
import { MyBundles } from '../../../containers/UserDashboards';
import getGlobalSettings from '../../../contentful/getGlobalSettings';

export const getStaticProps: GetStaticProps = async () => {
  const globalSettings = await getGlobalSettings();
  const props = { globalSettings, title: 'Welcome to the home of EV benefits', isProtected: true };

  return { props };
};

export default MyBundles;
