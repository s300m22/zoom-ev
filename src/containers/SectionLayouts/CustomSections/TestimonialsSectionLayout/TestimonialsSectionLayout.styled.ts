import styled from 'styled-components';
import { Asset } from 'contentful';
import { Container } from '../../../../elements';
import getAssetFileUrl from '../../../../contentful/utils/getAssetFileUrl';

interface SectionContainerProps {
  backgroundImage: Asset | string;
}

const SectionContainer = styled(Container)<SectionContainerProps>(
  ({ theme: { up, breakpoints, palette }, backgroundImage }) => `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 35px 15px;
    text-align: center;
    position: relative;

    .slick-dots {
      margin: 10px 0;
      list-style-type: none;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;

      li {
        position: relative;
        display: inline-block;
        width: 10px;
        height: 10px;
        padding: 0;
        cursor: pointer;
        margin: 0 5px;
      }

      .slick-active {
        width: 30px;
      }
      .ft-slick__dots--custom {
        background-color: ${palette.lightGray};
        height: 10px;
        width: 10px;
        border-radius: 10px;
        position: relative;
        display: flex;
      }
      .slick-active .ft-slick__dots--custom {
        width: 30px;
        top: 0px;
        overflow: hidden;
        background-color: ${palette.gray};
      }
    }
   
    .slick-track {
      display: flex;
    }

    .slick-slider {
      display: flex;
      width: 100%;
      flex-direction: column;
    }

    .slick-slide {
      position: relative;
      width: auto;
      margin: 0;
  
      > div {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    ${up(breakpoints.md)} {
      background: url(${getAssetFileUrl(backgroundImage)});
      background-position: center 80%;
      background-size: contain;
      background-repeat: no-repeat;
      padding: 147px 15px 130px;

      .slick-slider {
        max-width: 720px;
      }

      h2 {
        max-width: 470px;
      }

      &::after {
        content: '';
        position: absolute;
        top: -112px;
        right: 50px;
        width: 225px;
        height: 225px;
        background: url(/images/patterns/pattern_dots.svg);
        z-index: 1;
        pointer-events: none;
      }
    }
  `,
);

export default SectionContainer;
