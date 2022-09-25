import styled from 'styled-components';

interface GroupProps {
  postPurchase: boolean;
}

export const PrePurchaseTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 50px;
  h2 {
    font-size: 28px;
  }
`;

export const Wrapper = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Menu = styled.div<GroupProps>`
  background-color: ${({ postPurchase }) => (postPurchase ? 'white' : '#fafafa')};
  display: flex;
  justify-content: center;
  margin: 20px 0;
  border-radius: 15px;
  padding: 10px;
  ${({ theme }) => theme.down(theme.breakpoints.lg)} {
    display: none;
  }
`;

export const MobileMenu = styled.div`
  position: relative;
  margin-bottom: 20px;
  margin-top: 20px;
  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    display: none;
  }
`;

export const MobMenButton = styled.button`
  box-shadow: 0 10px 34px rgb(23 75 83 / 10%);
  border-radius: 15px;
  padding: 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #00bff3;
  width: 100%;
  background-color: transparent;
`;

interface DropdownProps {
  visible: boolean;
}
export const DropDown = styled.div<DropdownProps>`
  position: absolute;
  width: 100%;
  padding: 10px;
  background-color: white;
  border-radius: 20px;
  border: 1px solid #00bff3;
  transition: opacity ease-in 0.3s;
  z-index: 9;
  margin-top: 10px;
  top: 100%;
  ${({ visible }) =>
    visible == true
      ? `
        opacity: 1;
        `
      : `
      opacity: 0;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;
  `}
`;

export const MenuItem = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: grey;
  text-align: center;
  padding: 12px 20px;
  border-radius: 15px;
  min-width: 100px;
  &:hover {
    color: black;
    cursor: pointer;
  }
  &.active {
    background: linear-gradient(90deg, #54c0ef 0%, #16d3a4 100%);
    color: white;
    &:hover {
      color: light-gray;
    }
  }
`;

export const GroupContainer = styled.div`
  width: 100%;
`;

export const Group = styled.div<GroupProps>`
  background-color: ${({ postPurchase }) => (postPurchase ? 'transparent' : '#fafafa')};
  padding: ${({ postPurchase }) => (postPurchase ? '10px 10px' : '25px')};
  border-radius: 15px;
  width: 100%;
  margin-bottom: ${({ postPurchase }) => (postPurchase ? '0' : '30px')};
  margin-top: ${({ postPurchase }) => (postPurchase ? '40px' : '0px')};

  h2 {
    ${({ postPurchase }) => (postPurchase ? 'margin:0; font-size: 16px;' : 'margin-bottom: 10px;')}
  }
  > p {
    width: 70%;
    color: gray;
    max-width: 800px;
    margin: 0;
  }
  .title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${({ theme }) => theme.down(theme.breakpoints.lg)} {
      display: block;
    }
  }
`;

export const GreenLine = styled.div`
  width: 64px;
  height: 4px;
  background: linear-gradient(90deg, #54c0ef 0%, #16d3a4 100%);
  margin: 20px 0;
`;

interface CardHolderProps {
  showShadow: boolean;
}

export const CardHolder = styled.div<CardHolderProps>`
  display: flex;
  overflow: auto;
  height: 280px;
  padding-top: 15px;
  /* -ms-overflow-style: none; */
  -webkit-overflow-scrolling: touch;
  position: relative;
  /* ${({ showShadow }) =>
    showShadow == true
      ? `
          &:after {
            height: 100%;
            width: 50px;
            background-color: black;
            right: 0;
            top: 0;
            display: block;
            content: '';
            position: absolute;
          }
        `
      : `
  `} */
  &::-webkit-scrollbar {
    height: 5px;
    background-color: #efefef;
    border-radius: 3px;
    width: 98%;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #b5b4b4;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
`;

