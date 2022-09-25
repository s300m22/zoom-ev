import { Heading, SubText } from '../../../../../../elements';
import { ShieldWithLockIcon, MasterCardVisaIcon, CancelIcon } from '../../../../../../icons';
import { PaymentCardsWrapper, CardsWrapper, PaymentCard } from './PaymentCards.style';

const PaymentCards = () => (
  <PaymentCardsWrapper>
    <Heading variant="h4">Easy and secure payment </Heading>
    <CardsWrapper>
      <PaymentCard>
        <ShieldWithLockIcon />
        <Heading variant="h6">Secure payment</Heading>
        <SubText style={{ fontSize: '14px', margin: 0 }}>All our transactions are encypted</SubText>
      </PaymentCard>
      <PaymentCard>
        <MasterCardVisaIcon />
        <Heading variant="h6">Trusted payment method</Heading>
        <SubText style={{ fontSize: '14px', margin: 0 }}>Pay with Visa and Mastercard</SubText>
      </PaymentCard>
      <PaymentCard>
        <CancelIcon />
        <Heading variant="h6">Cancel any time</Heading>
        <SubText style={{ fontSize: '14px', margin: 0 }}>
          Canceling your subscription is easy
        </SubText>
      </PaymentCard>
    </CardsWrapper>
  </PaymentCardsWrapper>
);
export default PaymentCards;
