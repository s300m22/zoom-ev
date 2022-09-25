import { Heading, StatusLabel, StatusEnum } from '../../../../../../../elements';
import {
  StatusesActionsWrapper,
  StatusesCardWrapper,
  StatusesTextWrapper,
  StatusesParagraph,
} from '../../StatusesShared';

export const StripeApproved = () => (
  <StatusesCardWrapper>
    <StatusesTextWrapper>
      <Heading variant="h4">Stripe account successfully created</Heading>
      <StatusesParagraph>Great! Your Stripe account is all set.</StatusesParagraph>
    </StatusesTextWrapper>
    <StatusesActionsWrapper>
      <StatusLabel status={StatusEnum.Approved}>Approved</StatusLabel>
    </StatusesActionsWrapper>
  </StatusesCardWrapper>
);

export default StripeApproved;
