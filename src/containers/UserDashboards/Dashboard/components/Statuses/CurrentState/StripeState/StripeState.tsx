import { useRecoilValue } from 'recoil';
import { userDetailsAtom } from '../../../../../../../recoil';
import { StripeSetup } from '../../Setup';
import { StripeApproved } from '../../Approved';
import StripeMoreDetails from '../../StripeMoreDetails';

const StripeState = () => {
  const userDetails = useRecoilValue(userDetailsAtom);

  const StripeStateComponent = () => {
    if (!userDetails) return null;

    const stripeAccountSetupRequired = userDetails.stripeConnectedAccountSetupRequired;
    switch (true) {
      case stripeAccountSetupRequired === null:
        return <StripeSetup />;
      case stripeAccountSetupRequired === true:
        return <StripeMoreDetails />;
      case stripeAccountSetupRequired === false:
        return <StripeApproved />;
      default:
        return null;
    }
  };

  return <StripeStateComponent />;
};

export default StripeState;
