import { useState, useEffect } from 'react';
import { Button, Heading } from '../../../../../../elements';
import { useSignStripeConnectOnBoardingLinkMutation } from '../../../../../../hooks/api/signStripeConnectOnBoardingLink/signStripeConnectOnBoardingLink.generated';
import {
  StatusesActionsWrapper,
  StatusesCardWrapper,
  StatusesTextWrapper,
  StatusesParagraph,
} from '../StatusesShared';

export const StripeActionNeeded = () => {
  const [stripeUrl, setStripeUrl] = useState<string>();
  const [signStripeConnectOnBoardingLink] = useSignStripeConnectOnBoardingLinkMutation();

  useEffect(() => {
    (async () => {
      const url = await signStripeConnectOnBoardingLink();
      setStripeUrl(url.data?.signStripeConnectOnBoardingLink);
    })();
  }, [signStripeConnectOnBoardingLink]);

  return stripeUrl ? (
    <StatusesCardWrapper>
      <StatusesTextWrapper>
        <Heading variant="h4">Action needed</Heading>
        <StatusesParagraph>
          To finalize the payment, please go to Stripe and confirm your payment.
        </StatusesParagraph>
      </StatusesTextWrapper>
      <StatusesActionsWrapper>
        <Button href={stripeUrl} variant="outlined" withArrow>
          Finalize payment
        </Button>
      </StatusesActionsWrapper>
    </StatusesCardWrapper>
  ) : null;
};
export default StripeActionNeeded;
