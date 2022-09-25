import styled from 'styled-components';

export const Wrapper = styled.div`
  overflow-x: auto;
  width: 100%;
`;
export const Table = styled.table`
  border-collapse: collapse;
  tr {
    border-bottom: 1.5px solid lightgray;
    &.first,
    &.last {
      border-bottom: 0;
    }
    th {
      text-align: left;
      width: 220px;
      vertical-align: top;
      padding-top: 18px;
      padding-bottom: 18px;
      padding-right: 15px;
    }
    td {
      padding: 18px 25px;
      text-align: center;
      vertical-align: top;
      font-size: 14px;
      &.th-logo {
        padding-top: 0;
        vertical-align: bottom;
        .mptitle {
          border: 1px solid #00bff3;
          padding: 4px;
          text-align: center;
          margin: 1px;
          margin-bottom: 20px;
          width: 100%;
          background-color: white;
          border-radius: 6px;
        }
        .logoish {
          max-width: 80px;
          max-height: 60px;
          margin: auto;
        }
        padding: 0 0 0 0;
        padding-bottom: 20px;
      }
      &.mp {
        background-color: rgb(0 191 243 / 9%);
        &.th-logo {
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
      }
    }
    &.tr-logo {
      th {
        vertical-align: middle;
      }
    }
  }

  .action {
    /* display: flex; */
    align-items: center;
    justify-content: center;
    button {
      margin: auto;
    }
  }

  &.mobile {
    td,
    th {
      vertical-align: middle;
      min-width: 140px !important;
      text-align: center;
    }
    .tr-logo {
      padding: 0px 25px;
      /* padding: 0 0 0 0; */
    }
  }
`;
