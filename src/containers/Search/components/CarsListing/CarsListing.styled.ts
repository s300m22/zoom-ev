import styled from 'styled-components';

export const CarsListingWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  margin: 30px 0;

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    width: 745px;
    margin: 30px 32px 30px 0;
  }
`;

export const CarsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  margin: 30px 0;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 32px;
    grid-row-gap: 32px;
    justify-content: center;
  }
`;
