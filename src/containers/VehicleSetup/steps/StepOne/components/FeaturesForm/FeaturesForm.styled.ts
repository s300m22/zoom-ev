import styled from 'styled-components';

export const FeaturesTitle = styled.p`
  margin: 0 0 20px 0;
  color: ${({ theme }) => theme.palette.dark};
  font-weight: 500;
  text-align: left;
  width: 100%;

  &:last-of-type {
    margin-top: 10px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;

  > div {
    width: 100%;

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      width: 49%;
    }
  }
`;
