import styled from 'styled-components';

export const UserRatingsWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  margin-left: 20px;
  font-weight: 500;
  font-size: 16px;

  * {
    display: flex;
    height: 100%;
    align-items: center;
  }
`;

export const UserRatingsSvgWrapper = styled.div`
  margin-right: 5px;
`;

export const UserRatingsTotal = styled.p`
  margin: 0 10px;
  color: ${({ theme }) => theme.palette.gray};
  font-weight: 400;
`;
