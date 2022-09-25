import styled from 'styled-components';

export const NoTripsWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 150px auto;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    max-width: 352px;
  }
`;

export const HeadingWrapper = styled.div`
  margin: 30px 0 50px;
`;
