/* eslint-disable react-hooks/exhaustive-deps */
import { Entry } from 'contentful';
import { NextPage } from 'next';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { FormProvider, useForm } from 'react-hook-form';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { StripeCardNumberElement, StripeElements } from '@stripe/stripe-js';
import { ActionsLayout } from '../../layouts';
import { Heading } from '../../elements';
import {
  CheckoutWrapper,
  CheckoutForm,
  LeftSideWrapper,
  RightSideWrapper,
  HowItWorks,
} from './Checkout.styled';
import { Details, OrderSummary, PaymentDetails } from './components';
import { userDetailsAtom, checkoutBundleLoadingAtom, receivedBundlesAtom } from '../../recoil';
import { useSnackbar } from '../../hooks';
import { useGetBundlesThatICanPurchaseLazyQuery } from '../../hooks/api/getBundlesThanICanPurchase/getBundlesThatICanPurchase.generated';
import { IGlobalSettingsFields } from '../../interfaces/contentful.types.generated';
import { PurchaseBundleSubscriptionInput } from '../../interfaces/api.types.generated';
import { useCreateBundleSubscriptionPurchaseMutation } from '../../hooks/api/createBundleSubscriptionPurchase/createBundleSubscriptionPurchase.generated';
import { StripeProvider } from '../../providers';
import CheckoutLloydsPopup from '../../elements/Popups/CheckoutLloydsPopup';
import { useBundleSubscriptionQuery } from '../../hooks/api/bundleSubscription/bundleSubscription.generated';
import BundleNotAvailable from '../BundleNotAvailable';
import { convertToTimestamp } from '../../utils';
import mixpanel from 'mixpanel-browser';
import { HowItWorksIcon } from '../../icons';

interface PageProps {
  globalSettings: Entry<IGlobalSettingsFields>;
  title: string;
}

interface BundleFormInpus
  extends Omit<PurchaseBundleSubscriptionInput, 'carModelName' | 'carMakerName'> {
  creditCard: string;
  cardNumber?: string;
  carModelName: {
    label: string;
    value: string;
  };
  carMakerName: {
    label: string;
    value: string;
  };
}

const PageLeadContent = () => <Heading variant="h2">Checkout</Heading>;

