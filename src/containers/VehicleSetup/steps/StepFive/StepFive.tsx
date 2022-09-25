import { Dispatch, useCallback, useEffect, SetStateAction, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { StepWrapper, StepRow, StepParagraph } from '../StepsShared.styled';
import { Checkbox, StyledLink, Heading, SimpleCard } from '../../../../elements';
import { logError } from '../../../../utils';
import { vehicleSetupAtom } from '../../../../recoil';
import { useSnackbar, useIsBusiness } from '../../../../hooks';
import { useCreateCarMutation } from '../../../../hooks/api/createCar/createCar.generated';
import { useUpdateCarDetailsMutation } from '../../../../hooks/api/updateCarDetails/updateCarDetails.generated';
import { useUpdateCarFeaturesMutation } from '../../../../hooks/api/updateCarFeatures/updateCarFeatures.generated';
import { useUpdateCarPricesMutation } from '../../../../hooks/api/updateCarPrices/updateCarPrices.generated';
import { useUpdateCarGuideMutation } from '../../../../hooks/api/updateCarGuide/updateCarGuide.generated';
import { useDeleteCarMutation } from '../../../../hooks/api/deleteCar/deleteCar.generated';
import { useUpdateCarLocationMutation } from '../../../../hooks/api/updateCarLocation/updateCarLocation.generated';
import { useUpdateCarLocationTipsMutation } from '../../../../hooks/api/updateCarLocationTips/updateCarLocationTips.generated';
import { useDeleteCarIsDraftFlagMutation } from '../../../../hooks/api/deleteCarIsDraftFlag/deleteCarIsDraftFlag.generated';
import { useAddCarAvailabilityPeriodMutation } from '../../../../hooks/api/addCarAvailabilityPeriod/addCarAvailabilityPeriod.generated';
import { useUpdateCarSalesInfoMutation } from '../../../../hooks/api/updateCarSalesInfo/updateCarSalesInfo.generated';
import { useDeleteCarSalesInfoMutation } from '../../../../hooks/api/deleteCarSalesInfo/deleteCarSalesInfo.generated';

interface StepFiveProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setActiveNavStep: Dispatch<SetStateAction<number>>;
}

