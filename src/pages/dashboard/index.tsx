import { GetStaticProps } from 'next';
import { Dashboard } from '../../containers/UserDashboards';
import getGlobalSettings from '../../contentful/getGlobalSettings';

export const getStaticProps: GetStaticProps = async () => {
  const globalSettings = await getGlobalSettings();
  // eslint-disable-next-line no-console
  const props = { globalSettings, title: 'Dashboard', isProtected: true };

  return { props };
};

export default Dashboard;
