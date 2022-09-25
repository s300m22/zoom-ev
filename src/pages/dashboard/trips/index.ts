import { GetServerSideProps } from 'next';
import { MyTrips } from '../../../containers/UserDashboards';
import getGlobalSettings from '../../../contentful/getGlobalSettings';

export const getServerSideProps: GetServerSideProps = async () => {
  const globalSettings = await getGlobalSettings();
  const props = {
    globalSettings,
    title: 'My trips',
    isProtected: true,
    at: null,
  };

  return { props };
};

export default MyTrips;
