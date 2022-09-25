import { atom } from 'recoil';
import { GrantedBundleSubscriptionResellerDiscountsQuery } from '../../hooks/api/grantedBundleSubscriptionResellerDiscounts/grantedBundleSubscriptionResellerDiscounts.generated';

const customerBundlesAtom = atom<
  | GrantedBundleSubscriptionResellerDiscountsQuery['grantedBundleSubscriptionResellerDiscounts']
  | undefined
>({
  key: 'customerBundles',
  default: undefined,
});

export default customerBundlesAtom;
