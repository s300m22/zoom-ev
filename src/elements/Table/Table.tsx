import styled from 'styled-components';

export const Table = styled.table`
  border-radius: 12px;
  background: #fff;
  box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.1);
  width: 100%;
  text-align: left;
  font-size: 14px;
  line-height: 21px;
  display: block;
  max-width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;

  ${({ theme }) => theme.up(theme.breakpoints.lgWide)} {
    display: table;
    table-layout: fixed;
    word-break: break-word;
  }
`;

export const THead = styled.thead``;

export const TH = styled.th`
  font-weight: 500;
  padding: 30px;
  white-space: nowrap;
`;

export const TR = styled.tr`
  background: #fff;
`;

export const TBody = styled.tbody``;

export const TD = styled.td`
  padding: 20px 30px;
`;

export const TFooter = styled.tfoot``;

export const NoData = styled.td`
  width: 100%;
  padding: 20px 30px;
  text-align: center;
`;
