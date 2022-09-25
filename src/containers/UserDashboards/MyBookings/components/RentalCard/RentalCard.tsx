import React, { useState } from 'react';
import isPast from 'date-fns/isPast';
import Link from 'next/link';
import {
  BoldText,
  Button,
  Heading,
  SubText,
  UserRatings,
  RentalStatus,
  UserAvatar,
  StyledLink,
  Checkbox,
  Popup,
  TextArea,
} from '../../../../../elements';
import { useAcceptCarRentalRequestMutation } from '../../../../../hooks/api/acceptCarRentalRequest/acceptCarRentalRequest.generated';
import { useRejectCarRentalRequestMutation } from '../../../../../hooks/api/rejectCarRentalRequest/rejectCarRentalRequest.generated';
import { useCancelCarRentalRequestMutation } from '../../../../../hooks/api/cancelCarRentalRequest/cancelCarRentalRequest.generated';
import { CarRentalRequestsQuery } from '../../../../../hooks/api/carRentalRequests/carRentalRequests.generated';
import { CarRentalRequestStatusEnum } from '../../../../../interfaces/api.types.generated.d';
import {
  RentalCardAvatarWrapper,
  RentalCardBody,
  RentalCardWrapper,
  RentalCardFooter,
  RentalCarHeader,
  RentalCarDescription,
  RentalCarCell,
} from './RentalCard.styled';
import { convertToReadableDateFormat } from '../../../../../utils';
import { useSnackbar } from '../../../../../hooks';
import CompleteBookingPopup from '../../../../../elements/Popups/CompleteBookingPopup';

interface RentalCardProps {
  rental: CarRentalRequestsQuery['carRentalRequests']['rentalRequests'][0];
  refetchRentals: () => void;
  switchTo?: (tab: 'active' | 'inactive') => void;
}

interface CardFooterProps {
  rentalId: string;
  rentalStatus: CarRentalRequestStatusEnum;
  isInProgress: boolean;
  userDetails: CarRentalRequestsQuery['carRentalRequests']['rentalRequests'][0]['user']['details'];
  refetchRentals: () => void;
  switchTo: (tab: 'active' | 'inactive') => void;
}

const ConfirmLabel = () => (
  <div style={{ textAlign: 'left', marginTop: '-10px' }}>
    I confirm that my EV still meets the Minimum Vehicle Specification, Vehicle Condition &
    Roadworthiness Criteria outlined in{' '}
    <StyledLink color="blue" externalLink href="/terms-and-conditions">
      Zoom EVs Terms and Conditions
    </StyledLink>
    .
  </div>
);

const CardFooter = ({
  rentalId,
  rentalStatus,
  isInProgress,
  userDetails,
  refetchRentals,
  switchTo,
}: CardFooterProps) => {
  const showSnackbar = useSnackbar();
  const [confirmationPopupType, setConfirmationPopupType] = useState<string>();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [rejectionNote, setRejectionNote] = useState('');

  const [acceptCarRentalRequest] = useAcceptCarRentalRequestMutation({
    variables: {
      id: rentalId,
    },
    refetchQueries: ['carRentalRequests'],
  });

  const [rejectCarRentalRequest] = useRejectCarRentalRequestMutation({
    variables: {
      id: rentalId,
      note: rejectionNote,
    },
    refetchQueries: ['carRentalRequests'],
  });

  const [cancelCarRentalRequest] = useCancelCarRentalRequestMutation({
    variables: {
      id: rentalId,
    },
    refetchQueries: ['carRentalRequests'],
  });

  switch (true) {
    case rentalStatus === CarRentalRequestStatusEnum.WaitingForAcceptance:
      return (
        <>
          <Button
            onClick={() => {
              setConfirmationPopupType('DECLINE');
            }}
            variant="outlined"
          >
            Decline
          </Button>
          <Button
            onClick={() => {
              setConfirmationPopupType('ACCEPT');
            }}
          >
            Accept
          </Button>
          <Popup
            isOpen={Boolean(confirmationPopupType)}
            setIsOpen={() => {
              setConfirmationPopupType(undefined);
              setTermsAccepted(false);
            }}
          >
            <>
              {confirmationPopupType === 'ACCEPT' ? (
                <div style={{ width: '500px', maxWidth: '100%', textAlign: 'center' }}>
                  <Heading variant="h3">Accept booking request</Heading>
                  <div style={{ display: 'flex', marginTop: '60px' }}>
                    <Checkbox
                      checked={termsAccepted}
                      handleChange={setTermsAccepted}
                      label={<ConfirmLabel />}
                      name="acceptTerms"
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                    <Button
                      onClick={() => {
                        setConfirmationPopupType(undefined);
                        setTermsAccepted(false);
                      }}
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={!termsAccepted}
                      onClick={async () => {
                        await acceptCarRentalRequest();
                        setConfirmationPopupType(undefined);
                        setTermsAccepted(false);
                        showSnackbar({ message: 'Car rental request accepted', type: 'success' });
                        switchTo('active');
                      }}
                      variant="contained"
                    >
                      Accept booking
                    </Button>
                  </div>
                </div>
              ) : (
                <div style={{ width: '500px', maxWidth: '100%', textAlign: 'center' }}>
                  <Heading variant="h3">Decline booking request</Heading>
                  <div style={{ width: '100%', marginTop: '50px' }}>
                    <TextArea
                      hideCounter
                      label="Tell a guest why you declined their booking"
                      maxLength={2000}
                      name="rejectionNote"
                      onChange={(e) => setRejectionNote(e.target.value)}
                      required
                      value={rejectionNote}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <Button
                      onClick={() => {
                        setConfirmationPopupType(undefined);
                        setRejectionNote('');
                      }}
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={!rejectionNote}
                      onClick={async () => {
                        await rejectCarRentalRequest();
                        setConfirmationPopupType(undefined);
                        setRejectionNote('');
                        showSnackbar({ message: 'Car rental request rejected', type: 'success' });
                        switchTo('inactive');
                      }}
                      variant="contained"
                    >
                      Decline booking
                    </Button>
                  </div>
                </div>
              )}
            </>
          </Popup>
        </>
      );
    case rentalStatus === CarRentalRequestStatusEnum.Accepted && isInProgress:
      return (
        <>
          <CompleteBookingPopup
            guestDetails={userDetails}
            refetchRentals={refetchRentals}
            rentalId={rentalId}
          />
        </>
      );
    case rentalStatus === CarRentalRequestStatusEnum.Accepted:
      return (
        <Button
          onClick={() => {
            cancelCarRentalRequest();
            showSnackbar({ message: 'Car rental canceled', type: 'success' });
          }}
          variant="outlined"
        >
          Cancel booking
        </Button>
      );
    default:
      return null;
  }
};

