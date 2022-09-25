import { Auth } from '@aws-amplify/auth';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';
import { FacebookIcon, GoogleIcon } from '../../../../icons';
import { FacebookButton, GoogleButton, Wrapper } from './SocialButtons.styled';

const SocialButtons = () => (
  <Wrapper>
    <GoogleButton
      onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}
    >
      <GoogleIcon /> Google
    </GoogleButton>
    <FacebookButton
      onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook })}
    >
      <FacebookIcon /> Facebook
    </FacebookButton>
  </Wrapper>
);

export default SocialButtons;
