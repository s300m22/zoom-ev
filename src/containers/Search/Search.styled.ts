import styled from 'styled-components';

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: rgb(241, 242, 243);
  margin: 0 -15px;
  padding: 0 15px;
`;

export const MapWrapper = styled.div``;

export const SearchBarWrapper = styled.div`
  display: flex;
  margin: 30px 0;
  width: 100%;

  form {
    width: 100%;
  }
`;

export const SearchResultsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    flex-wrap: nowrap;
    margin-left: calc(50vw - 560px);
  }
`;
