import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import {
  StripeCardNumberElementChangeEvent,
  StripeCardCvcElementChangeEvent,
  StripeCardExpiryElementChangeEvent,
} from '@stripe/stripe-js';
import {
  SimpleCard,
  Heading,
  StyledDivInputWrapper,
  Error,
  Label,
  ExpirySecurityWrapper,
  Checkbox,
} from '../../../../elements';
import {
  PaymentDetailsWrapper,
  PaymentDetailsParagraph,
  PaymentDetailsOptionalHolder,
} from './PaymentDetails.styled';

interface PaymentDetailsProps {
  paymentDetailsOptional?: boolean;
}
const PaymentDetails: React.FC<PaymentDetailsProps> = ({ paymentDetailsOptional = false }) => {
  const [showPaymentDetails, setShowPaymentDetails] = useState(!paymentDetailsOptional);
  const {
    formState: { errors },
    setError,
    setValue,
    register,
    clearErrors,
    unregister,
  } = useFormContext();

  useEffect(() => {
    if (!paymentDetailsOptional || (paymentDetailsOptional && showPaymentDetails)) {
      register('cardNumber', { required: true });
      register('cardExpiry', { required: true });
      register('cardCvc', { required: true });
    } else {
      unregister('cardNumber');
      unregister('cardExpiry');
      unregister('cardCvc');
    }
  }, [showPaymentDetails, paymentDetailsOptional]); // eslint-disable-line

  const handleFieldChange = (
    e:
      | StripeCardNumberElementChangeEvent
      | StripeCardCvcElementChangeEvent
      | StripeCardExpiryElementChangeEvent,
    fieldName: string,
  ) => {
    if (e.error) {
      setError(fieldName, {
        type: 'manual',
        message: e.error.message,
      });
    } else {
      clearErrors(fieldName);
    }
    setValue(fieldName, e.complete);
  };

  return (
    <SimpleCard>
      <PaymentDetailsWrapper>
        <Heading variant="h4">Payment details</Heading>
        <PaymentDetailsParagraph>
          {paymentDetailsOptional
            ? 'The EV Driver Benefits Bundle is an Annual Subscription product. If you would like to automatically renew so you can access EV discounts year on year, please select the option below and confirm your payment details.'
            : `These payment details will be used for your Annual Subscription purchase and renewals.
          Your subscription will automatically renew each year. We will notify you about the
          upcoming renewal. You can cancel FOC anytime in your account.`}
        </PaymentDetailsParagraph>
        {paymentDetailsOptional && (
          <PaymentDetailsOptionalHolder>
            <Checkbox
              checked={showPaymentDetails}
              customStyles={{
                fontSize: '16px',
                margin: '10px 0 0',
              }}
              errors={errors}
              handleChange={(c) => {
                setShowPaymentDetails(c);
              }}
              label={<>I would like my Subscription to automatically renew next year</>}
              name="set_payment_details"
            />
          </PaymentDetailsOptionalHolder>
        )}

        {(!paymentDetailsOptional || (paymentDetailsOptional && showPaymentDetails)) && (
          <>
            <Label isError={Boolean(errors.cardNumber)} required>
              Card number
            </Label>
            <StyledDivInputWrapper isError={Boolean(errors.cardNumber)}>
              <CardNumberElement onChange={(e) => handleFieldChange(e, 'cardNumber')} />
            </StyledDivInputWrapper>

            {errors.cardNumber?.type === 'required' && <Error>Card number required</Error>}
            <Error>{errors.cardNumber?.message}</Error>
            <ExpirySecurityWrapper>
              <div>
                <Label isError={Boolean(errors.cardExpiry)} required>
                  Expiry date
                </Label>
                <StyledDivInputWrapper isError={Boolean(errors.cardExpiry)}>
                  <CardExpiryElement onChange={(e) => handleFieldChange(e, 'cardExpiry')} />
                </StyledDivInputWrapper>
                {errors.cardExpiry?.type === 'required' && <Error>Required</Error>}
                <Error>{errors.cardExpiry?.message}</Error>
              </div>
              <div>
                <Label isError={Boolean(errors.cardCvc)} required>
                  Security code
                </Label>
                <StyledDivInputWrapper isError={Boolean(errors.cardCvc)}>
                  <CardCvcElement onChange={(e) => handleFieldChange(e, 'cardCvc')} />
                </StyledDivInputWrapper>
                {errors.cardCvc?.type === 'required' && <Error>Required</Error>}

                <Error>{errors.cardCvc?.message}</Error>
              </div>
            </ExpirySecurityWrapper>
          </>
        )}
      </PaymentDetailsWrapper>
    </SimpleCard>
  );
};

export default PaymentDetails;
