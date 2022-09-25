import styled from 'styled-components';
import { Container } from '../../../../elements';
import { PrimaryContentWrapper } from '../../ColumnSectionLayout/ColumnSectionLayout.styled';
import { Wrapper as TimelineWrapper } from '../../TabSectionLayout/TabSectionLayout.styled';

interface WrapperProps {
  padding?: string;
  background?: string;
  dotsPatterns: boolean;
}

export const Wrapper = styled(Container)<WrapperProps>(
  ({ theme: { breakpoints, up, generateColors }, background, padding, dotsPatterns }) => `
    padding: 5vmax 0;
    position: relative;
    ${generateColors(background)}
    
    ${up(breakpoints.md)} {
      padding: ${padding || 0};
    }

    + ${TimelineWrapper} {
      padding-top: 50px;
    }

    &:after {
      content: "";
      position: absolute;
      z-index: -1;
      width: 150vw;
      height: 100%;
      left: -50vw;
      top: 0;
      ${generateColors(background)}
    }

    ${
      dotsPatterns
        ? `
        overflow: visible;
        ${up(breakpoints.md)} {
          &::before {
            content: '';
            position: absolute;
            top: -160px;
            bottom: -160px;
            left: 0;
            width: 100%;
            background: url(/images/patterns/pattern_dots.svg), url(/images/patterns/pattern_dots.svg);
            background-size: 225px 225px, 225px 225px;
            background-repeat: no-repeat, no-repeat;
            background-position: 100% 52px, 0 100%;
            z-index: 1;
            pointer-events: none;
          }
        }
      `
        : ''
    }
  `,
);

export const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

export const CtaWrapper = styled.div(
  ({ theme: { up, breakpoints } }) => `
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;

    ${up(breakpoints.md)} {
      margin-top: 50px;
    }
  `,
);

interface ColumnsSectionWrapperProps {
  background: string;
  layout: string;
}

export const ColumnsSectionWrapper = styled(Container)<ColumnsSectionWrapperProps>(
  ({ theme: { generateColors, up, breakpoints, palette }, background, layout }) => `
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 15px;
    grid-row-gap: 15px;
    position: relative;
    ${generateColors(background)}

    > div {
      background: transparent;
      color: ${background === 'dark' ? palette.secondary : palette.primary};
      justify-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &:after {
      content: "";
      position: absolute;
      z-index: -1;
      width: 150vw;
      height: 100%;
      left: -50vw;
      top: 0;
      ${generateColors(background)}
    }

    ${up(breakpoints.sm)} {
      grid-template-columns: repeat(${layout.includes('2') ? 2 : 3}, 1fr);
    }

    ${up(breakpoints.md)} {
      grid-column-gap: 35px;
      grid-row-gap: 35px;
    }

    ${PrimaryContentWrapper} {
      min-height: unset;

      > div {
        justify-content: center;
        text-align: center;
      }
    }
  `,
);
