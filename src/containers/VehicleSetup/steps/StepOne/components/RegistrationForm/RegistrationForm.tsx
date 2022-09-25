import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { logError } from '../../../../../../utils';
import { Heading, SimpleCard, TextField } from '../../../../../../elements';
import { PredictCarDetailsMutationFn } from '../../../../../../hooks/api/predictCarDetails/predictCarDetails.generated';
import { useMyCarsQuery } from '../../../../../../hooks/api/myCars/myCars.generated';
import { vehicleSetupAtom } from '../../../../../../recoil';
import VinTooltip from '../../../../../../elements/VinTooltip';
import { useNextQueryParam, useSnackbar } from '../../../../../../hooks';

interface RegistrationInputProps {
  registration: string;
  vin: string;
}

interface RegistrationFormProps {
  activeStep: number;
  getCarDetails: PredictCarDetailsMutationFn;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setActiveStep: Dispatch<SetStateAction<number>>;
  isBusiness: boolean;
}

const RegistrationForm = ({
  activeStep,
  getCarDetails,
  setIsLoading,
  setActiveStep,
  isBusiness,
}: RegistrationFormProps) => {
  const showSnackbar = useSnackbar();
  const [continuedCarId] = useNextQueryParam(['id']);
  const carDetails = useRecoilValue(vehicleSetupAtom);
  const setCarDetails = useSetRecoilState(vehicleSetupAtom);
  const [carLoading, setCarLoading] = useState(false);
  const { data: myCarsData } = useMyCarsQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<RegistrationInputProps>({
    mode: 'onChange',
    defaultValues: {
      registration: carDetails?.details.registration ?? '',
      vin: carDetails?.details.vin ?? '',
    },
  });
  const myCars = myCarsData?.myCars;
  const myCarsRegistrations = myCars?.map((car) => car.details.registration);

  useEffect(() => {
    if (continuedCarId) {
      setActiveStep(2);
    }
  }, [continuedCarId, setActiveStep]);

  const onSubmit = useCallback(
    async (input: RegistrationInputProps) => {
      try {
        setIsLoading(true);
        setCarLoading(true);
        const isValid = await trigger();

        if (!isValid) {
          return;
        }

        const { registration, vin } = input;

        await getCarDetails({
          variables: {
            registration,
          },
        });

        if (myCarsRegistrations?.includes(registration)) {
          const previousCar = myCars?.find((car) => car.details.registration === registration);
          if (previousCar) {
            if (isBusiness) {
              showSnackbar({ message: 'You already added this car.', type: 'error' });
              return;
            }
            setCarDetails({
              ...previousCar,
              details: {
                ...previousCar.details,
                carMakerName: previousCar.details.maker?.name,
                carMakerId: previousCar.details.maker?.id,
                carModelName: previousCar.details.model?.name,
                carModelId: previousCar.details.model?.id,
                images: previousCar.details.images.map((i) => i.id),
                vin,
                registration,
              },
              images: previousCar.details.images,
              mainImageId: previousCar.details.mainImageId,
              availabilityPeriods: [
                ...previousCar.availabilityPeriods.map((a) => ({ ...a, carId: a.id })),
              ],
              realLocation: {
                addressPrivate: previousCar.addressPrivate,
                addressPublic: previousCar.addressPublic,
                lon: previousCar?.realLocation?.lon,
                lat: previousCar?.realLocation?.lat,
              },
            });
            setActiveStep(2);
            return;
          }
        }

        setCarDetails({
          details: {
            vin,
            registration,
          },
        });
        setActiveStep(2);
      } catch (error: any) {
        logError(error);
        setActiveStep(1);
      } finally {
        setIsLoading(false);
        setCarLoading(false);
      }
    },
    [
      setIsLoading,
      trigger,
      getCarDetails,
      myCarsRegistrations,
      setCarDetails,
      setActiveStep,
      myCars,
      isBusiness,
      showSnackbar,
    ],
  );

  return (
    <SimpleCard customStyles={{ width: '100%', textAlign: 'left' }}>
      <Heading variant="h4">Tell us more about your EV</Heading>
      <form id="submit-form-1" noValidate onSubmit={handleSubmit(onSubmit)}>
        {isBusiness ? (
          <TextField
            {...register('vin', {
              required: true,
            })}
            defaultValue={carDetails?.details.vin || ''}
            errors={errors}
            label={
              <p style={{ display: 'inline' }}>
                Your EV VIN number (on your windscreen)
                <VinTooltip />
                &nbsp;
              </p>
            }
            placeholder="eg. 4Y1SL65848Z411439"
            readOnly={activeStep !== 1}
            required
            type="text"
          />
        ) : null}
        <TextField
          {...register('registration', {
            required: true,
          })}
          defaultValue={carDetails?.details.registration || ''}
          errors={errors}
          label="Your EV registration number"
          placeholder="eg. CU57ABC"
          readOnly={activeStep !== 1}
          required
          type="text"
        />
        {carLoading && <> Fetching your EV details..</>}
      </form>
    </SimpleCard>
  );
};

export default RegistrationForm;
