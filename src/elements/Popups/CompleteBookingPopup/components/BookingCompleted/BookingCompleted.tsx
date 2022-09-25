import { Dispatch, SetStateAction } from 'react';
import { BoldText, Button, Heading } from '../../../..';
import { ButtonsWrapper } from '../../CompleteBookingPopup.styled';

interface BookingCompletedProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
  refetchRentals: () => void;
}

const BookingCompleted = ({
  setActiveStep,
  setOpenPopup,
  refetchRentals,
}: BookingCompletedProps) => (
  <>
    <Heading variant="h3">Thank you</Heading>
    <BoldText style={{ fontSize: '14px', marginTop: '10px' }}>
      Your booking is now completed
    </BoldText>
    <ButtonsWrapper>
      <Button
        onClick={() => {
          setActiveStep(0);
          refetchRentals();
          setOpenPopup(false);
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

export default BookingCompleted;
