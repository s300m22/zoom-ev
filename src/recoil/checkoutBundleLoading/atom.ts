import { atom } from 'recoil';

const checkoutBundleLoadingAtom = atom<boolean>({
  key: 'checkoutBundleLoading',
  default: false,
});

export default checkoutBundleLoadingAtom;
