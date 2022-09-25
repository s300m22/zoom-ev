import { Auth } from '@aws-amplify/auth';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { userDetailsAtom } from '../recoil';
import useSnackbar from './useSnackbar';

import { logError } from '../utils';
import mixpanel from 'mixpanel-browser';

const useLogout = () => {
  const showSnackbar = useSnackbar();
  const router = useRouter();
  const setUserDetails = useSetRecoilState(userDetailsAtom);

  const logout = async () => {
    try {
      Auth.signOut();
      setUserDetails(undefined);
      showSnackbar({ message: 'Successfully logged off.', type: 'success' });
      mixpanel.reset();
      router.push('/');
    } catch (error) {
      logError(error);
      showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
    }
  };

  return logout;
};

export default useLogout;
