import { useState, useEffect, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { NextPage } from 'next';
import { Entry } from 'contentful';
import { useRouter } from 'next/router';
import { Auth } from '@aws-amplify/auth';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Heading, SimpleCard, CodeInput, TextField } from '../../../../elements';
import { ActionsLayout } from '../../../../layouts';
import ResendCode from '../../components/ResendCode/ResendCode';
import { EmailWrapper, Wrapper } from './VerificationCode.styled';
import { decodeString, emailValidator, verificationCodeValidator } from '../../../../utils';
import { useSnackbar } from '../../../../hooks';
import { IGlobalSettingsFields } from '../../../../interfaces/contentful.types.generated';
import PATHS from '../../paths';
import NewPasswordConfirm from '../NewPasswordConfirm';
import handleErrors from '../../handleErrors';
import credentialsAtom from '../../../../recoil/credentials';
import { useGetCurrentUserLazyQuery } from '../../../../hooks/api/getCurrentUser/getCurrentUser.generated';

interface PageProps {
  globalSettings: Entry<IGlobalSettingsFields>;
  title: string;
  type: string;
}

interface VerificationProps {
  email: string;
  verificationCode: string;
}
interface InternalForm {
  username: string;
  code: string;
}
interface PageLeadContentProps {
  userEmail: string;
  type: string;
}

const PageLeadContent = ({ userEmail, type }: PageLeadContentProps) => (
  <>
    <Heading variant="h2">
      {type === 'verify-new' ? 'Check your email for code' : 'Update password'}
    </Heading>
    <p>
      {userEmail && (
        <>
          We’ve sent a 6-character code to <EmailWrapper>{userEmail}.</EmailWrapper>
          <br />
        </>
      )}
      The code expires shortly, so please enter it soon.
    </p>
  </>
);

const VerificationCode: NextPage<PageProps> = ({ globalSettings, title, type }) => {
  const logo = globalSettings.fields.topBarLogo;
  const codeInputName = 'verificationCode';
  const credentials = useRecoilValue(credentialsAtom);
  const setCredentials = useSetRecoilState(credentialsAtom);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [internalFormState, setInternalFormState] = useState<InternalForm | undefined>();
  const showSnackbar = useSnackbar();
  const router = useRouter();
  const [getCurrentUser] = useGetCurrentUserLazyQuery({
    fetchPolicy: 'network-only',
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
    watch,
  } = useForm<VerificationProps>({
    mode: 'onChange',
  });

  const verificationCode = watch('verificationCode');

  const formValues = getValues();
  const form = useRef(null);

  const submitForm = useCallback(
    async (input: VerificationProps) => {
      setLoading(true);
      try {
        const data = {
          username: input.email.trim().toLowerCase(),
          code: input.verificationCode,
        };

        setInternalFormState(data);

        if (type === 'verify-new') {
          await Auth.confirmSignUp(data.username, data.code);

          if (credentials) {
            await Auth.signIn({
              username: credentials.username,
              password: credentials.password,
            });

            setCredentials(undefined);
            await getCurrentUser();
            showSnackbar({
              message: 'Account successfully verified. You are being logged now.',
              type: 'success',
            });
            router.push(
              `${PATHS.tellUsMore}${
                router.query.returnTo ? `?returnTo=${router.query.returnTo}` : ''
              }`,
            );
          } else {
            showSnackbar({
              message: 'Account successfully verified. You may log in now.',
              type: 'success',
            });
            router.push(
              `${PATHS.login}${router.query.returnTo ? `?returnTo=${router.query.returnTo}` : ''}`,
            );
          }
          sessionStorage.removeItem('registerMail');
          reset();
        } else {
          setShowUpdatePassword(true);
        }
      } catch (error: any) {
        handleErrors(error, showSnackbar);
      }
      setLoading(false);
    },
    [credentials, getCurrentUser, reset, router, setCredentials, showSnackbar, type],
  );

  useEffect(() => {
    setUserEmail(
      decodeString((router.query.code as string) || '') ||
        sessionStorage.getItem('registerMail') ||
        sessionStorage.getItem('resetMail') ||
        '',
    );
  }, [router.query.code]);

  useEffect(() => {
    setValue('email', userEmail);
  }, [setValue, userEmail, showUpdatePassword]);

  useEffect(() => {
    if (verificationCode?.length === 6 && formValues.email && !loading) {
      submitForm({
        email: formValues.email,
        verificationCode: formValues.verificationCode,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verificationCode, formValues.email]);

  useEffect(() => {
    watch(codeInputName);
  }, [watch]);

  if (showUpdatePassword) {
    return (
      <NewPasswordConfirm
        {...internalFormState}
        logo={logo}
        setShowUpdatePassword={setShowUpdatePassword}
        title={title}
      />
    );
  }

  return (
    <ActionsLayout
      logo={logo}
      pageLeadContent={<PageLeadContent type={type} userEmail={userEmail} />}
      pageTitle={title}
    >
      <Wrapper>
        <SimpleCard>
          <form noValidate onSubmit={handleSubmit(submitForm)} ref={form}>
            <TextField
              {...register('email', {
                required: true,
                pattern: emailValidator(),
              })}
              customStyles={{ display: `${!userEmail ? 'flex' : 'none'}` }} // Due to bug https://github.com/react-hook-form/react-hook-form/issues/284 we need to hidde this field with CSS instead of type="hidden"
              disabled={loading}
              errors={errors}
              label="Email"
              name="email"
              placeholder="example@mail.com"
            />

            {/* @ts-ignore */}
            <CodeInput
              {...register(codeInputName, {
                required: true,
                minLength: verificationCodeValidator(),
              })}
              errors={errors}
              fields={6}
              inputMode="numeric"
              label={!userEmail ? 'Verification code' : ''}
              setCodeValue={setValue}
              type="number"
            />
          </form>
          <ResendCode email={userEmail} />
        </SimpleCard>
      </Wrapper>
    </ActionsLayout>
  );
};
export default VerificationCode;
