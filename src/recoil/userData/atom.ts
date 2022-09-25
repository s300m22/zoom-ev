import { atom } from 'recoil';
import { GetCurrentUserQuery } from '../../hooks/api/getCurrentUser/getCurrentUser.generated';

const userDetailsAtom = atom<GetCurrentUserQuery['me'] | undefined>({
  key: 'userDetailsAtom',
  default: undefined,
});

export default userDetailsAtom;
