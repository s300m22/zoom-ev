import { GetStaticProps } from 'next';
import { Settings } from '../../containers/UserDashboards';
import getGlobalSettings from '../../contentful/getGlobalSettings';

export const getStaticProps: GetStaticProps = async () => {
  const globalSettings = await getGlobalSettings();
  const props = { globalSettings, title: 'Settings', isProtected: true };

  return { props };
};

export default Settings;
