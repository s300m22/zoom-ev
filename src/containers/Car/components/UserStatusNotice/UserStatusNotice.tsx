import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { Button, SimpleCard } from '../../../../elements';
import { useIsBusiness } from '../../../../hooks';
import { GetPublicCarQuery } from '../../../../hooks/api/getPublicCarInformation/getPublicCarInformation.generated';

import { UserDetailsApprovalStatusEnum } from '../../../../interfaces/api.types.generated.d';
import { userDetailsAtom } from '../../../../recoil';
import { AuthState, getDialogContentForState } from '../BookCard/BookCard.utils';
import { NoticeWrapper, InnerWrapper, MessageTitle } from './UserStatusNotice.styled';

interface UserStatusProps {
  car: GetPublicCarQuery['car'];
}
const UserStatusNotice = ({ car }: UserStatusProps) => {
  const router = useRouter();

  const isBusiness = useIsBusiness();
  const userDetails = useRecoilValue(userDetailsAtom);

  const isUserApproved =
    userDetails?.details.approvalStatus === UserDetailsApprovalStatusEnum.Approved &&
    userDetails.validAsCarRenter;

  const getNotice = () => {
    if (isBusiness) {
      return null;
    }

    if (isUserApproved) {
      return null;
    }

    if (userDetails?.detailsRequested?.approvalStatus === UserDetailsApprovalStatusEnum.Pending) {
      return getDialogContentForState(AuthState.PENDING);
    }

    if (userDetails?.detailsRequested?.approvalStatus === UserDetailsApprovalStatusEnum.Rejected) {
      return getDialogContentForState(AuthState.REJECTED);
    }
    if (userDetails?.id) {
      return getDialogContentForState(AuthState.UNAPPROVED);
    }
    return getDialogContentForState(AuthState.UNAUTHENTICATED);
  };
  return getNotice() == null ? (
    <></>
  ) : (
    <NoticeWrapper>
      <SimpleCard>
        <InnerWrapper>
          <div>
            <MessageTitle>{getNotice()?.title}</MessageTitle>
            <p>{getNotice()?.text}</p>
          </div>
          {getNotice()?.action2Path && (
            <Button
              onClick={() => {
                let not: string = getNotice()?.action2Path || '';
                not = not?.replace('{returnURL}', `/car/${car?.id}`);
                if (not !== null || not !== undefined) router.push(not);
              }}
            >
              {getNotice()?.action2Title}
            </Button>
          )}
        </InnerWrapper>
      </SimpleCard>
    </NoticeWrapper>
  );
};

export default UserStatusNotice;
