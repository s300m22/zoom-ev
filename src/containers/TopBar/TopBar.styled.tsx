import styled from 'styled-components';
import { Container } from '../../elements';
import { LinkWrapper } from '../../elements/StyledLink/StyledLink.styled';

interface WrapperProps {
  isWide: boolean;
}

export const Wrapper = styled.nav<WrapperProps>(
  ({ theme: { up, breakpoints }, isWide }) => `
    display: flex;
    align-items: center;
    width: 100%;
    height: 100px;
  
    ${up(breakpoints.sm)} {
      height: auto;
      border-bottom: 1px solid #f2f2f2;
    }
  
    ${up(breakpoints.md)} {
      height: 100px;
    }
  
    + main {
      padding: 0 15px;

      ${up(breakpoints.md)} {
        padding: ${isWide ? '0 15px 0 0' : '0 15px'};
      }

      ${up(isWide ? breakpoints.lgWide : breakpoints.lg)} {
        padding: 0;
      }

    }
  `,
);

interface NavContainerProps {
  isWide: boolean;
}

export const NavContainer = styled(Container)<NavContainerProps>(
  ({ theme: { up, breakpoints, pageWidthWide }, isWide }) => `
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    transition: 0.6s all;
    position: relative;
    ${isWide ? `max-width: ${pageWidthWide};` : ''}
    ${up(breakpoints.sm)} {
      flex-wrap: wrap;
    }

    ${up(breakpoints.md)} {
      padding: ${isWide ? '0 15px 0 50px' : '0 15px'};
      flex-wrap: nowrap;
    }

    ${
      !isWide
        ? `
      ${up(breakpoints.lg)} {
        padding: 0;
      }
      `
        : `
        ${up(breakpoints.lgWide)} {
          padding: 0 0 0 50px;
        }
      `
    }
  `,
);

export const MenuHambuger = styled.div`
  position: absolute;
  right: 9px;
  top: 50%;
  transform: translateY(-50%);
  padding: 15px;
  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    display: none;
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 137px;
  height: 100%;
  margin: 0 auto;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    margin: 25px auto 0;
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin: 0 20px 0 0;
  }

  a {
    display: flex;
  }
`;

interface NavWrapperProps {
  isOpen: boolean;
}

export const NavWrapper = styled.div<NavWrapperProps>(
  ({ theme: { up, breakpoints }, isOpen }) => `
    position: fixed;
    top: 65px;
    transform: ${isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100vw, 0, 0)'};
    bottom: 0;
    left: 0;
    right: 0;
    height: calc(100vh - 65px);
    background: #fff;
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
    z-index: 998;
    transition: 0.6s transform;
    padding: 16px 24px;
    border-bottom: 1px solid #ececec;
  
    ${LinkWrapper} {
      white-space: nowrap;
      border-bottom: 1px solid #ececec;
      width: 100%;
      a {
        font-size: 16px;
        padding: 24px 0;
        width: 100%;
        display: flex;
      }
    }

    ${up(breakpoints.sm)} {
      position: static;
      transform: none;
      flex-direction: row;
      justify-content: space-around;
      width: 100%;
      transition: none;
      height: 100px;
      padding: 0;

      ${LinkWrapper} {
        width: auto;
        border-bottom: none;

        a {
          font-size: 14px;
        }
      }
    }

    ${up(breakpoints.md)} {
      width: 85%;
      transition: none;
      justify-content: flex-end;

      ${LinkWrapper} {
        margin-right: 6%;
      }
    }
  `,
);
