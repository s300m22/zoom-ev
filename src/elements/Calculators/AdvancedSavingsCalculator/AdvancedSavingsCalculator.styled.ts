import styled, { css } from 'styled-components';
import Container from '../../Container';
import Divider from '../../Divider';
import { StyledInput } from '../../Inputs/TextField/TextField.styled';

interface InlineLabelProps {
  noMargin?: boolean;
}

const smallGrayText = () => css`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.gray};
`;

export const Wrapper = styled(Container)(
  ({ theme: { up, breakpoints } }) => `
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #eef3f6;
    position: relative;
    padding: 65px 0;

    &:after {
      content: '';
      position: absolute;
      background: #eef3f6;
      z-index: -1;
      width: 150vw;
      height: 100%;
      left: -50vw;
      top: 0;
    }

    ${Divider} {
      margin: 65px 0 35px;
    }   

    ${up(breakpoints.md)} {
      padding: 75px 0 125px;
    }
    
    ${up(breakpoints.lg)} {
      padding: 130px 0 215px;
    }
  `,
);

export const CalculatorWrapper = styled.div(
  ({ theme: { up, breakpoints, palette } }) => `
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  background: #ffffff;
  box-shadow: ${palette.boxShadow};
  border-radius: 12px;
  margin-top: 5%;

  ${up(breakpoints.md)} {
    width: 736px;
  }
`,
);

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 30px 30px 0 30px;
`;

export const SummaryParagraph = styled.p`
  font-weight: 500;
  line-height: 150%;
  ${smallGrayText}
  font-weight: 600;
`;

export const Summary = styled.div`
  align-items: center;
  justify-content: space-between;
  background: rgba(240, 244, 247, 0.6);
  border: 1px solid ${({ theme }) => theme.palette.lightText};
  box-sizing: border-box;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  width: 100%;
  padding: 30px;
`;

export const SummaryPrice = styled.p`
  font-weight: bold;
  font-size: 60px;
  line-height: 120%;
  margin-block-start: 0;
  margin-block-end: 0;
`;

export const SummaryPartial = styled.p`
  font-size: 18px;
  padding-left: 20px;
  min-width: 90px;
  margin: 7px 0 7px 20px;
  text-align: right;
  /* width: 100px; */
`;
export const RadioInputsWrapper = styled.div`
  width: 100%;
  display: flex;
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 18px;
  line-height: 150%;
  color: ${({ theme }) => theme.palette.primary};
`;

export const AdditionalLabel = styled.span`
  font-weight: 500;
  white-space: nowrap;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.gray};
  margin-bottom: 13px;
`;

export const RadioLabel = styled(Label)`
  margin-bottom: 20px;
`;

export const InlineLabel = styled(Label)<InlineLabelProps>(
  ({ theme: { breakpoints, up }, noMargin }) => `
  margin-top: ${noMargin ? 0 : '5%'};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  ${up(breakpoints.md)} {
    flex-wrap: nowrap;

    > div {
      width: auto;
      justify-content: space-between;
      align-items: center;
    }
  }

  ${StyledInput} {
    width: 85px;
    margin-right: 15px;
  }

  + ${Divider} {
    margin: 25px 0;
  }
`,
);
export const SummarySplit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 10px 30px 30px 30px;
`;

export const EntrySummary = styled.div`
  display: flex;
  align-items: center;
  ${smallGrayText}
  font-weight: 500;
  text-align: right;

  ${SummaryPartial} {
    color: ${({ theme }) => theme.palette.primary};
  }
`;

export const CustomCheckboxWrapper = styled.div`
  ${SummaryPartial} {
    min-width: 30px;
  }
`;

export const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 15px;
    height: 15px;
    margin-left: 15px;
    cursor: pointer;
  }
`;
