import { atom } from 'recoil';
import { GetBundlesThatICanPurchaseQuery } from '../../hooks/api/getBundlesThanICanPurchase/getBundlesThatICanPurchase.generated';

const receivedBundlesAtom = atom<
  GetBundlesThatICanPurchaseQuery['bundleTypeThatICanPurchase'] | undefined
>({
  key: 'receivedBundles',
  default: undefined,
});

export default receivedBundlesAtom;
