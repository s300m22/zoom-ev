import styled from 'styled-components';

export const NoCarsWrapper = styled.div`
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
