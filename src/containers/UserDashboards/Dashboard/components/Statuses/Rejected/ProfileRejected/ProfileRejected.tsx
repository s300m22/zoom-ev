import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Button, Heading, StatusEnum, StatusLabel } from '../../../../../../../elements';
import { useSnackbar } from '../../../../../../../hooks';
import { useResetMyDetailsRequestedMutation } from '../../../../../../../hooks/api/resetMyDetailsRequested/resetMyDetailsRequested.generated';
import { userDetailsAtom } from '../../../../../../../recoil';
import { logError } from '../../../../../../../utils';
import {
  StatusesActionsWrapper,
  StatusesCardWrapper,
  StatusesTextWrapper,
  StatusesParagraph,
  StatusesButtonsWrapper,
} from '../../StatusesShared';

export const ProfileRejected = () => {
  const showSnackbar = useSnackbar();
  const userDetails = useRecoilValue(userDetailsAtom);
  const setUserDetails = useSetRecoilState(userDetailsAtom);
  const [resetMyDetailsRequested] = useResetMyDetailsRequestedMutation();

  const handleReset = async () => {
    try {
      await resetMyDetailsRequested();
      showSnackbar({ message: 'Profile reset successfully.', type: 'success' });
      userDetails &&
        setUserDetails({
          ...userDetails,
          detailsRequested: null,
        });
    } catch (error: any) {
      logError(error);
      showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
    }
  };

  return (
    <StatusesCardWrapper style={{ padding: '20px 30px' }}>
      <StatusesTextWrapper>
        <Heading variant="h4">Profile rejected</Heading>
        <StatusesParagraph>
          Unfortunately your form was rejected. You can correct and send your application once
          again.
        </StatusesParagraph>
      </StatusesTextWrapper>
      <StatusesActionsWrapper>
        <StatusLabel status={StatusEnum.Rejected}>Rejected</StatusLabel>
        <StatusesButtonsWrapper>
          <Button onClick={handleReset} variant="text">
            Delete
          </Button>
          <Button href="/introduce-yourself" variant="outlined" withArrow>
            Start again
          </Button>
        </StatusesButtonsWrapper>
      </StatusesActionsWrapper>
    </StatusesCardWrapper>
  );
};
export default ProfileRejected;
