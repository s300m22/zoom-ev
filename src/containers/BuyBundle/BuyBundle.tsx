import { NextPage } from 'next';
import { Entry } from 'contentful';
import { useRecoilValue } from 'recoil';
import { useState, useRef } from 'react';
import { IGlobalSettingsFields } from '../../interfaces/contentful.types.generated';
import { ActionsLayout } from '../../layouts';
import { receivedBundlesAtom, userDetailsAtom } from '../../recoil';
import { CheckoutComponent } from '../Checkout/Checkout';
import { MultistepForm, StepsLine } from '../../elements';
import { YourBundle, AuthUserBundleFlow } from './components';
import PageLeadContentWrapper from './BuyBundle.styled';
import { StripeProvider } from '../../providers';
import { useBundleSubscriptionQuery } from '../../hooks/api/bundleSubscription/bundleSubscription.generated';
import BundleNotAvailable from '../BundleNotAvailable';

interface PageProps {
  globalSettings: Entry<IGlobalSettingsFields>;
  title: string;
}

const BuyBundle: NextPage<PageProps> = ({ globalSettings, title }) => {
  const userDetails = useRecoilValue(userDetailsAtom);
  const [activeStep, setActiveStep] = useState(0);
  const [activeNavStep, setActiveNavStep] = useState(0);
  const userLoggedPath = useRef(Boolean(userDetails));
  const receivedBundles = useRecoilValue(receivedBundlesAtom);

  const {
    data: purchasedBundleData,
    loading: loadingPurchased,
    refetch: refetchBundleSubscription,
  } = useBundleSubscriptionQuery({
    fetchPolicy: 'network-only',
  });

  if (purchasedBundleData?.bundleSubscription) {
    return <BundleNotAvailable globalSettings={globalSettings} />;
  }

  const steps = [
    {
      name: 'Your bundle',
      component: <YourBundle setActiveNavStep={setActiveNavStep} setActiveStep={setActiveStep} />,
      subStepsCounter: [0],
    },
    ...(!userLoggedPath.current
      ? [
          {
            name: 'Create account',
            component: (
              <AuthUserBundleFlow
                activeStep={activeStep}
                setActiveNavStep={async (v) => {
                  await refetchBundleSubscription();
                  setActiveNavStep(v);
                }}
                setActiveStep={setActiveStep}
              />
            ),
            subStepsCounter: [1, 2, 3, 4],
          },
        ]
      : []),
    {
      name: 'Checkout',
      component: (
        <StripeProvider>
          <CheckoutComponent />
        </StripeProvider>
      ),
      subStepsCounter: userLoggedPath.current ? [1] : [5],
    },
  ];

  const stepsText = steps.map((step) => step.name);

  const StepsLinePageLeadContent = () => (
    <PageLeadContentWrapper>
      <StepsLine activeStep={activeNavStep} steps={stepsText} />
    </PageLeadContentWrapper>
  );

  return (
    <ActionsLayout
      customWidth="1120px"
      isLogoLinkDisabled={receivedBundles?.grantedBy !== null}
      logo={globalSettings.fields.topBarLogo}
      pageLeadContent={<StepsLinePageLeadContent />}
      pageTitle={title}
      showBackButton={false}
    >
      {loadingPurchased ? null : <MultistepForm activeStep={activeStep} steps={steps} />}
    </ActionsLayout>
  );
};

export default BuyBundle;
