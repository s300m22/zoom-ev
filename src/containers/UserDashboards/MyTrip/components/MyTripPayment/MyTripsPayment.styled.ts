import styled from 'styled-components';
import { CreditCardWrapper } from '../../../../../elements/CreditCard/CreditCard.styled';

export const FinalizePaymentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: right;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 15px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-wrap: nowrap;
    margin-left: 15px;
    flex-direction: row;
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin-top: 0;
    width: auto;
    justify-content: flex-end;
  }

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    flex-wrap: nowrap;
  }

  button {
    min-width: 200px;
    margin-top: 15px;

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      margin-top: 0;
    }
  }
`;

export const ActionNeeded = styled.span`
  color: ${({ theme }) => theme.palette.red};
  font-weight: 500;
  margin-right: 10px;
  font-size: 14px;
`;

export const CreditCardContainer = styled.div`
  font-weight: 500;

  ${CreditCardWrapper} {
    justify-content: center;
  }
`;
