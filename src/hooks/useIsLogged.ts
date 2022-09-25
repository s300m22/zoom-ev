import { Auth } from '@aws-amplify/auth';
import { useRecoilValue } from 'recoil';
import { userDetailsAtom } from '../recoil';
import { logError } from '../utils';

const useIsLogged = () => {
  const userData = useRecoilValue(userDetailsAtom);

  if (userData) {
    return true;
  }

  const isLogged = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      return true;
    } catch (error) {
      logError(error);
      return false;
    }
  };

  return isLogged;
};

export default useIsLogged;
