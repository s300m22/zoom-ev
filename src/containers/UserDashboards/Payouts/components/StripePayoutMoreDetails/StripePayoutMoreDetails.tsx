import { Button, Heading } from '../../../../../elements';
import { useSnackbar } from '../../../../../hooks';
import { useSignStripeConnectExpressDashboardLinkMutation } from '../../../../../hooks/api/signStripeConnectExpressDashboardLink/signStripeConnectExpressDashboardLink.generated';
import { StripeSecuredIcon } from '../../../../../icons';
import { logError } from '../../../../../utils';
import {
  StatusesActionsWrapper,
  StatusesTextWrapper,
  StatusesParagraph,
} from '../../../Dashboard/components/Statuses/StatusesShared';
import { PayoutStatusesCardWrapper, StripeSecuredWrapper } from '../PayoutSetupShared.styled';

export const StripeMoreDetails = () => {
  const showSnackbar = useSnackbar();
  const [signStripeConnectOnBoardingLink, { loading }] =
    useSignStripeConnectExpressDashboardLinkMutation();

  const handleClick = async () => {
    try {
      const response = await signStripeConnectOnBoardingLink();
      const stripeUrl = response.data?.signStripeConnectExpressDashboardLink;
      window.open(stripeUrl, '_blank', 'noopener');
    } catch (err) {
      showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
      logError(err);
    }
  };

  return (
    <PayoutStatusesCardWrapper style={{ padding: '20px 30px' }}>
      <StatusesTextWrapper>
        <Heading variant="h4">Finish your Stripe account setup</Heading>
        <StatusesParagraph>
          You are almost there! Just one more step and your Stripe account will be ready.
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
export default StripeMoreDetails;
