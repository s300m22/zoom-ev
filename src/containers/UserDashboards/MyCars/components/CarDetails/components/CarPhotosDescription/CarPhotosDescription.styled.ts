import styled from 'styled-components';
import {
  DropZoneInputWrapper,
  UploadDropZoneWrapper,
  UploadImageWrapper,
} from '../../../../../../../elements/DropZoneInput/DropZoneInput.styled';

export const PhotosWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  > div {
    width: 100%;

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      width: calc(100% / 2 - 10px);
    }
  }

  ${UploadDropZoneWrapper} {
    height: 123px;
  }
`;

export const MainPhotoWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  ${DropZoneInputWrapper} {
    display: flex;
    width: 100%;
  }

  ${UploadImageWrapper} {
    width: 100%;
  }

  ${UploadDropZoneWrapper} {
    height: 257px;
    width: 100%;

    &:after {
      content: 'Main photo';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 46px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(6, 16, 39, 0.3);
      border-radius: 12px;
      border-top: none;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }
`;

export const SecondaryPhotosWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  align-self: flex-start;
`;

export const PhotosTitle = styled.div`
  display: flex;
  width: 100%;
  color: ${({ theme }) => theme.palette.dark};
  margin: 24px 0 10px;
  font-weight: 500;
`;
