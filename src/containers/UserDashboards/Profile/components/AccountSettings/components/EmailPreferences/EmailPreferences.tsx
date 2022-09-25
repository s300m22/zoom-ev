import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import {
  Checkbox,
  Button,
  Heading,
  SettingsCardWrapper,
  SettingsCardHeader,
  SettingsForm,
  SettingsEditLink,
  SettingsCardFooter,
} from '../../../../../../../elements';
import { useSnackbar } from '../../../../../../../hooks';
import { useUpdateCommunicationPreferencesMutation } from '../../../../../../../hooks/api/updateCommunicationPreferences/updateCommunicationPreferences.generated';
import { userDetailsAtom } from '../../../../../../../recoil';
import handleErrors from '../../../../../../Auth/handleErrors';
import AccountSettingsEnum from '../../AccountSettingsEnum';

interface EmailPreferencesProps {
  activeForm?: AccountSettingsEnum;
  setActiveForm: Dispatch<SetStateAction<AccountSettingsEnum | undefined>>;
}

interface EmailPrefForm {
  emailAllowed: boolean;
  smsAllowed: boolean;
  phoneAllowed: boolean;
}
const EmailPreferences: React.FC<EmailPreferencesProps> = ({ activeForm, setActiveForm }) => {
  const showSnackbar = useSnackbar();
  const userDetails = useRecoilValue(userDetailsAtom);
  const [loading, setLoading] = useState(false);

  const [updatePrefs] = useUpdateCommunicationPreferencesMutation();
  const isFormActive = activeForm === AccountSettingsEnum.UpdateMarketingPreferences;

  const {
    register,
    formState: { errors },
    reset,
    trigger,
    handleSubmit,
  } = useForm<EmailPrefForm>();

  const onSubmit = useCallback(
    async (input: EmailPrefForm) => {
      try {
        setLoading(true);
        const isValid = await trigger();
        if (!isValid) {
          return;
        }
        await updatePrefs({
          variables: {
            emailAddress: userDetails?.email,
            email: input.emailAllowed,
            phone: input.phoneAllowed,
            sms: input.smsAllowed,
          },
        });
      } catch (error: any) {
        handleErrors(error, showSnackbar);
      } finally {
        setLoading(false);
        setActiveForm(undefined);
      }
    },
    [setActiveForm, showSnackbar, trigger, updatePrefs, userDetails?.email],
  );

  return (
    <SettingsCardWrapper>
      <SettingsCardHeader>
        <Heading variant="h4">Marketing preferences</Heading>
        <SettingsEditLink
          onClick={() => setActiveForm(AccountSettingsEnum.UpdateMarketingPreferences)}
        >
          Edit
        </SettingsEditLink>
      </SettingsCardHeader>
      <p>
        Stay up to date on the latest EV benefits, offers and industry changes. <br />
        If you unsubscribe from marketing, you&lsquo;ll continue to get notifications about your
        account activity.
      </p>
      <SettingsForm noValidate onSubmit={handleSubmit(onSubmit)}>
        <Checkbox
          defaultChecked={userDetails?.communicationPreferences?.emailAllowed}
          errors={errors}
          label="Emails"
          readOnly={!isFormActive}
          {...register('emailAllowed')}
        />
        <br />
        <Checkbox
          defaultChecked={userDetails?.communicationPreferences?.phoneAllowed}
          errors={errors}
          label="Phone Calls"
          readOnly={!isFormActive}
          {...register('phoneAllowed')}
        />
        <br />

        <Checkbox
          defaultChecked={userDetails?.communicationPreferences?.smsAllowed}
          errors={errors}
          label="SMS"
          readOnly={!isFormActive}
          {...register('smsAllowed')}
        />

        {isFormActive ? (
          <SettingsCardFooter>
            <Button
              isLoading={loading}
              onClick={(e) => {
                e.preventDefault();
                reset({
                  phoneAllowed: userDetails?.communicationPreferences?.phoneAllowed,
                  emailAllowed: userDetails?.communicationPreferences?.emailAllowed,
                  smsAllowed: userDetails?.communicationPreferences?.smsAllowed,
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

export default EmailPreferences;
