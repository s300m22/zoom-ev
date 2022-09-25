import { NextPage } from 'next';
import { useRecoilValue } from 'recoil';
import { IGlobalSettings } from '../../../interfaces/contentful.types.generated';
import { DashboardsLayout } from '../../../layouts';
import { userDetailsAtom } from '../../../recoil';
import { StripePayoutApproved, StripePayoutMoreDetails, StripePayoutSetup } from './components';

interface PayoutsProps {
  globalSettings: IGlobalSettings;
  title: string;
}

const Payouts: NextPage<PayoutsProps> = ({ globalSettings, title }) => {
  const userDetails = useRecoilValue(userDetailsAtom);

  const StripePayoutsComponent = () => {
    switch (true) {
      case Boolean(!userDetails?.stripeConnectedAccountId):
        return <StripePayoutSetup />;
      case Boolean(userDetails?.stripeConnectedAccountSetupRequired):
        return <StripePayoutMoreDetails />;
      default:
        return <StripePayoutApproved />;
    }
  };
  return (
    <DashboardsLayout globalSettings={globalSettings} pageTitle={title}>
      <StripePayoutsComponent />
    </DashboardsLayout>
  );
};

export default Payouts;
