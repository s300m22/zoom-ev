import styled from 'styled-components';
import { Button } from '..';
import ContentAligner from '../ContentAligner/ContentAligner.styled';
import { ListContainerCSS, ListItemCSS } from '../List/List.styled';

export type ImagePosition = 'top' | 'overlay' | 'left';
type CardTypes = 'Employee' | 'Other' | 'Subscription';

interface StyledCardProps {
  imagePosition?: ImagePosition;
  height?: string;
  width?: string;
  isDotIcon?: boolean;
  noTitle?: boolean;
  titleAlignment: string;
  showBorders: boolean;
  margin?: string;
  horizontalList: boolean;
  cardType: CardTypes;
  titleColor: string;
  showDotIcon?: boolean;
}

export const StyledCard = styled.div<StyledCardProps>`
  display: flex;
  background: ${({ theme }) => theme.palette.secondary}!important;
  color: ${({ theme }) => theme.palette.primary};
  position: relative;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  margin: ${({ margin }) => margin || 'initial'};
  height: 100%;

  ${({ theme: { breakpoints, up }, height, width }) => `
    ${up(breakpoints.lg)}{
      height: ${height || 'auto'};
      width: ${width || '100%'};
    }
  `}

  ${({ showBorders, theme }) =>
    showBorders
      ? `
        box-shadow: ${theme.palette.boxShadow};
        border-radius: 12px;
        z-index: 1;
      `
      : 'padding: 0!important'};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${({ theme }) => theme.palette.primary};
    margin-bottom: ${({ imagePosition }) => (imagePosition === 'left' ? '10px' : '20px')};
    text-align: center;

    ${({ theme }) => theme.up(theme.breakpoints.md)} {
      text-align: ${({ titleAlignment }) => titleAlignment};
    }
  }

  ${({ imagePosition, theme, noTitle, cardType, showDotIcon }) => {
    switch (imagePosition) {
      case 'overlay':
        return `
          padding: ${cardType === 'Employee' ? '95px 28px 20px 28px' : '50px 25px 20px 25px'};
          justify-content: space-between;
          margin-top: ${cardType === 'Employee' ? '80px' : '50px'};
        `;
      case 'left':
        return `
          padding: ${noTitle ? '30px' : '50px 30px 30px 30px'};
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: flex-start;

          ${ContentAligner} {
            height: auto;
          }

          ${theme.up(theme.breakpoints.md)} {
            ${ContentAligner} {
              width: calc(100% - 124px)!important;
              height: 100%;
              justify-content: center;

              h1, h2, h3, h4, h5, h6 {
                text-align: left;
              }
            }
          }
        `;
      default:
        return `
          padding: ${showDotIcon ? '30px' : '50px 30px 25px 30px'};
          justify-content: flex-start;
        `;
    }
  }}

  ${ContentAligner} {
    padding: 0;
    width: 100%;
    max-width: unset;

    > h1,
    > h2,
    > h3,
    > h4,
    > h5,
    > h6 {
      color: ${({ titleColor }) => titleColor};
      ${({ imagePosition }) => (imagePosition === 'overlay' ? 'text-align: center;' : '')}
    }
  }

  ul {
    ${ListContainerCSS}
    ${({ horizontalList, theme }) =>
      horizontalList
        ? `
          ${theme.up(theme.breakpoints.sm)} {
            width: 100%;
            grid-template-columns: repeat(3, 1fr);
            grid-column-gap: 25px;
          }
        `
        : ''};
  }

  li {
    ${ListItemCSS}
    font-size: 16px;
    margin: 10px 15px 10px 30px;
    text-align: left;

    ${({ horizontalList, theme }) =>
      horizontalList
        ? `
          ${theme.up(theme.breakpoints.sm)} {
            margin: 45px 0 10px!important;
            align-items: flex-start;
            text-align: center;

            &:after {
              left: calc(50% - 12px);
              top: -30px;
            }

            p {
              width: 100%;
            }
          }
        `
        : ''};

    &:first-of-type {
      margin: 13px 15px 15px 30px;
    }

    p {
      margin: 0;
    }
  }
`;

