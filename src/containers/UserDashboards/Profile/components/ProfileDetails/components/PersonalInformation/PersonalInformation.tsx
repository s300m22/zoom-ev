import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  Button,
  DateInput,
  Heading,
  TextField,
  SettingsCardWrapper,
  SettingsCardHeader,
  SettingsEditLink,
  SettingsForm,
  DoubleInputWrapper,
  SettingsCardFooter,
} from '../../../../../../../elements';
import { useGetCurrentUserLazyQuery } from '../../../../../../../hooks/api/getCurrentUser/getCurrentUser.generated';
import { useUpdateMyDetailsMutation } from '../../../../../../../hooks/api/updateMyDetails/updateMyDetails.generated';
import {
  UserDetailsApprovalStatusEnum,
  UserDetailsUpdateInput,
} from '../../../../../../../interfaces/api.types.generated.d';
import { userDetailsAtom } from '../../../../../../../recoil';
import { logError } from '../../../../../../../utils';
import PersonalDetailsEnum from '../../ProfileDetailsEnum';

interface PersonalInformationProps {
  activeForm?: PersonalDetailsEnum;
  setActiveForm: Dispatch<SetStateAction<PersonalDetailsEnum | undefined>>;
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
    control,
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
  const isFormActive = activeForm === PersonalDetailsEnum.Personal;
  const isFormBlurred =
    activeForm === PersonalDetailsEnum.Address || activeForm === PersonalDetailsEnum.DrivingLicense;

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
        {profileRequestedStatus !== UserDetailsApprovalStatusEnum.Draft ? (
          <SettingsEditLink onClick={() => setActiveForm(PersonalDetailsEnum.Personal)}>
            Edit
          </SettingsEditLink>
        ) : null}
      </SettingsCardHeader>

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
        {profileRequestedStatus !== UserDetailsApprovalStatusEnum.Draft ? (
          <DoubleInputWrapper>
            <DateInput
              control={control}
              disablePastDates={false}
              errors={errors}
              label="Date of birth"
              minimalAge={25}
              name="dateOfBirth"
              prefilledDate={
                userDetails?.detailsRequested?.dateOfBirth || userDetails?.details?.dateOfBirth
              }
              readOnly={!isFormActive}
              required
              showPicker={false}
            />
          </DoubleInputWrapper>
        ) : null}
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
