import { Button, Heading } from '../../../../../../../elements';
import { useSnackbar } from '../../../../../../../hooks';
import { useSignStripeConnectOnBoardingLinkMutation } from '../../../../../../../hooks/api/signStripeConnectOnBoardingLink/signStripeConnectOnBoardingLink.generated';
import { logError } from '../../../../../../../utils';
import {
  StatusesActionsWrapper,
  StatusesCardWrapper,
  StatusesTextWrapper,
  StatusesParagraph,
} from '../../StatusesShared';

export const StripeSetup = () => {
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
    <StatusesCardWrapper>
      <StatusesTextWrapper>
        <Heading variant="h4">Stripe payment account setup</Heading>
        <StatusesParagraph>
          You must setup a payment account to receive your earnings before your EV is visible to
          Guests on the platform
        </StatusesParagraph>
      </StatusesTextWrapper>
      <StatusesActionsWrapper>
        <Button isLoading={loading} onClick={handleClick} variant="outlined" withArrow>
          Payment setup
        </Button>
      </StatusesActionsWrapper>
    </StatusesCardWrapper>
  );
};
export default StripeSetup;
