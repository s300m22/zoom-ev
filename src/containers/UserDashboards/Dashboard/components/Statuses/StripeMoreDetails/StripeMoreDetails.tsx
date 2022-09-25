import { Button, Heading, StatusEnum, StatusLabel } from '../../../../../../elements';
import { useSnackbar } from '../../../../../../hooks';
import { useSignStripeConnectExpressDashboardLinkMutation } from '../../../../../../hooks/api/signStripeConnectExpressDashboardLink/signStripeConnectExpressDashboardLink.generated';
import { logError } from '../../../../../../utils';
import {
  StatusesActionsWrapper,
  StatusesCardWrapper,
  StatusesTextWrapper,
  StatusesParagraph,
  StatusesButtonsWrapper,
} from '../StatusesShared';

export const StripeMoreDetails = () => {
  const showSnackbar = useSnackbar();
  const [signStripeConnectExpressDashboardLink, { loading }] =
    useSignStripeConnectExpressDashboardLinkMutation();

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
    <StatusesCardWrapper style={{ padding: '20px 30px' }}>
      <StatusesTextWrapper>
        <Heading variant="h4">Finish your Stripe account setup</Heading>
        <StatusesParagraph>
          You are almost there! <br /> Just one more step and your Stripe account will be ready.
        </StatusesParagraph>
      </StatusesTextWrapper>
      <StatusesActionsWrapper>
        <StatusLabel status={StatusEnum.Rejected}>Details needed</StatusLabel>
        <StatusesButtonsWrapper>
          <Button isLoading={loading} onClick={handleClick} variant="outlined" withArrow>
            Go to Stripe Dashboard
          </Button>
        </StatusesButtonsWrapper>
      </StatusesActionsWrapper>
    </StatusesCardWrapper>
  );
};
export default StripeMoreDetails;
