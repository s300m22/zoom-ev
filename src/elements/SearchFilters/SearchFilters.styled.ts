import styled from 'styled-components';

const SearchFiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-direction: row;
  }
`;

export default SearchFiltersWrapper;
