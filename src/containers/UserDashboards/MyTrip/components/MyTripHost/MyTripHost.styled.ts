import styled from 'styled-components';
import { UserRatingsWrapper } from '../../../../../elements/UserRatings/UserRatings.styled';

export const MyTripHostWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-wrap: nowrap;
  }
`;

export const MyTripHostAvatar = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    margin: 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    overflow: hidden;
  }
`;

export const MyTripHostDescription = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    justify-content: center;
    align-items: flex-start;
    width: calc(100% - 100px);
    padding-left: 20px;
  }

  ${UserRatingsWrapper} {
    margin-left: 0;
  }
`;

export const CallButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    padding-left: 20px;
    justify-content: center;
    align-items: flex-end;
    width: calc(100% - 100px);
  }
`;
