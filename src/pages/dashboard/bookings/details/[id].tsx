import { GetServerSideProps } from 'next';
import { MyBooking } from '../../../../containers/UserDashboards';
import { getGlobalSettings, getInstructions } from '../../../../contentful';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const instructions = await getInstructions('Host');
  const globalSettings = await getGlobalSettings();
  const props = {
    globalSettings,
    instructions,
    isProtected: true,
    title: 'Booking Details',
    id: context?.params?.id,
  };

  return { props };
};

export default MyBooking;
