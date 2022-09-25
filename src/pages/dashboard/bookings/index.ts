import { GetServerSideProps } from 'next';
import { MyBookings } from '../../../containers/UserDashboards';
import getGlobalSettings from '../../../contentful/getGlobalSettings';

export const getServerSideProps: GetServerSideProps = async () => {
  const globalSettings = await getGlobalSettings();
  const props = {
    globalSettings,
    title: 'Bookings',
    isProtected: true,
    at: null,
  };

  return { props };
};
export default MyBookings;
