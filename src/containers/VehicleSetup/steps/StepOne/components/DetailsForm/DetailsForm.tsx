import { Dispatch, useCallback, useState, SetStateAction, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { StepParagraph, DoubleInputWrapper } from '../../../StepsShared.styled';
import { CreatableSelect, SimpleCard, TextField } from '../../../../../../elements';
import {
  numberValidator,
  logError,
  carValueOptions,
  getDefaultValue,
  convertEnumValueToRange,
  minimalCarAge,
} from '../../../../../../utils';
import { vehicleSetupAtom } from '../../../../../../recoil';
import FormStepOne from './DetailsForm.styled';
import {
  CarMotorEnum,
  CarRangeEnum,
  CarTransmissionTypeEnum,
  CarTypeEnum,
  CarValueEnum,
} from '../../../../../../interfaces/api.types.generated.d';
import { useUpdateCarDetailsMutation } from '../../../../../../hooks/api/updateCarDetails/updateCarDetails.generated';
import { useCarMakersQuery } from '../../../../../../hooks/api/carMakers/carMakers.generated';
import { PredictCarDetailsMutation } from '../../../../../../hooks/api/predictCarDetails/predictCarDetails.generated';
import { useCreateCarMutation } from '../../../../../../hooks/api/createCar/createCar.generated';
import { useIsBusiness, useSnackbar } from '../../../../../../hooks';

interface CarDetailsInputProps {
  color: string;
  doors: {
    label: string;
    value: string;
  };
  mileage?: number;
  motor: {
    label: string;
    value: CarMotorEnum;
  };
  range: {
    label: string;
    value: CarRangeEnum;
  };
  seats: {
    label: string;
    value: string;
  };
  transmission: {
    label: string;
    value: CarTransmissionTypeEnum;
  };
  type: {
    label: CarTypeEnum;
    value: CarTypeEnum;
  };
  value: {
    label: string;
    value: CarValueEnum;
  };
  year?: number;
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
}

interface DetailsFormProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  predictCarDetails: PredictCarDetailsMutation['predictCarDetails'];
}

