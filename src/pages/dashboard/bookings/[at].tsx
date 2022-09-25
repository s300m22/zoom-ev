import { GetServerSideProps } from 'next';
import { MyBookings } from '../../../containers/UserDashboards';
import getGlobalSettings from '../../../contentful/getGlobalSettings';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const globalSettings = await getGlobalSettings();
  const props = {
    globalSettings,
    title: 'Bookings',
    isProtected: true,
    at: context?.params?.at,
  };

  return { props };
};
export default MyBookings;
