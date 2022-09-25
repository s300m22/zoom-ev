import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import {
  Checkbox,
  Heading,
  SettingsCardWrapper,
  SettingsCardHeader,
  SettingsForm,
} from '../../../../../../../elements';
import { useUpdateCommunicationPreferencesMutation } from '../../../../../../../hooks/api/updateCommunicationPreferences/updateCommunicationPreferences.generated';
import { userDetailsAtom } from '../../../../../../../recoil';

const EmailPreferences = () => {
  const userDetails = useRecoilValue(userDetailsAtom);
  const [updatePrefs, { loading }] = useUpdateCommunicationPreferencesMutation();

  const {
    register,
    formState: { errors },
    watch,
  } = useForm<{
    emailAllowed: boolean;
    smsAllowed: boolean;
    phoneAllowed: boolean;
  }>();

  const watchEmail = watch('emailAllowed', userDetails?.communicationPreferences?.emailAllowed);
  const watchSms = watch('smsAllowed', userDetails?.communicationPreferences?.smsAllowed);
  const watchPhone = watch('phoneAllowed', userDetails?.communicationPreferences?.phoneAllowed);

  useEffect(() => {
    updatePrefs({
      variables: {
        emailAddress: userDetails?.email,
        email: watchEmail,
        phone: watchPhone,
        sms: watchSms,
      },
    });
  }, [watchEmail, watchPhone, watchSms, updatePrefs, userDetails?.email]);

  return (
    <SettingsCardWrapper>
      <SettingsCardHeader>
        <Heading variant="h4">Marketing preferences</Heading>
      </SettingsCardHeader>
      <p>
        Stay up to date on the latest EV benefits, offers and industry changes. <br />
        If you unsubscribe from marketing, you&lsquo;ll continue to get notifications about your
        account activity.
      </p>
      <SettingsForm noValidate>
        <Checkbox
          defaultChecked={userDetails?.communicationPreferences?.emailAllowed}
          errors={errors}
          label="Emails"
          readOnly={loading}
          {...register('emailAllowed')}
        />
        <br />
        <Checkbox
          defaultChecked={userDetails?.communicationPreferences?.phoneAllowed}
          errors={errors}
          label="Phone Calls"
          readOnly={loading}
          {...register('phoneAllowed')}
        />
        <br />

        <Checkbox
          defaultChecked={userDetails?.communicationPreferences?.smsAllowed}
          errors={errors}
          label="SMS"
          readOnly={loading}
          {...register('smsAllowed')}
        />
      </SettingsForm>
    </SettingsCardWrapper>
  );
};

export default EmailPreferences;
