import styled from 'styled-components';
import { InputContainer } from '../Inputs';

export const PricingForm = styled.form``;

export const EarningsCell = styled.div`
  background: #f2f2f2;
  border: 1px solid #ececec;
  box-sizing: border-box;
  border-radius: 16px;
  padding: 16px;
  text-align: center;
  color: ${({ theme }) => theme.palette.grayMiddle};
  min-height: 50px;
  margin-bottom: 15px;

  :last-of-type {
    margin-bottom: 0;
  }

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    margin-bottom: 0;
  }
`;

export const TripleInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-wrap: nowrap;
  }

  ${InputContainer}, ${EarningsCell} {
    width: 100%;

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      width: 28.5%;
    }
  }
`;

export const EarningsSummary = styled.div`
  display: block;
  margin-top: 20px;

  ${TripleInputWrapper} {
    margin-top: 10px;
  }
`;
