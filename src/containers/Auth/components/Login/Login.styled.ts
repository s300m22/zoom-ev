import styled from 'styled-components';

export const Wrapper = styled.div`
  text-align: left;
`;

export const HeadingWrapper = styled.div`
  margin: 0 0 50px;
  text-align: center;
`;

export const Paragraph = styled.p(
  ({ theme: { up, breakpoints } }) => `
    font-size: 14px;
    line-height: 21px;
    margin: 0;

    &:first-of-type {
      margin-bottom: 15px;
    }
    ${up(breakpoints.sm)} {
      &:first-of-type {
        margin-bottom: 0;
      }
    }
  `,
);

export const FooterLinks = styled.div(
  ({ theme: { up, breakpoints } }) => `
    display: flex;
    flex-direction: column;
    justify-content: center;

    ${up(breakpoints.sm)} {
      justify-content: space-around;
      flex-direction: row;
    }
  `,
);
