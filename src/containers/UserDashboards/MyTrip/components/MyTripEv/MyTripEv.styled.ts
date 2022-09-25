import styled from 'styled-components';

export const CarCardPhotoWrapper = styled.div`
  border-radius: 8px;
  width: 100%;
  height: auto;
  margin: 30px auto 25px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    margin-bottom: 0;
    width: 292px;
  }
`;

export default CarCardPhotoWrapper;
