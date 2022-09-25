import styled from 'styled-components';
import { SimpleCardWrapper } from '../../../../../../../elements/SimpleCard/SimpleCard.styled';

export const SetupSimpleCard = styled.div`
  flex-wrap: wrap;
  display: flex;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    padding: 0;
  }
`;

export const CardCell = styled(SimpleCardWrapper)`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  text-align: center;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    max-width: 456px;
    flex-direction: row;
    justify-content: space-between;
  }

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    flex-wrap: nowrap;
    text-align: left;
  }
`;

export const CardDivider = styled.div`
  width: 100%;
  position: relative;
  text-align: center;
  margin: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin: 0 20px;
    width: auto;
  }
`;

export const CardDividerText = styled.span`
  position: relative;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.primary};
`;

export const CardContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  button {
    width: 178px;
    margin: 0 auto;
  }

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    width: 84%;
    justify-content: flex-start;
    text-align: left;

    button {
      margin: 0;
    }

    h6 {
      line-height: 21px;
      font-weight: 500;
    }
  }
`;

export const CardImageWrapper = styled.div`
  width: 100%;
  margin-top: 20px;

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    width: 16%;
    margin-top: 0;
    margin-left: 20px;
  }

  svg {
    max-width: 61px;
  }
`;

export const CardParagraph = styled.p`
  color: ${({ theme }) => theme.palette.gray};
  margin: 20px 0;
  font-size: 14px;
  line-height: 21px;

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    margin: 10px 0 23px;
  }
`;
