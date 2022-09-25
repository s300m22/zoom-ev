import styled from 'styled-components';

export const SpaceBetweenRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  margin: 0 -30px;
  border-bottom: 1px solid #ececec;
  text-align: center;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;

    > p {
      margin-right: 15px;
    }
  }

  &:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
  }

  > * {
    width: 100%;

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      width: 50%;
    }

    :nth-child(2) {
      ${({ theme }) => theme.up(theme.breakpoints.sm)} {
        text-align: right;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
`;

export const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    align-items: flex-end;
  }
`;

export const TableLikeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #ececec;
  margin: 30px -30px 0;
  padding: 0 30px 20px 30px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-wrap: nowrap;
  }

  div {
    width: 100%;
    text-align: center;
    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      width: 50%;
      text-align: left;
    }
  }
`;
