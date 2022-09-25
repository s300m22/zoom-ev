import { useState } from 'react';
import { Button, Popup } from '../..';
import { CompleteBookingPopupWrapper } from './CompleteBookingPopup.styled';
import {
  AddUserReview,
  BookingCheckList,
  BookingCompleted,
  BookingProblems,
  ThankYouProblem,
  ThankYouReview,
} from './components';
import { CarRentalRequestsQuery } from '../../../hooks/api/carRentalRequests/carRentalRequests.generated';

export interface CompleteBookingPopupProps {
  rentalId: string;
  guestDetails: CarRentalRequestsQuery['carRentalRequests']['rentalRequests'][0]['user']['details'];
  refetchRentals: () => void;
}

const PopupTrigger = () => <Button>Mark as completed</Button>;

const CompleteBookingPopup = ({
  rentalId,
  guestDetails,
  refetchRentals,
}: CompleteBookingPopupProps) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [problemsList, setProblemsList] = useState(['']);

  return (
    <Popup
      handleCloseEvent={() => {
        setActiveStep(0);
        refetchRentals();
      }}
      isOpen={openPopup}
      maxHeight="auto"
      setIsOpen={setOpenPopup}
      trigger={<PopupTrigger />}
    >
      <CompleteBookingPopupWrapper>
        {activeStep === 0 ? (
          <BookingCheckList
            rentalId={rentalId}
            setActiveStep={setActiveStep}
            setOpenPopup={setOpenPopup}
            setProblemsList={setProblemsList}
          />
        ) : null}

        {activeStep === 1 ? (
          <BookingCompleted
            refetchRentals={refetchRentals}
            setActiveStep={setActiveStep}
            setOpenPopup={setOpenPopup}
          />
        ) : null}

        {activeStep === 2 ? (
          <BookingProblems
            problemsList={problemsList}
            rentalId={rentalId}
            setActiveStep={setActiveStep}
          />
        ) : null}

        {activeStep === 3 ? (
          <ThankYouProblem
            refetchRentals={refetchRentals}
            setActiveStep={setActiveStep}
            setOpenPopup={setOpenPopup}
          />
        ) : null}

        {activeStep === 4 ? (
          <AddUserReview
            guestDetails={guestDetails}
            refetchRentals={refetchRentals}
            rentalId={rentalId}
            setActiveStep={setActiveStep}
            setOpenPopup={setOpenPopup}
          />
        ) : null}

        {activeStep === 5 ? (
          <ThankYouReview
            refetchRentals={refetchRentals}
            setActiveStep={setActiveStep}
            setOpenPopup={setOpenPopup}
          />
        ) : null}
      </CompleteBookingPopupWrapper>
    </Popup>
  );
};

export default CompleteBookingPopup;