const StepFive = ({ setActiveStep, setIsLoading, setActiveNavStep }: StepFiveProps) => {
  const showSnackbar = useSnackbar();
  const isBusiness = useIsBusiness();
  const carDetails = useRecoilValue(vehicleSetupAtom);
  const setCarDetails = useSetRecoilState(vehicleSetupAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    mode: 'onBlur',
  });
  const [createCar] = useCreateCarMutation();
  const [updateCarDetails] = useUpdateCarDetailsMutation();
  const [updateCarFeatures] = useUpdateCarFeaturesMutation();
  const [updateCarPrices] = useUpdateCarPricesMutation();
  const [updateCarGuide] = useUpdateCarGuideMutation();
  const [updateCarLocation] = useUpdateCarLocationMutation();
  const [updateCarLocationTips] = useUpdateCarLocationTipsMutation();
  const [deleteCar] = useDeleteCarMutation();
  const [deleteDraftFlag] = useDeleteCarIsDraftFlagMutation();
  const [addCarAvailabilityPeriods] = useAddCarAvailabilityPeriodMutation();
  const [updateCarSalesInfo] = useUpdateCarSalesInfoMutation();
  const [deleteCarSalesInfo] = useDeleteCarSalesInfoMutation();
  const carId = useRef<string>('');

  useEffect(() => {
    setActiveNavStep(4);
  }, [setActiveNavStep]);

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      const isValid = await trigger();
      const newCarId = '';
      if (!isValid) {
        return;
      }

      if (!carDetails) {
        showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
        return;
      }
      if (isBusiness) {
        if (carDetails) {
          const {
            details: { registration },
            features,
            pricePerHour,
            pricePerDay,
            pricePerWeek,
            guide,
            tips,
            realLocation,
            availabilityPeriods,
            isAvailableToBuy,
            salesInfo,
          } = carDetails;
          if (
            registration &&
            features &&
            pricePerHour &&
            pricePerDay &&
            pricePerWeek &&
            realLocation &&
            realLocation.lat &&
            realLocation.lon &&
            realLocation.addressPrivate &&
            realLocation.addressPublic
          ) {
            const pricing = {
              pricePerHour,
              pricePerDay,
              pricePerWeek,
            };

            const { lat, lon, addressPrivate, addressPublic } = realLocation;

            const newCar = await createCar({
              variables: {
                input: {
                  registration,
                },
              },
            });

            if (newCar.data?.createCar.id) {
              carId.current = newCar.data?.createCar.id;
            } else {
              await deleteCar({
                variables: {
                  carId: carId.current,
                },
              });
              showSnackbar({ message: 'Unable to create a new car.', type: 'error' });
              return;
            }

            await updateCarDetails({
              variables: {
                updateInput: {
                  ...carDetails.details,
                },
                carId: carId.current,
              },
            });

            await updateCarFeatures({
              variables: {
                features: features.map((f) => f.id),
                carId: carId.current,
              },
            });

            await updateCarPrices({
              variables: {
                input: {
                  ...pricing,
                },
                carId: carId.current,
              },
            });

            // update car sales info if provided
            if (isAvailableToBuy) {
              if (salesInfo) {
                await updateCarSalesInfo({
                  variables: {
                    salesInfoInput: salesInfo,
                    carId: carId.current,
                  },
                });
              }
            } else {
              await deleteCarSalesInfo({
                variables: {
                  carId: carId.current,
                },
              });
            }

            await updateCarLocation({
              variables: {
                addressPrivate,
                addressPublic,
                lon,
                lat,
                carId: carId.current,
              },
            });

            if (availabilityPeriods?.length) {
              const periods = availabilityPeriods?.map((period) =>
                addCarAvailabilityPeriods({
                  variables: {
                    input: {
                      ...period,
                      carId: carId.current,
                    },
                  },
                }),
              );
              await Promise.all(periods);
            }

            if (tips) {
              await updateCarLocationTips({
                variables: {
                  locationTips: tips,
                  carId: carId.current,
                },
              });
            }

            if (guide) {
              await updateCarGuide({
                variables: {
                  guide,
                  carId: carId.current,
                },
              });
            }
          }
        } else {
          showSnackbar({ message: 'Unable to create a new car.', type: 'error' });
          return;
        }
      }

      if (carDetails.id || newCarId) {
        await deleteDraftFlag({
          variables: {
            carId: carDetails.id || carId.current,
          },
        });
      }
      setActiveStep(10);
    } catch (error: any) {
      logError(error);
      await deleteCar({
        variables: {
          carId: carDetails?.id || carId.current,
        },
      });
      showSnackbar({ message: 'Unable to create a new car.', type: 'error' });
      return;
    } finally {
      setCarDetails(undefined);
      setIsLoading(false);
    }
  }, [
    addCarAvailabilityPeriods,
    carDetails,
    createCar,
    deleteCar,
    deleteDraftFlag,
    isBusiness,
    setActiveStep,
    setCarDetails,
    setIsLoading,
    showSnackbar,
    trigger,
    updateCarDetails,
    updateCarFeatures,
    updateCarGuide,
    updateCarLocation,
    updateCarLocationTips,
    updateCarPrices,
  ]);

  return (
    <StepWrapper>
      <StepRow>
        <SimpleCard customStyles={{ width: '100%', textAlign: 'left' }}>
          <Heading variant="h4">Agreements</Heading>
          <StepParagraph>You are almost there. This is the last step.</StepParagraph>
          <form id="submit-form-9" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Checkbox
              {...register('termsAccept', { required: true })}
              customStyles={{
                fontSize: '16px',
                fontWeight: 400,
              }}
              errors={errors}
              label={
                <>
                  I confirm my EV meets the Minimum Vehicle Specification & Vehicle Condition and
                  Roadworthiness criteria outlined in Zoom EV&apos;s{' '}
                  <StyledLink color="blue" externalLink href="/terms-and-conditions#60">
                    Terms & Conditions
                  </StyledLink>{' '}
                </>
              }
              required
            />
          </form>
        </SimpleCard>
      </StepRow>
    </StepWrapper>
  );
};

export default StepFive;
