import styled from 'styled-components';
import { CarPhotoWrapper } from '../../../../elements/CarPhoto/CarPhoto.styled';
import {
  CarCardFooter,
  CarCardPhotoWrapper,
  CarCardWrapper,
} from '../CarsListing/components/CarCard/CarCard.styled';

export const MapWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  margin-bottom: 30px;

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    width: calc(100% - 745px);
    margin-bottom: 0;
  }

  > div {
    width: calc(100% - 745px);

    ${({ theme }) => theme.up(theme.breakpoints.lg)} {
      position: sticky !important;
      top: 0;
    }
  }
`;

export const MapMarkWrapper = styled.div`
  position: relative;
  z-index: 1;
  cursor: pointer;

  svg {
    position: absolute;
    top: -34px;
    left: -10px;
  }

  ${CarCardWrapper} {
    display: flex;
    position: absolute;
    height: auto;
    width: 250px;
    font-size: 16px;
    z-index: 1;

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      width: 352px;
    }

    ::after {
      content: ' ';
      position: absolute;
      top: 100%; /* At the bottom of the tooltip */
      left: 50%;
      margin-left: -10px;
      border-width: 10px;
      border-style: solid;
      border-color: #fff transparent transparent transparent;
    }

    svg {
      position: static;
    }

    ${CarCardPhotoWrapper} {
      margin-bottom: 10px;
      ${CarPhotoWrapper} {
        height: 125px;
      }
    }

    ${CarCardFooter} {
      margin-top: 0;
    }
  }
`;

export const MapMarkTooltip = styled.div`
  position: absolute;
  top: -83px;
  left: -24px;
  padding: 10px;
  border-radius: 6px;
  color: #fff;
  font-size: 14px;
  z-index: 2;
  background: ${({ theme: { palette } }) => palette.dark};

  ::after {
    content: ' ';
    position: absolute;
    top: 100%; /* At the bottom of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${({ theme: { palette } }) => palette.dark} transparent transparent transparent;
  }
`;

export const ClusterMarker = styled.div`
  color: #fff;
  background: #25abab;
  border-radius: 50%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 15px;
  border: 1px solid ${({ theme: { palette } }) => palette.secondary};
  box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.9);
  cursor: pointer;
`;
