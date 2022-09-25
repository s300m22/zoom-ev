import styled from 'styled-components';

export const NoCarsWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  max-width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    max-width: 352px;
    height: 80vh;
    margin: -50px auto 0;
  }
`;

export const HeadingWrapper = styled.div`
  margin: 30px 0 50px;
`;
