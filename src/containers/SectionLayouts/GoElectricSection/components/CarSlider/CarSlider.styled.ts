import styled from 'styled-components';

export const CarSliderWrapper = styled.div`
  display: flex;
  flex-direction: column;

  &:first-of-type {
    margin-bottom: 50px;

    ${({ theme }) => theme.up(theme.breakpoints.md)} {
      margin-bottom: 130px;
    }
  }

  h2 {
    margin: 0 auto 50px;

    ${({ theme }) => theme.up(theme.breakpoints.md)} {
      margin: 0 auto 90px;
    }
  }

  .slick-slide {
    margin-right: 32px;
    opacity: 0.2;

    &.slick-active {
      opacity: 1;
    }
  }

  .slick-track {
    display: flex;
  }

  .slick-list {
    overflow: visible;

    &:after {
      content: '';
      position: absolute;
      top: -35px;
      bottom: -35px;
      left: -100vw;
      width: 100vw;
      background: #eef3f6;
    }
  }
`;

export const NextArrowWrapper = styled.div`
  position: absolute;
  right: 15px;
  top: 75px;
  display: none;
  cursor: pointer;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    right: -85px;
    display: block;
  }
`;
