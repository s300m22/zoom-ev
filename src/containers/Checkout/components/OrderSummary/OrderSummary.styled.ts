import styled from 'styled-components';

export const OrderSummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  hr {
    margin-left: -30px;
    margin-right: -30px;
    width: calc(100% + 60px);
    margin-top: 30px;
    margin-bottom: 34px;
  }
`;

export const CardFooterWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const OrderSummaryParagraph = styled.p`
  margin: 30px 0 0;
  font-size: 14px;
  line-height: 21px;
  color: ${({ theme }) => theme.palette.gray};
`;

export const OrderSummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.dark};
  font-size: 24px;
  margin-bottom: 20px;

  h4 {
    text-align: right;
  }
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
  margin: 10px 0 0;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    margin: 0;
  }

  img {
    max-height: 100%;
  }
`;

export const OrderSummaryDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ececec;
  border-radius: 12px;
  padding: 10px;
  margin-top: 30px;
  flex-wrap: wrap;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
`;

export const OrderSummaryDetailsDescription = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 10px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    margin: 0 0 0 20px;
  }

  p {
    margin: 5px 0 0;
    font-size: 14px;
    color: ${({ theme }) => theme.palette.gray};
  }
`;

export const OrderSummaryDetailsPrice = styled.div`
  align-self: flex-start;
  margin-left: 15px;
  margin-right: 10px;
`;

export const OrderSummaryDiscountedPrice = styled.div`
  position: relative;

  &:after {
    content: '';
    width: 100%;
    position: absolute;
    right: 0;
    top: 50%;
    border-bottom: 2px solid ${({ theme }) => theme.palette.dark};
    transform: skewY(-10deg);
  }
`;
