import { GetStaticProps } from 'next';
import { BusinessAccountSettings } from '../../../containers/UserDashboards';
import getGlobalSettings from '../../../contentful/getGlobalSettings';

export const getStaticProps: GetStaticProps = async () => {
  const globalSettings = await getGlobalSettings();
  const props = { globalSettings, title: 'Account settings', isProtected: true };

  return { props };
};

export default BusinessAccountSettings;