const DetailsForm = ({ setActiveStep, setIsLoading, predictCarDetails }: DetailsFormProps) => {
  const showSnackbar = useSnackbar();
  const isBusiness = useIsBusiness();
  const carDetails = useRecoilValue(vehicleSetupAtom);
  const setCarDetails = useSetRecoilState(vehicleSetupAtom);
  const [carModels, setCarModels] = useState<any>(undefined);
  const { data: carMakersData } = useCarMakersQuery();
  const [updateCarDetails, { loading }] = useUpdateCarDetailsMutation();
  const [createCar] = useCreateCarMutation();

  const storedCarDetails = carDetails?.details;

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

  const carRanges = Object.values(CarRangeEnum).map((value) => ({
    label: value.replace('UP_TO_', 'up to '),
    value,
  }));

  const carDoors = ['1', '2', '3', '4', '5'].map((v) => ({
    label: v,
    value: v,
  }));

  const carSeats = ['2', '4', '5', '6', '7', '8'].map((v) => ({
    label: v,
    value: v,
  }));

  const carTransmission = Object.values(CarTransmissionTypeEnum).map((value) => ({
    label: value,
    value,
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getDefaultFieldValue = (predictedValue?: any, storedValue?: any) => {
    if (storedValue) {
      return {
        value: storedValue,
        label: storedValue,
      };
    }
    if (predictedValue) {
      return {
        value: predictedValue,
        label: predictedValue,
      };
    }
    return undefined;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    control,
    formState,
  } = useForm<CarDetailsInputProps>({
    mode: 'onBlur',
    defaultValues: {
      type: { value: CarTypeEnum.Car, label: CarTypeEnum.Car },
      motor: getDefaultFieldValue(predictCarDetails?.motor, storedCarDetails?.motor),
      make: getDefaultFieldValue(predictCarDetails?.make, storedCarDetails?.carMakerName),
      model: getDefaultFieldValue(predictCarDetails?.model, storedCarDetails?.carModelName),
      year: storedCarDetails?.year || predictCarDetails?.year || undefined,
      mileage: storedCarDetails?.mileage || undefined,
      value: getDefaultValue(convertEnumValueToRange(storedCarDetails?.value)),
      doors: getDefaultFieldValue(predictCarDetails?.doorCount, storedCarDetails?.doors),
      seats: getDefaultFieldValue(predictCarDetails?.seatCount, storedCarDetails?.seats),
      transmission: getDefaultFieldValue(
        predictCarDetails?.transmission || storedCarDetails?.transmission || undefined,
      ),
      color: storedCarDetails?.color || predictCarDetails?.color || undefined,
      range: storedCarDetails?.range
        ? {
            value: storedCarDetails.range,
            label: storedCarDetails.range.replace('UP_TO_', 'up to '),
          }
        : undefined,
    },
  });

  const selectedCarMaker = useWatch<any>({
    control,
    name: 'make',
  });

  const onSubmit = useCallback(
    async (input: CarDetailsInputProps) => {
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
          color,
          doors,
          make,
          mileage,
          model,
          motor,
          range,
          seats,
          transmission,
          type,
          value,
          year,
        } = input;

        const sharedInputs = {
          color,
          doors: parseInt(doors.value, 10),
          mileage: parseInt(String(mileage), 10),
          motor: motor.value,
          range: range.value,
          seats: parseInt(seats.value, 10),
          transmission: transmission.value,
          type: type.value,
          value: value.value,
          year: parseInt(String(year), 10),
          carMakerId: make.value.id,
          carMakerName: make.value.name || (make.value as unknown as string),
          carModelId: model?.value?.id,
          carModelName: model?.value?.name || (model?.value as unknown as string),
        };

        let carId = carDetails.id;

        if (!isBusiness) {
          if (!carId) {
            const { registration } = carDetails.details;
            if (!registration) {
              showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
              return;
            }

            const newCar = await createCar({
              variables: {
                input: {
                  registration,
                },
              },
            });

            carId = newCar.data?.createCar.id;

            if (!carId) {
              showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
              return;
            }
          }

          await updateCarDetails({
            variables: {
              updateInput: {
                ...sharedInputs,
              },
              carId,
            },
          });
        }

        setCarDetails({
          ...carDetails,
          id: carId,
          details: {
            ...carDetails.details,
            ...sharedInputs,
          },
        });
        setActiveStep(3);
      } catch (error: any) {
        logError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [
      carDetails,
      createCar,
      isBusiness,
      setActiveStep,
      setCarDetails,
      setIsLoading,
      showSnackbar,
      trigger,
      updateCarDetails,
    ],
  );

  useEffect(() => {
    if (formState.dirtyFields.make) {
      selectedCarMaker && setValue('model', null);
      setCarModels(
        carMakersData?.carMakers
          .filter((maker) => maker.name === selectedCarMaker?.value.name)[0]
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

  useEffect(() => {
    if (storedCarDetails) {
      setValue('mileage', storedCarDetails?.mileage ?? 0);
      if (storedCarDetails.range) {
        setValue('range', {
          value: storedCarDetails.range,
          label: storedCarDetails.range.replace('UP_TO_', 'up to '),
        });
      }
    }
  }, [setValue, storedCarDetails]);

  return predictCarDetails || storedCarDetails ? (
    <FormStepOne id="submit-form-2" noValidate onSubmit={handleSubmit(onSubmit)}>
      <SimpleCard customStyles={{ width: '100%', textAlign: 'left' }}>
        <StepParagraph>Please make sure that these data are correct.</StepParagraph>
        <DoubleInputWrapper>
          <CreatableSelect
            control={control}
            errors={errors}
            isCreatable={false}
            label="Type"
            name="type"
            options={carType}
            required
          />
          <CreatableSelect
            control={control}
            errors={errors}
            isCreatable={false}
            label="Motor"
            name="motor"
            options={carMotor}
            required
          />
        </DoubleInputWrapper>
        <DoubleInputWrapper>
          {carMakers && (
            <CreatableSelect
              control={control}
              errors={errors}
              label="Make"
              name="make"
              options={carMakers}
              required
            />
          )}
          <CreatableSelect
            control={control}
            errors={errors}
            label="Model"
            name="model"
            options={carModels}
            required
          />
        </DoubleInputWrapper>
        <DoubleInputWrapper>
          <TextField
            {...register('year', {
              required: true,
              pattern: numberValidator('Year'),
              validate: (value) => minimalCarAge(String(value ?? '')),
            })}
            disabled={loading}
            errors={errors}
            label="Year"
            placeholder="ex. 2021"
            required
          />
          <TextField
            {...register('mileage', {
              required: true,
              pattern: numberValidator('Mileage'),
            })}
            disabled={loading}
            errors={errors}
            label="Mileage (miles)"
            placeholder="ex. 2300"
            required
          />
        </DoubleInputWrapper>
        <CreatableSelect
          control={control}
          errors={errors}
          isCreatable={false}
          label="Vehicle value (New)"
          name="value"
          options={carValueOptions}
          required
        />
        <DoubleInputWrapper>
          <CreatableSelect
            control={control}
            errors={errors}
            isCreatable={false}
            label="Doors"
            name="doors"
            options={carDoors}
            required
          />
          <CreatableSelect
            control={control}
            errors={errors}
            isCreatable={false}
            label="Seats"
            name="seats"
            options={carSeats}
            required
          />
        </DoubleInputWrapper>
        <DoubleInputWrapper>
          <CreatableSelect
            control={control}
            errors={errors}
            isCreatable={false}
            label="Transmission"
            name="transmission"
            options={carTransmission}
            required
          />
          <TextField
            {...register('color', {
              required: true,
            })}
            disabled={loading}
            errors={errors}
            label="Colour"
            placeholder="ex. burgundy"
            required
          />
        </DoubleInputWrapper>
      </SimpleCard>

      <SimpleCard customStyles={{ width: '100%', textAlign: 'left' }}>
        <CreatableSelect
          control={control}
          errors={errors}
          isCreatable={false}
          label="Range (miles)"
          name="range"
          options={carRanges}
          required
        />
      </SimpleCard>
    </FormStepOne>
  ) : null;
};

export default DetailsForm;
