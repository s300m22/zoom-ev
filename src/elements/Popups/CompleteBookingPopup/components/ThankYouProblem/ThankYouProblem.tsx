import { Dispatch, SetStateAction } from 'react';
import { BoldText, Button, Heading } from '../../../..';
import { ButtonsWrapper } from '../../CompleteBookingPopup.styled';

interface ThankYouProblemProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
  refetchRentals: () => void;
}

const ThankYouProblem = ({ setActiveStep, setOpenPopup, refetchRentals }: ThankYouProblemProps) => (
  <>
    <Heading variant="h3">Thank you</Heading>
    <BoldText style={{ fontSize: '14px', marginTop: '10px' }}>
      Your booking is now completed
    </BoldText>
    <BoldText style={{ fontSize: '14px', marginTop: '10px' }}>
      We will look into issues reported and contact you.
    </BoldText>
    <ButtonsWrapper>
      <Button
        onClick={() => {
          setActiveStep(0);
          setOpenPopup(false);
          refetchRentals();
        }}
        variant="outlined"
      >
        Close
      </Button>
      <Button
        onClick={() => {
          setActiveStep(4);
        }}
        withArrow
      >
        Review Guest
      </Button>
    </ButtonsWrapper>
  </>
);

export default ThankYouProblem;
