import isPast from 'date-fns/isPast';
import {
  SettingsCardWrapper,
  SettingsContent,
  SettingsCardHeader,
  Heading,
  SubText,
  BoldText,
  RentalStatus,
} from '../../../../../elements';
import { CarRentalRequestRenterQuery } from '../../../../../hooks/api/carRentalRequestRenter/carRentalRequestRenter.generated';
import { CarRentalRequestStatusEnum } from '../../../../../interfaces/api.types.generated.d';
import { convertToReadableDateFormat } from '../../../../../utils';
import { TableLikeRow, SpaceBetweenRow, StatusWrapper } from '../SharedStyles.styled';

interface MyTripDetailsProps {
  rental?: CarRentalRequestRenterQuery['carRentalRequest'];
}

const MyTripDetails = ({ rental }: MyTripDetailsProps) => {
  if (!rental) return null;

  const isInProgress = isPast(rental.timeStart);
  const dayStart = convertToReadableDateFormat({ date: rental.timeStart, withDays: true });
  const timeStart = convertToReadableDateFormat({ date: rental.timeStart, onlyTime: true });
  const dayEnd = convertToReadableDateFormat({ date: rental.timeEnd, withDays: true });
  const timeEnd = convertToReadableDateFormat({ date: rental.timeEnd, onlyTime: true });
  return (
    <SettingsCardWrapper>
      <SettingsCardHeader>
        <Heading variant="h4">Details</Heading>
      </SettingsCardHeader>
      <SettingsContent>
        <TableLikeRow>
          <div>
            <SubText style={{ fontSize: '14px', margin: '0 0 5px' }}>From</SubText>
            <BoldText style={{ fontSize: '14px', margin: '0 0 5px' }}>{dayStart}</BoldText>
            <BoldText style={{ fontSize: '16px', margin: '0 0 5px', display: 'block' }}>
              {timeStart}
            </BoldText>
          </div>
          <div>
            <SubText style={{ fontSize: '14px', margin: '0 0 5px' }}>To</SubText>
            <BoldText style={{ fontSize: '14px', margin: '0 0 5px' }}>{dayEnd}</BoldText>
            <BoldText style={{ fontSize: '16px', margin: '0 0 5px', display: 'block' }}>
              {timeEnd}
            </BoldText>
          </div>
        </TableLikeRow>
        <SpaceBetweenRow>
          <SubText>Booking No.</SubText>
          <BoldText>{rental.id}</BoldText>
        </SpaceBetweenRow>
        <SpaceBetweenRow>
          <SubText>Status</SubText>
          <StatusWrapper>
            <RentalStatus isInProgress={isInProgress} rentalStatus={rental.status} />
            {rental.status === CarRentalRequestStatusEnum.WaitingForAcceptance ? (
              <SubText style={{ fontSize: '10px', margin: '5px 0 0' }}>
                Host needs to approve your booking. We will notify you when the status changes.
              </SubText>
            ) : null}
          </StatusWrapper>
        </SpaceBetweenRow>
        {rental.status === CarRentalRequestStatusEnum.Rejected && (
          <SubText style={{ fontSize: '10px', margin: '5px 0 0', textAlign: 'right' }}>
            Sorry your booking was rejected by the Host. We haven`t taken any money for your
            booking.
          </SubText>
        )}
        {rental.status === CarRentalRequestStatusEnum.Rejected && rental.rejectionNote && (
          <div>
            <SubText>Message from the host</SubText>
            {rental.rejectionNote}
          </div>
        )}
      </SettingsContent>
    </SettingsCardWrapper>
  );
};

export default MyTripDetails;
