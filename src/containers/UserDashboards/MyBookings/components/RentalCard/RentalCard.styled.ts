import styled from 'styled-components';
import { SimpleCardWrapper } from '../../../../../elements/SimpleCard/SimpleCard.styled';

export const RentalCardWrapper = styled(SimpleCardWrapper)`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  cursor: pointer;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-direction: row;
  }
`;

export const RentalCardAvatarWrapper = styled.div`
  margin: 0 auto;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    margin: 0;
  }
`;

export const RentalCardFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 25px;
  cursor: auto;

  button {
    &:nth-of-type(2) {
      margin-left: 10px;
    }
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    justify-content: flex-end;
    margin-top: 10px;
  }
`;

export const RentalCardBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    padding-left: 20px;
    width: calc(100% - 100px);
  }
`;

export const RentalCarHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 25px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    margin-top: 0;
    flex-direction: row;
    justify-content: space-between;
  }

  ${SimpleCardWrapper} {
    margin-top: 15px;

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      margin-top: 0;
      align-self: flex-start;
    }
  }
`;

export const RentalCarDescription = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  text-align: center;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-direction: row;
    text-align: left;
  }
`;

export const RentalCarCell = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 15px 0 5px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    width: 25%;
    padding-right: 15px;
  }
`;
