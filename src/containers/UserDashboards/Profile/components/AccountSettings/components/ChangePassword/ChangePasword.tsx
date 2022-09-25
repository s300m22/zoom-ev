import { Dispatch, SetStateAction, useCallback, useState, useRef } from 'react';
import { Auth } from '@aws-amplify/auth';
import { useForm } from 'react-hook-form';
import {
  Button,
  Heading,
  TextField,
  SettingsCardWrapper,
  SettingsCardHeader,
  SettingsForm,
  DoubleInputWrapper,
  SettingsCardFooter,
  SettingsEditLink,
} from '../../../../../../../elements';
import { passwordValidator } from '../../../../../../../utils';
import AccountSettingsEnum from '../../AccountSettingsEnum';
import { useSnackbar } from '../../../../../../../hooks';
import handleErrors from '../../../../../../Auth/handleErrors';

interface ChangePaswordProps {
  activeForm?: AccountSettingsEnum;
  setActiveForm: Dispatch<SetStateAction<AccountSettingsEnum | undefined>>;
}

interface UserPasswordProps {
  currentPassword: string;
  newPassword: string;
  repeatPassword: string;
}

const ChangePasword = ({ activeForm, setActiveForm }: ChangePaswordProps) => {
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    watch,
  } = useForm<UserPasswordProps>({
    mode: 'onChange',
  });
  const isFormActive = activeForm === AccountSettingsEnum.ChangePassword;
  const isFormBlurred = activeForm === AccountSettingsEnum.Email;
  const password = useRef({});
  password.current = watch('newPassword', '');

  const onSubmit = useCallback(
    async (input: UserPasswordProps) => {
      try {
        setLoading(true);
        const isValid = await trigger();
        if (!isValid) {
          return;
        }
        const { currentPassword, newPassword } = input;
        const user = await Auth.currentAuthenticatedUser();
        await Auth.changePassword(user, currentPassword, newPassword);
        showSnackbar({
          message: 'New password setup correctly.',
          type: 'success',
        });
      } catch (error: any) {
        handleErrors(error, showSnackbar);
      } finally {
        reset({
          currentPassword: '',
          newPassword: '',
          repeatPassword: '',
        });
        setLoading(false);
        setActiveForm(undefined);
      }
    },
    [reset, setActiveForm, showSnackbar, trigger],
  );

  return (
    <SettingsCardWrapper isFormBlurred={Boolean(isFormBlurred)}>
      <SettingsCardHeader>
        <Heading variant="h4">Change Your Account Password</Heading>
        <SettingsEditLink onClick={() => setActiveForm(AccountSettingsEnum.ChangePassword)}>
          Edit
        </SettingsEditLink>
      </SettingsCardHeader>
      <SettingsForm noValidate onSubmit={handleSubmit(onSubmit)}>
        <DoubleInputWrapper>
          <TextField
            {...register('currentPassword', {
              required: true,
              pattern: passwordValidator(),
            })}
            disabled={loading}
            errors={errors}
            label="Current password"
            placeholder="************"
            readOnly={!isFormActive}
            type="password"
          />
        </DoubleInputWrapper>
        <DoubleInputWrapper>
          <TextField
            {...register('newPassword', {
              required: true,
              pattern: passwordValidator(),
            })}
            disabled={loading}
            errors={errors}
            label="New password"
            placeholder="************"
            readOnly={!isFormActive}
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
            readOnly={!isFormActive}
            type="password"
          />
        </DoubleInputWrapper>
        {isFormActive ? (
          <SettingsCardFooter>
            <Button
              isLoading={loading}
              onClick={(e) => {
                e.preventDefault();
                reset({
                  currentPassword: '',
                  newPassword: '',
                  repeatPassword: '',
                });
                setActiveForm(undefined);
              }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button isLoading={loading} type="submit">
              Save changes
            </Button>
          </SettingsCardFooter>
        ) : null}
      </SettingsForm>
    </SettingsCardWrapper>
  );
};

export default ChangePasword;
