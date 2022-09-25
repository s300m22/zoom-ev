import styled from 'styled-components';

interface TimelineSectionProps {
  widthProp: string;
}

export const TimelineSection = styled.div<TimelineSectionProps>(
  ({ widthProp, theme: { up, breakpoints } }) => `
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    > div {
      width: 100%;

      ${up(breakpoints.md)} {
        width: ${widthProp};
      }

    }
  `,
);

export const BannerWrapper = styled.div`
  margin: 35px 0 55px 0;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin: 35px 0 55px 0;
  }
`;
