import styled from 'styled-components';
import { StatusesCardWrapper } from '../../Dashboard/components/Statuses/StatusesShared';

export const PayoutStatusesCardWrapper = styled(StatusesCardWrapper)`
  align-items: flex-start;
`;

export const StripeSecuredWrapper = styled.div`
  display: block;
  margin-top: 30px;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  color: ${({ theme }) => theme.palette.gray};
`;
