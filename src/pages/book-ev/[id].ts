import { GetServerSideProps } from 'next';
import BookEv from '../../containers/BookEv';
import getGlobalSettings from '../../contentful/getGlobalSettings';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const globalSettings = await getGlobalSettings();
  const props = {
    globalSettings,
    title: 'Book an EV',
    isProtected: true,
    carId: context?.params?.id,
  };

  return { props };
};

export default BookEv;
