import styled from 'styled-components';
import { CheckboxLabel } from '../../Inputs/Checkbox/Checkbox.styled';
import { Label } from '../../Inputs/TextField/TextField.styled';

export const CompleteBookingPopupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  text-align: center;
  align-items: center;
  width: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    width: 600px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  justify-content: space-between;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-wrap: nowrap;
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin-top: 80px;
  }

  button {
    width: 100%;
    margin-bottom: 15px;

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      margin-bottom: 0;
      width: auto;

      &:first-of-type {
        margin-right: 20px;
      }
    }
  }
`;

export const Form = styled.form`
  width: 100%;
  text-align: left;

  ${CheckboxLabel} {
    font-weight: 500;
    font-size: 14px;
  }

  ${Label} {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }

  + ${ButtonsWrapper} {
    margin-top: 40px;
  }
`;
