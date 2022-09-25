import styled from 'styled-components';

export const MyBookingWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  grid-column-gap: 32px;
  grid-row-gap: 32px;

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    grid-template-columns: 2.2fr 1fr;
  }

  > * {
    align-self: flex-start;
  }
`;

export const X = styled.div``;
