import styled from 'styled-components';
import { DoubleInputWrapper, Label } from '../../../Inputs';
import { FilterWrapper } from '../SharedStyles.styled';

export const AllFiltersWrapper = styled(FilterWrapper)`
  width: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    width: 544px;
  }

  ${DoubleInputWrapper} {
    margin-bottom: 25px;
  }

  ${Label} {
    font-weight: 500;
  }
`;

export const RowLabel = styled.p`
  font-weight: 500;
  margin: 0 0 20px;
  color: ${({ theme }) => theme.palette.dark};
`;

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
`;

export const CarFeaturesWrapper = styled.div`
  margin-top: 30px;
`;
