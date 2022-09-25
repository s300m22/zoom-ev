import styled from 'styled-components';

export const UpdatePaymentDetailsPopupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    width: 488px;
  }
`;

export const UpdatePaymentMethodTrigger = styled.span`
  font-size: 14px;
  text-decoration: underline;
  font-weight: 500;
  margin-left: 10px;
  width: 100%;
  color: ${(props) =>
    props['aria-disabled'] ? props.theme.palette.red : props.theme.palette.blue};

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    width: auto;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  justify-content: space-between;
  align-self: center;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-wrap: nowrap;
  }

  button {
    width: 100%;
    margin-bottom: 15px;

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      margin-bottom: 0;
      width: auto;

      &:first-of-type {
        margin-right: 20px;
      }
    }
  }
`;

export const UpdatePaymentMethodForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;
