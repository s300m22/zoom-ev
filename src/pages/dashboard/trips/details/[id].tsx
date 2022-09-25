import { GetServerSideProps } from 'next';
import { MyTrip } from '../../../../containers/UserDashboards';
import { getGlobalSettings, getInstructions } from '../../../../contentful';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const instructions = await getInstructions('Guest');
  const globalSettings = await getGlobalSettings();
  const props = {
    globalSettings,
    instructions,
    isProtected: true,
    id: context?.params?.id,
  };

  return { props };
};

export default MyTrip;
