import styled from 'styled-components';
import { ReactNode } from 'react';
import { StyledButton } from '../Button/Button.styled';
import { ListWrapper } from '../List/List.styled';

export interface ContentAlignerProps {
  additionalContentHorizontalAlignment?: 'space-between' | 'center' | 'start';
  additionalContentVerticalAlignment?: 'between' | 'center' | 'top';
  width?: string;
  children: ReactNode;
  gutterBottom?: boolean;
  imageOverlay?: boolean;
  textAlignment?: string;
}

const ContentAligner = styled.div<ContentAlignerProps>(
  ({
    theme: { breakpoints, up },
    additionalContentHorizontalAlignment,
    additionalContentVerticalAlignment,
    width,
    gutterBottom,
    imageOverlay,
    textAlignment,
  }) => `
    display: flex;
    flex-direction: column;
    padding: ${imageOverlay ? '0' : '35px 0'};
    height: 100%;
    width: 100%;
    text-align: center;
    align-items: ${additionalContentHorizontalAlignment};
    justify-content: ${
      // eslint-disable-next-line no-nested-ternary
      additionalContentVerticalAlignment === 'between'
        ? 'space-between'
        : additionalContentVerticalAlignment === 'center'
        ? 'center'
        : 'flex-start'
    };

    ${gutterBottom ? 'margin-bottom: 50px;' : ''}

    ${up(breakpoints.md)} {
      text-align: ${textAlignment || 'left'};
      max-width: ${width || '500px'};
    }

    ${StyledButton} {
      align-self: center;

      ${up(breakpoints.md)} {
        align-self: flex-start;
      }
    }

    + ${ListWrapper} {
      ${up(breakpoints.md)} {
        margin-top: -25px;
      }
    }

    ${up(breakpoints.lg)} {
      width: ${width || '100%'};
    }
  `,
);

export default ContentAligner;
