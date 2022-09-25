import { useRecoilValue } from 'recoil';
import ProfileApproved from '../../Approved/ProfileApproved';
import ProfileSetupPending from '../../Pending/ProfilePending';
import ProfileRejected from '../../Rejected/ProfileRejected';
import { userDetailsAtom } from '../../../../../../../recoil';
import { ProfileSetup } from '../../Setup/ProfileSetup/ProfileSetup';
import { UserDetailsApprovalStatusEnum } from '../../../../../../../interfaces/api.types.generated.d';

const ProfileState = () => {
  const userDetails = useRecoilValue(userDetailsAtom);
  const ProfileStateComponent = () => {
    const detailsStatus = userDetails?.details?.approvalStatus;
    const detailsRequestedStatus = userDetails?.detailsRequested?.approvalStatus;

    switch (true) {
      case detailsStatus === UserDetailsApprovalStatusEnum.Approved &&
        userDetails?.detailsRequested === null:
        return <ProfileApproved />;
      case detailsRequestedStatus === UserDetailsApprovalStatusEnum.Rejected:
        return <ProfileRejected />;
      case detailsRequestedStatus === UserDetailsApprovalStatusEnum.Pending:
        return <ProfileSetupPending />;
      default:
        return <ProfileSetup />;
    }
  };

  return userDetails ? <ProfileStateComponent /> : null;
};

export default ProfileState;
