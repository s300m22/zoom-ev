import styled from 'styled-components';
import { SelectList, StyledSelect } from '../Select/Select.styled';
import { StyledInput } from '../TextField/TextField.styled';
import InputContainer from '../InputContainer';

interface LabelProps {
  required?: boolean;
  isError?: boolean;
}

export const Label = styled.label<LabelProps>`
  font-size: 16px;
  line-height: 150%;
  margin-bottom: 10px;
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

export const FieldsWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: start;
  align-items: flex-start;
  width: 100%;

  ${StyledInput} {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    height: 56px;
    width: 100%;
  }

  ${StyledSelect} {
    background: ${({ theme }) => theme.palette.lightText};
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    color: ${({ theme }) => theme.palette.gray};
    border: 1px solid #ececec;
    min-width: 0;
  }
`;

export const SelectWrapper = styled.div`
  ${InputContainer} {
    width: 85px !important;
    margin-bottom: 0;
    margin-right: 0 !important;
  }
  ${SelectList} {
    min-width: 290px;
    width: 100%;
    overflow-x: hidden;
  }
`;

export const InputWrapper = styled.div(
  ({ theme: { up, breakpoints } }) => `
  width: 100%;
  ${InputContainer} {
    width: 100%;
    margin-bottom: 0;
    margin-right: 0;
    ${up(breakpoints.md)} {
       max-width: 267px;
    }
  }
`,
);
