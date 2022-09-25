/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable global-require */
/* eslint-disable no-nested-ternary */
import { useCallback, useEffect, Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { Bubble, Button, DateInput, Heading, SimpleCard, TextField } from '../../../../elements';
import { userDetailsAtom } from '../../../../recoil';
import {
  AvatarUploadWrapper,
  UploadButtonWrapper,
  UploadParagraph,
  UploadWrapper,
  StepOneWrapper,
} from './StepOne.styled';
import { StepRow, StepParagraph, DoubleInputWrapper } from '../StepsShared.styled';
import { convertToDatabaseDateFormat, logError } from '../../../../utils';
import { useUpdateMyDetailsMutation } from '../../../../hooks/api/updateMyDetails/updateMyDetails.generated';
import {
  ImagePurposeEnum,
  UserDetailsUpdateInput,
} from '../../../../interfaces/api.types.generated.d';

import dynamic from 'next/dynamic';
const DropZoneInput = dynamic(() => import('../../../../elements/DropZoneInput'), { ssr: false });

interface StepOneProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const StepOne = ({ setActiveStep, setIsLoading }: StepOneProps) => {
  const userDetails = useRecoilValue(userDetailsAtom);
  const [updateMyDetails] = useUpdateMyDetailsMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    control,
    clearErrors,
  } = useForm<UserDetailsUpdateInput>({
    mode: 'onChange',
  });

  register('avatarImageId', { required: 'Required' });

  const onSubmit = useCallback(
    async (input: UserDetailsUpdateInput) => {
      try {
        setIsLoading(true);
        const { firstName, lastName, dateOfBirth, avatarImageId } = input;

        const isValid = await trigger();

        if (!isValid) {
          return;
        }

        await updateMyDetails({
          variables: {
            isDraft: true,
            update: {
              firstName,
              lastName,
              dateOfBirth: dateOfBirth ? convertToDatabaseDateFormat(dateOfBirth) : '',
              avatarImageId,
            },
          },
        });
        setActiveStep(2);
      } catch (err) {
        logError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [setActiveStep, setIsLoading, trigger, updateMyDetails],
  );

  useEffect(() => {
    if (userDetails?.detailsRequested?.avatarImage?.id) {
      setValue('avatarImageId', userDetails.detailsRequested.avatarImage.id);
    }
  }, [setValue, userDetails]);

  return (
    <StepOneWrapper>
      <StepRow>
        <SimpleCard customStyles={{ width: '100%', textAlign: 'left' }}>
          <Heading variant="h4">Tell us more about yourself</Heading>
          <StepParagraph>We would love to get to know you better.</StepParagraph>
          <form id="submit-form-1" noValidate onSubmit={handleSubmit(onSubmit)}>
            <AvatarUploadWrapper>
              <UploadWrapper>
                <DropZoneInput
                  clearErrors={clearErrors}
                  currentImage={
                    userDetails?.detailsRequested?.avatarImage
                      ? userDetails?.detailsRequested?.avatarImage
                      : null
                  }
                  errors={errors}
                  imagePurpose={ImagePurposeEnum.UserAvatar}
                  isAvatar
                  name="avatarImageId"
                  setFieldValue={setValue}
                  showTakePhoto={false}
                />
                <UploadButtonWrapper>
                  <Button
                    onClick={() => document.getElementsByName('avatarImageId')[0].click()}
                    type="button"
                    variant="outlined"
                  >
                    Select an image
                  </Button>
                  <UploadParagraph>
                    JPG, GIF, HEIC, HEIF or PNG format; maximum size of 8MB. Ideal size: at least
                    200 x 200 pixels
                  </UploadParagraph>
                </UploadButtonWrapper>
              </UploadWrapper>
            </AvatarUploadWrapper>
            <DoubleInputWrapper>
              <TextField
                {...register('firstName', {
                  required: true,
                })}
                defaultValue={
                  userDetails?.detailsRequested?.firstName || userDetails?.details?.firstName || ''
                }
                errors={errors}
                label="First name"
                placeholder="eg. Mary"
                required
                type="text"
              />
              <TextField
                {...register('lastName', {
                  required: true,
                })}
                defaultValue={
                  userDetails?.detailsRequested?.lastName || userDetails?.details?.lastName || ''
                }
                errors={errors}
                label="Last name"
                placeholder="eg. Green"
                required
                type="text"
              />
            </DoubleInputWrapper>
            <DoubleInputWrapper>
              <DateInput
                control={control}
                disablePastDates={false}
                errors={errors}
                label="Date of birth"
                minimalAge={25}
                name="dateOfBirth"
                prefilledDate={userDetails?.detailsRequested?.dateOfBirth}
                required
                showPicker={false}
              />
            </DoubleInputWrapper>
          </form>
        </SimpleCard>
      </StepRow>
      <StepRow>
        <Bubble>A profile photo helps guests and hosts recognise each other.</Bubble>
        <Bubble>Your last name will be shown only when a booking is requested or accepted</Bubble>
      </StepRow>
    </StepOneWrapper>
  );
};

export default StepOne;
