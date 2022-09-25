import styled from 'styled-components';
import PartnersCarouselWrapper from '../PartnersCarouselSectionLayout/PartnersCarouselSectionLayout.styled';

interface WrapperProps {
  background: string;
  padding?: string;
}

const Wrapper = styled.div<WrapperProps>(
  ({ theme: { breakpoints, up, generateColors }, background, padding }) => `
  display: flex;
  flex-direction: column;
  margin: 0 -15px;
  padding: 0 15px;
  text-align: center;
  ${generateColors(background)}

  ${up(breakpoints.lg)} {
    padding: ${padding || 0};
    text-align: left;
  }

  ${PartnersCarouselWrapper}  {
    background: initial;
  }
  `,
);

export default Wrapper;
