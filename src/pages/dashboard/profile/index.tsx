import { GetStaticProps } from 'next';
import { Profile } from '../../../containers/UserDashboards';
import getGlobalSettings from '../../../contentful/getGlobalSettings';

export const getStaticProps: GetStaticProps = async () => {
  const globalSettings = await getGlobalSettings();
  const props = { globalSettings, title: 'Profile', isProtected: true };

  return { props };
};

export default Profile;
