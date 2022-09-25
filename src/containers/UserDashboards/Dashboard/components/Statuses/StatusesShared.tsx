import styled from 'styled-components';
import { SimpleCardWrapper } from '../../../../../elements/SimpleCard/SimpleCard.styled';

export const StatusesCardWrapper = styled(SimpleCardWrapper)`
  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const StatusesTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    width: 57%;
    text-align: left;
  }

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    width: 73%;
  }
`;

export const StatusesActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 30px;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    width: 40%;
    margin-top: 0;
    align-items: flex-end;
  }

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    width: 25%;
  }
`;

export const StatusesButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    flex-wrap: nowrap;
    justify-content: space-between;

    button:nth-child(even) {
      margin-left: 22px;
    }
  }
`;

export const StatusesParagraph = styled.p`
  color: ${({ theme }) => theme.palette.gray};
  margin: 10px 0 0;
`;