export const CheckoutComponent = () => {
  const router = useRouter();
  const [couponPromoCode, setCouponPromoCode] = useState('');
  const [getReceivedBundles, { data, loading }] = useGetBundlesThatICanPurchaseLazyQuery();
  const [selectedCallingCode, setSelectedCallingCode] = useState('44');
  const methods = useForm<BundleFormInpus>({ mode: 'onBlur' });
  const userData = useRecoilValue(userDetailsAtom);
  const receivedBundles = useRecoilValue(receivedBundlesAtom);
  const setCheckoutBundleLoading = useSetRecoilState(checkoutBundleLoadingAtom);
  const setReceivedBundles = useSetRecoilState(receivedBundlesAtom);
  const { handleSubmit, trigger, reset } = methods;
  const [submitPurchaseRequest] = useCreateBundleSubscriptionPurchaseMutation();
  const showSnackbar = useSnackbar();
  const stripe = useStripe();
  const elements = useElements();

  const [isLbgCouponCode, setIsLbgCouponCode] = useState(false);
  const [showLbgPopup, setShowLbgPopup] = useState(false);
  const [theCreatedSubscriptionId, setTheCreatedSubscriptionId] = useState('test');

  useEffect(() => {
    if (userData && !userData?.details?.firstName) {
      router.push('/auth/tell-us-more');
    }
  }, [router, userData]);

  useEffect(() => {
    !receivedBundles && getReceivedBundles();
  }, [getReceivedBundles, receivedBundles]);

  useEffect(() => {
    if (data?.bundleTypeThatICanPurchase) {
      setReceivedBundles(data.bundleTypeThatICanPurchase);
    }
  }, [data, setReceivedBundles]);

  const onSubmit = async (input: BundleFormInpus) => {
    try {
      setCheckoutBundleLoading(true);

      const isValid = await trigger();
      if (!isValid) {
        return;
      }

      if (userData === undefined || !stripe) throw new Error('You must be logged in.');

      let paymentMethodId;

      if (input?.cardNumber) {
        const cardNumberElement = (elements as StripeElements).getElement(
          'cardNumber',
        ) as StripeCardNumberElement;

        const response = await stripe.createPaymentMethod({
          type: 'card',
          card: cardNumberElement,
          billing_details: {
            name: `${userData.details.firstName} ${userData.details.lastName}`,
            email: userData.email,
            address: {
              line1: input.addressLine1,
              line2: input.addressLine2,
              postal_code: input.postCode,
              state: input.county,
              city: input.town,
            },
          },
        });

        if (response.error) {
          throw response.error;
        }

        paymentMethodId = response?.paymentMethod?.id;
      }

      const {
        details: { firstName, lastName },
      } = userData;

      const {
        addressLine1,
        addressLine2,
        phoneNumber,
        town,
        county,
        postCode,
        carMakerName: { value: carMakerName },
        carModelName: { value: carModelName },
        estimatedCarDeliveryDate,
      } = input;

      const submitPurchaseResult = await submitPurchaseRequest({
        variables: {
          input: {
            firstName: firstName || '',
            lastName: lastName || '',
            addressLine1,
            addressLine2,
            phoneNumber: `+${selectedCallingCode}|${phoneNumber}`,
            town,
            county,
            postCode,
            carMakerName,
            carModelName,
            estimatedCarDeliveryDate: estimatedCarDeliveryDate
              ? `${convertToTimestamp(estimatedCarDeliveryDate)}`
              : null,
            paymentMethodId: paymentMethodId || '',
            couponPromoCode,
          },
        },
      });

      if (input?.cardNumber) {
        const stripeSubscriptionStatus =
          submitPurchaseResult.data?.createBundleSubscriptionPurchase.stripeSubscriptionStatus;
        const stripeClientSecret =
          submitPurchaseResult.data?.createBundleSubscriptionPurchase.stripeClientSecret;

        if (stripeSubscriptionStatus === 'incomplete' && stripeClientSecret) {
          const confirmResponse = await stripe.confirmCardPayment(stripeClientSecret);

          if (confirmResponse.error) {
            throw confirmResponse.error;
          }
        }
      }

      mixpanel.track('bundle.purchase_access', {
        bundle: submitPurchaseResult.data?.createBundleSubscriptionPurchase?.bundleSubscription?.id,
      });

      reset();
      showSnackbar({
        message: 'Thanks, your bundle payments processed successfully.',
        type: 'success',
      });

      if (isLbgCouponCode) {
        setTheCreatedSubscriptionId(
          submitPurchaseResult.data?.createBundleSubscriptionPurchase?.bundleSubscription?.id ?? '',
        );
        setShowLbgPopup(true);
      } else {
        router.push('/dashboard/bundles');
      }
    } catch (error: any) {
      showSnackbar({ message: error.message || 'Oops, Something went wrong.', type: 'error' });
    } finally {
      setCheckoutBundleLoading(false);
    }
  };

  return (
    <CheckoutWrapper>
      <FormProvider {...methods}>
        <CheckoutForm noValidate onSubmit={handleSubmit(onSubmit)}>
          <LeftSideWrapper>
            <Details
              selectedCallingCode={selectedCallingCode}
              setSelectedCallingCode={setSelectedCallingCode}
            />
            <PaymentDetails paymentDetailsOptional={receivedBundles?.grantedBy !== null} />
          </LeftSideWrapper>
          <RightSideWrapper>
            {!loading && receivedBundles ? (
              <OrderSummary
                bundleImage={receivedBundles?.grantedBy?.logoImage?.url}
                bundleName={receivedBundles.name}
                bundlePrice={receivedBundles.price}
                isDefault={receivedBundles.isDefault}
                periodDuration={receivedBundles.periodDuration}
                setCouponPromoCode={setCouponPromoCode}
                setIsLbgCouponCode={setIsLbgCouponCode}
              />
            ) : null}
           
            <HowItWorks>
            <h4>How it works</h4>
            <HowItWorksIcon ></HowItWorksIcon>
            </HowItWorks>
          </RightSideWrapper>
        </CheckoutForm>
      </FormProvider>
      {showLbgPopup && <CheckoutLloydsPopup subscriptionId={theCreatedSubscriptionId} />}
    </CheckoutWrapper>
  );
};

export const CheckoutPage: NextPage<PageProps> = ({ globalSettings, title }) => {
  const receivedBundles = useRecoilValue(receivedBundlesAtom);

  const { data: purchasedBundleData, loading: loadingPurchased } = useBundleSubscriptionQuery({
    fetchPolicy: 'network-only',
  });

  if (purchasedBundleData?.bundleSubscription) {
    return <BundleNotAvailable globalSettings={globalSettings} />;
  }

  return (
    <ActionsLayout
      customWidth="1140px"
      isLogoLinkDisabled={receivedBundles?.grantedBy !== null}
      logo={globalSettings.fields.topBarLogo}
      pageLeadContent={<PageLeadContent />}
      pageTitle={title}
    >
      {!loadingPurchased && (
        <StripeProvider>
          <CheckoutComponent />
        </StripeProvider>
      )}
    </ActionsLayout>
  );
};
