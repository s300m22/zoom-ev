/* eslint-disable no-nested-ternary */
import { Dispatch, SetStateAction, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { useForm } from 'react-hook-form';
import 'react-html5-camera-photo/build/css/index.css';
import { userDetailsAtom } from '../../../../recoil';
import { StepRow, StepParagraph, DoubleInputWrapper } from '../StepsShared.styled';
import { BoldText, Bubble, Heading, SimpleCard } from '../../../../elements';
import { logError } from '../../../../utils';
import StepFourWrapper from './StepFour.styled';
import { useUpdateMyDetailsMutation } from '../../../../hooks/api/updateMyDetails/updateMyDetails.generated';
import {
  ImagePurposeEnum,
  UserDetailsUpdateInput,
} from '../../../../interfaces/api.types.generated.d';

import dynamic from 'next/dynamic';
const DropZoneInput = dynamic(() => import('../../../../elements/DropZoneInput'), { ssr: false });

interface StepFourProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const StepFour = ({ setActiveStep, setIsLoading }: StepFourProps) => {
  const [updateMyDetails] = useUpdateMyDetailsMutation();
  const userDetails = useRecoilValue(userDetailsAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    setValue,
    clearErrors,
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

        await updateMyDetails({
          variables: {
            isDraft: true,
            update: {
              ...input,
            },
          },
        });
        reset();
        setActiveStep(5);
      } catch (err) {
        logError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [reset, setActiveStep, setIsLoading, trigger, updateMyDetails],
  );

  register('drivingLicenseFrontImageId', { required: 'Required' });
  register('drivingLicenseSelfieImageId', { required: 'Required' });
  register('passportFrontImageId', { required: 'Required' });

  return (
    <StepFourWrapper>
      <StepRow>
        <SimpleCard customStyles={{ width: '100%', textAlign: 'left' }}>
          <Heading variant="h4">Documents and verification</Heading>
          <StepParagraph>
            Securely upload your photos to confirm your identification. Your photos are safe with
            use - we will not show them or use for anything else.
          </StepParagraph>
          <form id="submit-form-4" noValidate onSubmit={handleSubmit(onSubmit)}>
            <DoubleInputWrapper>
              <DropZoneInput
                clearErrors={clearErrors}
                currentImage={userDetails?.detailsRequested?.drivingLicenseFrontImage}
                errors={errors}
                imagePurpose={ImagePurposeEnum.DrivingLicenseFront}
                label="Driving license (front page)"
                name="drivingLicenseFrontImageId"
                setFieldValue={setValue}
              />
              <DropZoneInput
                clearErrors={clearErrors}
                currentImage={userDetails?.detailsRequested?.drivingLicenseSelfieImage}
                errors={errors}
                imagePurpose={ImagePurposeEnum.DrivingLicenseSelfie}
                label="Selfie with a driving license "
                name="drivingLicenseSelfieImageId"
                setFieldValue={setValue}
              />
            </DoubleInputWrapper>
            <DoubleInputWrapper>
              <DropZoneInput
                clearErrors={clearErrors}
                currentImage={userDetails?.detailsRequested?.passportFrontImage}
                errors={errors}
                imagePurpose={ImagePurposeEnum.DrivingLicenseSelfie}
                label="Bank statement or a utility bill"
                name="passportFrontImageId"
                setFieldValue={setValue}
              />
            </DoubleInputWrapper>
          </form>
        </SimpleCard>
      </StepRow>
      <StepRow>
        <Bubble>
          <BoldText>Tips</BoldText>
          • Make sure the photos are bright and in focus <br />
          • Your license must be legible <br />• Do not obscure the license with your fingers
        </Bubble>
        <Bubble>
          <BoldText>Tips</BoldText>
          • The quickest option is to go into your banking app and select ‘Statements’. <br />
          Download or screenshot a statement and upload it here <br />• Upload a photo, screenshot
          or PDF
        </Bubble>
      </StepRow>
    </StepFourWrapper>
  );
};

export default StepFour;
