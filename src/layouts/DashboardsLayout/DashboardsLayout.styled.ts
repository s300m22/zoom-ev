import styled from 'styled-components';
import { Container } from '../../elements';
import { SimpleCardWrapper } from '../../elements/SimpleCard/SimpleCard.styled';

export const DashboardsLayoutWrapper = styled.div`
  background: #f0f4f7; // ${({ theme }) => theme.palette.lightBackground};
  /* position: relative; */

  &:after {
    content: '';
    position: sticky;
    z-index: -1;
    width: 150vw;
    height: 100%;
    left: -50vw;
    top: 0;
    background: ${({ theme }) => theme.palette.lightBackground};
  }

  ${Container} {
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;

    ${({ theme }) => theme.up(theme.breakpoints.md)} {
      flex-wrap: nowrap;
    }
  }
`;

export const DashboardsContent = styled.div`
  margin: 50px 0;
  width: 100%;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    width: calc(100% - 220px);
  }

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    width: calc(100% - 285px);
  }
`;

export const Subtitle = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.palette.gray};
  font-size: 16px;
  line-height: 24px;

  p {
    margin: 10px 0 0;
  }
`;

export const DashboardsContentHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;

  > div {
    width: 100%;
    margin-bottom: 15px;
    text-align: center;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  > button {
    margin-top: 25px;

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      margin-top: 0;
    }
  }

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-wrap: nowrap;
    justify-content: space-between;

    > div {
      text-align: left;
      width: auto;
      margin-bottom: 0;
    }
  }

  span {
    a {
      margin-top: 10px;
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: center;

      ${({ theme }) => theme.up(theme.breakpoints.sm)} {
        justify-content: flex-start;
      }

      svg {
        margin-right: 12px;
      }
    }
  }
`;

export const ChildrenWrapper = styled.div`
  margin-top: 40px;
  height: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin-top: 50px;
  }

  ${SimpleCardWrapper} + ${SimpleCardWrapper} {
    margin-top: 10px;
  }
`;
