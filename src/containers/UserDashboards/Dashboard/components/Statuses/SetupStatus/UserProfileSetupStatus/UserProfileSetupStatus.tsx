import { useRecoilValue, useSetRecoilState } from 'recoil';
import { UserDetailsApprovalStatusEnum } from '../../../../../../../hooks/api/inviteUserToBusiness/inviteUserToBusiness.generated';
import { useSetOwnerProfileSetupFlowInitiatedMutation } from '../../../../../../../hooks/api/setOwnerProfileSetupFlowInitiated/setOwnerProfileSetupFlowInitiated.generated';
import { userDetailsAtom } from '../../../../../../../recoil';
import { countFilledEntries, logError } from '../../../../../../../utils';
import { PROFILE_NEW_FILLED_FIELDS } from '../../../../const';
import { ProfileState } from '../../CurrentState';
import { Button, ContinueSetupProfilePopup, Heading } from '../../../../../../../elements';
import {
  CardCell,
  CardContent,
  CardDivider,
  CardDividerText,
  CardImageWrapper,
  CardParagraph,
  SetupSimpleCard,
} from './UserProfileSetupStatus.styled';
import { EvCarIcon, SetupProfileIcon } from '../../../../../../../icons';

const UserProfileSetupStatus = () => {
  const userDetails = useRecoilValue(userDetailsAtom);
  const setUserDetails = useSetRecoilState(userDetailsAtom);
  const setupAlreadyStarted =
    userDetails?.details.approvalStatus === UserDetailsApprovalStatusEnum.Approved ||
    userDetails?.detailsRequested?.approvalStatus !== UserDetailsApprovalStatusEnum.Draft;

  const [setOwnerProfileSetupFlowInitiated, { loading }] =
    useSetOwnerProfileSetupFlowInitiatedMutation();

  const filledEntries = countFilledEntries(userDetails?.detailsRequested);
  const shouldContinueFillingProfile = filledEntries > PROFILE_NEW_FILLED_FIELDS;

  const handleOwnerSetupInit = async () => {
    try {
      await setOwnerProfileSetupFlowInitiated();
      userDetails &&
        setUserDetails({
          ...userDetails,
          isOwnerProfileSetupFlowInitiated: true,
        });
    } catch (err) {
      logError(err);
    }
  };

  return setupAlreadyStarted ? (
    <ProfileState />
  ) : (
    <SetupSimpleCard>
      <CardCell>
        <CardContent>
          <Heading variant="h6">Setup your profile to share an EV</Heading>
          <CardParagraph>Add your personal data and driving license</CardParagraph>
          {shouldContinueFillingProfile ? (
            <ContinueSetupProfilePopup />
          ) : (
            <Button href="/introduce-yourself" variant="outlined" withArrow>
              Share an EV
            </Button>
          )}
        </CardContent>
        <CardImageWrapper>
          <SetupProfileIcon />
        </CardImageWrapper>
      </CardCell>
      <CardDivider>
        <CardDividerText>OR</CardDividerText>
      </CardDivider>
      <CardCell>
        <CardContent>
          <Heading variant="h6">List your EV and start earning</Heading>
          <CardParagraph>Setup your profile and add EV details </CardParagraph>
          <Button isLoading={loading} onClick={handleOwnerSetupInit} variant="outlined" withArrow>
            List your EV
          </Button>
        </CardContent>
        <CardImageWrapper>
          <EvCarIcon />
        </CardImageWrapper>
      </CardCell>
    </SetupSimpleCard>
  );
};

export default UserProfileSetupStatus;
