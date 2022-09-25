import { useState } from 'react';
import { Button, Heading, List, Popup } from '../..';
import { useCancelBundleSubscriptionMutation } from '../../../hooks/api/cancelBundleSubscription/cancelBundleSubscription.generated';
import { MessagesIcon } from '../../../icons';
import { useSnackbar } from '../../../hooks';
import {
  ButtonsWrapper,
  CancelSubscriptionPopupWrapper,
  Parapgraph,
  ImageWrapper,
} from './CancelSubscriptionPopup.styled';
import { logError } from '../../../utils';

const StepOne = () => (
  <>
    <Heading variant="h3">Before you go...</Heading>
    <Parapgraph>
      By cancelling this subscription you will loose access to some great benefits with leading
      brands across:
    </Parapgraph>
    <List
      listColumns={2}
      listItems={[
        'Home energy ',
        'Home charging',
        'Public charging',
        'Parking',
        'Accident management',
      ]}
    />
  </>
);

const StepTwo = () => (
  <>
    <ImageWrapper>
      <MessagesIcon />
    </ImageWrapper>
    <Heading variant="h3">Cancel subscription?</Heading>
    <Parapgraph>
      Cancelling your subscription will cancel the upcoming payment. Your subscription will remain
      valid until the renewal date.
    </Parapgraph>
  </>
);

const PopupTrigger = () => <Button variant="outlined">Cancel subscription</Button>;

const CancelSubscriptionPopup = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
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
      handleCloseEvent={() => setActiveStep(1)}
      isOpen={openPopup}
      maxHeight="auto"
      setIsOpen={setOpenPopup}
      trigger={<PopupTrigger />}
    >
      <CancelSubscriptionPopupWrapper>
        {activeStep === 1 ? <StepOne /> : <StepTwo />}
        <ButtonsWrapper>
          <Button
            onClick={() => {
              setActiveStep(1);
              setOpenPopup(false);
            }}
            variant="outlined"
          >
            Dismiss
          </Button>
          {activeStep === 1 ? (
            <Button onClick={() => setActiveStep(2)} withArrow>
              Continue
            </Button>
          ) : (
            <Button isLoading={loading} onClick={handleCancelSubscription} withArrow>
              Cancel subscription
            </Button>
          )}
        </ButtonsWrapper>
      </CancelSubscriptionPopupWrapper>
    </Popup>
  );
};

export default CancelSubscriptionPopup;
