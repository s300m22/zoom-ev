import styled from 'styled-components';

export const TriggerWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  svg {
    transition: 0.4s all;
  }
`;

export const CollapsibleListWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  .Collapsible {
    margin: 0 -30px;
    padding: 30px;
    color: ${({ theme }) => theme.palette.gray};
    line-height: 24px;
    border-bottom: 1px solid #ececec;
    cursor: pointer;

    .Collapsible__contentInner {
      margin-top: 25px;

      ol,
      ul {
        padding: 0 0 0 20px;
      }
    }

    .Collapsible__trigger {
      width: 100%;
      &.is-open {
        ${TriggerWrapper} {
          svg {
            transform: rotate(-180deg);
          }
        }
      }
    }
  }
`;