const RentalCard = ({ rental, refetchRentals, switchTo = () => {} }: RentalCardProps) => {
  const {
    user: { reviewsAverageScore, reviewsCount, details: userDetails },
    car: { details: carDetails },
  } = rental;
  const isInProgress = isPast(rental.timeStart);
  const carName = `${carDetails.maker?.name} ${carDetails.model?.name}, ${carDetails.registration}`;
  const dayStart = convertToReadableDateFormat({ date: rental.timeStart, withDays: true });
  const timeStart = convertToReadableDateFormat({ date: rental.timeStart, onlyTime: true });
  const dayEnd = convertToReadableDateFormat({ date: rental.timeEnd, withDays: true });
  const timeEnd = convertToReadableDateFormat({ date: rental.timeEnd, onlyTime: true });

  return (
    <RentalCardWrapper>
      <Link href={`/dashboard/bookings/details/${rental.id}`}>
        <RentalCardAvatarWrapper>
          <UserAvatar avatarUrl={userDetails.avatarImage?.url} />
        </RentalCardAvatarWrapper>
      </Link>
      <Link href={`/dashboard/bookings/details/${rental.id}`}>
        <RentalCardBody>
          <RentalCarHeader>
            <Heading variant="h5">
              {userDetails.firstName} {userDetails.lastName}
              <UserRatings avgScore={reviewsAverageScore} totalReviews={reviewsCount} />
            </Heading>
            <RentalStatus isInProgress={isInProgress} ommitPending rentalStatus={rental.status} />
          </RentalCarHeader>
          <RentalCarDescription>
            <RentalCarCell>
              <SubText style={{ fontSize: '14px', margin: '0 0 5px' }}>Vehicle</SubText>
              <BoldText style={{ fontSize: '14px' }}>{carName}</BoldText>
            </RentalCarCell>
            <RentalCarCell>
              <SubText style={{ fontSize: '14px', margin: '0 0 5px' }}>From</SubText>
              <BoldText style={{ fontSize: '14px', margin: '0 0 5px' }}>{dayStart}</BoldText>
              <BoldText style={{ fontSize: '16px', margin: '0 0 5px', display: 'block' }}>
                {timeStart}
              </BoldText>
            </RentalCarCell>
            <RentalCarCell>
              <SubText style={{ fontSize: '14px', margin: '0 0 5px' }}>To</SubText>
              <BoldText style={{ fontSize: '14px', margin: '0 0 5px' }}>{dayEnd}</BoldText>
              <BoldText style={{ fontSize: '16px', margin: '0 0 5px', display: 'block' }}>
                {timeEnd}
              </BoldText>
            </RentalCarCell>
          </RentalCarDescription>
        </RentalCardBody>
      </Link>
      <RentalCardFooter>
        <CardFooter
          isInProgress={isInProgress}
          refetchRentals={refetchRentals}
          rentalId={rental.id}
          rentalStatus={rental.status}
          switchTo={switchTo}
          userDetails={userDetails}
        />
      </RentalCardFooter>
    </RentalCardWrapper>
  );
};
export default RentalCard;
