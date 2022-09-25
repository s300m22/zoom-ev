/* eslint-disable no-nested-ternary */
import { NextPage } from 'next';
import Skeleton from 'react-loading-skeleton';
import { DashboardsLayout } from '../../../../../layouts';
import { IGlobalSettings } from '../../../../../interfaces/contentful.types.generated';
import AddPaymentMethodPopup from '../../../../../elements/Popups/AddPaymentMethodPopup';
import NoPaymentMethods from './components/NoPaymentMethods/NoPaymentMethods';
import { PaymentMethodCard } from './components';
import { StripeProvider } from '../../../../../providers';
import { useStripeSetupIntentsQuery } from '../../../../../hooks/api/stripeSetupIntents/stripeSetupIntents.generated';

interface PageProps {
  globalSettings: IGlobalSettings;
  title: string;
}

const PaymentMethod: NextPage<PageProps> = ({ globalSettings, title }) => {
  const {
    data: setupIntentsData,
    loading: setupIntentsLoading,
    refetch: refetchSetupIntents,
  } = useStripeSetupIntentsQuery({
    notifyOnNetworkStatusChange: true,
  });
  const setupIntents = setupIntentsData?.stripeSetupIntents.map(({ id, cardLast4, cardBrand }) => ({
    id,
    last4: cardLast4,
    brand: cardBrand,
  }));

  return (
    <DashboardsLayout
      globalSettings={globalSettings}
      pageActions={
        <StripeProvider>
          <AddPaymentMethodPopup getStripeSetupIntents={refetchSetupIntents} />
        </StripeProvider>
      }
      pageTitle={title}
      parentLink={{ url: '/dashboard/profile', label: 'Profile' }}
    >
      {setupIntentsLoading ? (
        <Skeleton
          count={4}
          height={78}
          style={{
            marginBottom: '10px',
            borderRadius: '12px',
            boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
          }}
        />
      ) : setupIntents?.length ? (
        setupIntents.map((setupIntent) => (
          <PaymentMethodCard key={setupIntent.id} paymentMethod={setupIntent} />
        ))
      ) : (
        <NoPaymentMethods />
      )}
    </DashboardsLayout>
  );
};

export default PaymentMethod;
