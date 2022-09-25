import { Dispatch, SetStateAction } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { LoginRegisterComponent, TellUsMoreComponent } from '../../../Auth';
import AuthUserBundleFlowWrapper from './AuthUserBundleFlowWrapper.styled';
import VerificationCode from './VerificationCode';

interface AuthUserBundleFlowProps {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  setActiveNavStep: Dispatch<SetStateAction<number>>;
}
const AuthUserBundleFlow = ({
  activeStep,
  setActiveStep,
  setActiveNavStep,
}: AuthUserBundleFlowProps) => (
  <AuthUserBundleFlowWrapper>
    {activeStep === 1 ? (
      <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}>
        <LoginRegisterComponent
          activePage="register"
          setActiveNavStep={setActiveNavStep}
          setActiveStep={setActiveStep}
        />
      </GoogleReCaptchaProvider>
    ) : null}
    {activeStep === 2 ? <VerificationCode setActiveStep={setActiveStep} /> : null}
    {activeStep === 3 ? (
      <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}>
        <LoginRegisterComponent
          activePage="login"
          setActiveNavStep={setActiveNavStep}
          setActiveStep={setActiveStep}
        />
      </GoogleReCaptchaProvider>
    ) : null}
    {activeStep === 4 ? (
      <TellUsMoreComponent setActiveNavStep={setActiveNavStep} setActiveStep={setActiveStep} />
    ) : null}
  </AuthUserBundleFlowWrapper>
);

export default AuthUserBundleFlow;
