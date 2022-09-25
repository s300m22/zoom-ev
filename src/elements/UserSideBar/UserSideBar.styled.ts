import styled from 'styled-components';

export const UserSideBarWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 15px;
  background: #fff;
  width: 100%;
  border-right: 1px solid #f2f2f2;
  margin-top: 25px;

  > div {
    width: 100%;
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    width: 220px;
    margin-right: 20px;
    min-height: 70vh;
    margin-top: 0;
    padding: 30px 15px;
  }

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    width: 256px;
    margin-right: 30px;
    padding: 30px;
  }
`;

export const NavigationLink = styled.div`
  a {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.gray};
    padding: 15px 13px;
    display: flex;
    align-items: center;
    text-decoration: none;
    width: 100%;
    margin-bottom: 17px;
    border-radius: 12px;

    ${({ theme }) => theme.up(theme.breakpoints.md)} {
      padding: 23px 20px;
    }

    svg {
      margin-right: 20px;
    }

    &:last-of-type {
      margin-bottom: 0;
    }

    &:hover {
      color: ${({ theme }) => theme.palette.hover};
    }
  }

  &.active {
    a {
      color: ${({ theme }) => theme.palette.secondary};
      background: linear-gradient(67.36deg, #54efd0 3.11%, #00bff3 100.02%);

      svg {
        filter: brightness(0) invert(1);
      }

      &:hover {
        color: ${({ theme }) => theme.palette.secondary};
      }
    }
  }
`;

export const LogoutWrapper = styled.div`
  align-self: flex-start;
  a {
    cursor: pointer;
  }
`;

export const SubNav = styled.div`
  display: flex;
  flex-direction: column;
  padding: 17px 0 0;
  width: 100%;
  overflow: hidden;
  transition: max-height 0.25s ease-in;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    padding: 33px 0 0;
  }
`;

export const SubNavTitle = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.palette.dark};
  padding: 0 20px;
  margin: 0 0 17px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
`;

export const BusinessAvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 30px;
`;

export const NavSectionTitle = styled.div`
  font-size: 12px;
  padding: 17px 20px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.palette.dark};
  font-weight: 700;
`;

export const MenuBlock = styled.div`
  padding-bottom: 20px;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    padding-bottom: 33px;
  }
`;
