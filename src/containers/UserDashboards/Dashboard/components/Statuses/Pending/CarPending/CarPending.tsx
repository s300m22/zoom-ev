import { Heading, StatusLabel, StatusEnum } from '../../../../../../../elements';
import {
  StatusesActionsWrapper,
  StatusesCardWrapper,
  StatusesTextWrapper,
  StatusesParagraph,
} from '../../StatusesShared';

export const CarPending = () => (
  <StatusesCardWrapper>
    <StatusesTextWrapper>
      <Heading variant="h4">Thanks for listing your EV!</Heading>
      <StatusesParagraph>
        We&apos;ll review it within 24 hours or normally even faster.
      </StatusesParagraph>
    </StatusesTextWrapper>
    <StatusesActionsWrapper>
      <StatusLabel status={StatusEnum.Pending}>Pending approval</StatusLabel>
    </StatusesActionsWrapper>
  </StatusesCardWrapper>
);

export default CarPending;
