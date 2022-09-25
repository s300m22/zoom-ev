import { Button, Heading } from '../../../../../elements';
import { useSnackbar } from '../../../../../hooks';
import { useSignStripeConnectExpressDashboardLinkMutation } from '../../../../../hooks/api/signStripeConnectExpressDashboardLink/signStripeConnectExpressDashboardLink.generated';
import { useStripeConnectedAccountBalanceQuery } from '../../../../../hooks/api/stripeConnectedAccountBalance/stripeConnectedAccountBalance.generated';
import { StripeSecuredIcon } from '../../../../../icons';
import { formatPrice, logError } from '../../../../../utils';
import {
  StatusesActionsWrapper,
  StatusesTextWrapper,
  StatusesParagraph,
} from '../../../Dashboard/components/Statuses/StatusesShared';
import {
  PayoutStatusesCardWrapper,
  StripeSecuredWrapper,
  Subtitle,
} from '../PayoutSetupShared.styled';

export const StripePayoutApproved = () => {
  const showSnackbar = useSnackbar();
  const { data: stripeBalanceData } = useStripeConnectedAccountBalanceQuery();
  const [signStripeConnectExpressDashboardLink, { loading }] =
    useSignStripeConnectExpressDashboardLinkMutation();

  const stripeBalance = stripeBalanceData?.stripeConnectedAccountBalance;

  const handleClick = async () => {
    try {
      const response = await signStripeConnectExpressDashboardLink();
      const stripeUrl = response.data?.signStripeConnectExpressDashboardLink;
      window.open(stripeUrl, '_blank', 'noopener');
    } catch (err) {
      showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
      logError(err);
    }
  };
  return (
    <PayoutStatusesCardWrapper>
      <StatusesTextWrapper>
        <Heading variant="h2">
          {formatPrice((stripeBalance?.available || stripeBalance?.pending || 0) / 10000)}
        </Heading>
        <Subtitle>Available funds</Subtitle>
        <StatusesParagraph>
          You will automatically receive your earnings into your Stripe account 7 days <br />
          after completion of a booking
        </StatusesParagraph>
      </StatusesTextWrapper>
      <StatusesActionsWrapper>
        <Button isLoading={loading} onClick={handleClick} variant="outlined" withArrow>
          Go to Stripe Dashboard
        </Button>
        <StripeSecuredWrapper>
          <StripeSecuredIcon />
        </StripeSecuredWrapper>
      </StatusesActionsWrapper>
    </PayoutStatusesCardWrapper>
  );
};
export default StripePayoutApproved;
