import { GetStaticProps } from 'next';
import { Messages } from '../../containers/UserDashboards';
import getGlobalSettings from '../../contentful/getGlobalSettings';

export const getStaticProps: GetStaticProps = async () => {
  const globalSettings = await getGlobalSettings();
  const props = { globalSettings, title: 'Messages', isProtected: true };

  return { props };
};

export default Messages;
