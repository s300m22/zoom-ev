import styled from 'styled-components';
import { Container } from '../../../elements';
import { CarSliderWrapper } from './components/CarSlider/CarSlider.styled';

export const GoElectricSectionOuterwrapper = styled.div`
  max-width: ${({ theme }) => theme.pageWidthWide};
  margin: 0 auto;
  background: #eef3f6;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 150vw;
    height: 100%;
    left: -50vw;
    top: 0;
    background: #eef3f6;
  }

  ${CarSliderWrapper} {
    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;

export const GoElectricSectionWrapper = styled(Container)`
  background: #eef3f6;
  padding: 50px 0;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    padding: 95px 0 130px 0;
  }
`;

interface SearchWrapperProps {
  background: string;
}

export const SearchWrapper = styled.div<SearchWrapperProps>`
  padding: 25px 15px;
  background: url(${({ background }) => background});
  background-size: cover;
  background-repeat: no-repeat;
  color: ${({ theme }) => theme.palette.secondary};
  text-align: center;
  margin: 0 -15px;

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    margin: 0;
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    padding: 227px 160px 50px;

    h1 {
      white-space: nowrap;
    }
  }
`;

export const Paragraph = styled.p`
  margin: 10px 0;
  color: ${({ theme }) => theme.palette.secondary};
`;

export const BannerWrapper = styled.div`
  margin: 60px 0 0;
`;

export const SliderWrapper = styled.div``;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

export const CarSearchBarWrapper = styled.div`
  margin: 50px 0;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin: 127px 0 62px;
  }
`;
