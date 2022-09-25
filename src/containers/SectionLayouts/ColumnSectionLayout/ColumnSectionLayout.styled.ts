import styled from 'styled-components';
import { Container } from '../../../elements';
import ContentAligner from '../../../elements/ContentAligner/ContentAligner.styled';
import { StyledButton } from '../../../elements/Button/Button.styled';
import { LinkWrapper } from '../../../elements/StyledLink/StyledLink.styled';
import { StyledCard } from '../../../elements/Card/Card.styled';
import StyledEmbeddedImage from '../../../elements/RichTextRenderer/RichTextRenderer.styled';

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 30px;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    flex-wrap: nowrap;
    justify-content: flex-start;
    padding-right: 35px;
    margin-top: 50px;
  }

  button {
    width: 100%;

    &:last-of-type {
      margin-right: 0;
      margin-top: 30px;

      ${({ theme }) => theme.up(theme.breakpoints.sm)} {
        margin-top: 0;
      }
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

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  ${ContentAligner} {
    h1,
    h2,
    h3,
    h4,
    h4,
    h5,
    h6 {
      width: 100%;

      + ${ButtonWrapper} {
        margin-top: 50px;
      }
    }
  }
`;

export const WidthWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface OuterWrapperProps {
  background: string;
  padding?: string;
  margin?: string;
}

export const OuterWrapper = styled(Container)<OuterWrapperProps>(
  ({ theme: { breakpoints, up, generateColors }, padding, margin, background }) => `
    position: relative;
    ${generateColors(background)}

    ${up(breakpoints.md)} {
      ${margin ? `margin: ${margin}!important` : ''};
      padding: ${padding || 0};
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
`,
);

interface WrapperProps {
  layout?: 'top' | 'bottom' | 'left' | 'right';
  minHeight: string;
}

export const PrimaryContentWrapper = styled(Container)<WrapperProps>(
  ({ theme: { breakpoints, up, getLayout }, layout, minHeight }) => `
    display: grid;
    grid-template-rows: 1fr;
    grid-column-gap: 25px;
    grid-row-gap: 0px;
    position: relative;
    min-height: ${minHeight};

    ${up(breakpoints.md)} {
      grid-template-rows: ${minHeight};
    }

    ${getLayout(layout)}
    
    > div {
      position: relative!important;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      
      img {
        object-fit: cover;

        ${up(breakpoints.md)} {
          object-fit: contain;
        }
      }

      ${up(breakpoints.md)} {
        justify-content: flex-start;
      }
    }
  `,
);

interface CardsWrapperProps {
  direction: string;
  columns: number;
}

export const CardsWrapper = styled.div<CardsWrapperProps>(
  ({ theme: { breakpoints, up }, direction, columns }) => `
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 32px;
  grid-row-gap: 32px;
  justify-content: center;
  margin-bottom: 32px;
  margin-top: 32px;
  align-items: flex-end;

  ${up(breakpoints.sm)} {
    grid-template-columns: repeat(${columns === 1 ? 1 : 2}, 1fr);
    flex-direction: ${direction}
  }

  ${up(breakpoints.md)} {
    grid-template-columns: repeat(${columns}, 1fr);
    margin-bottom: inherit;
    margin-top: inherit;
    align-items: inherit;
  }

  ${StyledCard} {
    height: auto;
  }
`,
);

export const AdditionalCardsWrapper = styled.div(
  ({ theme: { breakpoints, up } }) => `
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 32px;
    grid-row-gap: 32px;
    align-items: center;
    margin-top: 45px;
    padding-bottom: 35px;

    ${up(breakpoints.sm)} {
      grid-template-columns: repeat(2, 1fr);
    }

    ${up(breakpoints.md)} {
      margin-top: 0px;
      padding-bottom: 0;
    }
  `,
);

export const DescriptionWrapper = styled.div(
  ({ theme: { breakpoints, up, palette } }) => `
    width: 100%;
    line-height: 150%;
  
    p {
      margin: 20px 0 0;
    }

    + ${StyledButton} {
      margin-top: 50px;
    }

    br {
      display: none;

      ${up(breakpoints.md)} {
        display: inline;
      }
    }

    ${LinkWrapper} {
      display: inline;
      text-decoration: underline;
    
      a {
        color: ${palette.hover};
        font-weight: 700;
      }
    }

    ${StyledEmbeddedImage} {
      margin: 48px 0 0;
      img {
        border-radius: 0;
      }
    }
  `,
);

export const AdditionalContentSection = styled.div`
  position: relative;

  ${ContentAligner} {
    max-width: unset;
  }
`;

export const SectionGrayOverlay = styled.img(
  ({ theme: { breakpoints, up } }) => `
    position: absolute;
    z-index: 0;
    top: 0;
    right: -10%;
    width: 110%;
    height: 102%;
    transform: scale(1.75) translateX(14%);
    pointer-events: none;
    display: none;

    ${up(breakpoints.lg)} {
      display: flex;
    }
  `,
);

export const PartnersListContainer = styled.div`
  width: 100%;
  margin-top: 30px;
`;

export const PartnerListItem = styled.div`
  height: 40px;
  width: auto;
  margin: 0 auto;
  display: flex;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin: 0 auto 20px;
  }

  &:first-of-type {
    margin-left: 0;
  }

  img {
    max-height: 40px;
    padding: 0 5px;
    object-fit: contain !important;

    ${({ theme }) => theme.up(theme.breakpoints.md)} {
      padding: 0;
    }
  }
`;

export const PartnersList = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 25px;
`;
