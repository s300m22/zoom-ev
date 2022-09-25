import styled from 'styled-components';

export const UserMenuWrapper = styled.div`
  width: 171px;
  margin-top: 40px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    margin-top: 0;
  }
`;
interface UserMenuContentProps {
  showSubMenu: boolean;
}

export const UserMenuInnerWrapper = styled.div`
  position: relative;
`;

export const UserMenuContent = styled.div<UserMenuContentProps>`
  display: flex;
  align-items: center;
  padding: 5px;
  background: #fff;
  box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.1);
  border-radius: 72px;
  width: 171px;
  cursor: pointer;
  position: relative;

  ~ svg {
    position: absolute;
    right: 15px;
    top: 48%;
    transform: rotate(-90deg);

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      right: 25px;
      transition: 0.3s all;
      transform: translateX(50%) ${({ showSubMenu }) => (showSubMenu ? 'rotate(-90deg)' : '')};
    }
  }
`;

export const FirstNameContainer = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 500;
  max-width: 80px;
  margin-left: 5px;
`;

export const UserSubMenu = styled.div`
  padding-top: 10px;
  position: absolute;
  position: absolute;
  top: 50px;
  right: 0;
  z-index: 2;
`;

export const UserSubMenuInner = styled.div`
  border-radius: 12px;
  margin-top: 10px;
  padding: 10px;
  background: #fff;
  box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.1);
  width: 171px;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;

  > * {
    height: 50px;
    display: flex;
    align-items: center;
  }
`;

export const LogoutButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;

  button {
    color: ${({ theme }) => theme.palette.gray};
  }
`;
