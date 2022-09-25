import { Dispatch, SetStateAction } from 'react';
import { StepWrapper, StepRow } from '../StepsShared.styled';
import { usePredictCarDetailsMutation } from '../../../../hooks/api/predictCarDetails/predictCarDetails.generated';
import { FeaturesForm, RegistrationForm, DetailsForm } from './components';

interface StepOneProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setActiveNavStep: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  activeStep: number;
  isBusiness: boolean;
}

const StepOne = ({
  activeStep,
  setActiveStep,
  setActiveNavStep,
  setIsLoading,
  isBusiness,
}: StepOneProps) => {
  const [getCarDetails, { data }] = usePredictCarDetailsMutation();
  const predictCarDetails = data?.predictCarDetails;

  return (
    <StepWrapper>
      <StepRow>
        {activeStep <= 2 && (
          <RegistrationForm
            activeStep={activeStep}
            getCarDetails={getCarDetails}
            isBusiness={isBusiness}
            setActiveStep={setActiveStep}
            setIsLoading={setIsLoading}
          />
        )}
        {activeStep === 2 && (
          <DetailsForm
            predictCarDetails={predictCarDetails}
            setActiveStep={setActiveStep}
            setIsLoading={setIsLoading}
          />
        )}
        {activeStep === 3 && (
          <FeaturesForm
            setActiveNavStep={setActiveNavStep}
            setActiveStep={setActiveStep}
            setIsLoading={setIsLoading}
          />
        )}
      </StepRow>
    </StepWrapper>
  );
};
export default StepOne;
