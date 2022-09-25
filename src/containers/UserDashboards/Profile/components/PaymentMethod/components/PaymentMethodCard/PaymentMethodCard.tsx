import { CreditCard } from '../../../../../../../elements';
import { PaymentMethodType } from '../../../../../../../interfaces/api.types.generated.d';
import { PaymentMethodWrapper } from './PaymentMethodCard.styled';

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethodType;
}
export const PaymentMethodCard = ({ paymentMethod }: PaymentMethodCardProps) => {
  return (
    <PaymentMethodWrapper>
      <CreditCard paymentMethod={paymentMethod} />
    </PaymentMethodWrapper>
  );
};
export default PaymentMethodCard;
