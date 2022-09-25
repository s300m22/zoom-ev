import styled from 'styled-components';
import { InputContainer } from '../../../elements';

export const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    flex-direction: row;
  }

  ${InputContainer} {
    max-width: 100%;
  }
`;

export const StepRow = styled.div`
  display: flex;
  width: 100%;
  position: relative;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    width: calc((100% / 2) - 16px);
  }

  &:first-of-type {
    margin-bottom: 25px;

    ${({ theme }) => theme.up(theme.breakpoints.md)} {
      margin-bottom: 0;
      margin-right: 32px;
    }
  }
  &:last-of-type {
    flex-direction: column;
  }
`;

export const StepParagraph = styled.p`
  margin: 10px 0 30px;
  color: ${({ theme }) => theme.palette.gray};
`;

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

export const Error = styled.div`
  color: ${({ theme: { palette } }) => palette.error};
  font-size: 13px;
  margin: 5px 0px 5px 5px;
  min-height: 13px;

  &:first-of-type {
    margin-top: 15px;
  }
`;

export const ErrorWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
