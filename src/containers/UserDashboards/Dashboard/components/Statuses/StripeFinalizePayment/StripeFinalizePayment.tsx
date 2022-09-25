import { FinalizePayment, Heading } from '../../../../../../elements';
import { useCarRentalRequestsStatusQuery } from '../../../../../../hooks/api/carRentalRequestsStatus/carRentalRequestsStatus.generated';
import { CarRentalRequestPaymentStatusEnum } from '../../../../../../interfaces/api.types.generated.d';
import {
  StatusesActionsWrapper,
  StatusesCardWrapper,
  StatusesTextWrapper,
  StatusesParagraph,
} from '../StatusesShared';

export const StripeFinalizePayment = () => {
  const { data, refetch } = useCarRentalRequestsStatusQuery({
    variables: {
      params: {
        limit: 1000,
        requestingAsRenter: true,
      },
    },
  });
  const rentalRequest = data?.carRentalRequests;

  if (!rentalRequest) return null;

  const rentalRequiredAction = rentalRequest.rentalRequests.find(
    (request) => request.paymentStatus === CarRentalRequestPaymentStatusEnum.RequiresAction,
  );

  return rentalRequiredAction?.stripePaymentIntentClientSecret ? (
    <StatusesCardWrapper style={{ padding: '20px 30px' }}>
      <StatusesTextWrapper>
        <Heading variant="h4">Action needed</Heading>
        <StatusesParagraph>
          To finalize the payment, please go to Stripe and confirm your payment.
        </StatusesParagraph>
      </StatusesTextWrapper>
      <StatusesActionsWrapper>
        <FinalizePayment
          refetchData={refetch}
          stripePaymentIntentClientSecret={rentalRequiredAction.stripePaymentIntentClientSecret}
        />
      </StatusesActionsWrapper>
    </StatusesCardWrapper>
  ) : null;
};

export default StripeFinalizePayment;
