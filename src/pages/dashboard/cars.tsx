import { GetStaticProps } from 'next';
import { MyCars } from '../../containers/UserDashboards';
import getGlobalSettings from '../../contentful/getGlobalSettings';

export const getStaticProps: GetStaticProps = async () => {
  const globalSettings = await getGlobalSettings();
  const props = { globalSettings, title: 'My EVs ', isProtected: true };

  return { props };
};

export default MyCars;
