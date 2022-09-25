import styled from 'styled-components';

export const SubscribeCustomerForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const SubscribeCustomerBody = styled.div`
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

  button {
    margin-right: 20px;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 15px -10px;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    padding-top: 20px;
  }
`;

export const TermsCheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin: 30px 0;
  }

  label > span {
    margin-left: 0;

    a {
      font-weight: 400;
      margin-left: -10px;
      display: inline;
    }
  }
`;

export const NotificationText = styled.p`
  font-size: 14px;
  font-size: 14px;
  line-height: 150%;
  color: ${({ theme }) => theme.palette.gray};
  margin: 0 0 20px 0;
  width: 100%;
`;

export const InputWrapper = styled.div`
  margin-top: 5px;
`;
