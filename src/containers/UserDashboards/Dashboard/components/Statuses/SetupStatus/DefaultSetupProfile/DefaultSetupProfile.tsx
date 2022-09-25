import { useRecoilValue } from 'recoil';
import { userDetailsAtom } from '../../../../../../../recoil';
import CarOwnerSetupStatus from '../CarOwnerSetupStatus';
import UserProfileSetupStatus from '../UserProfileSetupStatus';

const DefaultSetupProfile = () => {
  const userDetails = useRecoilValue(userDetailsAtom);

  if (!userDetails) return null;

  return userDetails.isOwnerProfileSetupFlowInitiated ? (
    <CarOwnerSetupStatus />
  ) : (
    <UserProfileSetupStatus />
  );
};
export default DefaultSetupProfile;
