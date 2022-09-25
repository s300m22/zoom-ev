import styled from 'styled-components';
import { SimpleCardWrapper } from '../../../../../elements/SimpleCard/SimpleCard.styled';
import { StatusLabelWrapper } from '../../../../../elements/StatusLabel/StatusLabel.styled';

export const RentalCardWrapper = styled(SimpleCardWrapper)`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  cursor: pointer;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    flex-direction: row;
  }
`;

export const RentalCardAvatarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  margin: 0 auto;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin: 0;
    width: 200px;
    height: 155px;
  }
`;

export const MyTripsPartnerLogo = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 6px;
  background: #fff;
  width: 70px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 6px;
    padding: 5px 10px;
    object-fit: contain;
    width: 100%;
    height: 100%;
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

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    padding-left: 20px;
    width: calc(100% - 200px);
  }
`;

export const RentalCarHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 25px;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin-top: 0;
    flex-direction: row;
    justify-content: space-between;
  }

  ${SimpleCardWrapper} {
    margin-top: 15px;

    ${({ theme }) => theme.up(theme.breakpoints.md)} {
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

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    flex-direction: row;
    text-align: left;
    width: 85%;
  }
`;

export const RentalCarCell = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 15px 0 5px;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    width: 25%;
    padding-right: 15px;
  }
`;

export const RentalStatusWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 15px;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin-top: 0;
  }

  ${StatusLabelWrapper} {
    margin-top: 0;
  }
`;

export const ActionNeeded = styled.span`
  color: ${({ theme }) => theme.palette.red};
  font-weight: 500;
  margin-right: 10px;
  font-size: 14px;
`;
