import { CSSProperties } from 'react';
import { Heading, StatusLabel, StatusEnum } from '../../../../../../../elements';
import {
  StatusesActionsWrapper,
  StatusesCardWrapper,
  StatusesTextWrapper,
  StatusesParagraph,
} from '../../StatusesShared';

interface ProfilePendingProps {
  customStyles?: CSSProperties;
}

export const ProfilePending = ({ customStyles }: ProfilePendingProps) => (
  <StatusesCardWrapper style={customStyles}>
    <StatusesTextWrapper>
      <Heading variant="h4">Thanks for submitting your profile!</Heading>
      <StatusesParagraph>
        We&apos;ll review it within 24 hours or normally even faster. Your profile needs to be
        approved before you can book or share an EV.
      </StatusesParagraph>
    </StatusesTextWrapper>
    <StatusesActionsWrapper>
      <StatusLabel status={StatusEnum.Pending}>Pending approval</StatusLabel>
    </StatusesActionsWrapper>
  </StatusesCardWrapper>
);

export default ProfilePending;
