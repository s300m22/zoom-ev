import { Dispatch, SetStateAction, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useForm } from 'react-hook-form';
import {
  StripeCardCvcElementChangeEvent,
  StripeCardExpiryElementChangeEvent,
  StripeCardNumberElement,
  StripeCardNumberElementChangeEvent,
  StripeElements,
} from '@stripe/stripe-js';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { logError } from '../../../utils';
import { userDetailsAtom } from '../../../recoil';
import { useSnackbar } from '../../../hooks';
import {
  Button,
  Heading,
  Popup,
  Label,
  Error,
  ExpirySecurityWrapper,
  StyledDivInputWrapper,
} from '../..';
import { StripeProvider } from '../../../providers';
import {
  UpdatePaymentMethodTrigger,
  UpdatePaymentDetailsPopupWrapper,
  ButtonsWrapper,
  UpdatePaymentMethodForm,
} from './UpdatePaymentDetailsPopup.styled';

import { useUpdateBundleSubscriptionPaymentMethodMutation } from '../../../hooks/api/updateBundleSubscriptionPayment/updateBundleSubscriptionPayment.generated';

interface PopupTriggerProps {
  hasPayment?: boolean;
}
const PopupTrigger = ({ hasPayment = false }: PopupTriggerProps) => (
  <UpdatePaymentMethodTrigger aria-disabled={!hasPayment}>
    {hasPayment ? 'Update' : 'Add'}
  </UpdatePaymentMethodTrigger>
);

interface PopupContentProps {
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
}

const PopupContent = ({ setOpenPopup }: PopupContentProps) => {
  const userDetails = useRecoilValue(userDetailsAtom);
  const showSnackbar = useSnackbar();
  const stripe = useStripe();
  const elements = useElements();
  const [updatePaymentMethod, { loading }] = useUpdateBundleSubscriptionPaymentMethodMutation({
    refetchQueries: ['bundleSubscription'],
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    setError,
    setValue,
  } = useForm({
    mode: 'onBlur',
  });
  register('cardNumber', { required: 'Required' });
  register('cardExpiry', { required: 'Required' });
  register('cardCvc', { required: 'Required' });

  const onSubmit = async () => {
    try {
      const isValid = await trigger();

      if (!isValid || !stripe) {
        return;
      }

      const cardNumberElement = (elements as StripeElements).getElement(
        'cardNumber',
      ) as StripeCardNumberElement;

      const response = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumberElement,
        billing_details: {
          name: `${userDetails?.details.firstName} ${userDetails?.details.lastName}`,
          email: userDetails?.email,
          address: {
            line1: userDetails?.details.addressLine1 as string,
            line2: userDetails?.details.addressLine2 as string,
            postal_code: userDetails?.details.postCode as string,
            state: userDetails?.details.county as string,
            city: userDetails?.details.city as string,
          },
        },
      });

      if (response.error) {
        throw response.error;
      }

      const paymentMethodId = response.paymentMethod.id;

      const { data } = await updatePaymentMethod({
        variables: {
          paymentMethodId,
        },
      });

      const updatePaymentMethodStatus =
        data?.updateBundleSubscriptionPaymentMethod.stripeSubscriptionStatus;
      const stripeClientSecret = data?.updateBundleSubscriptionPaymentMethod.stripeClientSecret;

      if (updatePaymentMethodStatus === 'incomplete' && stripeClientSecret) {
        const confirmResponse = await stripe.confirmCardSetup(stripeClientSecret);

        if (confirmResponse.error) {
          throw response.error;
        }
      }

      showSnackbar({
        message: 'Payment method updated successfully.',
        type: 'success',
      });
    } catch (error: any) {
      logError(error);
      showSnackbar({
        message: error.message || 'Oops, Something went wrong.',
        type: 'error',
      });
    } finally {
      reset();
      setOpenPopup(false);
    }
  };

  const handleFieldChange = (
    e:
      | StripeCardNumberElementChangeEvent
      | StripeCardCvcElementChangeEvent
      | StripeCardExpiryElementChangeEvent,
    fieldName: string,
  ) => {
    if (e.error) {
      setError(fieldName, {
        type: 'manual',
        message: e.error.message,
      });
    } else {
      setError(fieldName, {
        type: 'manual',
        message: '',
      });
    }
    if (e.complete) {
      setValue(fieldName, true);
    }
  };
  return (
    <UpdatePaymentDetailsPopupWrapper>
      <Heading variant="h3">Update your payment method </Heading>
      <UpdatePaymentMethodForm
        id="update-payment-method"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label isError={Boolean(errors.cardNumber?.message)} required>
          Card number
        </Label>
        <StyledDivInputWrapper isError={Boolean(errors.cardNumber?.message)}>
          <CardNumberElement onChange={(e) => handleFieldChange(e, 'cardNumber')} />
        </StyledDivInputWrapper>
        <Error>{errors.cardNumber?.message}</Error>
        <ExpirySecurityWrapper>
          <div>
            <Label isError={Boolean(errors.cardExpiry?.message)} required>
              Expiry date
            </Label>
            <StyledDivInputWrapper isError={Boolean(errors.cardNumber?.message)}>
              <CardExpiryElement onChange={(e) => handleFieldChange(e, 'cardExpiry')} />
            </StyledDivInputWrapper>
            <Error>{errors.cardExpiry?.message}</Error>
          </div>
          <div>
            <Label isError={Boolean(errors.cardCvc?.message)} required>
              Security code
            </Label>
            <StyledDivInputWrapper isError={Boolean(errors.cardNumber?.message)}>
              <CardCvcElement onChange={(e) => handleFieldChange(e, 'cardCvc')} />
            </StyledDivInputWrapper>
            <Error>{errors.cardCvc?.message}</Error>
          </div>
        </ExpirySecurityWrapper>
      </UpdatePaymentMethodForm>
      <ButtonsWrapper>
        <Button
          isLoading={loading}
          onClick={() => {
            setOpenPopup(false);
          }}
          variant="outlined"
        >
          Dismiss
        </Button>
        <Button form="update-payment-method" isLoading={loading} withArrow>
          Update
        </Button>
      </ButtonsWrapper>
    </UpdatePaymentDetailsPopupWrapper>
  );
};

const UpdatePaymentDetailsPopup = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const userDetails = useRecoilValue(userDetailsAtom);

  return (
    <Popup
      isOpen={openPopup}
      maxHeight="auto"
      setIsOpen={setOpenPopup}
      trigger={<PopupTrigger hasPayment={userDetails && userDetails?.paymentMethods.length > 0} />}
    >
      <StripeProvider>
        <PopupContent setOpenPopup={setOpenPopup} />
      </StripeProvider>
    </Popup>
  );
};
export default UpdatePaymentDetailsPopup;
