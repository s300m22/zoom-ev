import { ApolloQueryResult } from '@apollo/client';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import { useRecoilValue } from 'recoil';
import {
  Button,
  Heading,
  SettingsCardWrapper,
  SettingsCardHeader,
  SettingsEditLink,
  SettingsCardFooter,
  TextField,
  SettingsForm,
  TripleInputWrapper,
  EarningsSummaryComponent,
  PhoneInput,
  TextArea,
  Checkbox,
} from '../../../../../../../elements';
import { useGetCarPriceMaximumAberrationQuery } from '../../../../../../../hooks/api/carPriceMaximumAberration/carPriceMaximumAberration.generated';
import { useDeleteCarSalesInfoMutation } from '../../../../../../../hooks/api/deleteCarSalesInfo/deleteCarSalesInfo.generated';
import { GetCarQuery } from '../../../../../../../hooks/api/getCar/getCar.generated';
import { useRecommendedCarPriceLazyQuery } from '../../../../../../../hooks/api/recommendedCarPrice/recommendedCarPrice.generated';
import { useUpdateCarPricesMutation } from '../../../../../../../hooks/api/updateCarPrices/updateCarPrices.generated';
import { useUpdateCarSalesInfoMutation } from '../../../../../../../hooks/api/updateCarSalesInfo/updateCarSalesInfo.generated';
import {
  CarSalesInfoInputType,
  CarValueEnum,
  InputMaybe,
  Scalars,
} from '../../../../../../../interfaces/api.types.generated';
import { userDetailsAtom } from '../../../../../../../recoil';
import { getAge, logError, priceAberrationValidator } from '../../../../../../../utils';
import { StepParagraph } from '../../../../../../VehicleSetup/steps/StepsShared.styled';
import PersonalDetailsEnum from '../../CarDetailsActiveFormEnum';

interface CarPricingProps {
  car: GetCarQuery['car'];
  activeForm?: PersonalDetailsEnum;
  setActiveForm: Dispatch<SetStateAction<PersonalDetailsEnum | undefined>>;
  refetchCarDetails: () => Promise<ApolloQueryResult<GetCarQuery>>;
}

interface InputType {
  pricePerDay: Scalars['Int'];
  pricePerHour: Scalars['Int'];
  pricePerWeek: Scalars['Int'];
  description: Scalars['String'];
  email?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  price: Scalars['Float'];
  url?: InputMaybe<Scalars['String']>;
}

