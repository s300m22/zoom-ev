import styled from 'styled-components';
import { SimpleCardWrapper } from '../SimpleCard/SimpleCard.styled';

export const EventsLogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

export const EventRow = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 30px;
`;

export const EventRowText = styled.div`
  margin: 0;
  font-size: 14px;
  color: #1d2438;
  margin-left: 20px;
`;

export const EventRowImage = styled.div`
  border-radius: 50%;
`;

export const EventsCard = styled(SimpleCardWrapper)`
  padding: 0;
`;

export const NoEvents = styled(SimpleCardWrapper)`
  background: rgba(255, 255, 255, 0.5);
  color: ${({ theme }) => theme.palette.gray};
`;

export const EventLogTitle = styled.p`
  color: ${({ theme }) => theme.palette.dark};
  margin: 0 0 20px 0;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
`;
