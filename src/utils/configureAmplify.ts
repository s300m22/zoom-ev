import Amplify from '@aws-amplify/auth';
import logError from './logError';

export const configureAmplify = (): void => {
  try {
    Amplify.configure({
      Auth: {
        region: process.env.NEXT_PUBLIC_COGNITO_AWS_REGION,
        userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
        userPoolWebClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID,
        oauth: {
          domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN || '',
          scope: ['profile', 'email', 'openid'],
          redirectSignIn: process.env.NEXT_PUBLIC_COGNITO_REDIRECT_SIGN_IN || '',
          redirectSignOut: process.env.NEXT_PUBLIC_COGNITO_REDIRECT_SIGN_OUT || '',
          responseType: 'code',
        },
      },
      ssr: true,
    });
  } catch (error) {
    logError('AWS Secrets required');
  }
};

export default configureAmplify;
