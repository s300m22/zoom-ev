import { GetServerSideProps } from 'next';
import { CarAvailability } from '../../../../containers/UserDashboards/MyCars';
import getGlobalSettings from '../../../../contentful/getGlobalSettings';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const globalSettings = await getGlobalSettings();
  const props = {
    globalSettings,
    title: 'Availability',
    isProtected: true,
    carId: context?.params?.id,
  };

  return { props };
};

export default CarAvailability;
