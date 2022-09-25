import { Dispatch, SetStateAction } from 'react';
import { BoldText, Button, Heading } from '../../../..';
import { ButtonsWrapper } from '../../CompleteBookingPopup.styled';

interface ThankYouReviewProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
  refetchRentals: () => void;
}

const ThankYouReview = ({ setActiveStep, setOpenPopup, refetchRentals }: ThankYouReviewProps) => (
  <>
    <Heading variant="h3">Thank you for submitting review </Heading>
    <BoldText style={{ fontSize: '14px', marginTop: '10px' }}>
      Your feedback is very important to us.
    </BoldText>
    <BoldText style={{ fontSize: '14px', marginTop: '10px' }}>
      We want to make sure we are building a community of trusted EV enthusiasts.
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
        Dismiss
      </Button>
    </ButtonsWrapper>
  </>
);

export default ThankYouReview;
