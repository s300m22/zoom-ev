import { Button, Heading } from '../../../../../elements';
import { useSnackbar } from '../../../../../hooks';
import { useSignStripeConnectOnBoardingLinkMutation } from '../../../../../hooks/api/signStripeConnectOnBoardingLink/signStripeConnectOnBoardingLink.generated';
import { StripeSecuredIcon } from '../../../../../icons';
import { logError } from '../../../../../utils';
import {
  StatusesActionsWrapper,
  StatusesTextWrapper,
  StatusesParagraph,
} from '../../../Dashboard/components/Statuses/StatusesShared';
import { PayoutStatusesCardWrapper, StripeSecuredWrapper } from '../PayoutSetupShared.styled';

export const StripePayoutSetup = () => {
  const showSnackbar = useSnackbar();
  const [signStripeConnectOnBoardingLink, { loading }] =
    useSignStripeConnectOnBoardingLinkMutation();

  const handleClick = async () => {
    try {
      const response = await signStripeConnectOnBoardingLink();
      const stripeUrl = response.data?.signStripeConnectOnBoardingLink;
      window.open(stripeUrl, '_blank', 'noopener');
    } catch (err) {
      showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
      logError(err);
    }
  };

  return (
    <PayoutStatusesCardWrapper>
      <StatusesTextWrapper>
        <Heading variant="h4">Set up Stripe account to start sharing your EV </Heading>
        <StatusesParagraph>
          Your EV will not be visible on the platform until your Stripe account is set up.
        </StatusesParagraph>
      </StatusesTextWrapper>
      <StatusesActionsWrapper>
        <Button isLoading={loading} onClick={handleClick} variant="outlined" withArrow>
          Set up Stripe account
        </Button>
        <StripeSecuredWrapper>
          <StripeSecuredIcon />
        </StripeSecuredWrapper>
      </StatusesActionsWrapper>
    </PayoutStatusesCardWrapper>
  );
};
export default StripePayoutSetup;
