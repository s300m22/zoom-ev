import { useState, useEffect, Dispatch, SetStateAction, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';
import { Auth } from '@aws-amplify/auth';
import {
  Button,
  Heading,
  SimpleCard,
  TextField,
  StrikethroughText,
  StyledLink,
  Preloader,
} from '../../../../elements';
import SocialButtons from '../SocialButtons';
import { encodeString, emailValidator } from '../../../../utils';
import { useSnackbar } from '../../../../hooks';
import { HeadingWrapper, Wrapper, Paragraph, FooterLinks } from './Login.styled';
import PATHS from '../../paths';
import handleErrors from '../../handleErrors';
import { userDetailsAtom, userCredentials } from '../../../../recoil';
import { useGetCurrentUserLazyQuery } from '../../../../hooks/api/getCurrentUser/getCurrentUser.generated';

interface LoginFormProps {
  email: string;
  password: string;
}

interface LoginProps {
  setActiveStep?: Dispatch<SetStateAction<number>>;
  setActiveNavStep?: Dispatch<SetStateAction<number>>;
}

const Login = ({ setActiveStep, setActiveNavStep }: LoginProps) => {
  const setCredentials = useSetRecoilState(userCredentials);

  const { executeRecaptcha } = useGoogleReCaptcha();
  const showSnackbar = useSnackbar();
  const router = useRouter();
  const [innerLoading, setInnerLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getCurrentUser, { data: userDetailsData }] = useGetCurrentUserLazyQuery();
  const setUserDetails = useSetRecoilState(userDetailsAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<LoginFormProps>({
    mode: 'onBlur',
  });

  const onUserDetailsChange = useCallback(async () => {
    if (userDetailsData && userDetailsData.me) {
      setUserDetails(userDetailsData.me);
      if (!userDetailsData?.me?.details?.firstName) {
        if (setActiveStep) {
          setActiveStep(4);
        } else {
          router.push('/auth/tell-us-more');
        }
      } else {
        if (router.query.returnTo) {
          router.push(`${router.query.returnTo}`);
          return;
        }
        if (setActiveStep && setActiveNavStep) {
          setActiveNavStep(2);
          setActiveStep(5);
        } else {
          router.push('/dashboard');
        }
      }
    }
  }, [userDetailsData, setUserDetails, router, setActiveStep, setActiveNavStep]);

  useEffect(() => {
    onUserDetailsChange();
  }, [
    userDetailsData,
    setUserDetails,
    router,
    setActiveStep,
    setActiveNavStep,
    onUserDetailsChange,
  ]);

  const onSubmit = async (input: LoginFormProps) => {
    const isValid = await trigger();

    if (!isValid || !executeRecaptcha) {
      return;
    }

    const { email, password } = input;

    setLoading(true);

    try {
      const captchaToken = await executeRecaptcha('loginForm');

      if (!captchaToken) return;

      const userEmail = email.trim().toLowerCase();

      await Auth.signIn({
        username: userEmail,
        password,
      });
      setCredentials({
        username: userEmail,
        password,
      });

      showSnackbar({ message: 'Successfully logged in.', type: 'success' });
      reset();
      setInnerLoading(true);

      await getCurrentUser();
    } catch (error: any) {
      if (error.code === 'UserNotConfirmedException') {
        showSnackbar({
          message: 'You must verify your account in order to log in.',
          type: 'warning',
        });
        try {
          await Auth.resendSignUp(email.trim().toLowerCase());
          router.push(`${PATHS.verificationCode}?code=${encodeString(email.trim().toLowerCase())}`);
        } catch (error2: any) {
          handleErrors(error2, showSnackbar);
        }
      } else {
        handleErrors(error, showSnackbar);
      }
    } finally {
      setLoading(false);
    }
  };

  if (innerLoading && !setActiveStep) {
    return <Preloader />;
  }

  return (
    <Wrapper>
      <HeadingWrapper>
        <Heading variant="h2">Welcome back</Heading>
      </HeadingWrapper>
      <SimpleCard>
        <SocialButtons />
        <StrikethroughText>Or use your email</StrikethroughText>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('email', {
              required: true,
              pattern: emailValidator(),
            })}
            disabled={loading}
            errors={errors}
            label="Email"
            placeholder="example@mail.com"
          />
          <TextField
            {...register('password', {
              required: true,
              minLength: {
                value: 8,
                message: '8 characters minimum',
              },
            })}
            disabled={loading}
            errors={errors}
            label="Password"
            placeholder="************"
            type="password"
          />
          <Button
            customStyles={{ width: '100%', margin: '7px 0 30px' }}
            isLoading={loading}
            type="submit"
            withArrow
          >
            Log in
          </Button>
        </form>
        <FooterLinks>
          <Paragraph>
            Not a member?&nbsp;
            <StyledLink color="blue" href={PATHS.register}>
              Register
            </StyledLink>
          </Paragraph>
          <Paragraph>
            <StyledLink color="blue" href={PATHS.forgotPassword}>
              Forgot your password?
            </StyledLink>
          </Paragraph>
        </FooterLinks>
      </SimpleCard>
    </Wrapper>
  );
};
export default Login;
