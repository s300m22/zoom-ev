import styled from 'styled-components';

export const PaymentDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  h4 {
    margin-bottom: 10px;
  }
`;

export const PaymentDetailsParagraph = styled.p`
  margin: 0 0 25px 0;
  font-size: 14px;
  line-height: 21px;
  color: ${({ theme }) => theme.palette.gray};
`;

export const PaymentDetailsOptionalHolder = styled.div`
  margin: 0 0 25px 0;
`;

export const PaymentDetailsOptionalHolderAlt = styled.div`
  margin: 0 0 27px 0;
`;
