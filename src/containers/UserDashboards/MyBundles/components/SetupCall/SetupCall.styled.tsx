import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 60px 0;
  margin-top: 70px;
  .box {
    border-radius: 10px;
    background-color: #fafbfc;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 34px rgb(23 75 83 / 10%);
    ${({ theme }) => theme.down(theme.breakpoints.lg)} {
      display: block;
    }
    .content {
      width: 44%;
      background-color: white;
      border-radius: 10px;
      padding: 30px 20px;
      font-size: 15px;
      color: #6a707d;
      ${({ theme }) => theme.down(theme.breakpoints.lg)} {
        width: 100%;
      }
      .times {
        display: flex;
        margin-top: 15px;
        height: 100%;
        position: relative;
        ${({ theme }) => theme.down(theme.breakpoints.lg)} {
          margin-top: 20px;
          display: block;
          margin-left: auto;
          margin-right: auto;
          width: fit-content;
          > svg {
            position: absolute;
            left: -30px;
          }
        }
        p {
          margin: 4px;
          ${({ theme }) => theme.down(theme.breakpoints.lg)} {
            margin-left: 0px;
            margin-bottom: 10px;
            width: 100%;
          }
        }
        .title {
          margin: 0 10px;
          ${({ theme }) => theme.down(theme.breakpoints.lg)} {
            margin-left: 0px;
            margin-bottom: 10px;
          }
        }
        strong {
          margin-left: 10px;
        }
      }
    }
    .form {
      padding: 0 20px;
      width: 60%;
      ${({ theme }) => theme.down(theme.breakpoints.lg)} {
        width: 100%;
      }
      h4 {
        margin-top: 0;
        ${({ theme }) => theme.down(theme.breakpoints.lg)} {
          margin-top: 20px;
          font-size: 16px;
        }
      }
      form {
        display: flex;
        justify-content: space-between;
        align-items: center;
        ${({ theme }) => theme.down(theme.breakpoints.lg)} {
          display: block;
          padding-bottom: 20px;
          button {
            width: 100%;
          }
        }
        > div {
          width: 32%;
          ${({ theme }) => theme.down(theme.breakpoints.lg)} {
            width: 100%;
            margin: 20px 0;
          }
        }
      }
      .call-confirmation {
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        ${({ theme }) => theme.down(theme.breakpoints.lg)} {
          display: block;
          padding: 30px 20px;
          button {
            margin-top: 20px;
          }
        }
        p {
          margin: 3px 0;
        }
      }
    }
  }
`;
