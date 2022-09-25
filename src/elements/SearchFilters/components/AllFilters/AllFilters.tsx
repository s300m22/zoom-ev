import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import { Button } from '../../..';
import { useNextQueryParam } from '../../../../hooks';
import { useCarMakersQuery } from '../../../../hooks/api/carMakers/carMakers.generated';
import { logError } from '../../../../utils';
import { Checkbox, CreatableSelect, DoubleInputWrapper, InputContainer } from '../../../Inputs';
import { FilterFooter } from '../SharedStyles.styled';
import {
  AllFiltersWrapper,
  RowLabel,
  CarFeaturesList,
  CarFeaturesWrapper,
} from './AllFilters.styled';
import {
  CarTypeEnum,
  CarRangeEnum,
  CarFeatureTypeEnum,
  CarMotorEnum,
  CarTransmissionTypeEnum,
} from '../../../../interfaces/api.types.generated.d';
import { useCarFeaturesQuery } from '../../../../hooks/api/carFeatures/carFeatures.generated';

interface AllFiltersProps {
  setActiveButton: Dispatch<SetStateAction<string>>;
  setSelectedText: Dispatch<SetStateAction<string | null>>;
}

interface FiltersProps {
  type: {
    car: boolean;
    van: boolean;
  };
  motor: {
    electric: boolean;
    hybrid: boolean;
  };
  make: {
    value: {
      id: string;
      name: string;
    };
    label: string;
  };
  transmission: {
    manual: boolean;
    automatic: boolean;
  };
  seats: {
    label: string;
    value: string;
  };
  range: {
    label: string;
    value: CarRangeEnum;
  };
  owner: {
    private: boolean;
    business: boolean;
  };
  features: {
    [key: string]: boolean;
  };
  isAvailableToBuy: boolean;
}

const getCarType = (type: FiltersProps['type']) => {
  const { car, van } = type;
  if (car && van) {
    return [CarTypeEnum.Car, CarTypeEnum.Van];
  }

  if (car) {
    return CarTypeEnum.Car;
  }

  if (van) {
    return CarTypeEnum.Van;
  }

  return undefined;
};

const getMotorType = (type: FiltersProps['motor']) => {
  const { electric, hybrid } = type;
  if (electric && hybrid) {
    return [CarMotorEnum.Electric, CarMotorEnum.Hybrid];
  }

  if (electric) {
    return CarMotorEnum.Electric;
  }

  if (hybrid) {
    return CarMotorEnum.Hybrid;
  }

  return undefined;
};

const getTransmissionType = (type: FiltersProps['transmission']) => {
  const { manual, automatic } = type;
  if (manual && automatic) {
    return [CarTransmissionTypeEnum.Manual, CarTransmissionTypeEnum.Automatic];
  }

  if (manual) {
    return CarTransmissionTypeEnum.Manual;
  }

  if (automatic) {
    return CarTransmissionTypeEnum.Automatic;
  }

  return undefined;
};

const carRanges = Object.values(CarRangeEnum).map((value) => ({
  label: value?.replace('UP_TO_', 'up to '),
  value,
}));

const carSeats = ['2', '4', '5', '6', '7', '8'].map((v) => ({
  label: v,
  value: v,
}));

