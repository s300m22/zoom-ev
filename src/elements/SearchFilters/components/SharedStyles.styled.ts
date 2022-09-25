import styled from 'styled-components';

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FilterFooter = styled.div`
  width: 100%;
  display: flex;
  button {
    margin-right: 10px;

    &:last-of-type() {
      margin-right: 0;
    }
  }
`;
