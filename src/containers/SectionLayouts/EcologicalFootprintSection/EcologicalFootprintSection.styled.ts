import styled from 'styled-components';
import { Container } from '../../../elements';
import { Wrapper } from '../TabSectionLayout/TabSectionLayout.styled';

export const EcologicalFootprintSectionWrapper = styled.div`
  background: ${({ theme }) => theme.palette.dark};
  margin: 0 -15px;

  + ${Wrapper} {
    margin-top: 50px;
  }

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    margin: 0;
  }
`;

export const EcologicalFootprintSectionContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5vh 0;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    overflow: visible;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: -160px;
      bottom: -160px;
      left: 0;
      width: 100%;
      background: url('/images/patterns/pattern_dots.svg'), url('/images/patterns/pattern_dots.svg');
      background-size: 225px 225px, 225px 225px;
      background-repeat: no-repeat, no-repeat;
      background-position: 100% 52px, 0 100%;
      z-index: 1;
      pointer-events: none;
    }
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    flex-direction: row;
  }
`;

export const FootprintCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  color: ${({ theme }) => theme.palette.secondary};
  margin-bottom: 30px;

  &:last-of-type {
    margin-bottom: 0;
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    width: calc(100% / 3);
    margin-bottom: 0;
  }

  h1 {
    margin: 30px 0 5px;
  }
`;

export const FootprintCellParagraph = styled.p`
  color: ${({ theme }) => theme.palette.gray};
  font-weight: 500;
  margin: 0;
  text-align: center;
`;
