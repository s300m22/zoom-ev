import { Dispatch, useCallback, SetStateAction, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { TextField } from '..';
import { priceAberrationValidator, getAge, logError } from '../../utils';
import { CarValueEnum, UpdateCarPricesInputType } from '../../interfaces/api.types.generated';
import { useUpdateCarPricesMutation } from '../../hooks/api/updateCarPrices/updateCarPrices.generated';
import { PricingForm, TripleInputWrapper } from './CarPricingForm.styled';
import { userDetailsAtom, vehicleSetupAtom } from '../../recoil';
import { useRecommendedCarPriceLazyQuery } from '../../hooks/api/recommendedCarPrice/recommendedCarPrice.generated';
import { useGetCarPriceMaximumAberrationQuery } from '../../hooks/api/carPriceMaximumAberration/carPriceMaximumAberration.generated';
import { useIsBusiness, useSnackbar } from '../../hooks';
import EarningsSummaryComponent from './EarningsSummaryComponent';

interface CarPricingProps {
  carId?: string;
  setActiveStep?: Dispatch<SetStateAction<number>>;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
}

const CarPricingForm = ({ carId, setIsLoading, setActiveStep }: CarPricingProps) => {
  const showSnackbar = useSnackbar();
  const isBusiness = useIsBusiness();
  const userDetails = useRecoilValue(userDetailsAtom);
  const carDetails = useRecoilValue(vehicleSetupAtom);
  const setCarDetails = useSetRecoilState(vehicleSetupAtom);
  const [updateCarPrices] = useUpdateCarPricesMutation();
  const [getRecommendedPrices, { data: recommendedCarPrice }] = useRecommendedCarPriceLazyQuery();
  const { data: carPriceMaximumAberrationData } = useGetCarPriceMaximumAberrationQuery();

  const methods = useForm<UpdateCarPricesInputType>({
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
  } = methods;

  const priceRecommendations = recommendedCarPrice?.recommendedCarPrice;

  const recommendedPrices = priceRecommendations
    ? {
        perHour: Math.trunc(priceRecommendations.pricePerHour) / 100,
        perDay: Math.trunc(priceRecommendations.pricePerDay) / 100,
        perWeek: Math.trunc(priceRecommendations.pricePerWeek) / 100,
      }
    : null;

  useEffect(() => {
    if (carDetails) {
      if (
        userDetails &&
        (carDetails?.details.year || (carDetails?.details?.value && carDetails?.details.year))
      ) {
        const carValue = carDetails.details.value;
        const carYear = carDetails.details.year;
        if (carValue && carYear) {
          getRecommendedPrices({
            variables: {
              business: Boolean(userDetails.businessUserRole),
              carValue: carValue as CarValueEnum,
              carAge: getAge(Date.parse(carYear.toString())),
            },
          });
        }
      }
    }
  }, [carDetails, getRecommendedPrices, userDetails]);

  useEffect(() => {
    if (
      priceRecommendations &&
      !carDetails?.pricePerHour &&
      !carDetails?.pricePerDay &&
      !carDetails?.pricePerWeek
    ) {
      const { pricePerHour, pricePerDay, pricePerWeek } = priceRecommendations;
      setValue('pricePerHour', Math.trunc(pricePerHour) / 100);
      setValue('pricePerDay', Math.trunc(pricePerDay) / 100);
      setValue('pricePerWeek', Math.trunc(pricePerWeek) / 100);
    } else if (carDetails?.pricePerHour || carDetails?.pricePerDay || carDetails?.pricePerWeek) {
      if (carDetails?.pricePerHour)
        setValue('pricePerHour', Math.trunc(carDetails?.pricePerHour) / 100);
      if (carDetails?.pricePerDay)
        setValue('pricePerDay', Math.trunc(carDetails?.pricePerDay) / 100);
      if (carDetails?.pricePerWeek)
        setValue('pricePerWeek', Math.trunc(carDetails?.pricePerWeek) / 100);
    }
  }, [
    carDetails?.pricePerDay,
    carDetails?.pricePerHour,
    carDetails?.pricePerWeek,
    priceRecommendations,
    setValue,
  ]);

  const onSubmit = useCallback(
    async (input: UpdateCarPricesInputType) => {
      try {
        setIsLoading && setIsLoading(true);

        const isValid = await trigger();

        if (!isValid) {
          return;
        }

        if (!carDetails) {
          showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
          return;
        }

        const { pricePerHour, pricePerDay, pricePerWeek } = input;

        const pricing = {
          pricePerHour: Math.trunc(pricePerHour * 100),
          pricePerDay: Math.trunc(pricePerDay * 100),
          pricePerWeek: Math.trunc(pricePerWeek * 100),
        };

        if (!isBusiness) {
          if (carId || carDetails?.id) {
            await updateCarPrices({
              variables: {
                input: {
                  ...pricing,
                },
                carId: (carId || carDetails?.id) as string,
              },
            });
          } else {
            showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
            return;
          }
        }

        carDetails &&
          setCarDetails({
            ...carDetails,
            ...pricing,
          });

        setActiveStep && setActiveStep(6);
      } catch (error: any) {
        logError(error);
      } finally {
        setIsLoading && setIsLoading(false);
      }
    },
    [
      setIsLoading,
      trigger,
      carDetails,
      isBusiness,
      setCarDetails,
      setActiveStep,
      carId,
      updateCarPrices,
      showSnackbar,
    ],
  );

  return (
    <FormProvider {...methods}>
      <PricingForm id="submit-form-5-1" noValidate onSubmit={handleSubmit(onSubmit)}>
        <TripleInputWrapper>
          <TextField
            {...register('pricePerHour', {
              required: true,
              valueAsNumber: true,
              ...(recommendedPrices &&
                carPriceMaximumAberrationData && {
                  validate: (value) =>
                    priceAberrationValidator(
                      value,
                      recommendedPrices.perHour,
                      carPriceMaximumAberrationData.carPriceMaximumAberration,
                    ),
                }),
            })}
            defaultValue={carDetails?.pricePerHour ? carDetails.pricePerHour / 100 : ''}
            errors={errors}
            label="Hourly"
            min="0"
            placeholder=""
            required
            showCurrency
            step="0.1"
            suggestedPrice={recommendedPrices?.perHour}
            type="number"
          />
          <TextField
            {...register('pricePerDay', {
              required: true,
              valueAsNumber: true,
              ...(recommendedPrices &&
                carPriceMaximumAberrationData && {
                  validate: (value) =>
                    priceAberrationValidator(
                      value,
                      recommendedPrices.perDay,
                      carPriceMaximumAberrationData.carPriceMaximumAberration,
                    ),
                }),
            })}
            defaultValue={carDetails?.pricePerDay ? carDetails.pricePerDay / 100 : ''}
            errors={errors}
            label="Daily"
            placeholder=""
            required
            showCurrency
            step="0.1"
            suggestedPrice={recommendedPrices?.perDay}
            type="number"
          />
          <TextField
            {...register('pricePerWeek', {
              required: true,
              valueAsNumber: true,
              ...(recommendedPrices &&
                carPriceMaximumAberrationData && {
                  validate: (value) =>
                    priceAberrationValidator(
                      value,
                      recommendedPrices.perWeek,
                      carPriceMaximumAberrationData.carPriceMaximumAberration,
                    ),
                }),
            })}
            defaultValue={carDetails?.pricePerWeek ? carDetails.pricePerWeek / 100 : ''}
            errors={errors}
            label="Weekly"
            name="pricePerWeek"
            placeholder=""
            required
            showCurrency
            step="0.1"
            suggestedPrice={recommendedPrices?.perWeek}
            type="number"
          />
        </TripleInputWrapper>
        <button
          id="hackyButtonToSubmitMultipleForms"
          style={{ display: 'none' }}
          type="submit"
        ></button>
      </PricingForm>
      <EarningsSummaryComponent />
    </FormProvider>
  );
};

export default CarPricingForm;
