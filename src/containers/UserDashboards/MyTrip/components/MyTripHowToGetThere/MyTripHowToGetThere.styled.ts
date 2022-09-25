import styled from 'styled-components';

export const MyTripHowToGetThereMapWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 292px;
  border-radius: 12px;
  overflow: hidden;
  margin: 30px 0;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    width: 292px;
  }
`;

export const MapMarkWrapper = styled.div`
  position: relative;

  svg {
    position: absolute;
    top: -34px;
    left: -10px;
  }
`;

export const LocationTipsWrapper = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.dark};
`;

export const Copy = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.blue};
  cursor: pointer;
  font-weight: 500;
  margin-left: 15px;
`;

export const PickUpAddressWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
`;
