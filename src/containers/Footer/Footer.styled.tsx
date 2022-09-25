import styled from 'styled-components';
import { LinkWrapper } from '../../elements/StyledLink/StyledLink.styled';

export const FooterWrapper = styled.footer(
  ({ theme: { palette } }) => `
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${palette.primary};
    color: ${palette.secondary};
    padding: 25px 15px;
  `,
);

export const FooterSectionsContainer = styled.div(
  ({ theme: { up, breakpoints, palette } }) => `
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 15px;
    grid-row-gap: 0px;
    width: 100%;
    padding: 15px 0;

    ${LinkWrapper} {
      a, p {
        color: ${palette.secondary};
        margin: 7.5px 0;
        line-height: 150%;
        display: block;
      }
    }

    ${up(breakpoints.md)} {
      grid-template-columns: repeat(4, 1fr);
    }
  `,
);

export const FooterCallToAction = styled.div(
  ({ theme: { up, breakpoints, palette } }) => `
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    color: ${palette.secondary};
    background-color: ${palette.lightGray};
    border-radius: 12px;
    align-items: center;
    margin-bottom: 25px;
    
    ${LinkWrapper} {
      display: block;
      margin-top: 15px;
      width: 100%;
      color: ${palette.lightText};
      font-size: 16px;
      text-decoration: underline;
    }

    ${up(breakpoints.sm)} {
      justify-content: center;
      ${LinkWrapper} {
        display: inline;
        width: auto;
        margin-top: 0;
        margin-left: 25px;
      }
    }
  `,
);

export const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
`;

export const FooterLinksSection = styled.div(
  ({ theme: { up, breakpoints, palette } }) => `
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 15px;

    &:first-of-type {
      margin-top: 0;
    }
    
    ${up(breakpoints.md)} {
      width: auto;
      justify-content: space-between;
      margin-top: 0;
    }

    ${LinkWrapper} {
      margin-right: 25px;
      a {
        color: ${palette.gray};
      }
    }

    ${LinkWrapper}:last-of-type {
      margin-right: 0;
    }

    img:hover {
      filter: invert(83%) sepia(39%) saturate(4276%) hue-rotate(168deg) brightness(98%) contrast(92%);
    }
  `,
);
