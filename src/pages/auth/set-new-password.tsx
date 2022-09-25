import { GetStaticProps } from 'next';
import { VerificationCode } from '../../containers/Auth';
import getGlobalSettings from '../../contentful/getGlobalSettings';

export const getStaticProps: GetStaticProps = async () => {
  const globalSettings = await getGlobalSettings();
  return { props: { globalSettings, title: 'Password Reset', type: 'verify-reset' } };
};

export default VerificationCode;
