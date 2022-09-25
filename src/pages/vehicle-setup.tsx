import { GetStaticProps } from 'next';
import { getGlobalSettings } from '../contentful';
import VehicleSetup from '../containers/VehicleSetup';

export const getStaticProps: GetStaticProps = async () => {
  const globalSettings = await getGlobalSettings();
  const props = { globalSettings, title: 'Vehicle Setup', isProtected: true };

  return { props };
};

export default VehicleSetup;
