import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import { ApolloQueryResult } from '@apollo/client';
import PersonalDetailsEnum from '../../CarDetailsActiveFormEnum';
import {
  Button,
  Heading,
  SettingsCardWrapper,
  SettingsCardHeader,
  SettingsEditLink,
  SettingsCardFooter,
  SettingsForm,
  TextArea,
} from '../../../../../../../elements';
import {
  PhotosWrapper,
  MainPhotoWrapper,
  SecondaryPhotosWrapper,
  PhotosTitle,
} from './CarPhotosDescription.styled';
import { getCarPhotos, logError } from '../../../../../../../utils';
import {
  ImagePurposeEnum,
  GetCarQuery,
} from '../../../../../../../hooks/api/getCar/getCar.generated';
import { useUpdateCarDetailsMutation } from '../../../../../../../hooks/api/updateCarDetails/updateCarDetails.generated';

import dynamic from 'next/dynamic';
const DropZoneInput = dynamic(() => import('../../../../../../../elements/DropZoneInput'), {
  ssr: false,
});

interface CarPhotosDescriptionProps {
  car: GetCarQuery['car'];
  activeForm?: PersonalDetailsEnum;
  setActiveForm: Dispatch<SetStateAction<PersonalDetailsEnum | undefined>>;
  refetchCarDetails: () => Promise<ApolloQueryResult<GetCarQuery>>;
}

interface InputProps {
  mainCarPhoto: string;
  secondCarPhoto: string;
  thirdCarPhoto: string;
  fourtCarPhoto: string;
  fifthCarPhoto: string;
  description: string;
}

const CarPhotosDescription = ({
  car,
  activeForm,
  setActiveForm,
  refetchCarDetails,
}: CarPhotosDescriptionProps) => {
  const carId = car?.id as string;
  const isFormActive = activeForm === PersonalDetailsEnum.Photos;
  const isFormBlurred = activeForm && activeForm !== PersonalDetailsEnum.Photos;

  const [updateCarDetails, { loading: updateCarDetailsLoading }] = useUpdateCarDetailsMutation();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    setValue,
    reset,
    clearErrors,
    formState,
  } = useForm<InputProps>({
    mode: 'onChange',
  });

  const onSubmit = useCallback(
    async (input: InputProps) => {
      try {
        const isValid = await trigger();

        if (!isValid) {
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

        let filteredImages = [
          mainCarPhoto,
          secondCarPhoto,
          thirdCarPhoto,
          fourtCarPhoto,
          fifthCarPhoto,
        ].filter(Boolean);

        filteredImages = filteredImages.map((fi: any) => (typeof fi == 'string' ? fi : fi.id));

        await updateCarDetails({
          variables: {
            updateInput: {
              images: filteredImages,
              mainImageId:
                typeof mainCarPhoto == 'string' ? mainCarPhoto : (mainCarPhoto as any).id,
              ...(formState.dirtyFields.description && { description }),
            },
            carId,
          },
        });
        reset({
          description,
          secondCarPhoto,
        });
        await refetchCarDetails();
        setActiveForm(undefined);
      } catch (error: any) {
        logError(error);
      }
    },
    [
      carId,
      formState.dirtyFields.description,
      reset,
      setActiveForm,
      trigger,
      updateCarDetails,
      refetchCarDetails,
    ],
  );

  register('mainCarPhoto', { required: 'Required' });
  register('secondCarPhoto');
  register('thirdCarPhoto');
  register('fourtCarPhoto');
  register('fifthCarPhoto');

  const carImages = useMemo(
    () =>
      getCarPhotos(
        car?.detailsRequested?.images ?? car?.details.images,
        car?.detailsRequested?.mainImageId ?? car?.details.mainImageId,
      ),
    [car],
  );

  return updateCarDetailsLoading ? (
    <Skeleton
      count={1}
      height={500}
      style={{
        marginBottom: '30px',
        borderRadius: '12px',
        boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
      }}
    />
  ) : (
    <SettingsCardWrapper isFormBlurred={Boolean(isFormBlurred)}>
      <SettingsCardHeader>
        <Heading variant="h4">Photos & description </Heading>
        <SettingsEditLink onClick={() => setActiveForm(PersonalDetailsEnum.Photos)}>
          Edit
        </SettingsEditLink>
      </SettingsCardHeader>
      <SettingsForm noValidate onSubmit={handleSubmit(onSubmit)}>
        <PhotosWrapper>
          <MainPhotoWrapper>
            <DropZoneInput
              clearErrors={clearErrors}
              currentImage={carImages.mainImage}
              errors={errors}
              imagePurpose={ImagePurposeEnum.CarImage}
              includePreview
              isDisabled={!isFormActive}
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
              isDisabled={!isFormActive}
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
              isDisabled={!isFormActive}
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
              isDisabled={!isFormActive}
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
              isDisabled={!isFormActive}
              name="fifthCarPhoto"
              setFieldValue={setValue}
              showPlus
              showTakePhoto={false}
            />
          </SecondaryPhotosWrapper>
          <PhotosTitle>EV description</PhotosTitle>
        </PhotosWrapper>
        <TextArea
          {...register('description')}
          defaultValue={car?.details?.description || undefined}
          errors={errors}
          maxLength={500}
          noResize
          readOnly={!isFormActive}
        />
        {isFormActive ? (
          <SettingsCardFooter style={{ marginTop: '20px' }}>
            <Button
              isLoading={updateCarDetailsLoading}
              onClick={(e) => {
                e.preventDefault();
                refetchCarDetails();

                reset({
                  description: car?.details?.description ?? '',
                  secondCarPhoto: carImages.secondaryImages ? carImages.secondaryImages[0].url : '',
                });
                setActiveForm(undefined);
                // window.location.reload();
              }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button isLoading={updateCarDetailsLoading}>Save changes</Button>
          </SettingsCardFooter>
        ) : null}
      </SettingsForm>
    </SettingsCardWrapper>
  );
};

export default CarPhotosDescription;
