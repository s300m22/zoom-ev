import styled from 'styled-components';
import { UserRatingsWrapper } from '../../../../../elements/UserRatings/UserRatings.styled';

export const MyBookingGuestWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-wrap: nowrap;
  }
`;

export const MyBookingGuestAvatar = styled.div`
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

export const MyBookingGuestDescription = styled.div`
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
