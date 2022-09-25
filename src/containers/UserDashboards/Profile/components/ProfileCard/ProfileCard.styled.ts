import styled from 'styled-components';
import AvatarWrapper from '../../../../../elements/Avatar/Avatar.styled';
import { SimpleCardWrapper } from '../../../../../elements/SimpleCard/SimpleCard.styled';
import { UserRatingsWrapper } from '../../../../../elements/UserRatings/UserRatings.styled';

export const SettingsCardWrapper = styled(SimpleCardWrapper)`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;

  ${AvatarWrapper} {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
`;

interface ProfileCardCellProps {
  isBusiness?: boolean;
}

export const ProfileCardCell = styled.div<ProfileCardCellProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  :last-of-type {
    margin-top: 30px;
  }

  :first-of-type {
    flex-wrap: wrap;
    flex-direction: column;
  }

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    width: 50%;
    justify-content: ${({ isBusiness }) => (isBusiness ? 'flex-end' : 'space-between')};

    :last-of-type {
      margin-top: 0;
    }

    :first-of-type {
      flex-wrap: nowrap;
      flex-direction: row;
    }
  }
`;

export const UserDetailsWrapper = styled.div`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;

  > div {
    margin: 0;
    width: 100%;
    text-align: center;

    ${({ theme }) => theme.up(theme.breakpoints.lg)} {
      text-align: left;
    }

    &:last-of-type {
      margin-top: 30px;
    }

    ${UserRatingsWrapper} {
      margin-left: 0;
    }
  }

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    justify-content: space-between;
    flex-wrap: nowrap;
    width: 75%;
    margin-left: 10px;
    margin-top: 0;

    > div {
      width: 50%;
      margin: 0 20px;

      &:last-of-type {
        margin-top: 0;
      }
    }
  }
`;

export const NavigationButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  padding: 0 15px;
  width: calc(100% / 3);
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.dark};
  cursor: pointer;
  position: relative;

  svg {
    margin-bottom: 10px;
    width: 37px;
    height: 37px;
    padding: 10px;
    border-radius: 50%;
    box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.1);
    transition: 0.3s all;

    &:hover {
      box-shadow: 0px 20px 34px rgba(23, 75, 83, 0.2);
    }
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    &:after {
      content: '';
      position: absolute;
      width: 1px;
      top: 0;
      bottom: 25px;
      background: #f2f2f2;
      right: 0;
    }

    :last-of-type {
      &:after {
        content: none;
      }
    }
  }
`;
