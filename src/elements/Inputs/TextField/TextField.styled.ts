import styled from 'styled-components';
import { InputHTMLAttributes } from 'react';

interface LabelProps {
  required?: boolean;
  isError?: boolean;
}

export const Label = styled.label<LabelProps>`
  font-size: 16px;
  line-height: 150%;
  color: ${({ isError, theme: { palette } }) => (isError ? palette.error : palette.primary)};
  margin-bottom: 10px;

  ${({ required, theme: { palette } }) =>
    required &&
    `
      :after {
        content: '*';
        color: ${palette.error};
      }
  `}
`;

export const ShowCurrency = styled.div`
  position: absolute;
  left: 8px;
  padding: 10px 14px;
  font-weight: 500;
  color: ${({ theme: { palette } }) => palette.dark};
  border-right: 1px solid #ececec;
  display: flex;
  align-items: center;
  height: 52px;
  top: 36px;
`;
interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  maxWidth?: string;
  isError?: boolean;
}

export const StyledInput = styled.input<StyledInputProps>`
  padding: 16px;
  background: ${({ theme: { palette } }) => palette.secondary};
  color: ${({ theme: { palette } }) => palette.primary};
  border: 1px solid ${({ isError, theme: { palette } }) => (isError ? palette.error : '#ececec')};
  box-sizing: border-box;
  border-radius: 12px;
  outline: none;
  max-width: ${({ maxWidth }) => maxWidth};

  -webkit-appearance: none;
  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    box-shadow: 0 0 0 30px white inset !important;
  }

  :read-only {
    background: #f2f2f2;
    cursor: not-allowed;

    + ${ShowCurrency} {
      cursor: not-allowed;
    }
  }
`;

export const Error = styled.div`
  color: ${({ theme: { palette } }) => palette.error};
  font-size: 13px;
  margin: 5px 0px 5px 5px;
  min-height: 13px;
`;

interface ShowPasswordProps {
  isReadOnly: boolean;
}

export const ShowPassword = styled.div<ShowPasswordProps>`
  position: absolute;
  cursor: pointer;
  right: 8px;
  top: 40px;
  padding: 10px;
  pointer-events: ${({ isReadOnly }) => (isReadOnly ? 'none' : 'auto')};

  svg {
    pointer-events: none;
    width: 20px;
    height: 20px;
  }
`;

interface SuggestedPriceProps {
  isReadOnly: boolean;
}

export const SuggestedPrice = styled.p<SuggestedPriceProps>`
  color: ${({ theme: { palette } }) => palette.grayMiddle};
  font-size: 14px;
  margin-top: 10px !important;
  font-weight: 500;
  display: flex;
  pointer-events: ${({ isReadOnly }) => (isReadOnly ? 'none' : 'auto')};
`;
