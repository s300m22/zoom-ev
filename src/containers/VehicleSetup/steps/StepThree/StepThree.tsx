import { Dispatch, SetStateAction } from 'react';
import { StepRow, StepParagraph } from '../StepsShared.styled';
import StepThreeWrapper from './StepThree.styled';
import {
  AvailabilityCalendar,
  BoldText,
  Bubble,
  Heading,
  SimpleCard,
  CarPricingForm,
} from '../../../../elements';
import { CarOptionToPurchaseForm } from '../../../../elements/CarOptionToPurchaseForm';

interface StepThreeProps {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  setActiveNavStep: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const StepThree = ({
  activeStep,
  setActiveStep,
  setActiveNavStep,
  setIsLoading,
}: StepThreeProps) => {
  return (
    <StepThreeWrapper>
      {activeStep === 5 && (
        <>
          <StepRow>
            <SimpleCard customStyles={{ width: '100%', textAlign: 'left' }}>
              <Heading variant="h4">Pricing</Heading>
              <StepParagraph>
                Based on your EV details, we have calculated a suggested price. Feel free to change
                these values but remember, EVs with higher prices are unlikely to be chosen.
              </StepParagraph>
              <CarPricingForm setActiveStep={setActiveStep} setIsLoading={setIsLoading} />
            </SimpleCard>
          </StepRow>
          <StepRow>
            <Bubble>
              <p>
                <BoldText>Tips</BoldText> <br />• We calculated recommended price based on your
                EV&apos;s model, make and year. <br />
              </p>
            </Bubble>
          </StepRow>
          <br />
          <StepRow>
            <SimpleCard customStyles={{ width: '100%', textAlign: 'left', marginTop: 20 }}>
              <CarOptionToPurchaseForm
                onSavedCompleted={() => {
                  // @ts-ignore
                  document.getElementById('hackyButtonToSubmitMultipleForms').click();
                }}
                setIsLoading={setIsLoading}
              />
            </SimpleCard>
          </StepRow>
        </>
      )}
      {activeStep === 6 && (
        <>
          <StepRow>
            <SimpleCard customStyles={{ width: '100%', textAlign: 'left' }}>
              <Heading variant="h4">When do you want to share this EV?</Heading>
              <StepParagraph>
                Select dates when you want this EV to be available. You can always change it later.
              </StepParagraph>
            </SimpleCard>
          </StepRow>
          <StepRow>
            <Bubble>
              <p>
                <BoldText>Tips</BoldText> <br />• The more your EV is available, the better the
                chances of it being share
              </p>
            </Bubble>
          </StepRow>
          <AvailabilityCalendar setActiveNavStep={setActiveNavStep} setIsLoading={setIsLoading} />
        </>
      )}
    </StepThreeWrapper>
  );
};

export default StepThree;
