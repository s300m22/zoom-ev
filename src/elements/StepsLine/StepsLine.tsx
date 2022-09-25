import { StepsLineWrapper, StepsLineItem, StepsParagraph } from './StepsLine.styled';

export interface StepsLineProps {
  activeStep?: number;
  steps: Array<string>;
}

const StepsLine = ({ activeStep, steps }: StepsLineProps) => (
  <StepsLineWrapper>
    {steps.map((step, key) => (
      <StepsLineItem isActive={activeStep === key} key={step} numberOfSteps={steps.length}>
        <StepsParagraph>{step}</StepsParagraph>
      </StepsLineItem>
    ))}
  </StepsLineWrapper>
);

export default StepsLine;
