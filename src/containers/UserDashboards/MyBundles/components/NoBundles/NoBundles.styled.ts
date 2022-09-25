import styled from 'styled-components';

export const NoBundlesWrapper = styled.div`
  display: flex;
  height: calc(100% + 50px);
  width: 100%;
  max-width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    max-width: 352px;
    height: calc(100% + 50px);
    margin: -50px auto 0;
  }
`;

export const HeadingWrapper = styled.div`
  margin: 30px 0 50px;
`;

export const ListWrapper = styled.div`
  text-align: center;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin-bottom: 42px;
  }

  > div {
    margin-top: 0;
  }

  ul {
    text-align: left;

    li {
      font-size: 16px;
      color: ${({ theme }) => theme.palette.gray};
      font-weight: 500;
    }
  }
`;
