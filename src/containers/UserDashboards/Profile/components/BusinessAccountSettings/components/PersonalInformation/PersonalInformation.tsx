import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  Button,
  Heading,
  StatusBanner,
  TextField,
  SettingsCardWrapper,
  SettingsCardHeader,
  SettingsEditLink,
  SettingsForm,
  DoubleInputWrapper,
  SettingsCardFooter,
} from '../../../../../../../elements';
import StatusEnum from '../../../../../../../elements/StatusBanner/StatusEnum';
import { useGetCurrentUserLazyQuery } from '../../../../../../../hooks/api/getCurrentUser/getCurrentUser.generated';
import { useUpdateMyDetailsMutation } from '../../../../../../../hooks/api/updateMyDetails/updateMyDetails.generated';
import {
  UserDetailsApprovalStatusEnum,
  UserDetailsUpdateInput,
} from '../../../../../../../interfaces/api.types.generated.d';
import { userDetailsAtom } from '../../../../../../../recoil';
import { logError } from '../../../../../../../utils';
import BusinessAccountSettingsEnum from '../../BusinessAccountSettingsEnum';

interface PersonalInformationProps {
  activeForm?: BusinessAccountSettingsEnum;
  setActiveForm: Dispatch<SetStateAction<BusinessAccountSettingsEnum | undefined>>;
}

const PersonalInformation = ({ activeForm, setActiveForm }: PersonalInformationProps) => {
  const userDetails = useRecoilValue(userDetailsAtom);
  const profileRequestedStatus = userDetails?.detailsRequested?.approvalStatus;
  const setUserDetails = useSetRecoilState(userDetailsAtom);
  const [getCurretUser, { data: currentUser, loading: userLoading }] = useGetCurrentUserLazyQuery({
    fetchPolicy: 'network-only',
  });
  const [updateMyDetails, { loading }] = useUpdateMyDetailsMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<UserDetailsUpdateInput>({
    mode: 'onBlur',
    defaultValues: {
      firstName: userDetails?.detailsRequested?.firstName || userDetails?.details.firstName || '',
      lastName: userDetails?.detailsRequested?.lastName || userDetails?.details.lastName || '',
    },
  });
  const isFormActive = activeForm === BusinessAccountSettingsEnum.Personal;
  const isFormBlurred =
    activeForm === BusinessAccountSettingsEnum.Email ||
    activeForm === BusinessAccountSettingsEnum.ChangePassword;

  useEffect(() => {
    if (currentUser) {
      setUserDetails(currentUser.me);
    }
  }, [currentUser, setUserDetails]);

  const onSubmit = useCallback(
    async (input: UserDetailsUpdateInput) => {
      try {
        const isValid = await trigger();
        if (!isValid) {
          return;
        }

        await updateMyDetails({
          variables: {
            update: {
              ...input,
            },
          },
        });
        getCurretUser();
        setActiveForm(undefined);
      } catch (error: any) {
        logError(error);
      }
    },
    [getCurretUser, setActiveForm, trigger, updateMyDetails],
  );

  return (
    <SettingsCardWrapper isFormBlurred={Boolean(isFormBlurred)}>
      <SettingsCardHeader>
        <Heading variant="h4">Personal information</Heading>
        <SettingsEditLink onClick={() => setActiveForm(BusinessAccountSettingsEnum.Personal)}>
          Edit
        </SettingsEditLink>
      </SettingsCardHeader>
      {profileRequestedStatus === UserDetailsApprovalStatusEnum.Rejected ? (
        <StatusBanner status={StatusEnum.Rejected} statusText="Changes rejected">
          {userDetails?.detailsRequested?.rejectionReason}
        </StatusBanner>
      ) : null}

      <SettingsForm noValidate onSubmit={handleSubmit(onSubmit)}>
        <DoubleInputWrapper>
          <TextField
            {...register('firstName', { required: true })}
            disabled={loading}
            errors={errors}
            label="First name"
            placeholder="eg. Mary"
            readOnly={!isFormActive}
            required
          />
          <TextField
            {...register('lastName', { required: true })}
            disabled={loading}
            errors={errors}
            label="Last name"
            placeholder="eg. Green"
            readOnly={!isFormActive}
            required
          />
        </DoubleInputWrapper>
        {isFormActive ? (
          <SettingsCardFooter>
            <Button
              isLoading={loading}
              onClick={(e) => {
                e.preventDefault();
                reset();
                setActiveForm(undefined);
              }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button isLoading={loading || userLoading}>Save changes</Button>
          </SettingsCardFooter>
        ) : null}
      </SettingsForm>
    </SettingsCardWrapper>
  );
};

export default PersonalInformation;