const CarPricing = ({ car, activeForm, setActiveForm, refetchCarDetails }: CarPricingProps) => {
  const carId = car?.id as string;
  const isFormActive = activeForm === PersonalDetailsEnum.Pricing;
  const isFormBlurred = activeForm && activeForm !== PersonalDetailsEnum.Pricing;
  const userDetails = useRecoilValue(userDetailsAtom);
  const [isAvailableForSale, setIsAvailableForSale] = useState(car?.isAvailableToBuy);
  const [updatedCarPrices, setUpdatedCarPrices] = useState({
    pricePerHour: car?.pricePerHour ? Math.trunc(car.pricePerHour) / 100 : '',
    pricePerDay: car?.pricePerDay ? Math.trunc(car.pricePerDay) / 100 : '',
    pricePerWeek: car?.pricePerWeek ? Math.trunc(car.pricePerWeek) / 100 : '',
  });
  const [oldCarPrices, setOldCarPrices] = useState({
    pricePerHour: car?.pricePerHour ? Math.trunc(car.pricePerHour) / 100 : '',
    pricePerDay: car?.pricePerDay ? Math.trunc(car.pricePerDay) / 100 : '',
    pricePerWeek: car?.pricePerWeek ? Math.trunc(car.pricePerWeek) / 100 : '',
  });
  const [updateCarPrices, { loading }] = useUpdateCarPricesMutation();
  const [getRecommendedPrices, { data: recommendedCarPrice }] = useRecommendedCarPriceLazyQuery();
  const { data: carPriceMaximumAberrationData } = useGetCarPriceMaximumAberrationQuery();
  const [updateCarSalesInfo] = useUpdateCarSalesInfoMutation();
  const [deleteCarSalesInfo] = useDeleteCarSalesInfoMutation();

  const methods = useForm<InputType>({
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
        perHour: priceRecommendations.pricePerHour / 100,
        perDay: priceRecommendations.pricePerDay / 100,
        perWeek: priceRecommendations.pricePerWeek / 100,
      }
    : null;

  const [selectedCallingCode, setSelectedCallingCode] = useState('44');
  const salesInfoPhoneCallingCode = car?.salesInfo?.phoneNumber?.split('|')[0].replace('+', '');
  const salesInfoPhoneNumber = car?.salesInfo?.phoneNumber?.split('|')[1];

  useEffect(() => {
    if (car) {
      if (
        userDetails &&
        ((car?.detailsRequested?.value && car?.detailsRequested.year) ||
          (car?.details?.value && car?.details.year))
      ) {
        const carValue = car.details.value || car?.detailsRequested?.value;
        const carYear = car.details.year || car?.detailsRequested?.year;
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
  }, [car, getRecommendedPrices, userDetails]);

  const onSubmit = useCallback(
    async (input: InputType) => {
      try {
        const isValid = await trigger();

        if (!isValid) {
          return;
        }
        const { pricePerHour, pricePerDay, pricePerWeek } = input;
        const pricing = {
          pricePerHour: Math.trunc(pricePerHour * 100),
          pricePerDay: Math.trunc(pricePerDay * 100),
          pricePerWeek: Math.trunc(pricePerWeek * 100),
        };

        await updateCarPrices({
          variables: {
            input: {
              ...pricing,
            },
            carId,
          },
        });

        if (isAvailableForSale) {
          await updateCarSalesInfo({
            variables: {
              salesInfoInput: {
                description: input.description,
                email: input.email,
                phoneNumber: `+${selectedCallingCode}|${input.phoneNumber}`,
                price: input.price,
                url: input.url,
              } as CarSalesInfoInputType,
              carId,
            },
          });
        } else {
          await deleteCarSalesInfo({
            variables: {
              carId,
            },
          });
        }
        setUpdatedCarPrices({ ...pricing });
        setOldCarPrices({ ...input });
        await refetchCarDetails();
        setActiveForm(undefined);
      } catch (error: any) {
        logError(error);
      }
    },
    [
      trigger,
      updateCarPrices,
      carId,
      setActiveForm,
      refetchCarDetails,
      isAvailableForSale,
      updateCarSalesInfo,
      deleteCarSalesInfo,
      selectedCallingCode,
    ],
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleUserKeyPress = (e: any) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }
    };
    window.addEventListener('keydown', (e) => handleUserKeyPress(e), { passive: true });

    return () => {
      window.removeEventListener('keydown', (e) => handleUserKeyPress(e));
    };
  }, [handleSubmit, onSubmit]);

  const resetFormToOldValues = () => {
    setValue('pricePerHour', Number(oldCarPrices.pricePerHour));
    setValue('pricePerDay', Number(oldCarPrices.pricePerDay));
    setValue('pricePerWeek', Number(oldCarPrices.pricePerWeek));
  };

  return car ? (
    <SettingsCardWrapper isFormBlurred={Boolean(isFormBlurred)}>
      <SettingsCardHeader>
        <Heading variant="h4">Pricing</Heading>
        <SettingsEditLink onClick={() => setActiveForm(PersonalDetailsEnum.Pricing)}>
          Edit
        </SettingsEditLink>
      </SettingsCardHeader>
      <FormProvider {...methods}>
        <SettingsForm noValidate onSubmit={handleSubmit(onSubmit)}>
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
              defaultValue={updatedCarPrices.pricePerHour}
              errors={errors}
              label="Hourly"
              min="0"
              placeholder=""
              readOnly={!isFormActive}
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
              defaultValue={updatedCarPrices.pricePerDay}
              errors={errors}
              label="Daily"
              placeholder=""
              readOnly={!isFormActive}
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
              defaultValue={updatedCarPrices.pricePerWeek}
              errors={errors}
              label="Weekly"
              placeholder=""
              readOnly={!isFormActive}
              required
              showCurrency
              step="0.1"
              suggestedPrice={recommendedPrices?.perWeek}
              type="number"
            />
          </TripleInputWrapper>

          <EarningsSummaryComponent marginTop="10px" />
          <br />
          <br />
          <Heading variant="h4">Sales Information</Heading>
          {!isAvailableForSale && !isFormActive && (
            <p>Your EV is not currently listed for sale. Select edit to add sales information.</p>
          )}

          {isFormActive && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: isAvailableForSale ? 20 : 0,
              }}
            >
              <p>Would you also like to advertise this EV for sale?</p>
              <Checkbox
                checked={isAvailableForSale}
                label=""
                name="isAvailableToBuy"
                onChange={(e) => {
                  setIsAvailableForSale(e.target.checked);
                }}
              />
            </div>
          )}

          {isAvailableForSale && (
            <div>
              <StepParagraph>
                All EVs added to the platform are available for car sharing, but you can also
                advertise yours for sale if you wish to.
              </StepParagraph>
              <br />

              <TripleInputWrapper>
                <TextField
                  defaultValue={car?.salesInfo?.price.toString() ?? ''}
                  {...register('price', {
                    required: true,
                    valueAsNumber: true,
                  })}
                  errors={errors}
                  label="What is the price of the EV?"
                  min="0"
                  placeholder=""
                  readOnly={!isFormActive}
                  required
                  showCurrency
                  step="0.1"
                  type="number"
                />
                <PhoneInput
                  defaultValue={salesInfoPhoneNumber ?? ''}
                  {...register('phoneNumber', {
                    required: true,
                  })}
                  customStyles={{ width: '100%' }}
                  errors={errors}
                  label={<span>Contact Number</span>}
                  min="0"
                  placeholder=""
                  readOnly={!isFormActive}
                  required
                  selectedCallingCode={salesInfoPhoneCallingCode || selectedCallingCode}
                  setSelectedCallingCode={setSelectedCallingCode}
                  type="text"
                />
                <TextField
                  defaultValue={car?.salesInfo?.email ?? ''}
                  {...register('email', {
                    required: true,
                  })}
                  errors={errors}
                  label={<span>Contact Email</span>}
                  placeholder=""
                  readOnly={!isFormActive}
                  required
                  type="email"
                />
              </TripleInputWrapper>

              <div>
                <TextField
                  defaultValue={car?.salesInfo?.url ?? ''}
                  {...register('url', {
                    required: false,
                  })}
                  errors={errors}
                  label={
                    <div>
                      {' '}
                      <span>Link (optional)</span>
                      <StepParagraph>
                        Please provide the URL to the vehicle on your website
                      </StepParagraph>
                    </div>
                  }
                  min="0"
                  placeholder=""
                  readOnly={!isFormActive}
                  type="text"
                />
              </div>

              <div>
                <TextArea
                  defaultValue={car?.salesInfo?.description ?? ''}
                  {...register('description', {
                    required: false,
                  })}
                  errors={errors}
                  label="Description"
                  min="0"
                  placeholder=""
                  readOnly={!isFormActive}
                  required
                  type="textarea"
                />
              </div>
            </div>
          )}

          {isFormActive ? (
            <SettingsCardFooter style={{ marginTop: '30px' }}>
              <Button
                isLoading={loading}
                onClick={(e) => {
                  e.preventDefault();
                  resetFormToOldValues();
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
      </FormProvider>
    </SettingsCardWrapper>
  ) : (
    <Skeleton
      count={1}
      height={275}
      style={{
        marginBottom: '30px',
        borderRadius: '12px',
        boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
      }}
    />
  );
};

export default CarPricing;
