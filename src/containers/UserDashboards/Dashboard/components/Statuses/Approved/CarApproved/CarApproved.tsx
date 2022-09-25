import { Heading, StatusLabel, StatusEnum } from '../../../../../../../elements';
import {
  StatusesActionsWrapper,
  StatusesCardWrapper,
  StatusesTextWrapper,
  StatusesParagraph,
} from '../../StatusesShared';

export const CarApproved = () => (
  <StatusesCardWrapper>
    <StatusesTextWrapper>
      <Heading variant="h4">EV setup approved</Heading>
      <StatusesParagraph>
        Great! Your application was approved by the Zoom EV team
      </StatusesParagraph>
    </StatusesTextWrapper>
    <StatusesActionsWrapper>
      <StatusLabel status={StatusEnum.Approved}>Approved</StatusLabel>
    </StatusesActionsWrapper>
  </StatusesCardWrapper>
);

export default CarApproved;
