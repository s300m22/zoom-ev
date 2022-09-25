import styled from 'styled-components';
import { StepsLineWrapper } from '../../../../elements/StepsLine/StepsLine.styled';
import { SimpleCardWrapper } from '../../../../elements/SimpleCard/SimpleCard.styled';

export const IntroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const StepsIntroWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin-left: 34px;
    max-width: 800px;
  }

  ${StepsLineWrapper} {
    margin-bottom: 20px;

    ${({ theme }) => theme.up(theme.breakpoints.md)} {
      margin-bottom: 50px;
    }
  }
`;

export const CardIntroWrapper = styled(SimpleCardWrapper)`
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: 40px;

  svg {
    margin-bottom: 30px;
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    max-width: 352px;
    padding: 50px 30px;
    margin-top: 0;
  }
`;

export const CardParagraph = styled.p`
  margin: 20px 0 0;
  color: ${({ theme }) => theme.palette.gray};
  line-height: 24px;
`;