interface DescriptionWrapperProps {
  imagePosition?: ImagePosition;
}

export const DescriptionWrapper = styled.div<DescriptionWrapperProps>`
  color: ${({ theme }) => theme.palette.gray};
  font-size: 16px;
  text-align: center;

  p {
    margin: 0;
  }

  code {
    color: ${({ theme }) => theme.palette.gray};
  }

  ${({ theme, imagePosition }) => {
    switch (imagePosition) {
      case 'overlay':
        return `
        line-height: 170%;
      `;
      case 'left':
        return `
          line-height: 150%;

          p {
            margin: initial;
          }
          ${theme.up(theme.breakpoints.md)} {
            text-align: left;
          }
        `;
      default:
        return `
        line-height: 150%; 
      `;
    }
  }};
`;

interface ImageContainerProps {
  imagePosition?: ImagePosition;
  cardType: CardTypes;
}

export const ImageContainer = styled.div<ImageContainerProps>`
  ${({ theme: { breakpoints, up }, imagePosition, cardType }) => {
    switch (imagePosition) {
      case 'overlay':
        return `
          position: absolute;
          top: ${cardType === 'Employee' ? '-75px' : '-32px'};
          margin-bottom: 50px;
          ${cardType === 'Employee' ? 'max-width: 150px; max-height: 150px;' : ''};
      `;
      case 'left':
        return `
          display: flex;
          justify-content: center;
          align-items: center;
          width: auto;
          margin: 0 auto 32px;
          align-self: center;

          ${up(breakpoints.md)} {
            margin: 0 32px 0 0;
          }
        `;
      default:
        return `
          margin-bottom: 50px;
        `;
    }
  }};
`;

export const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 25px;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin-right: 30px;
    margin-bottom: 0;
  }

  + ${ContentAligner} {
    ${({ theme }) => theme.up(theme.breakpoints.md)} {
      width: calc(100% - 60px) !important;
    }
  }
`;

interface ButtonContainerProps {
  imagePosition?: ImagePosition;
}

export const ButtonContainer = styled.div<ButtonContainerProps>(
  ({ theme: { up, breakpoints }, imagePosition }) => `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 5px 0;
    margin-top: ${imagePosition === 'left' || imagePosition === 'overlay' ? '20px' : '0'};
    padding: 10px;
    ${up(breakpoints.md)} {
      justify-content: ${imagePosition === 'left' ? 'flex-start' : 'center'};
    }
  `,
);

export const StyledButton = styled((props) => <Button {...props} />)`
  width: auto;
  margin: 15px 0 15px 0;
`;

export const SubcardsWrapper = styled.div(
  ({ theme: { up, breakpoints, palette } }) => `
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 92px;
    grid-row-gap: 32px;

    li:first-of-type {
      margin: 5px 15px 15px 30px;
    }
    
    ${ContentAligner} {
      align-items: flex-start;
    }
  
    ${up(breakpoints.sm)} {
      grid-template-columns: repeat(2, 1fr);
      position: relative;
      margin-top: 30px;


      ${StyledCard}:nth-of-type(2) {
        &:after {
          content: '';
          height: 100%;
          width: 1px;
          border-left: 1px solid ${palette.lightText};
          position: absolute;
          left: -46px;
          top: 0;
          bottom: 0;
        }
      }
    }
  `,
);

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.palette.gray};
  margin: -10px 0 25px;
`;

export const BundlePrice = styled.div`
  position: relative;

  &:after {
    content: '';
    width: 100%;
    position: absolute;
    right: 0;
    top: 50%;
    border-bottom: 2px solid ${({ theme }) => theme.palette.dark};
    transform: skewY(-10deg);
  }
`;
