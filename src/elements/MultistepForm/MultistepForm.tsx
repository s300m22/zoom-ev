import { ReactNode } from 'react';
import { MultistepWrapper, StepWrapper } from './MultistepForm.styled';

export interface StepProps {
  name: string;
  component: ReactNode;
  subStepsCounter?: Array<number>;
}
export interface MultistepFormProps {
  steps: Array<StepProps>;
  activeStep: number;
}

const MultistepForm = ({ steps, activeStep = 0 }: MultistepFormProps) => {
  return (
    <MultistepWrapper>
      {steps.map((step, key) => {
        const innerCounter = step.subStepsCounter || key;
        if (typeof innerCounter === 'number') {
          return (
            activeStep === innerCounter && (
              <StepWrapper key={step.name}>{step.component}</StepWrapper>
            )
          );
        }
        return (
          innerCounter.includes(activeStep) && (
            <StepWrapper key={step.name}>{step.component}</StepWrapper>
          )
        );
      })}
    </MultistepWrapper>
  );
};

export default MultistepForm;
