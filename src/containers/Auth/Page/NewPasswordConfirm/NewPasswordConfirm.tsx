import { Asset } from 'contentful';
import { useState, useRef, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Auth } from '@aws-amplify/auth';
import { Button, Heading, SimpleCard, TextField } from '../../../../elements';
import { useSnackbar } from '../../../../hooks';
import { passwordValidator } from '../../../../utils';
import { ActionsLayout } from '../../../../layouts';
import handleErrors from '../../handleErrors';
import Wrapper from './NewPasswordConfirm.styled';
import PATHS from '../../paths';

interface NewPasswordConfirmProps {
  logo?: Asset;
  title: string;
  code?: string;
  username?: string;
  setShowUpdatePassword: Dispatch<SetStateAction<boolean>>;
}

interface PageLeadContentProps {
  email?: string;
}

interface NewPasswordProps {
  username: string;
  code: string;
  password: string;
  repeatPassword: string;
}

const PageLeadContent = ({ email }: PageLeadContentProps) => (
  <>
    <Heading variant="h2">Update password</Heading>
    <p>
      Update your password for <strong>{email}</strong>
    </p>
  </>
);

const NewPasswordConfirm = ({
  logo,
  title,
  code,
  username,
  setShowUpdatePassword,
}: NewPasswordConfirmProps) => {
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    watch,
  } = useForm<NewPasswordProps>({
    mode: 'onBlur',
  });
  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = async (input: NewPasswordProps) => {
    const isValid = await trigger();

    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      if (username && code) {
        await Auth.forgotPasswordSubmit(username.trim().toLowerCase(), code, input.password);
        showSnackbar({
          message: 'New password setup correctly. You may log in now.',
          type: 'success',
        });
        router.push(PATHS.login);
        reset();
      }
    } catch (error: any) {
      handleErrors(error, showSnackbar);
      setShowUpdatePassword(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ActionsLayout
      logo={logo}
      pageLeadContent={<PageLeadContent email={username} />}
      pageTitle={title}
    >
      <Wrapper>
        <SimpleCard>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register('password', {
                required: true,
                pattern: passwordValidator(),
              })}
              disabled={loading}
              errors={errors}
              label="Password"
              name="password"
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
            <Button customStyles={{ width: '100%', margin: '30px 0 0' }} withArrow>
              Update password
            </Button>
          </form>
        </SimpleCard>
      </Wrapper>
    </ActionsLayout>
  );
};
export default NewPasswordConfirm;
