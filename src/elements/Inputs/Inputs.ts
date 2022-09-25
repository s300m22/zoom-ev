import styled from 'styled-components';
import InputContainer from './InputContainer';

export const DoubleInputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;

  > div {
    width: 100%;

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      width: 47%;
    }
  }
`;

interface LabelProps {
  required?: boolean;
  isError?: boolean;
}

export const Label = styled.label<LabelProps>`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  width: 100%;
  color: ${({ isError, theme: { palette } }) => (isError ? palette.error : palette.primary)};

  ${({ required, theme: { palette } }) =>
    required &&
    `
      :after {
        content: '*';
        color: ${palette.error};
      }
  `}
`;

export const Error = styled.div`
  color: ${({ theme: { palette } }) => palette.error};
  font-size: 13px;
  margin: 5px 0px 5px 5px;
  min-height: 13px;
`;

export const TripleInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-wrap: nowrap;
  }

  ${InputContainer} {
    width: 100%;

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      width: 28.5%;
    }
  }
`;
interface StyledDivInputWrappertProps {
  isError?: boolean;
}

export const StyledDivInputWrapper = styled.div<StyledDivInputWrappertProps>`
  padding: 16px;
  background: ${({ theme: { palette } }) => palette.secondary};
  color: ${({ theme: { palette } }) => palette.primary};
  border: 1px solid ${({ isError, theme: { palette } }) => (isError ? palette.error : '#ececec')};
  box-sizing: border-box;
  border-radius: 12px;
  outline: none;
  -webkit-appearance: none;
`;

export const ExpirySecurityWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  > div {
    max-width: 100%;
    width: 100%;

    ${({ theme }) => theme.up(theme.breakpoints.md)} {
      max-width: 48%;
    }

    ${({ theme }) => theme.up(theme.breakpoints.lg)} {
      max-width: 227px;
    }
  }
`;
