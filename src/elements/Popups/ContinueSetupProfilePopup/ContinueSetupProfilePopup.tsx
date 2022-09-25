import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Button, Heading, Popup } from '../..';
import { useSnackbar } from '../../../hooks';
import { useResetMyDetailsRequestedMutation } from '../../../hooks/api/resetMyDetailsRequested/resetMyDetailsRequested.generated';
import { userDetailsAtom } from '../../../recoil';
import { logError } from '../../../utils';
import {
  ContinueSetupProfilePopupWrapper,
  ButtonsWrapper,
} from './ContinueSetupProfilePopup.styled';

interface ContinueSetupProfilePopupProps {
  buttonText?: string;
}

const ContinueSetupProfilePopup = ({
  buttonText = 'Continue setup',
}: ContinueSetupProfilePopupProps) => {
  const router = useRouter();
  const [openPupup, setOpenPopup] = useState(false);
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
      router.push('/introduce-yourself');
    } catch (error: any) {
      logError(error);
      showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
    } finally {
      setOpenPopup(true);
    }
  };

  return (
    <Popup
      isOpen={openPupup}
      setIsOpen={setOpenPopup}
      trigger={
        <Button variant="outlined" withArrow>
          {buttonText}
        </Button>
      }
    >
      <ContinueSetupProfilePopupWrapper>
        <Heading variant="h3">
          Continue with your previously <br /> started setup?
        </Heading>
        <ButtonsWrapper>
          <Button onClick={handleReset} variant="outlined">
            Start again
          </Button>
          <Button href="/introduce-yourself">Continue</Button>
        </ButtonsWrapper>
      </ContinueSetupProfilePopupWrapper>
    </Popup>
  );
};
export default ContinueSetupProfilePopup;
