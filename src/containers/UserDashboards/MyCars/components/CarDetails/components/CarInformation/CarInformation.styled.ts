import styled from 'styled-components';

export const CarFeaturesList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 0px;
  margin-top: 10px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const CarFeaturesWrapper = styled.div`
  margin-top: 30px;
`;

export const CarValueNotification = styled.span`
  display: block;
  font-size: 15px;
  margin-top: -10px;
  color: gray;
`;
