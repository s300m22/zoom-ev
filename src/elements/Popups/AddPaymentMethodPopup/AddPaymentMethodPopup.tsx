/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
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
import { useSnackbar } from '../../../hooks';
import {
  Button,
  Heading,
  Popup,
  Label,
  Error,
  StyledDivInputWrapper,
  ExpirySecurityWrapper,
} from '../..';
import {
  AddPaymentMethodForm,
  AddPaymentMethodWrapper,
  PopupFooterAction,
} from './AddPaymentMethodPopup.styled';
import { logError } from '../../../utils';
import { userDetailsAtom } from '../../../recoil';
import { useCreateStripeSetupIntentMutation } from '../../../hooks/api/createStripeSetupIntent/createStripeSetupIntent.generated';
import { StripeSetupIntentStatusEnum } from '../../../interfaces/api.types.generated.d';

const PopupTrigger = () => <Button>Add card</Button>;

interface AddPaymentMethodPopupProps {
  getStripeSetupIntents?: () => void;
}

const AddPaymentMethodPopup = ({ getStripeSetupIntents }: AddPaymentMethodPopupProps) => {
  const userDetails = useRecoilValue(userDetailsAtom);
  const showSnackbar = useSnackbar();
  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

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

  const [createStripeSetupIntent] = useCreateStripeSetupIntentMutation();

  register('cardNumber', { required: 'Required' });
  register('cardExpiry', { required: 'Required' });
  register('cardCvc', { required: 'Required' });

  const onSubmit = async () => {
    try {
      setLoading(true);
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

      const createSetupIntentResult = await createStripeSetupIntent({
        variables: {
          paymentMethodId: paymentMethodId || '',
        },
      });

      const createSetupIntentResultStatus =
        createSetupIntentResult.data?.createStripeSetupIntent.status;
      const stripeClientSecret = createSetupIntentResult.data?.createStripeSetupIntent.clientSecret;

      if (
        (createSetupIntentResultStatus === StripeSetupIntentStatusEnum.RequiresAction ||
          createSetupIntentResultStatus === StripeSetupIntentStatusEnum.RequiresConfirmation) &&
        stripeClientSecret
      ) {
        const confirmResponse = await stripe.confirmCardSetup(stripeClientSecret);

        if (confirmResponse.error) {
          throw response.error;
        }
      }

      getStripeSetupIntents && getStripeSetupIntents();
      showSnackbar({
        message: 'Card added successfully.',
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
      setLoading(false);
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
    <Popup
      handleCloseEvent={reset}
      isOpen={openPopup}
      maxHeight="unset"
      setIsOpen={setOpenPopup}
      trigger={<PopupTrigger />}
    >
      <AddPaymentMethodWrapper>
        <Heading variant="h3">Add card</Heading>
        <AddPaymentMethodForm noValidate onSubmit={handleSubmit(onSubmit)}>
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
          <PopupFooterAction>
            <Button
              isLoading={loading}
              onClick={(e) => {
                reset();
                e.preventDefault();
                setOpenPopup(false);
              }}
              type="button"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button isLoading={loading} type="submit" withArrow>
              Add
            </Button>
          </PopupFooterAction>
        </AddPaymentMethodForm>
      </AddPaymentMethodWrapper>
    </Popup>
  );
};

export default AddPaymentMethodPopup;
