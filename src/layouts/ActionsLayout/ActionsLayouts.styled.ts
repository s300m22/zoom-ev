import styled from 'styled-components';
import { LinkWrapper } from '../../elements/StyledLink/StyledLink.styled';
import { Container } from '../../elements';
import { StepsLineWrapper } from '../../elements/StepsLine/StepsLine.styled';

interface WrapperProps {
  withFooter: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  min-width: 100%;
  min-height: 100vh;
  position: relative;
  background: ${({ theme }) => theme.palette.lightBackground};
  text-align: center;
  padding-bottom: ${({ withFooter }) => (withFooter ? '130px' : '30px')};
`;

export const PageLead = styled(Container)`
  margin: 15px auto;
  padding: 0 15px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    margin: 50px auto;
  }

  p {
    font-size: 16px;
    color: ${({ theme }) => theme.palette.gray};
    margin: 20px 0 0;
  }

  ${StepsLineWrapper} {
    ${({ theme }) => theme.up(theme.breakpoints.md)} {
      width: 116%;
      margin-left: -8%;
    }
  }
`;

interface ContentWrapperProps {
  width?: string;
}

export const ContentWrapper = styled.main<ContentWrapperProps>`
  width: 100%;
  margin: 0 auto;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    width: ${({ width }) => (width ? '100%' : '570px')};
  }

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    width: ${({ width }) => width};
  }
`;

export const TopBar = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 15px 10px;
  width: 100%;
  position: relative;
  height: 90px;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    padding: 30px 15px;
  }

  ${LinkWrapper} {
    p {
      display: flex;
      align-items: center;
      font-size: 14px;

      svg {
        margin-right: 5px;
      }
    }
  }
`;

export const PageFooter = styled.div`
  width: 100%;
  background: #fff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #ececec;
  box-shadow: ${({ theme }) => theme.palette.boxShadow};
`;

export const BackButtonWrapper = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  display: none;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    display: block;
  }
`;

export const LogoWrapper = styled.div`
  position: absolute;
  top: 30px;
  left: 50%;
  display: block !important;
  transform: translateX(-50%);
`;
