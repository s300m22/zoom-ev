import { GetServerSideProps } from 'next';
import Car from '../../containers/Car';
import getGlobalSettings from '../../contentful/getGlobalSettings';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const globalSettings = await getGlobalSettings();
  const props = {
    globalSettings,
    title: 'Car',
    carId: context?.params?.id,
  };

  return { props };
};

export default Car;
