import { Dispatch, useCallback, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { StepRow, StepParagraph } from '../StepsShared.styled';
import { Heading, SimpleCard, TextArea, Bubble, BoldText } from '../../../../elements';
import { getCarPhotos, logError } from '../../../../utils';
import {
  PhotosWrapper,
  MainPhotoWrapper,
  SecondaryPhotosWrapper,
  PhotosTitle,
  StepTwoBubbleWrapper,
  StepTwoTitle,
  StepTwoElement,
  StepTwoWrapper,
} from './StepTwo.styled';
import { ImagePurposeEnum, ImageType } from '../../../../interfaces/api.types.generated.d';
import { CarBootIcon, CleanIcon, CloudsIcon, PictureIcon } from '../../../../icons';
import { useUpdateCarDetailsMutation } from '../../../../hooks/api/updateCarDetails/updateCarDetails.generated';
import { vehicleSetupAtom } from '../../../../recoil';
import { useIsBusiness, useSnackbar } from '../../../../hooks';

import dynamic from 'next/dynamic';
const DropZoneInput = dynamic(() => import('../../../../elements/DropZoneInput'), { ssr: false });

interface StepTwoProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setActiveNavStep: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

interface ShowYourEvProps {
  mainCarPhoto: ImageType;
  secondCarPhoto: ImageType;
  thirdCarPhoto: ImageType;
  fourtCarPhoto: ImageType;
  fifthCarPhoto: ImageType;
  description: string;
}

const StepTwo = ({ setActiveStep, setActiveNavStep, setIsLoading }: StepTwoProps) => {
  const showSnackbar = useSnackbar();
  const isBusiness = useIsBusiness();
  const carDetails = useRecoilValue(vehicleSetupAtom);
  const setCarDetails = useSetRecoilState(vehicleSetupAtom);
  const carImages = getCarPhotos(carDetails?.images, carDetails?.details?.mainImageId);
  const [updateCarDetails] = useUpdateCarDetailsMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    clearErrors,
  } = useForm<ShowYourEvProps>({
    mode: 'onBlur',
    defaultValues: {
      mainCarPhoto: carImages?.mainImage ?? undefined,
      secondCarPhoto: carImages?.secondaryImages ? carImages?.secondaryImages[0] : undefined,
      thirdCarPhoto: carImages?.secondaryImages ? carImages?.secondaryImages[1] : undefined,
      fourtCarPhoto: carImages?.secondaryImages ? carImages?.secondaryImages[2] : undefined,
      fifthCarPhoto: carImages?.secondaryImages ? carImages?.secondaryImages[3] : undefined,
    },
  });

  useEffect(() => {
    setActiveNavStep(1);
  }, [setActiveNavStep]);

  const onSubmit = useCallback(
    async (input: ShowYourEvProps) => {
      try {
        setIsLoading(true);

        const isValid = await trigger();
        if (!isValid) {
          return;
        }

        if (!carDetails) {
          showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
          return;
        }

        const {
          mainCarPhoto,
          secondCarPhoto,
          thirdCarPhoto,
          fourtCarPhoto,
          fifthCarPhoto,
          description,
        } = input;

        const filteredImages = [
          mainCarPhoto,
          secondCarPhoto,
          thirdCarPhoto,
          fourtCarPhoto,
          fifthCarPhoto,
        ].filter((i) => Boolean(i?.id));

        const carId = carDetails.id;

        const sharedInputs = {
          description,
          mainImageId: mainCarPhoto.id,
          images: filteredImages.map((i) => i.id),
        };

        if (!isBusiness) {
          if (carId) {
            await updateCarDetails({
              variables: {
                updateInput: {
                  ...sharedInputs,
                },
                carId,
              },
            });
          } else {
            showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
            return;
          }
        }

        setCarDetails({
          ...carDetails,
          details: {
            ...carDetails.details,
            ...sharedInputs,
          },
          images: filteredImages,
        });

        setActiveNavStep(2);
        setActiveStep(5);
      } catch (error: any) {
        logError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [
      carDetails,
      isBusiness,
      setActiveNavStep,
      setActiveStep,
      setCarDetails,
      setIsLoading,
      showSnackbar,
      trigger,
      updateCarDetails,
    ],
  );

  register('mainCarPhoto', { required: 'Required' });
  register('secondCarPhoto');
  register('thirdCarPhoto');
  register('fourtCarPhoto');
  register('fifthCarPhoto');

  return (
    <StepTwoWrapper>
      <StepRow>
        <SimpleCard customStyles={{ width: '100%', textAlign: 'left' }}>
          <Heading variant="h4">Show your EV</Heading>
          <form id="submit-form-4" noValidate onSubmit={handleSubmit(onSubmit)}>
            <PhotosWrapper>
              <MainPhotoWrapper>
                <DropZoneInput
                  clearErrors={clearErrors}
                  currentImage={carImages.mainImage}
                  errors={errors}
                  imagePurpose={ImagePurposeEnum.CarImage}
                  includePreview
                  name="mainCarPhoto"
                  setFieldValue={setValue}
                  showTakePhoto={false}
                />
              </MainPhotoWrapper>
              <SecondaryPhotosWrapper>
                <DropZoneInput
                  clearErrors={clearErrors}
                  currentImage={carImages.secondaryImages ? carImages.secondaryImages[0] : null}
                  errors={errors}
                  imagePurpose={ImagePurposeEnum.CarImage}
                  includePreview
                  name="secondCarPhoto"
                  setFieldValue={setValue}
                  showPlus
                  showTakePhoto={false}
                />
                <DropZoneInput
                  clearErrors={clearErrors}
                  currentImage={carImages.secondaryImages ? carImages.secondaryImages[1] : null}
                  errors={errors}
                  imagePurpose={ImagePurposeEnum.CarImage}
                  includePreview
                  name="thirdCarPhoto"
                  setFieldValue={setValue}
                  showPlus
                  showTakePhoto={false}
                />
                <DropZoneInput
                  clearErrors={clearErrors}
                  currentImage={carImages.secondaryImages ? carImages.secondaryImages[2] : null}
                  errors={errors}
                  imagePurpose={ImagePurposeEnum.CarImage}
                  includePreview
                  name="fourtCarPhoto"
                  setFieldValue={setValue}
                  showPlus
                  showTakePhoto={false}
                />
                <DropZoneInput
                  clearErrors={clearErrors}
                  currentImage={carImages.secondaryImages ? carImages.secondaryImages[3] : null}
                  errors={errors}
                  imagePurpose={ImagePurposeEnum.CarImage}
                  includePreview
                  name="fifthCarPhoto"
                  setFieldValue={setValue}
                  showPlus
                  showTakePhoto={false}
                />
              </SecondaryPhotosWrapper>
              <PhotosTitle>EV description</PhotosTitle>
            </PhotosWrapper>
          </form>
          <StepParagraph>
            Tell us the best features of your EV and why Guests will love it. Mention any special
            amenities it has.
          </StepParagraph>
          <TextArea
            {...register('description')}
            defaultValue={carDetails?.details?.description || undefined}
            errors={errors}
            maxLength={500}
            noResize
          />
        </SimpleCard>
      </StepRow>
      <StepRow>
        <Bubble>
          <StepTwoBubbleWrapper>
            <StepTwoTitle>
              <BoldText>Tips</BoldText>
            </StepTwoTitle>
            <StepTwoElement>
              <CleanIcon />
              Make sure your car <br /> is clean
            </StepTwoElement>
            <StepTwoElement>
              <CloudsIcon />
              Take pictures during the <br /> daytime
            </StepTwoElement>
            <StepTwoElement>
              <PictureIcon />
              Choose your background <br /> carefully
            </StepTwoElement>
            <StepTwoElement>
              <CarBootIcon />
              Capture front, back, sides, <br /> inside and boot space
            </StepTwoElement>
          </StepTwoBubbleWrapper>
        </Bubble>
        <Bubble>
          <BoldText>Tips</BoldText>• Provide your offer with detailed and encouraging description
          that will interest your potential clients.
        </Bubble>
      </StepRow>
    </StepTwoWrapper>
  );
};
export default StepTwo;
