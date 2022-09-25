import { Dispatch, SetStateAction, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { StepWrapper, StepRow, StepParagraph, DoubleInputWrapper } from '../StepsShared.styled';
import { Heading, SimpleCard, TextField, PhoneInput } from '../../../../elements';
import { useUpdateMyDetailsMutation } from '../../../../hooks/api/updateMyDetails/updateMyDetails.generated';
import { logError, numberValidator } from '../../../../utils';
import { userDetailsAtom } from '../../../../recoil';
import { UserDetailsUpdateInput } from '../../../../interfaces/api.types.generated';

interface StepTwoProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const StepTwo = ({ setActiveStep, setIsLoading }: StepTwoProps) => {
  const [selectedCallingCode, setSelectedCallingCode] = useState('44');
  const userDetails = useRecoilValue(userDetailsAtom);
  const userCallingCode = userDetails?.detailsRequested?.phoneNumber
    ?.split('|')[0]
    .replace('+', '');
  const userPhoneNumber = userDetails?.detailsRequested?.phoneNumber?.split('|')[1];
  const [updateMyDetails] = useUpdateMyDetailsMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<UserDetailsUpdateInput>({
    mode: 'onBlur',
  });

  const onSubmit = useCallback(
    async (input: UserDetailsUpdateInput) => {
      try {
        setIsLoading(true);
        const isValid = await trigger();
        if (!isValid) {
          return;
        }
        const { phoneNumber, addressLine1, addressLine2, city, county, postCode } = input;
        await updateMyDetails({
          variables: {
            isDraft: true,
            update: {
              phoneNumber: `+${selectedCallingCode}|${phoneNumber}`,
              addressLine1,
              addressLine2,
              city,
              county,
              postCode,
            },
          },
        });
        reset();
        setActiveStep(3);
      } catch (error: any) {
        logError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [reset, selectedCallingCode, setIsLoading, trigger, updateMyDetails], // eslint-disable-line
  );

  return (
    <StepWrapper>
      <StepRow>
        <SimpleCard customStyles={{ width: '100%', textAlign: 'left' }}>
          <Heading variant="h4">Add contact information</Heading>
          <StepParagraph>
            We need your contact information to provide Goods and Services to you. We will use this
            data responsibly as per our Privacy Policy.
          </StepParagraph>
          <form id="submit-form-2" noValidate onSubmit={handleSubmit(onSubmit)}>
            <PhoneInput
              {...register('phoneNumber', {
                required: true,
                pattern: numberValidator('Phone'),
              })}
              defaultValue={userPhoneNumber}
              errors={errors}
              label="Phone number"
              required
              selectedCallingCode={userCallingCode || selectedCallingCode}
              setSelectedCallingCode={setSelectedCallingCode}
            />
            <TextField
              {...register('addressLine1', {
                required: true,
              })}
              defaultValue={userDetails?.detailsRequested?.addressLine1 || ''}
              errors={errors}
              label="Address 1"
              placeholder="eg. 50 Birmingham Street"
              required
              type="text"
            />
            <TextField
              {...register('addressLine2')}
              defaultValue={userDetails?.detailsRequested?.addressLine2 || ''}
              errors={errors}
              label="Address 2"
              placeholder="eg. apartment, floor, building (optional)  "
              type="text"
            />
            <DoubleInputWrapper>
              <TextField
                {...register('city', {
                  required: true,
                })}
                defaultValue={userDetails?.detailsRequested?.city || ''}
                errors={errors}
                label="Town"
                placeholder="eg. Bristol "
                required
                type="text"
              />
              <TextField
                {...register('county')}
                defaultValue={userDetails?.detailsRequested?.county || ''}
                errors={errors}
                label="County"
                placeholder="eg. Avon"
                type="text"
              />
            </DoubleInputWrapper>
            <DoubleInputWrapper>
              <TextField
                {...register('postCode', {
                  required: true,
                })}
                defaultValue={userDetails?.detailsRequested?.postCode || ''}
                errors={errors}
                label="Postcode"
                placeholder="X11 Y11"
                required
                type="text"
              />
            </DoubleInputWrapper>
          </form>
        </SimpleCard>
      </StepRow>
    </StepWrapper>
  );
};

export default StepTwo;