const AllFilters = ({ setActiveButton, setSelectedText }: AllFiltersProps) => {
  const router = useRouter();
  const [filters] = useNextQueryParam(['filters']);
  const parsedFilters = filters ? JSON.parse(atob(filters.replace('%3D', ''))) : undefined;
  const { data: carMakersData, loading: carMakersLoading } = useCarMakersQuery();
  const { data: carFeaturesData, loading: carFeaturesLoading } = useCarFeaturesQuery();
  const availableCarFeatures = carFeaturesData?.carFeatures;
  const carFeaturesExtras = availableCarFeatures?.filter(
    (featureItem) => featureItem.type === CarFeatureTypeEnum.Extra,
  );

  const carFeaturesOther = availableCarFeatures?.filter(
    (featureItem) => featureItem.type === CarFeatureTypeEnum.Other,
  );

  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useForm<FiltersProps>({
    mode: 'onBlur',
  });

  const carMakers = carMakersData?.carMakers.map((maker) => ({
    value: maker.id,
    label: maker.name,
  }));

  const handleCancel = () => {
    setActiveButton('');
    if (filters) {
      setSelectedText(null);
      router.replace(
        {
          pathname: '/search',
          query: {
            ...router.query,
            filters: undefined,
          },
        },
        undefined,
        { shallow: true },
      );
    }
  };

  const onSubmit = async (input: FiltersProps) => {
    try {
      const isValid = await trigger();
      if (!isValid) {
        return;
      }
      const { type, motor, features, make, transmission, seats, range, owner, isAvailableToBuy } =
        input;
      const carType = getCarType(type);
      const carMotor = getMotorType(motor);
      const carMakerId = make?.value;
      const carMakerLabel = make?.label;
      const transmissionType = getTransmissionType(transmission);
      const seatsNumber = seats?.value;
      const rangeNumber = range?.value;

      let selectedFeaturesIds;

      if (availableCarFeatures) {
        const selectedFeaturesNames = Object.entries(features)
          .map((item) => (item[1] ? item[0] : null))
          .filter((i) => i !== null);
        const selectedFeatures = availableCarFeatures
          .filter((feature) => selectedFeaturesNames.includes(feature.name))
          .map((f) => f);

        selectedFeaturesIds = selectedFeatures.map((feature) => feature.id);
      }

      const selectedFilters = {
        ...(carType && { type: carType }),
        ...(selectedFeaturesIds && selectedFeaturesIds.length && { features: selectedFeaturesIds }),
        ...(carMotor && { motor: carMotor }),
        ...(transmissionType && { transmission: transmissionType }),
        ...(seatsNumber && { seats: seatsNumber }),
        ...(rangeNumber && { range: rangeNumber }),
        ...(owner.private && { ownedByIndividual: true }),
        ...(owner.business && { ownedByBusiness: true }),
        ...(carMakerId && carMakerLabel && { carMakerId, carMakerLabel }),
        ...(isAvailableToBuy && { isAvailableToBuy }),
      };

      const selectedFiltersLength = Object.keys(selectedFilters).length;

      if (selectedFiltersLength > 0) {
        setSelectedText(
          `${
            selectedFilters.carMakerId ? selectedFiltersLength - 1 : selectedFiltersLength // Extract 1 if car maker is selected
          } filters`,
        );
        setActiveButton('');
        router.replace(
          {
            pathname: '/search',
            query: {
              ...router.query,
              filters: btoa(JSON.stringify(selectedFilters)),
            },
          },
          undefined,
          { shallow: true },
        );
      } else {
        handleCancel();
      }
    } catch (error: any) {
      logError(error);
    }
  };

  return (
    <AllFiltersWrapper>
      <form id="all-filters-form" onSubmit={handleSubmit(onSubmit)}>
        <RowLabel>Vehicle type</RowLabel>
        <DoubleInputWrapper>
          <InputContainer>
            <Checkbox
              {...register('type.car')}
              customStyles={{
                margin: '0 0 10px 0',
              }}
              defaultChecked={parsedFilters?.type && parsedFilters.type.includes('Car')}
              errors={errors}
              label="Car"
            />
          </InputContainer>
          <InputContainer>
            <Checkbox
              {...register('type.van')}
              customStyles={{
                margin: '0 0 10px 0',
              }}
              defaultChecked={parsedFilters?.type && parsedFilters.type.includes('Van')}
              errors={errors}
              label="Van"
            />
          </InputContainer>
        </DoubleInputWrapper>
        <RowLabel>Motor type</RowLabel>
        <DoubleInputWrapper>
          <InputContainer>
            <Checkbox
              {...register('motor.electric')}
              customStyles={{
                margin: '0 0 10px 0',
              }}
              defaultChecked={parsedFilters?.motor && parsedFilters.motor.includes('Electric')}
              errors={errors}
              label="Electric"
            />
          </InputContainer>
          <InputContainer>
            <Checkbox
              {...register('motor.hybrid')}
              customStyles={{
                margin: '0 0 10px 0',
              }}
              defaultChecked={parsedFilters?.motor && parsedFilters.motor.includes('Hybrid')}
              errors={errors}
              label="Plug-in Hybrid"
            />
          </InputContainer>
        </DoubleInputWrapper>
        <DoubleInputWrapper>
          {!carMakersLoading ? (
            <CreatableSelect
              control={control}
              defaultValue={
                parsedFilters?.carMakerLabel &&
                parsedFilters.carMakerId && {
                  label: parsedFilters.carMakerLabel,
                  value: parsedFilters.carMakerId,
                }
              }
              errors={errors}
              isCreatable={false}
              label="Make"
              name="make"
              options={carMakers}
              required={false}
            />
          ) : (
            <Skeleton
              count={2}
              height={56}
              style={{
                marginBottom: '30px',
                marginTop: '34px',
                boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
              }}
            />
          )}
        </DoubleInputWrapper>
        <RowLabel>Transmission</RowLabel>
        <DoubleInputWrapper>
          <InputContainer>
            <Checkbox
              {...register('transmission.manual')}
              customStyles={{
                margin: '0 0 10px 0',
              }}
              defaultChecked={
                parsedFilters?.transmission && parsedFilters.transmission.includes('Manual')
              }
              errors={errors}
              label="Manual"
            />
          </InputContainer>
          <InputContainer>
            <Checkbox
              {...register('transmission.automatic')}
              customStyles={{
                margin: '0 0 10px 0',
              }}
              defaultChecked={
                parsedFilters?.transmission && parsedFilters.transmission.includes('Automatic')
              }
              errors={errors}
              label="Automatic"
            />
          </InputContainer>
        </DoubleInputWrapper>
        <DoubleInputWrapper>
          <CreatableSelect
            control={control}
            defaultValue={
              parsedFilters && parsedFilters.seats
                ? {
                    value: parsedFilters.seats,
                    label: parsedFilters.seats,
                  }
                : null
            }
            errors={errors}
            isCreatable={false}
            label="Number of seats"
            name="seats"
            options={carSeats}
            required={false}
          />
          <CreatableSelect
            control={control}
            defaultValue={
              parsedFilters && parsedFilters.range
                ? {
                    value: parsedFilters.range,
                    label: parsedFilters.range?.replace('UP_TO_', 'up to '),
                  }
                : null
            }
            errors={errors}
            isCreatable={false}
            label="Range (miles)"
            name="range"
            options={carRanges}
            required={false}
          />
        </DoubleInputWrapper>
        <RowLabel>Owners</RowLabel>
        <DoubleInputWrapper>
          <InputContainer>
            <Checkbox
              {...register('owner.private')}
              customStyles={{
                margin: '0 0 10px 0',
              }}
              defaultChecked={parsedFilters && parsedFilters.ownedByIndividual}
              errors={errors}
              label="Private EVs"
            />
          </InputContainer>
          <InputContainer>
            <Checkbox
              {...register('owner.business')}
              customStyles={{
                margin: '0 0 10px 0',
              }}
              defaultChecked={parsedFilters && parsedFilters.ownedByBusiness}
              errors={errors}
              label="Business-owned EVs"
            />
          </InputContainer>
        </DoubleInputWrapper>

        <CarFeaturesWrapper>
          <RowLabel>Purchase options</RowLabel>
          <Checkbox
            {...register(`isAvailableToBuy`)}
            customStyles={{
              margin: '10px 0',
            }}
            defaultChecked={parsedFilters ? parsedFilters?.isAvailableToBuy : false}
            errors={errors}
            label={"Only show EV's that are available to buy"}
          />
        </CarFeaturesWrapper>

        {carFeaturesLoading ? (
          <Skeleton
            count={1}
            height={150}
            style={{
              marginBottom: '30px',
              boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
            }}
          />
        ) : null}

        {carFeaturesExtras ? (
          <CarFeaturesWrapper>
            <RowLabel>Extras</RowLabel>
            <CarFeaturesList>
              {carFeaturesExtras.map((feature) => (
                <Checkbox
                  key={feature.id}
                  {...register(`features.${feature.name}`)}
                  customStyles={{
                    margin: '10px 0',
                  }}
                  defaultChecked={
                    parsedFilters ? parsedFilters?.features?.includes(feature.id) : false
                  }
                  errors={errors}
                  label={feature.name}
                />
              ))}
            </CarFeaturesList>
          </CarFeaturesWrapper>
        ) : null}

        {carFeaturesOther ? (
          <CarFeaturesWrapper>
            <RowLabel>Other</RowLabel>
            <CarFeaturesList>
              {carFeaturesOther.map((feature) => (
                <Checkbox
                  key={feature.id}
                  {...register(`features.${feature.name}`)}
                  customStyles={{
                    margin: '10px 0',
                  }}
                  defaultChecked={
                    parsedFilters ? parsedFilters?.features?.includes(feature.id) : false
                  }
                  errors={errors}
                  label={feature.name}
                />
              ))}
            </CarFeaturesList>
          </CarFeaturesWrapper>
        ) : null}
      </form>
      <FilterFooter style={{ marginTop: '60px' }}>
        <Button onClick={handleCancel} variant="outlined">
          Clear
        </Button>
        <Button form="all-filters-form">Apply</Button>
      </FilterFooter>
    </AllFiltersWrapper>
  );
};

export default AllFilters;