export const BlogCardWrapper = styled.div`
  position: relative;
  background-color: white;
  width: 270px;
  height: 220px;
  border-radius: 15px;
  box-shadow: 0 10px 34px rgb(23 75 83 / 10%);
  color: black;
  padding: 20px;
  margin-right: 20px;
  flex-shrink: 0;
  flex-grow: 0;
  &:hover {
    cursor: pointer;
  }
  h3 {
    margin: 10px 0;
  }
  p {
    width: 100%;
    color: #707070;
  }

  .read-more {
    position: absolute;
    bottom: 5px;
    right: 15px;
    color: #00bff3;
    button {
      color: #00bff3;
    }
    .icon {
      width: 20px;
      /* height: 20px; */
      margin-left: 5px;
    }
  }
`;

export const TipCardWrapper = styled.div`
  position: relative;
  background-color: white;
  width: 270px;
  height: 220px;
  border-radius: 15px;
  box-shadow: 0 10px 34px rgb(23 75 83 / 10%);
  color: black;
  padding: 20px;
  margin-right: 20px;
  flex-shrink: 0;
  flex-grow: 0;
  h3 {
    margin: 10px 0;
  }

  .tip {
    height: 120px;
    color: #707070;
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
`;

export const BenefitCard = styled.div`
  position: relative;
  background-color: #061027;
  width: 270px;
  height: 220px;
  border-radius: 15px;
  color: white;
  // box-shadow: 0 10px 34px rgb(23 75 83 / 10%);
  cursor: pointer;
  margin-right: 20px;
  flex-shrink: 0;
  flex-grow: 0;
  .inner {
    padding: 20px;
    padding-top: 80px;
    padding-bottom: 40px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .feature {
      margin-bottom: 10px;
      strong {
        font-size: 17px;
      }
      p {
        width: 100%;
        margin: 0;
        font-size: 14px;
      }
    }
    .floating-arrow {
      transition: all ease-in-out 0.3s;
      position: absolute;
      right: 18px;
      bottom: 10px;
      width: 24px;
    }
  }
  &:hover {
    .inner {
      .floating-arrow {
        right: 15px;
      }
    }
  }
`;

export const BenefitLogo = styled.div`
  background-color: white;
  border-radius: 15px;
  border-top-left-radius: 0;
  border-bottom-right-radius: 0;
  height: 50px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: -0.5px;
  right: -0.5px;
  box-shadow: 0 10px 34px rgb(23 75 83 / 10%);
  padding: 6px;
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const BenefitBottomLabel = styled.div`
  background-color: #00bff3;
  border-radius: 15px;
  border-top-left-radius: 0;
  position: absolute;
  bottom: -15px;
  left: 0;
  padding: 10px 15px;

  box-shadow: 0 10px 34px rgb(23 75 83 / 10%);
  font-size: 14px;
  font-weight: 500;
`;

export const ExtrasLink = styled.div`
  color: #00bff3;
  margin-top: 30px;
  /* margin-bottom: 30px; */
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  &:hover {
    color: #01a5d1;
    p {
      color: #01a5d1;
    }
  }
  p {
    color: #00bff3;
    width: auto;
    margin: 0;
  }
`;

export const PostPurchaseModalStyled = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 9999999;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 10%);
  .body {
    background-color: #ddf1f6;
    width: 100%;
    max-width: 1400px;
    box-shadow: 0 10px 34px rgb(23 75 83 / 12%);
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    position: relative;
    ${({ theme }) => theme.down(theme.breakpoints.lg)} {
      background-color: white;
      max-width: 800px;
    }
    .content {
      background-color: white;
      width: calc(95%);
      padding: 50px;
      border-radius: 15px;
      box-shadow: 0 10px 34px rgb(23 75 83 / 12%);
      max-height: 90vh;
      overflow: auto;
      ${({ theme }) => theme.down(theme.breakpoints.lg)} {
        box-shadow: none;
        width: 100%;
      }
    }
    .sidebar {
      width: 5%;
      min-width: 60px;
      background-color: transparent;
      flex-shrink: 0;
      flex-grow: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      ${({ theme }) => theme.down(theme.breakpoints.lg)} {
        position: absolute;
        height: 60px;
        top: 20px;
        right: 20px;
      }
      .close-btn {
        margin-top: 20px;
        background-color: white;
        border-radius: 10px;
        color: black;
        width: 45px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`;
