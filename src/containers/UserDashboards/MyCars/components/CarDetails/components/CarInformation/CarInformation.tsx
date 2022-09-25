import { Dispatch, SetStateAction, useCallback, useState, useEffect } from 'react';
import { useWatch, useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import { ApolloQueryResult } from '@apollo/client';
import {
  Button,
  Heading,
  SettingsCardWrapper,
  SettingsCardHeader,
  SettingsEditLink,
  SettingsCardFooter,
  TextField,
  SettingsForm,
  DoubleInputWrapper,
  CreatableSelect,
  SubText,
  Checkbox,
} from '../../../../../../../elements';
import {
  CarFeatureType,
  CarMotorEnum,
  CarTypeEnum,
  CarValueEnum,
  CarFeatureTypeEnum,
} from '../../../../../../../interfaces/api.types.generated.d';
import { useCarMakersQuery } from '../../../../../../../hooks/api/carMakers/carMakers.generated';
import { GetCarQuery } from '../../../../../../../hooks/api/getCar/getCar.generated';
import { useUpdateCarDetailsMutation } from '../../../../../../../hooks/api/updateCarDetails/updateCarDetails.generated';
import {
  logError,
  numberValidator,
  getDefaultValue,
  carValueOptions,
  convertEnumValueToRange,
  minimalCarAge,
} from '../../../../../../../utils';
import PersonalDetailsEnum from '../../CarDetailsActiveFormEnum';
import { useCarFeaturesQuery } from '../../../../../../../hooks/api/carFeatures/carFeatures.generated';
import { useUpdateCarFeaturesMutation } from '../../../../../../../hooks/api/updateCarFeatures/updateCarFeatures.generated';
import { CarFeaturesList, CarFeaturesWrapper, CarValueNotification } from './CarInformation.styled';

interface CarInformationProps {
  car: GetCarQuery['car'];
  activeForm?: PersonalDetailsEnum;
  setActiveForm: Dispatch<SetStateAction<PersonalDetailsEnum | undefined>>;
  refetchCarDetails: () => Promise<ApolloQueryResult<GetCarQuery>>;
}

interface CarDetailsInputProps {
  registration: string;
  motor: {
    label: string;
    value: CarMotorEnum;
  };
  type: {
    label: CarTypeEnum;
    value: CarTypeEnum;
  };
  value: {
    label: string;
    value: CarValueEnum;
  };
  year: string;
  make: {
    value: {
      id: string;
      name: string;
    };
    label: string;
  };
  model: {
    value: {
      id: string;
      name: string;
    };
    label: string;
  } | null;
  features: {
    [key: string]: boolean;
  };
}

const CarInformation = ({
  car,
  activeForm,
  setActiveForm,
  refetchCarDetails,
}: CarInformationProps) => {
  const carId = car?.id as string;
  const carDetails = car?.detailsRequested ?? car?.details;
  const isFormActive = activeForm === PersonalDetailsEnum.VehicleInformation;
  const isFormBlurred = activeForm && activeForm !== PersonalDetailsEnum.VehicleInformation;
  const [carModels, setCarModels] = useState<any>(undefined);
  const [updateCarDetails, { loading: updateCarDetailsLoading }] = useUpdateCarDetailsMutation();
  const { data: carMakersData } = useCarMakersQuery();
  const { data: carFeaturesData, loading: carFeaturesLoading } = useCarFeaturesQuery();
  const [updateCarFeatures, { loading: updateCarFeaturesLoading }] = useUpdateCarFeaturesMutation();
  const availableCarFeatures = carFeaturesData?.carFeatures;
  const carFeaturesExtras = availableCarFeatures?.filter(
    (featureItem) => featureItem.type === CarFeatureTypeEnum.Extra,
  );
  const carFeaturesOther = availableCarFeatures?.filter(
    (featureItem) => featureItem.type === CarFeatureTypeEnum.Other,
  );

  const carMakers = carMakersData?.carMakers.map((maker) => ({
    value: {
      id: maker.id,
      name: maker.name,
    },
    label: maker.name,
  }));

  const carType = Object.values(CarTypeEnum).map((value) => ({
    label: value,
    value,
  }));

  const carMotor = Object.values(CarMotorEnum).map((value) => ({
    label: value,
    value,
  }));

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    formState,
    setValue,
    trigger,
  } = useForm<CarDetailsInputProps>({
    mode: 'onChange',
  });

  const selectedCarMaker = useWatch<any>({
    control,
    name: 'make',
  });

  useEffect(() => {
    if (selectedCarMaker) {
      if (formState.dirtyFields.make) {
        setValue('model', null);
      }
      setCarModels(
        carMakersData?.carMakers
          .filter((maker) => maker.name === selectedCarMaker?.label)[0]
          ?.models.map((model) => ({
            value: {
              id: model.id,
              name: model.name,
            },
            label: model.name,
          })),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCarMaker, formState.dirtyFields.make]);

  const onSubmit = useCallback(
    async (input: CarDetailsInputProps) => {
      try {
        const isValid = await trigger();

        if (!isValid) {
          return;
        }

        const { registration, make, model, motor, type, value, year } = input;
        await updateCarDetails({
          variables: {
            updateInput: {
              registration,
              motor: motor.value,
              type: type.value,
              value: value.value,
              year: parseInt(year, 10),
              carMakerId: make.value?.id,
              carMakerName: make.value.name,
              carModelId: model?.value?.id,
              carModelName: model?.value.name,
            },
            carId,
          },
        });

        if (availableCarFeatures) {
          const selectedFeaturesNames = Object.entries(input.features)
            .map((item) => (item[1] ? item[0] : null))
            .filter((i) => i !== null);
          const selectedFeatures = availableCarFeatures
            .filter((feature) => selectedFeaturesNames.includes(feature.name))
            .map((f) => f);

          await updateCarFeatures({
            variables: {
              features: selectedFeatures.map((feature) => feature.id),
              carId,
            },
          });
        }
        await refetchCarDetails();
        setActiveForm(undefined);
      } catch (error: any) {
        logError(error);
      }
    },
    [
      availableCarFeatures,
      carId,
      setActiveForm,
      trigger,
      updateCarDetails,
      updateCarFeatures,
      refetchCarDetails,
    ],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getDefaultFieldValue = (value?: any) => {
    if (typeof value === 'object') {
      return {
        value: value.id,
        label: value.name,
      };
    }
    if (value) {
      return {
        value,
        label: value,
      };
    }
    return undefined;
  };

  const isFieldChecked = (field: CarFeatureType) => {
    return Boolean(car?.features.find((feature) => feature.name === field.name));
  };

  return car ? (
    <SettingsCardWrapper isFormBlurred={Boolean(isFormBlurred)}>
      <SettingsCardHeader>
        <Heading variant="h4">
          Vehicle information
          <SubText>
            Any changes made in this category needs to be approved by the Zoom EV team. It usually
            takes up to 48 hours.
          </SubText>
        </Heading>
        <SettingsEditLink onClick={() => setActiveForm(PersonalDetailsEnum.VehicleInformation)}>
          Edit
        </SettingsEditLink>
      </SettingsCardHeader>
      <SettingsForm noValidate onSubmit={handleSubmit(onSubmit)}>
        <DoubleInputWrapper>
          <TextField
            {...register('registration', {
              required: true,
            })}
            defaultValue={carDetails?.registration}
            errors={errors}
            label="EV registration number"
            placeholder="eg. CU57ABC"
            readOnly={!isFormActive}
            required
          />
        </DoubleInputWrapper>
        <DoubleInputWrapper>
          <CreatableSelect
            control={control}
            defaultValue={getDefaultFieldValue(carDetails?.type)}
            errors={errors}
            isCreatable={false}
            label="Type"
            name="type"
            options={carType}
            readOnly={!isFormActive}
            required
          />
          <CreatableSelect
            control={control}
            defaultValue={getDefaultFieldValue(carDetails?.motor)}
            errors={errors}
            isCreatable={false}
            label="Motor"
            name="motor"
            options={carMotor}
            readOnly={!isFormActive}
            required
          />
        </DoubleInputWrapper>
        <DoubleInputWrapper>
          {carMakers && (
            <CreatableSelect
              control={control}
              defaultValue={getDefaultFieldValue(carDetails?.maker)}
              errors={errors}
              label="Make"
              name="make"
              options={carMakers}
              readOnly={!isFormActive}
              required
            />
          )}
          <CreatableSelect
            control={control}
            defaultValue={getDefaultFieldValue(carDetails?.model)}
            errors={errors}
            label="Model"
            name="model"
            options={carModels}
            readOnly={!isFormActive}
            required
          />
        </DoubleInputWrapper>
        <DoubleInputWrapper>
          <TextField
            {...register('year', {
              required: true,
              pattern: numberValidator('Year'),
              validate: (value) => minimalCarAge(value),
            })}
            defaultValue={carDetails?.year || undefined}
            errors={errors}
            label="Year"
            name="year"
            placeholder="ex. 2021"
            readOnly={!isFormActive}
            required
          />
          <div>
            <CreatableSelect
              control={control}
              defaultValue={getDefaultValue(convertEnumValueToRange(carDetails?.value))}
              errors={errors}
              isCreatable={false}
              label="Vehicle value (New)"
              name="value"
              options={carValueOptions}
              readOnly={!isFormActive}
              required
            />
            {isFormActive && (
              <CarValueNotification>
                Changing the vehicle value will change the pricing of your EV (shown once it’s
                approved).
              </CarValueNotification>
            )}
          </div>
        </DoubleInputWrapper>
        {carFeaturesLoading ? (
          <Skeleton
            count={2}
            height={150}
            style={{
              marginBottom: '30px',
              boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
            }}
          />
        ) : null}
        {carFeaturesExtras ? (
          <CarFeaturesWrapper>
            <Heading variant="h5">Extras</Heading>
            <CarFeaturesList>
              {carFeaturesExtras.map((feature) => (
                <Checkbox
                  key={feature.id}
                  {...register(`features.${feature.name}`)}
                  customStyles={{
                    margin: '10px 0',
                  }}
                  defaultChecked={isFieldChecked(feature)}
                  errors={errors}
                  label={feature.name}
                  readOnly={!isFormActive}
                />
              ))}
            </CarFeaturesList>
          </CarFeaturesWrapper>
        ) : null}

        {carFeaturesOther ? (
          <CarFeaturesWrapper>
            <Heading variant="h5">Other</Heading>
            <CarFeaturesList>
              {carFeaturesOther.map((feature) => (
                <Checkbox
                  key={feature.id}
                  {...register(`features.${feature.name}`)}
                  customStyles={{
                    margin: '10px 0',
                  }}
                  defaultChecked={isFieldChecked(feature)}
                  errors={errors}
                  label={feature.name}
                  readOnly={!isFormActive}
                />
              ))}
            </CarFeaturesList>
          </CarFeaturesWrapper>
        ) : null}

        {isFormActive ? (
          <SettingsCardFooter style={{ marginTop: '20px' }}>
            <Button
              isLoading={updateCarDetailsLoading || updateCarFeaturesLoading}
              onClick={(e) => {
                e.preventDefault();
                reset();
                setActiveForm(undefined);
              }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button isLoading={updateCarDetailsLoading || updateCarFeaturesLoading}>
              Save changes
            </Button>
          </SettingsCardFooter>
        ) : null}
      </SettingsForm>
    </SettingsCardWrapper>
  ) : (
    <Skeleton
      count={1}
      height={792}
      style={{
        marginBottom: '30px',
        borderRadius: '12px',
        boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
      }}
    />
  );
};

export default CarInformation;
