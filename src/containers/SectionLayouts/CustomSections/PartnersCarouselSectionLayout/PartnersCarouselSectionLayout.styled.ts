import styled from 'styled-components';

interface PartnersCarouselWrapperProps {
  background?: string;
}

const PartnersCarouselWrapper = styled.div<PartnersCarouselWrapperProps>(
  ({ theme: { up, breakpoints, generateColors }, background }) => `
    width: calc(100% + 30px);
    display: flex;
    justify-content: space-evenly;
    padding: 50px 0;
    margin: 0 -15px;

    ${generateColors(background)}

    ${up(breakpoints.lg)} {
      padding: 130px 0 115px;
      width: 100%;
      margin: 0;
    }

  
    .slick-track {
      display: flex;
    }

    .slick-slider {
      display: flex;
      width: 100%;
    }

    .slick-slide {
      position: relative;
      height: 70px;
      width: auto;
      margin: 0 35px;

      > div {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          max-height: 62px;
          max-width: 200px;
        }
      }
    }
  `,
);

export default PartnersCarouselWrapper;
