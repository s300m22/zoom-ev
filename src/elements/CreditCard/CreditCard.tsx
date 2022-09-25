import {
  AmericanExpressIcon,
  Visaicon,
  MasterCardIcon,
  DiscoveryIcon,
  CreditCardIcon,
} from '../../icons';
import { PaymentMethodType } from '../../interfaces/api.types.generated';
import { CreditCardNumber, CreditCardWrapper } from './CreditCard.styled';

export interface CreditCardProps {
  paymentMethod?: PaymentMethodType | null;
  showNumber?: boolean;
}

const getCreditCardLogo = (issuer?: string) => {
  switch (issuer) {
    case 'Visa':
    case 'visa':
      return <Visaicon />;
    case 'Mastercard':
    case 'mastercard':
      return <MasterCardIcon />;
    case 'American Express':
    case 'americanexpress':
    case 'amex':
      return <AmericanExpressIcon />;
    case 'Maestro':
    case 'maestro':
      return <DiscoveryIcon />;
    default:
      return <CreditCardIcon />;
  }
};
const CreditCard = ({ paymentMethod, showNumber = true }: CreditCardProps) => {
  if (!paymentMethod) return <CreditCardWrapper>-</CreditCardWrapper>;
  const { brand, last4 } = paymentMethod;
  return (
    <CreditCardWrapper>
      {brand ? getCreditCardLogo(brand) : null}
      {showNumber ? <CreditCardNumber>**** **** **** {last4}</CreditCardNumber> : null}
    </CreditCardWrapper>
  );
};

export default CreditCard;
