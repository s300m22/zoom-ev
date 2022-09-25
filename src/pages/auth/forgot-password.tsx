import { GetStaticProps } from 'next';
import { ForgotPassword } from '../../containers/Auth';
import getGlobalSettings from '../../contentful/getGlobalSettings';

export const getStaticProps: GetStaticProps = async () => {
  const globalSettings = await getGlobalSettings();
  return { props: { globalSettings, title: 'Forgot Password' } };
};

export default ForgotPassword;
