import styled from 'styled-components';
import { SimpleCardWrapper } from '../../../../../../elements/SimpleCard/SimpleCard.styled';

export const PaymentCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  margin-top: 30px;
  width: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    grid-template-columns: repeat(3, 1fr);
    margin-top: 50px;
  }
`;
export const PaymentCard = styled(SimpleCardWrapper)`
  flex-direction: column;
  width: 100%;
  text-align: center;
  align-items: center;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    text-align: left;
    align-items: flex-start;
  }

  h6 {
    margin: 30px 0 10px;
    line-height: 21px;
  }
`;
