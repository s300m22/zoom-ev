import styled from 'styled-components';

export const NoResultsWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  margin: 50px 0 20px;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    width: 200%;
    max-width: 200%;
    margin: 100px 0 50px;
  }
`;

export const HeadingWrapper = styled.div`
  margin: 30px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  padding-bottom: 50px;
  width: 100%;
`;

export const ShowEVsButtonWrapper = styled.div`
  margin: 0 auto;
`;
