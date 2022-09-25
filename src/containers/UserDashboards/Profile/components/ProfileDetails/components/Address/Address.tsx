import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  Button,
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

interface AddressProps {
  activeForm?: PersonalDetailsEnum;
  setActiveForm: Dispatch<SetStateAction<PersonalDetailsEnum | undefined>>;
}

const Address = ({ activeForm, setActiveForm }: AddressProps) => {
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
      addressLine1:
        userDetails?.detailsRequested?.addressLine1 || userDetails?.details.addressLine1 || '',
      addressLine2:
        userDetails?.detailsRequested?.addressLine2 || userDetails?.details.addressLine2 || '',
      city: userDetails?.detailsRequested?.city || userDetails?.details.city || '',
      county: userDetails?.detailsRequested?.county || userDetails?.details.county || '',
      postCode: userDetails?.detailsRequested?.postCode || userDetails?.details.postCode || '',
    },
  });
  const isFormActive = activeForm === PersonalDetailsEnum.Address;
  const isFormBlurred =
    activeForm === PersonalDetailsEnum.Personal ||
    activeForm === PersonalDetailsEnum.DrivingLicense;

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
        reset();
        setActiveForm(undefined);
      } catch (error: any) {
        logError(error);
      }
    },
    [getCurretUser, reset, setActiveForm, trigger, updateMyDetails],
  );

  return (
    <SettingsCardWrapper isFormBlurred={Boolean(isFormBlurred)}>
      <SettingsCardHeader>
        <Heading variant="h4">Address</Heading>
        {profileRequestedStatus !== UserDetailsApprovalStatusEnum.Pending ? (
          <SettingsEditLink onClick={() => setActiveForm(PersonalDetailsEnum.Address)}>
            Edit
          </SettingsEditLink>
        ) : null}
      </SettingsCardHeader>
      <SettingsForm noValidate onSubmit={handleSubmit(onSubmit)}>
        <DoubleInputWrapper>
          <TextField
            {...register('addressLine1', { required: true })}
            disabled={loading}
            errors={errors}
            label="Address 1"
            placeholder="eg. 50 Birmingham Street"
            readOnly={!isFormActive}
            required
          />
          <TextField
            {...register('addressLine2', { required: true })}
            disabled={loading}
            errors={errors}
            label="Address 2"
            placeholder="eg. apartment, floor, building (optional)"
            readOnly={!isFormActive}
          />
        </DoubleInputWrapper>
        <DoubleInputWrapper>
          <TextField
            {...register('city', { required: true })}
            disabled={loading}
            errors={errors}
            label="Town"
            placeholder="eg. Bristol"
            readOnly={!isFormActive}
            required
          />
          <TextField
            {...register('county')}
            disabled={loading}
            errors={errors}
            label="County"
            placeholder="eg. Avon"
            readOnly={!isFormActive}
          />
        </DoubleInputWrapper>
        <DoubleInputWrapper>
          <TextField
            {...register('postCode', { required: true })}
            disabled={loading}
            errors={errors}
            label="Postcode"
            placeholder="X11 Y11"
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

export default Address;
