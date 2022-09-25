import { Dispatch, SetStateAction, useState, useEffect, SyntheticEvent } from 'react';
import { Button } from '../../..';
import { ArrowLeftIcon } from '../../../../icons';
import { PreviousStep, MultistepFormFooterWrapper } from './MultistepFormFooter.styled';

interface MultistepFormFooterProps {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  totalSteps: number;
  isLoading: boolean;
}

enum TypeEnum {
  prev = 'Prev',
  next = 'Next',
}

const MultistepFormFooter = ({
  activeStep,
  setActiveStep,
  totalSteps,
  isLoading,
}: MultistepFormFooterProps) => {
  const [prevDisabled, setPrevDisabled] = useState(activeStep === 0);
  const [isFormAvailable, setIsFormAvailable] = useState(true);

  useEffect(() => {
    setIsFormAvailable(Boolean(document.getElementsByTagName('form')[0]));
  }, [activeStep]);

  useEffect(() => {
    if (activeStep === 0) {
      setPrevDisabled(true);
    } else {
      setPrevDisabled(false);
    }
  }, [activeStep, totalSteps]);

  const handleClick = (type: TypeEnum, event?: SyntheticEvent) => {
    if (type === TypeEnum.prev) {
      if (activeStep !== 0) {
        setActiveStep(activeStep - 1);
      }
    }
    if (type === TypeEnum.next && event) {
      event.preventDefault();
      setActiveStep(activeStep + 1);
    }
    return null;
  };

  return (
    <MultistepFormFooterWrapper isWide>
      <PreviousStep isVisible={prevDisabled} onClick={() => handleClick(TypeEnum.prev)}>
        <ArrowLeftIcon /> Back
      </PreviousStep>
      <Button
        form={`submit-form-${activeStep}`}
        isLoading={isLoading}
        {...(!isFormAvailable && {
          onClick: (e) => handleClick(TypeEnum.next, e),
        })}
        withArrow
      >
        Continue
      </Button>
    </MultistepFormFooterWrapper>
  );
};
export default MultistepFormFooter;
