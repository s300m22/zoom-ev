import { useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { ApolloQueryResult } from '@apollo/client';
import Button from '../Button/Button';
import { useSnackbar } from '../../hooks';
import { CarRentalRequestRenterQuery } from '../../hooks/api/carRentalRequestRenter/carRentalRequestRenter.generated';
import { StripeProvider } from '../../providers';
import { logError } from '../../utils';
import { CarRentalRequestsStatusQuery } from '../../hooks/api/carRentalRequestsStatus/carRentalRequestsStatus.generated';

export interface FinalizePaymentButtonProps {
  refetchData: () => Promise<
    ApolloQueryResult<CarRentalRequestRenterQuery | CarRentalRequestsStatusQuery>
  >;
  stripePaymentIntentClientSecret: string;
}

export interface FinalizePaymentProps {
  refetchData: () => Promise<
    ApolloQueryResult<CarRentalRequestRenterQuery | CarRentalRequestsStatusQuery>
  >;
  stripePaymentIntentClientSecret: string;
}

const FinalizePaymentButton = ({
  stripePaymentIntentClientSecret,
  refetchData,
}: FinalizePaymentButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const showSnackbar = useSnackbar();

  const handleClick = async () => {
    if (stripe) {
      try {
        setIsLoading(true);
        const confirmResponse = await stripe.confirmCardPayment(stripePaymentIntentClientSecret);

        if (confirmResponse.error) {
          throw confirmResponse.error;
        }

        showSnackbar({
          message: 'We are finalising your payment. Please wait.',
          type: 'success',
        });

        setTimeout(() => {
          refetchData && refetchData();
        }, 2500);
      } catch (error: any) {
        showSnackbar({ message: error.message || 'Oops, Something went wrong.', type: 'error' });
        logError(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <StripeProvider>
      <Button isLoading={isLoading} onClick={() => handleClick()} variant="outlined" withArrow>
        Finalise payment
      </Button>
    </StripeProvider>
  );
};

export const FinalizePayment = ({
  stripePaymentIntentClientSecret,
  refetchData,
}: FinalizePaymentButtonProps) => (
  <StripeProvider>
    <FinalizePaymentButton
      refetchData={refetchData}
      stripePaymentIntentClientSecret={stripePaymentIntentClientSecret}
    />
  </StripeProvider>
);
