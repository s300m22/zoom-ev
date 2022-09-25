import styled from 'styled-components';
import { Container } from '../../../../elements';
import { StyledCard } from '../../../../elements/Card/Card.styled';

interface WrapperProps {
  position?: 'left' | 'center';
}

export const Wrapper = styled(Container)<WrapperProps>`
  display: flex;
  flex-direction: column;
  ${({ position }) => position === 'center' && 'align-items: center'};
`;

interface CardsWrapperProps {
  columns: number;
  additionalPadding: boolean;
}

export const CardsWrapper = styled.div<CardsWrapperProps>(
  ({ theme: { down, breakpoints, generateGrid }, columns, additionalPadding }) => `
  display: grid;
  grid-template-rows: 1fr;
  grid-column-gap: 32px;
  grid-row-gap: 32px;
  justify-content: space-between;
  width: 100%;

  padding: ${additionalPadding ? '90px' : '50px'} 0 0;
  ${columns === 1 ? 'padding: 0;' : ''}
  ${generateGrid(columns)}

  ${down(breakpoints.md)} {
    ${generateGrid(2)}

    h4 {
      width: 100%;
    }
  }

  ${down(breakpoints.sm)} {
    padding: 15px 0;
    grid-template-columns: 1fr;

    & > div {
      grid-column: auto !important;
    }
   }


  ${StyledCard} {
    height: auto;
  }
`,
);

export const ContentAfterCards = styled.div(
  ({ theme: { up, breakpoints } }) => `
    margin-top: 45px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${up(breakpoints.md)} {
      margin-top: 90px;
      margin-bottom: 0;
    }
  `,
);
