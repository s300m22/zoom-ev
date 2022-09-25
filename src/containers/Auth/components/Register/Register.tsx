import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';
import { Auth } from '@aws-amplify/auth';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  Button,
  Checkbox,
  Heading,
  SimpleCard,
  StrikethroughText,
  StyledLink,
  TextField,
} from '../../../../elements';
import SocialButtons from '../SocialButtons';
import { useSnackbar } from '../../../../hooks';
import { emailValidator, passwordValidator } from '../../../../utils';
import { Paragraph, PolicySection, Wrapper, NoticeSection } from './Register.styled';
import PATHS from '../../paths';
import handleErrors from '../../handleErrors';
import { userCredentials, userDetailsAtom } from '../../../../recoil';
import { useAddCommunicationPreferencesByEmailMutation } from '../../../../hooks/api/addCommunicationPreferencesByEmail/addCommunicationPreferencesByEmail.generated';

interface SignUpFormProps {
  email: string;
  password: string;
  repeatPassword: string;
  no_offers: boolean;
}

interface RegisterProps {
  setActiveStep?: Dispatch<SetStateAction<number>>;
}

const Register = ({ setActiveStep }: RegisterProps) => {
  const userDetails = useRecoilValue(userDetailsAtom);
  const setCredentials = useSetRecoilState(userCredentials);
  const [updatePrefs] = useAddCommunicationPreferencesByEmailMutation();

  const { executeRecaptcha } = useGoogleReCaptcha();
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isEmbedded = Boolean(setActiveStep);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    watch,
  } = useForm<SignUpFormProps>({
    mode: 'onBlur',
  });
  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = async (input: SignUpFormProps) => {
    const isValid = await trigger();

    if (!isValid || !executeRecaptcha) {
      return;
    }

    setLoading(true);

    try {
      const captchaToken = await executeRecaptcha('loginForm');
      if (!captchaToken) {
        return;
      }
      const { email, password: userPassword, no_offers } = input;
      const userEmail = email.toLowerCase();
      await Auth.signUp({
        username: userEmail,
        password: userPassword,
        attributes: {
          email: userEmail,
        },
      });
      setCredentials({
        username: userEmail,
        password: userPassword,
      });
      sessionStorage.setItem('registerMail', userEmail);

      updatePrefs({
        variables: {
          emailAddress: userEmail,
          email: !no_offers,
          phone: !no_offers,
          sms: !no_offers,
        },
      });
      showSnackbar({ message: 'Your account was created successfully.', type: 'success' });
      reset();
      if (setActiveStep) {
        setActiveStep(2);
      } else {
        router.push(
          `${PATHS.verificationCode}${
            router.query.returnTo ? `?returnTo=${router.query.returnTo}` : ''
          }`,
        );
      }
    } catch (error: any) {
      handleErrors(error, showSnackbar);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userDetails) {
      router.replace('/dashboard');
    }
  }, [router, userDetails]);

  return (
    <Wrapper>
      <Heading variant="h2">Create your account</Heading>
      {!isEmbedded && (
        <Paragraph>
          Need a business account?&nbsp;
          <StyledLink color="blue" href="/contact">
            Contact us
          </StyledLink>
        </Paragraph>
      )}
      <SimpleCard
        customStyles={{
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <img alt="Registration help notice" src="/images/icons/info-warn.png" />
        <NoticeSection>
          <Heading variant="h7">Have you been given a Bundle from one of our Partners?</Heading>
          <p>
            Remember to register with the same email address you gave them, so that you see the
            correct Bundle.
          </p>
        </NoticeSection>
      </SimpleCard>
      <SimpleCard customStyles={{ textAlign: 'left' }}>
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
            type="email"
          />
          <TextField
            {...register('password', {
              required: true,
              pattern: passwordValidator(),
            })}
            disabled={loading}
            errors={errors}
            label="Password"
            placeholder="************"
            type="password"
          />
          <TextField
            {...register('repeatPassword', {
              required: true,
              validate: (value) => value === password.current || 'The passwords do not match',
            })}
            disabled={loading}
            errors={errors}
            label="Repeat password"
            placeholder="************"
            type="password"
          />

          <Button customStyles={{ width: '100%', margin: '7px 0 0' }} isLoading={loading} withArrow>
            Create my account
          </Button>
          <p
            style={{
              fontSize: '15px',
              lineHeight: '20px',
              color: 'gray',
              marginTop: 15,
              paddingTop: 15,
              marginBottom: 10,
              borderTop: '1px solid lightgray',
            }}
          >
            Zoom EV will send you members-only deals, any important EV industry updates, and
            marketing emails. You can opt out of receiving these at any time in your account
            settings or directly from marketing comms.
          </p>
          <Checkbox
            {...register('no_offers')}
            customStyles={{
              fontSize: '16px',
              margin: '10px 0',
              color: 'gray',
            }}
            label="I don't want to receive offers or marketing from Zoom EV"
          />
        </form>
      </SimpleCard>

      <PolicySection>
        By proceeding you accept{' '}
        <StyledLink color="blue" href="/terms-and-conditions">
          Terms and Conditions
        </StyledLink>{' '}
        and{' '}
        <StyledLink color="blue" href="/privacy-policy ">
          Privacy Policy
        </StyledLink>
      </PolicySection>
    </Wrapper>
  );
};
export default Register;
