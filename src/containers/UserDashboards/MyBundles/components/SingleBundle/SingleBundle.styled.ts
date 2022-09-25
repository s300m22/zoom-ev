import styled from 'styled-components';

export const CardFirstRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-wrap: nowrap;
  }

  > div {
    display: flex;
  }

  /* button {
    margin-top: 15px;
    width: 100%;

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      margin-right: 10px;
      margin-top: -5px;
      width: auto;
    }
  } */
`;

export const CardSecondRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
  flex-wrap: wrap;

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    flex-wrap: nowrap;
  }
`;

export const ProductBillingPaymentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    width: auto;
  }

  > div {
    width: 100%;
    margin-bottom: 15px;

    &:last-of-type {
      margin-bottom: 0;
    }

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      width: auto;
      margin-right: 30px;
      margin-bottom: 0;
    }

    ${({ theme }) => theme.up(theme.breakpoints.lgWide)} {
      &:nth-of-type(1) {
        width: 220px;
      }

      &:nth-of-type(2) {
        width: 170px;
      }

      &:nth-of-type(3) {
        width: 220px;
      }
    }
  }
`;

export const CodeWrapper = styled.div`
  display: flex;
  width: auto;
  margin-top: 15px;

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    margin-top: 0;
    width: 250px;
  }
`;

export const CellWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.gray};
  margin-bottom: 5px;
`;

export const ImageWrapper = styled.div`
  background: #ffffff;
  border: 1px solid #ececec;
  border-radius: 8px;
  height: 80px;
  width: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 23px 16px;
  /* margin: 0 auto 25px; */
  width: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    width: auto;
    margin: 0;
  }

  img {
    max-height: 100%;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    width: auto;
    margin-left: 19px;
  }

  a {
    font-size: 14px;
  }
`;

export const FooterParagraph = styled.p`
  color: ${({ theme }) => theme.palette.gray};
  font-size: 14px;
  margin-top: 5px;
`;

export const Copy = styled.span`
  color: ${({ theme }) => theme.palette.blue};
  font-size: 14px !important;
  cursor: pointer;
  text-decoration: underline;
  font-weight: 500;
  display: flex;
  align-items: center;
`;

export const CodeCopyWrapper = styled.div`
  display: flex;
  align-items: center;

  span {
    font-size: 24px;
  }
  svg {
    margin: 0 5px 0 19px;
  }
`;

export const FooterBundleCancel = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  button {
    margin-top: 25px;
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    flex-wrap: nowrap;
    button {
      margin-top: 0;
      margin-left: 30px;
    }
  }
`;
