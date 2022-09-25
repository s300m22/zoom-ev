import { useState } from 'react';
import { NextPage } from 'next';
import { Entry } from 'contentful';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Auth } from '@aws-amplify/auth';
import { encodeString, emailValidator } from '../../../../utils';
import { useSnackbar } from '../../../../hooks';
import { Button, Heading, SimpleCard, StyledLink, TextField } from '../../../../elements';
import { ActionsLayout } from '../../../../layouts';
import Wrapper from './ForgotPassword.styled';
import { IGlobalSettingsFields } from '../../../../interfaces/contentful.types.generated';
import PATHS from '../../paths';
import handleErrors from '../../handleErrors';

interface PageProps {
  globalSettings: Entry<IGlobalSettingsFields>;
  title: string;
}

interface ForgotPasswordProps {
  email: string;
}

const PageLeadContent = () => (
  <>
    <Heading variant="h2">Forgot password?</Heading>
    <p>
      Please enter your email address and we will send you <br />
      instructions on how to reset your password
    </p>
  </>
);

const ForgotPassword: NextPage<PageProps> = ({ globalSettings, title }) => {
  const [loading, setLoading] = useState(false);
  const showSnackbar = useSnackbar();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<ForgotPasswordProps>({
    mode: 'onBlur',
  });

  const onSubmit = async ({ email }: ForgotPasswordProps) => {
    const isValid = await trigger();

    if (!isValid) {
      return;
    }
    setLoading(true);
    try {
      await Auth.forgotPassword(email.trim().toLowerCase());
      showSnackbar({ message: 'Email sent successfully.', type: 'success' });
      sessionStorage.setItem('resetMail', email);
      router.push(`${PATHS.newPasswordResetVerify}?code=${encodeString(email)}`);
      reset();
    } catch (error: any) {
      if (error.code === 'UserNotConfirmedException') {
        showSnackbar({
          message: 'You must verify your account in order to change password.',
          type: 'warning',
        });
        router.push(`${PATHS.verificationCode}?code=${encodeString(email)}`);
      } else {
        const isNoVerifiedEmailError = error.message?.includes('no registered/verified email');
        if (error.code === 'InvalidParameterException' && isNoVerifiedEmailError) {
          showSnackbar({
            message: 'You must verify your account in order to change password.',
            type: 'warning',
          });
          await Auth.resendSignUp(email);
          router.push(`${PATHS.verificationCode}?code=${encodeString(email)}`);
        } else {
          handleErrors(error, showSnackbar);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ActionsLayout
      logo={globalSettings.fields.topBarLogo}
      pageLeadContent={<PageLeadContent />}
      pageTitle={title}
    >
      <Wrapper>
        <SimpleCard>
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
            <Button customStyles={{ width: '100%', margin: '7px 0 30px' }} withArrow>
              Recover password
            </Button>
          </form>
          <StyledLink color="blue" href={PATHS.login}>
            I remember my password now
          </StyledLink>
        </SimpleCard>
      </Wrapper>
    </ActionsLayout>
  );
};
export default ForgotPassword;
