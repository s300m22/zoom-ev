import { GetStaticProps } from 'next';
import { LoginRegisterPage } from '../../containers/Auth';
import getGlobalSettings from '../../contentful/getGlobalSettings';

export const getStaticProps: GetStaticProps = async () => {
  const globalSettings = await getGlobalSettings();
  return { props: { globalSettings, title: 'Register' } };
};

export default LoginRegisterPage;
