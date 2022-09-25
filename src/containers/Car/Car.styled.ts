import styled from 'styled-components';

export const CarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 130px;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    display: grid;
    grid-template-rows: 1fr;
    grid-row-gap: 32px;
    grid-column-gap: 32px;
    grid-template-columns: 736px 352px;
  }

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    grid-template-columns: 736px 352px;
  }
`;
export const CarInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  > div {
    align-self: flex-start;
    margin-bottom: 32px;
    width: 100%;
  }
`;

export const GoBackWrapper = styled.div`
  p {
    margin: 0;
    padding: 30px 0;
  }
`;

export const CarAvailableForSaleWrapper = styled.div`
  width: 100%;
  min-height: 20px;
  grid-column: 1/3;
`;
