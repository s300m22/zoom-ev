import styled from 'styled-components';

interface ContainerPropps {
  isPartnerLogo: boolean;
}
export const Container = styled.div<ContainerPropps>(
  ({ isPartnerLogo, theme }) => `
  background-color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 10px 34px rgb(23 75 83 / 10%);
  ${theme.down(theme.breakpoints.lg)} {
    display: block;
  }

  ${
    isPartnerLogo
      ? `
      img {
        border-radius: 10px;
        max-width: 25%;
        ${theme.down(theme.breakpoints.lg)} {
          display: block;
          max-width: 100%;
        }
      }
  `
      : `
  img {
    border-radius: 10px;
    max-width: 50%;
    ${theme.down(theme.breakpoints.lg)} {
      display: block;
      max-width: 100%;
    }
  }
  `
  }
  
  .content-zone {
    padding: 30px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    ${theme.down(theme.breakpoints.lg)} {
      padding: 30px;
    }
    h4 {
      margin: 0;
    }
    p {
      font-size: 14px;
      font-weight: 400;
      color: #707070;
    }
    a {
      color: #00bff3;
    }
  }
`,
);
