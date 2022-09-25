import { useRecoilValue } from 'recoil';
import { userDetailsAtom } from '../recoil';

const useIsBusiness = () => {
  const userDetails = useRecoilValue(userDetailsAtom);
  return Boolean(userDetails?.businessUserRole);
};

export default useIsBusiness;
