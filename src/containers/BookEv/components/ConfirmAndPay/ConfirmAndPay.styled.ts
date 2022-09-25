import styled from 'styled-components';
import ContentBoxWrapper from '../../../../elements/ContentBox/ContentBox.styled';

export const ConfirmAndPayWrapper = styled.div`
  margin: 30px 0 0;
  display: flex;
  flex-wrap: wrap;

  h5 {
    width: 100%;
  }
`;

export const BookingDatesWrapper = styled.div`
  width: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    width: 50%;
  }
`;

export const LocationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  width: 100%;
`;

export const PaywithWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  width: 100%;
`;

export const LocationText = styled.p`
  margin: 30px 0 10px;
  color: ${({ theme }) => theme.palette.dark};
  font-weight: 500;
`;

export const LocationCardMapWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 292px;
  border-radius: 12px;
  overflow: hidden;
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

export const CancelationContentBox = styled(ContentBoxWrapper)`
  width: 100%;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.palette.gray};
  h5 {
    color: ${({ theme }) => theme.palette.dark};
  }
`;

export const AddPaymentMethodWrapper = styled.div`
  margin-bottom: 30px;
`;
