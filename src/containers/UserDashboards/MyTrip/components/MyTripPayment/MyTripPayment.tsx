import { ApolloQueryResult } from '@apollo/client';
import {
  SettingsCardWrapper,
  SettingsContent,
  SettingsCardHeader,
  Heading,
  SubText,
  BoldText,
  CreditCard,
  FinalizePayment,
} from '../../../../../elements';
import {
  CarRentalRequestRenterQuery,
  CarRentalRequestRenterQueryVariables,
} from '../../../../../hooks/api/carRentalRequestRenter/carRentalRequestRenter.generated';
import { CarRentalRequestPaymentStatusEnum } from '../../../../../interfaces/api.types.generated.d';
import { formatPrice } from '../../../../../utils';
import { SpaceBetweenRow, StatusWrapper } from '../SharedStyles.styled';
import { FinalizePaymentWrapper, ActionNeeded, CreditCardContainer } from './MyTripsPayment.styled';

interface MyTripPaymentProps {
  refetchCarRental: (
    variables?: CarRentalRequestRenterQueryVariables,
  ) => Promise<ApolloQueryResult<CarRentalRequestRenterQuery>>;
  rental?: CarRentalRequestRenterQuery['carRentalRequest'];
}

const MyTripPayment = ({ refetchCarRental, rental }: MyTripPaymentProps) => {
  if (!rental) return null;
  const { rentalFeeSum, paymentMethod, stripePaymentIntentClientSecret } = rental;
  return (
    <SettingsCardWrapper>
      <SettingsCardHeader>
        <Heading variant="h4">Payment</Heading>
        {rental.paymentStatus === CarRentalRequestPaymentStatusEnum.RequiresAction &&
        stripePaymentIntentClientSecret ? (
          <FinalizePaymentWrapper>
            <ActionNeeded>Action needed to finalise the payment.</ActionNeeded>
            <FinalizePayment
              refetchData={refetchCarRental}
              stripePaymentIntentClientSecret={stripePaymentIntentClientSecret}
            />
          </FinalizePaymentWrapper>
        ) : null}
      </SettingsCardHeader>
      <SettingsContent>
        <SpaceBetweenRow>
          <SubText>Total</SubText>
          <StatusWrapper>
            <BoldText>{formatPrice(rentalFeeSum / 100)}</BoldText>
            <SubText style={{ fontSize: '10px', margin: '5px 0 0', display: 'block' }}>
              Free cancellation up to 48h before your booking starts
            </SubText>
          </StatusWrapper>
        </SpaceBetweenRow>
        {paymentMethod ? (
          <SpaceBetweenRow>
            <SubText>Method</SubText>
            <CreditCardContainer>
              <CreditCard paymentMethod={paymentMethod} />
            </CreditCardContainer>
          </SpaceBetweenRow>
        ) : null}
      </SettingsContent>
    </SettingsCardWrapper>
  );
};

export default MyTripPayment;
