import styled from 'styled-components';

export const CancelBookingWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    justify-content: flex-end;
  }
`;

export const CancelBookingConfirm = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    justify-content: flex-end;
  }

  button {
    margin-top: 15px;

    :first-of-type {
      margin-right: 15px;
    }

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      margin-top: 0;
    }
  }
`;
