import styled from 'styled-components';

export const LocationCardSubtitle = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.palette.dark};
`;

export const LocationCardMapWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 292px;
  border-radius: 12px;
  overflow: hidden;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    width: 292px;
  }
`;

export const MapMarkRadius = styled.div<{ markerSize: number }>`
  width: ${({ markerSize }) => markerSize}px;
  height: ${({ markerSize }) => markerSize}px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #54c0ef;
  background: linear-gradient(
    67.36deg,
    rgba(84, 239, 208, 0.4) 3.11%,
    rgba(0, 191, 243, 0.4) 100.02%
  );
`;

export const AddressTextNotice = styled.div`
  margin-top: -5px;
  margin-bottom: 15px;
  font-size: 15px;
  color: gray;
  font-weight: 400;
  span {
    margin-left: 6px;
  }
`;
