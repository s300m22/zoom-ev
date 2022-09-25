import styled from 'styled-components';

interface CustomStylesContainerProps {
  background: string;
  padding?: string;
  margin?: string;
}

export const CustomStylesContainer = styled.div<CustomStylesContainerProps>(
  ({ theme: { breakpoints, up, generateColors }, background, padding, margin }) => `
    width: calc(100% + 30px);
    padding: 5vmax 15px 2vmax;
    margin: 0 -15px;
  
    ${generateColors(background)}
    
    ${up(breakpoints.lg)} {
      padding: ${padding};
      margin: ${margin};
      width: 100%;
    }
  `,
);

export const AlignmentContainer = styled.div(
  ({ theme: { pageWidth } }) => `
  max-width: ${pageWidth};
  width: 100%;
  margin: 0 auto;
`,
);
