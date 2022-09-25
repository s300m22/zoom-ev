import { useState } from 'react';
import { Button, Heading, Popup } from '../..';
import { useCancelBundleSubscriptionMutation } from '../../../hooks/api/cancelBundleSubscription/cancelBundleSubscription.generated';
import { MessagesIcon } from '../../../icons';
import { useSnackbar } from '../../../hooks';
import {
  ButtonsWrapper,
  ReactivateSubscriptionPopupWrapper,
  Parapgraph,
  ImageWrapper,
} from './ReactivateSubscriptionPopup.styled';
import { logError } from '../../../utils';

const StepOne = () => (
  <>
    <ImageWrapper>
      <MessagesIcon />
    </ImageWrapper>
    <Heading variant="h3">Re-activate subscription?</Heading>
    <Parapgraph>
      Cancelling your subscription will cancel the upcoming payment. Your subscription will remain
      valid until the renewal date.
    </Parapgraph>
  </>
);

const PopupTrigger = () => <Button variant="outlined">Re-activate subscription </Button>;

const ReactivateSubscriptionPopup = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cancelBundleSubscription] = useCancelBundleSubscriptionMutation({
    refetchQueries: ['bundleSubscription'],
  });
  const showSnackbar = useSnackbar();

  const handleCancelSubscription = async () => {
    try {
      setLoading(true);
      await cancelBundleSubscription();
      setOpenPopup(false);
      showSnackbar({
        message: 'Subscription canceled successfully',
        type: 'success',
      });
    } catch (error: any) {
      logError(error);
      showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popup
      handleCloseEvent={() => {}}
      isOpen={openPopup}
      maxHeight="auto"
      setIsOpen={setOpenPopup}
      trigger={<PopupTrigger />}
    >
      <ReactivateSubscriptionPopupWrapper>
        <StepOne />
        <ButtonsWrapper>
          <Button
            onClick={() => {
              setOpenPopup(false);
            }}
            variant="outlined"
          >
            Dismiss
          </Button>
          <Button isLoading={loading} onClick={handleCancelSubscription} withArrow>
            Re-activate subscription
          </Button>
        </ButtonsWrapper>
      </ReactivateSubscriptionPopupWrapper>
    </Popup>
  );
};

export default ReactivateSubscriptionPopup;
