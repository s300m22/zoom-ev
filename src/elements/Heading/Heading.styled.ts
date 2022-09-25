import styled, { css } from 'styled-components';

export const headingCommon = (fontSize: number, lineHeight: number) => css`
  font-weight: 700;
  margin-block-start: 0;
  margin-block-end: 0;
  font-size: ${fontSize * 0.65 >= 20 ? `calc(${fontSize}px * 0.65)` : '20px'};
  line-height: ${lineHeight}%;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    font-size: ${fontSize * 0.85 >= 20 ? `calc(${fontSize}px * 0.85)` : '20px'};
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    font-size: ${fontSize}px;
  }

  sup {
    top: -1.5em;
    left: 0.25em;
    font-weight: 700;
    font-size: calc(${fontSize}px / 3);
  }
`;

export const H1 = styled.h1`
  ${headingCommon(60, 120)};
`;

export const H2 = styled.h2`
  ${headingCommon(40, 120)};
  line-height: 120%;
`;

export const H3 = styled.h3`
  ${headingCommon(30, 120)};
`;

export const H4 = styled.h4`
  ${headingCommon(24, 150)};
`;

export const H5 = styled.h5`
  ${headingCommon(20, 150)};
`;

export const H6 = styled.h6`
  ${headingCommon(18, 150)};
`;

export const H7 = styled.h6`
  ${headingCommon(16, 120)};
`;
