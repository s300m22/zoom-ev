import styled from 'styled-components';

export const AddPaymentMethodForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const AddPaymentMethodWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    width: 488px;
  }

  h3 {
    text-align: center;
    width: 100%;
    margin-bottom: 30px;
  }
`;

export const PopupFooterAction = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;

  button {
    margin-right: 20px;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

export const PaymentDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  h4 {
    margin-bottom: 10px;
  }
`;
