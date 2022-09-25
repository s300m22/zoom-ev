import styled from 'styled-components';

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  background: white;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InnerContainer = styled.div`
  background-color: white;
  width: 700px;
  height: 573px;
  max-width: 96%;
  border-radius: 20px;
  padding: 20px;

  .slide {
    .slide-image {
      min-width: 500px;
      img {
        width: 100%;
      }
    }
    .body {
      padding: 10px;
      p {
        color: #9fa4af;
        margin: 20px 0;
      }
    }
  }

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
      background-color: lightgrey;
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
      background-color: #00bff3;
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

  .skippith {
    position: absolute;
    bottom: 0;
    font-weight: 600;
    right: 13px;
    color: #00bff3;
    cursor: pointer;
    z-index: 9999;
  }
`;
