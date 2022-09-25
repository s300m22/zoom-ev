import { useRecoilValue } from 'recoil';
import { Button, ContinueSetupProfilePopup, Heading } from '../../../../../../../elements';
import { userDetailsAtom } from '../../../../../../../recoil';
import { countFilledEntries } from '../../../../../../../utils';
import { PROFILE_NEW_FILLED_FIELDS } from '../../../../const';
import {
  StatusesActionsWrapper,
  StatusesCardWrapper,
  StatusesTextWrapper,
  StatusesParagraph,
} from '../../StatusesShared';

export const ProfileSetup = () => {
  const userDetails = useRecoilValue(userDetailsAtom);
  const filledEntries = countFilledEntries(userDetails?.detailsRequested);
  const shouldContinue = filledEntries > PROFILE_NEW_FILLED_FIELDS;

  return (
    <StatusesCardWrapper>
      <StatusesTextWrapper>
        <Heading variant="h4">Profile setup</Heading>
        <StatusesParagraph>
          Create a profile to be able to host or share an EV on our platform
        </StatusesParagraph>
      </StatusesTextWrapper>
      <StatusesActionsWrapper>
        {shouldContinue ? (
          <ContinueSetupProfilePopup buttonText="Continue profile setup" />
        ) : (
          <Button href="/introduce-yourself" variant="outlined" withArrow>
            Setup your profile
          </Button>
        )}
      </StatusesActionsWrapper>
    </StatusesCardWrapper>
  );
};

export default ProfileSetup;
