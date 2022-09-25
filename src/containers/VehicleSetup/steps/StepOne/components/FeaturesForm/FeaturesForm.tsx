import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Skeleton from 'react-loading-skeleton';
import { StepParagraph } from '../../../StepsShared.styled';
import { Checkbox, Heading, SimpleCard } from '../../../../../../elements';
import { logError } from '../../../../../../utils';
import { vehicleSetupAtom } from '../../../../../../recoil';
import { Form, FeaturesTitle } from './FeaturesForm.styled';
import { useCarFeaturesQuery } from '../../../../../../hooks/api/carFeatures/carFeatures.generated';
import {
  CarFeatureType,
  CarFeatureTypeEnum,
} from '../../../../../../interfaces/api.types.generated.d';
import { useUpdateCarFeaturesMutation } from '../../../../../../hooks/api/updateCarFeatures/updateCarFeatures.generated';
import { useIsBusiness, useSnackbar } from '../../../../../../hooks';

interface FeaturesFormProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setActiveNavStep: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

interface InputProps {
  [key: string]: boolean;
}

const FeaturesForm = ({ setActiveStep, setIsLoading, setActiveNavStep }: FeaturesFormProps) => {
  const showSnackbar = useSnackbar();
  const isBusiness = useIsBusiness();
  const carDetails = useRecoilValue(vehicleSetupAtom);
  const setCarDetails = useSetRecoilState(vehicleSetupAtom);
  const { data } = useCarFeaturesQuery();
  const [updateCarFeatures, { loading: loadingCarFeatures }] = useUpdateCarFeaturesMutation();
  const carFeatures = data?.carFeatures;

  useEffect(() => {
    setActiveNavStep(0);
  }, [setActiveNavStep]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<InputProps>({
    mode: 'onChange',
  });

  const onSubmit = useCallback(
    async (input: InputProps) => {
      try {
        setIsLoading(true);

        const isValid = await trigger();

        if (!isValid) {
          return;
        }

        if (carFeatures && carDetails) {
          const selectedFeaturesNames = Object.entries(input)
            .map((item) => (item[1] ? item[0] : null))
            .filter((i) => i !== null);

          const selectedFeatures = carFeatures
            .filter((feature) => selectedFeaturesNames.includes(feature.name))
            .map((f) => f);

          const carId = carDetails.id;

          if (carId) {
            if (isBusiness) {
              showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
              return;
            }
            await updateCarFeatures({
              variables: {
                features: selectedFeatures.map((feature) => feature.id),
                carId,
              },
            });
          }

          setCarDetails({
            ...carDetails,
            features: selectedFeatures,
          });
          setActiveNavStep(1);
          setActiveStep(4);
        }
      } catch (error: any) {
        logError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [
      setIsLoading,
      trigger,
      carFeatures,
      carDetails,
      setCarDetails,
      setActiveNavStep,
      setActiveStep,
      isBusiness,
      updateCarFeatures,
      showSnackbar,
    ],
  );

  const isFieldChecked = (field: CarFeatureType) => {
    return Boolean(carDetails?.features?.find((feature) => feature.name === field.name));
  };

  return (
    <SimpleCard customStyles={{ width: '100%' }}>
      <Heading variant="h4">What makes your EV unique?</Heading>
      <StepParagraph>Select features to give people more information about your EV. </StepParagraph>
      <Form id="submit-form-3" noValidate onSubmit={handleSubmit(onSubmit)}>
        <FeaturesTitle>Extras</FeaturesTitle>
        {!loadingCarFeatures ? (
          carFeatures
            ?.filter((featureItem) => featureItem.type === CarFeatureTypeEnum.Extra)
            .map((feature) => (
              <Checkbox
                key={feature.id}
                {...register(feature.name)}
                customStyles={{
                  fontSize: '16px',
                  margin: '10px 0',
                }}
                defaultChecked={isFieldChecked(feature)}
                errors={errors}
                label={feature.name}
              />
            ))
        ) : (
          <div style={{ width: '100%' }}>
            <Skeleton count={1} height={288} />
          </div>
        )}

        <FeaturesTitle>Other</FeaturesTitle>
        {!loadingCarFeatures ? (
          carFeatures
            ?.filter((featureItem) => featureItem.type === CarFeatureTypeEnum.Other)
            .map((feature) => (
              <Checkbox
                key={feature.id}
                {...register(feature.name)}
                customStyles={{
                  fontSize: '16px',
                  margin: '10px 0',
                }}
                defaultChecked={isFieldChecked(feature)}
                errors={errors}
                label={feature.name}
              />
            ))
        ) : (
          <div style={{ width: '100%' }}>
            <Skeleton count={1} height={112} />
          </div>
        )}
      </Form>
    </SimpleCard>
  );
};

export default FeaturesForm;
