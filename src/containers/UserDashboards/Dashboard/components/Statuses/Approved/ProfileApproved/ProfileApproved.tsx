import { Heading, StatusLabel, StatusEnum } from '../../../../../../../elements';
import {
  StatusesActionsWrapper,
  StatusesCardWrapper,
  StatusesTextWrapper,
  StatusesParagraph,
} from '../../StatusesShared';

export const ProfileApproved = () => (
  <StatusesCardWrapper>
    <StatusesTextWrapper>
      <Heading variant="h4">Profile approved</Heading>
      <StatusesParagraph>
        Great! Your profile application was approved by the Zoom EV team.
      </StatusesParagraph>
    </StatusesTextWrapper>
    <StatusesActionsWrapper>
      <StatusLabel status={StatusEnum.Approved}>Approved</StatusLabel>
    </StatusesActionsWrapper>
  </StatusesCardWrapper>
);

export default ProfileApproved;
