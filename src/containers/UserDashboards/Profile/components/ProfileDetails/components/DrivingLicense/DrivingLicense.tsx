import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import countryCodes from 'country-codes-list';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import {
  Button,
  Checkbox,
  CreatableSelect,
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
import { useUpdateMyDetailsMutation } from '../../../../../../../hooks/api/updateMyDetails/updateMyDetails.generated';
import {
  UserDetailsApprovalStatusEnum,
  UserDetailsUpdateInput,
} from '../../../../../../../interfaces/api.types.generated.d';
import { userDetailsAtom } from '../../../../../../../recoil';
import { convertToDatabaseDateFormat, logError } from '../../../../../../../utils';
import PersonalDetailsEnum from '../../ProfileDetailsEnum';

interface DrivingLicenseProps {
  activeForm?: PersonalDetailsEnum;
  setActiveForm: Dispatch<SetStateAction<PersonalDetailsEnum | undefined>>;
}

interface CountryItem {
  value: string;
  label: string;
}

interface DrivingLicenseInputProps
  extends Omit<UserDetailsUpdateInput, 'drivingLicenseCountryOfIssue'> {
  drivingLicenseNumber: string;
  drivingLicenseCountryOfIssue: {
    value: string;
    label: string;
  };
  photoVerified: boolean;
  drivingRecordCheckCode: string;
}

const DrivingLicense = ({ activeForm, setActiveForm }: DrivingLicenseProps) => {
  const userDetails = useRecoilValue(userDetailsAtom);
  const [updateMyDetails, { loading }] = useUpdateMyDetailsMutation();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<DrivingLicenseInputProps>({
    mode: 'onBlur',
    defaultValues: {
      drivingLicenseNumber:
        userDetails?.detailsRequested?.drivingLicenseNumber ||
        userDetails?.details?.drivingLicenseNumber ||
        '',
      drivingRecordCheckCode:
        userDetails?.detailsRequested?.drivingRecordCheckCode ||
        userDetails?.details?.drivingRecordCheckCode ||
        '',
    },
  });
  const isFormActive = activeForm === PersonalDetailsEnum.DrivingLicense;
  const isFormBlurred =
    activeForm === PersonalDetailsEnum.Address || activeForm === PersonalDetailsEnum.Personal;

  const countriesList = useMemo(() => {
    const details = countryCodes.customArray({
      value: '{countryNameEn}',
      label: '{countryNameEn}',
    }) as Array<CountryItem>;

    return details.sort((a, b) => a.value.localeCompare(b.value));
  }, []);

  const onSubmit = useCallback(
    async (input: DrivingLicenseInputProps) => {
      try {
        const isValid = await trigger();
        if (!isValid) {
          return;
        }

        const {
          drivingLicenseNumber,
          drivingLicenseValidFrom,
          drivingLicenseValidTo,
          drivingLicenseCountryOfIssue,
          drivingRecordCheckCode,
        } = input;

        await updateMyDetails({
          variables: {
            update: {
              drivingLicenseNumber,
              drivingLicenseValidFrom: drivingLicenseValidFrom
                ? convertToDatabaseDateFormat(drivingLicenseValidFrom)
                : '',
              drivingLicenseValidTo: drivingLicenseValidTo
                ? convertToDatabaseDateFormat(drivingLicenseValidTo)
                : '',
              drivingLicenseCountryOfIssue: drivingLicenseCountryOfIssue.value,
              drivingRecordCheckCode,
            },
          },
        });

        setActiveForm(undefined);
      } catch (error: any) {
        logError(error);
      }
    },
    [setActiveForm, trigger, updateMyDetails],
  );

  return (
    <SettingsCardWrapper isFormBlurred={Boolean(isFormBlurred)}>
      <SettingsCardHeader>
        <Heading variant="h4">Driving license</Heading>
        <SettingsEditLink onClick={() => setActiveForm(PersonalDetailsEnum.DrivingLicense)}>
          Edit
        </SettingsEditLink>
        {/* {profileRequestedStatus !== UserDetailsApprovalStatusEnum.Pending ? (
        ) : null} */}
      </SettingsCardHeader>
      <SettingsForm noValidate onSubmit={handleSubmit(onSubmit)}>
        <DoubleInputWrapper>
          <TextField
            {...register('drivingLicenseNumber', { required: true })}
            errors={errors}
            label="Number on the front of your driving license"
            placeholder="eg. WAIRB380678RG9LM"
            readOnly={!isFormActive}
            required
          />
          <TextField
            {...register('drivingRecordCheckCode', {
              required: true,
            })}
            errors={errors}
            label={
              <>
                Check code{' '}
                {isFormActive && (
                  <span style={{ color: 'gray' }}>
                    (Generate your new check code{' '}
                    <a
                      href="https://www.viewdrivingrecord.service.gov.uk/driving-record/licence-number"
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      here
                    </a>
                    )
                  </span>
                )}
              </>
            }
            placeholder="eg. yL d8 2M YX"
            readOnly={!isFormActive}
            required
          />
        </DoubleInputWrapper>
        <DoubleInputWrapper>
          <DateInput
            control={control}
            disableFutureDates
            disablePastDates={false}
            errors={errors}
            label="Valid from"
            name="drivingLicenseValidFrom"
            prefilledDate={
              userDetails?.detailsRequested?.drivingLicenseValidFrom ||
              userDetails?.details?.drivingLicenseValidFrom
            }
            readOnly={!isFormActive}
            required
            showYearDropdown
          />
          <DateInput
            control={control}
            errors={errors}
            label="Valid to"
            name="drivingLicenseValidTo"
            prefilledDate={
              userDetails?.detailsRequested?.drivingLicenseValidTo ||
              userDetails?.details?.drivingLicenseValidTo
            }
            readOnly={!isFormActive}
            required
            showYearDropdown
          />
        </DoubleInputWrapper>
        <DoubleInputWrapper>
          <CreatableSelect
            control={control}
            defaultValue={{
              value:
                userDetails?.detailsRequested?.drivingLicenseCountryOfIssue ||
                userDetails?.details?.drivingLicenseCountryOfIssue ||
                'United Kingdom',
              label:
                userDetails?.detailsRequested?.drivingLicenseCountryOfIssue ||
                userDetails?.details?.drivingLicenseCountryOfIssue ||
                'United Kingdom',
            }}
            errors={errors}
            isCreatable={false}
            label="Issued country"
            name="drivingLicenseCountryOfIssue"
            options={countriesList}
            readOnly={!isFormActive}
            required
          />
        </DoubleInputWrapper>
        <DoubleInputWrapper>
          <Checkbox
            {...register('photoVerified', { required: true })}
            customStyles={{
              fontSize: '16px',
              cursor: 'not-allowed',
            }}
            defaultChecked={
              userDetails?.details?.approvalStatus === UserDetailsApprovalStatusEnum.Approved
            }
            errors={errors}
            label="Verified photo of driving license"
            name="photoVerified"
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
            <Button isLoading={loading}>Save changes</Button>
          </SettingsCardFooter>
        ) : null}
      </SettingsForm>
    </SettingsCardWrapper>
  );
};

export default DrivingLicense;
