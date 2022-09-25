import styled from 'styled-components';
import { Container } from '../../../elements';
import { FullWidthWrapper } from '../../../elements/Banner/Banner.styled';

interface CallToActionSectionWrapperProps {
  background: string;
  padding: string;
}

export const CallToActionSectionWrapper = styled.div<CallToActionSectionWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: ${({ background }) => background};
  position: relative;
  padding: 5vmax 15px 5vmax;

  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 150vw;
    height: 100%;
    left: -50vw;
    top: 0;
    background: ${({ background }) => background};

    ${({ theme }) => theme.up(theme.breakpoints.md)} {
      content: none;
    }
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    padding: ${({ padding }) => padding};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    text-align: center;
    margin: 0;
  }

  ${FullWidthWrapper} {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
      text-align: left;
      margin: 10px 0;
    }
  }

  b {
    position: relative;
    color: #fff;
    z-index: 1;
    margin: 0 26px;
    white-space: nowrap;

    &:before {
      content: '';
      position: absolute;
      left: -23px;
      top: -3px;
      width: calc(100% + 46px);
      height: calc(100% + 6px);
      background: #000;
      z-index: -1;
    }
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 30px;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    flex-wrap: nowrap;
    margin-top: 50px;
  }

  button {
    margin-top: 30px;
    width: 100%;

    &:last-of-type {
      margin-right: 0;
    }

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      margin-right: 20px;
      width: auto;
    }

    ${({ theme }) => theme.up(theme.breakpoints.md)} {
      margin-top: 0;
    }
  }
`;

interface CallToActionContainerProps {
  width: string;
}

export const CallToActionContainer = styled(Container)<CallToActionContainerProps>`
  width: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    width: ${({ width }) => width};
  }
`;
