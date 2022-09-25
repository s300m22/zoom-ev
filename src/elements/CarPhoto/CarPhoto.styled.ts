import styled from 'styled-components';

interface CarPhotoWrapperProps {
  width: string;
  height: string;
}

export const CarPhotoWrapper = styled.div<CarPhotoWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.1);
  border-radius: 8px;
  background: #f2f2f2;
  border: 4px solid #fff;
  transition: 0.3s all;
  overflow: hidden;
  width: 100%;
  height: auto;
  margin: 0 auto;

  @supports (aspect-ratio: 40/319) {
    aspect-ratio: 40/31;
  }

  @supports (not (aspect-ratio: 40/31)) {
    svg {
      margin: 100px 0;
    }
  }

  &:hover {
    box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.2);
  }

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    width: ${({ width }) => width};
    height: ${({ height }) => height};
  }
`;

export const CarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
