import { GetStaticProps } from 'next';
import { ProfileDetails } from '../../../containers/UserDashboards';
import getGlobalSettings from '../../../contentful/getGlobalSettings';

export const getStaticProps: GetStaticProps = async () => {
  const globalSettings = await getGlobalSettings();
  const props = { globalSettings, title: 'Profile Details', isProtected: true };

  return { props };
};

export default ProfileDetails;
