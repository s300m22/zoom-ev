import {
  SettingsCardWrapper,
  SettingsContent,
  SettingsCardHeader,
  Heading,
  SubText,
  BoldText,
} from '../../../../../elements';
import { CarRentalRequestQuery } from '../../../../../hooks/api/carRentalRequest/carRentalRequest.generated';
import { formatPrice } from '../../../../../utils';
import { SpaceBetweenRow } from '../SharedStyles.styled';

interface MyBookingHostProps {
  rental?: CarRentalRequestQuery['carRentalRequest'];
}

const MyBookingPayment = ({ rental }: MyBookingHostProps) => {
  if (!rental) return null;

  return (
    <SettingsCardWrapper>
      <SettingsCardHeader>
        <Heading variant="h4">Payment</Heading>
      </SettingsCardHeader>
      <SettingsContent>
        <SpaceBetweenRow>
          <SubText>Total</SubText>
          <BoldText>{formatPrice(rental.rentalFeeSum / 100)}</BoldText>
        </SpaceBetweenRow>
        <SpaceBetweenRow>
          <SubText>Your earnings</SubText>
          <BoldText>{formatPrice(rental.rentalFeeOwner / 100)}</BoldText>
        </SpaceBetweenRow>
      </SettingsContent>
    </SettingsCardWrapper>
  );
};

export default MyBookingPayment;
