import { Dispatch, SetStateAction, useCallback, useState, useEffect, useMemo } from 'react';
import countryCodes from 'country-codes-list';
import { useWatch, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import compareAsc from 'date-fns/compareAsc';
import { Error, StepRow, StepParagraph, DoubleInputWrapper } from '../StepsShared.styled';
import { StepThreeWrapper, CheckCodeWrapper } from './StepThree.styled';
import {
  Heading,
  SimpleCard,
  TextField,
  DateInput,
  Bubble,
  BoldText,
  CreatableSelect,
  SubText,
  StyledLink,
} from '../../../../elements';
import { useUpdateMyDetailsMutation } from '../../../../hooks/api/updateMyDetails/updateMyDetails.generated';
import { convertToDatabaseDateFormat, logError } from '../../../../utils';
import { userDetailsAtom } from '../../../../recoil';
import { UserDetailsUpdateInput } from '../../../../interfaces/api.types.generated';

interface StepThreeProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

interface CountryItem {
  value: string;
  label: string;
}

interface StepThreeInputProps extends Omit<UserDetailsUpdateInput, 'drivingLicenseCountryOfIssue'> {
  drivingLicenseCountryOfIssue: {
    value: string;
    label: string;
  };
}

const StepThree = ({ setActiveStep, setIsLoading }: StepThreeProps) => {
  const [error, setError] = useState('');
  const userDetails = useRecoilValue(userDetailsAtom);
  const [updateMyDetails] = useUpdateMyDetailsMutation();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<StepThreeInputProps>({
    mode: 'onBlur',
  });

  const countriesList = useMemo(() => {
    const details = countryCodes.customArray({
      value: '{countryNameEn}',
      label: '{countryNameEn}',
    }) as Array<CountryItem>;

    return details.sort((a, b) => a.value.localeCompare(b.value));
  }, []);

  const validFrom = useWatch<any>({
    control,
    name: 'drivingLicenseValidFrom',
  });

  const validTo = useWatch<any>({
    control,
    name: 'drivingLicenseValidTo',
  });

  useEffect(() => {
    if (validFrom && validTo) {
      if (compareAsc(validFrom, validTo) > 0) {
        setError('End date must be later than start date.');
      } else {
        setError('');
      }
    }
  }, [validFrom, validTo]);

  const onSubmit = useCallback(
    async (input: StepThreeInputProps) => {
      try {
        setIsLoading(true);
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
            isDraft: true,
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
        reset();
        setActiveStep(4);
      } catch (err) {
        logError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [reset, setActiveStep, setIsLoading, trigger, updateMyDetails],
  );

  return (
    <StepThreeWrapper>
      <StepRow>
        <SimpleCard customStyles={{ width: '100%', textAlign: 'left' }}>
          <Heading variant="h4">Your driving license</Heading>
          <StepParagraph>
            Providing your driving license enables us to build a safe and trusted EV community. It
            will be stored securely and never shared.
          </StepParagraph>
          <form id="submit-form-3" noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register('drivingLicenseNumber', {
                required: true,
              })}
              defaultValue={userDetails?.detailsRequested?.drivingLicenseNumber || ''}
              errors={errors}
              label="Number on the front of your driving license"
              placeholder="eg. WAIRB380678RG9LM"
              required
              type="text"
            />
            <DoubleInputWrapper>
              <DateInput
                control={control}
                disableFutureDates
                disablePastDates={false}
                errors={errors}
                label="Valid from"
                name="drivingLicenseValidFrom"
                prefilledDate={userDetails?.detailsRequested?.drivingLicenseValidFrom}
                required
                showYearDropdown
              />
              <DateInput
                control={control}
                errors={errors}
                label="Valid to"
                name="drivingLicenseValidTo"
                prefilledDate={userDetails?.detailsRequested?.drivingLicenseValidTo}
                required
                showYearDropdown
              />
              {error ? <Error>{error}</Error> : null}
            </DoubleInputWrapper>
            <DoubleInputWrapper>
              <CreatableSelect
                control={control}
                defaultValue={{ value: 'United Kingdom', label: 'United Kingdom' }}
                errors={errors}
                isCreatable={false}
                label="Issued country"
                name="drivingLicenseCountryOfIssue"
                options={countriesList}
                required
              />
            </DoubleInputWrapper>
            <TextField
              {...register('drivingRecordCheckCode', {
                required: true,
              })}
              defaultValue={userDetails?.detailsRequested?.drivingRecordCheckCode || ''}
              errors={errors}
              label="Check code"
              placeholder="eg. yL d8 2M YX"
              required
              type="text"
            />
            <CheckCodeWrapper>
              <SubText>Please follow the link below to generate your check code.</SubText>
              <SubText>Copy the check code and paste it to the box.</SubText>
              <StyledLink
                color="blue"
                externalLink
                href="https://www.viewdrivingrecord.service.gov.uk/driving-record/licence-number"
              >
                https://www.viewdrivingrecord.service.gov.uk/driving-record/licence-number
              </StyledLink>
            </CheckCodeWrapper>
          </form>
        </SimpleCard>
      </StepRow>
      <StepRow>
        <Bubble>
          Generating a Licence Check Code is a really important part in Zoom being able to make our
          sharing community as safe as possible by ensuring that we have safe and reliable members.
          <p>
            <BoldText>Tips</BoldText> <br />
            To generate your checkcode you will need: <br />
            • your driving licence <br />
            • your national insurance number <br />• your postcode
          </p>
        </Bubble>
      </StepRow>
    </StepThreeWrapper>
  );
};

export default StepThree;
