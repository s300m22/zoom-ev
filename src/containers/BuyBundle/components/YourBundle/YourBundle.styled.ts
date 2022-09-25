import styled from 'styled-components';

const YourBundleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    width: 735px;
  }
`;

export default YourBundleWrapper;
