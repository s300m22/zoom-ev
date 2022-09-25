import { Dispatch, SetStateAction } from 'react';
import { StepFourWrapper } from './StepFour.styled';
import { LocationGuide, LocationPickUp } from './components';

interface StepFourProps {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setActiveNavStep: Dispatch<SetStateAction<number>>;
}

const StepFour = ({ activeStep, setActiveStep, setIsLoading, setActiveNavStep }: StepFourProps) => (
  <StepFourWrapper>
    {activeStep === 7 && (
      <LocationPickUp
        setActiveNavStep={setActiveNavStep}
        setActiveStep={setActiveStep}
        setIsLoading={setIsLoading}
      />
    )}
    {activeStep === 8 && (
      <LocationGuide
        setActiveNavStep={setActiveNavStep}
        setActiveStep={setActiveStep}
        setIsLoading={setIsLoading}
      />
    )}
  </StepFourWrapper>
);

export default StepFour;
