import styled from 'styled-components';

interface DropZoneInputWrapperProps {
  isDisabled: boolean;
  isUploading: boolean;
  isAvatar: boolean;
}

export const DropZoneInputWrapper = styled.div<DropZoneInputWrapperProps>`
  flex-direction: column;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'auto')};
  opacity: ${({ isDisabled }) => (isDisabled ? '0.5' : '1')};
  position: relative;
  ${({ isUploading, isAvatar }) =>
    isUploading
      ? `&:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    border-radius: ${isAvatar ? '50%' : '0'};
    background-image: url('/images/icons/loader-spiner.svg');
    background-color: rgba(240, 244, 247, 0.6);
    background-position: center;
    background-repeat: no-repeat;
  }`
      : ''};
`;

interface UploadImageWrapperProps {
  isDisabled: boolean;
}

export const UploadImageWrapper = styled.div<UploadImageWrapperProps>`
  display: flex;
  flex-direction: column;
  margin: 0;
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'auto')};
`;

export const UploadDropZoneLabel = styled.p`
  color: ${({ theme }) => theme.palette.dark};
  margin: 0 0 10px;
`;

interface UploadDropZoneWrapperProps {
  isAvatar: boolean;
}

export const UploadDropZoneWrapper = styled.div<UploadDropZoneWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.1);
  border-radius: 12px;
  height: ${({ isAvatar }) => (isAvatar ? '125px' : '150px')};
  width: ${({ isAvatar }) => (isAvatar ? '125px' : '150px')};
  background: #f2f2f2;
  border: 4px solid #fff;
  color: ${({ theme }) => theme.palette.gray};
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: 0.3s all;
  border-radius: ${({ isAvatar }) => (isAvatar ? '50%' : '0')};
  overflow: hidden;

  &:hover {
    box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.2);
  }
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
`;

export const DeleteIconWrapper = styled.div`
  position: absolute;
  top: 1px;
  right: 4px;
  padding: 10px;
  z-index: 2;
`;

export const TakePhotoButtonWrapper = styled.div`
  margin: 20px 0 0;
`;

export const CameraWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: 3;
  background: #fff url('/images/icons/loader-spiner.svg');
  background-position: center;
  background-repeat: no-repeat;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.1);
    width: 768px;
    height: 576px;
    left: 50%;
    transform: translate(-50%, -50%);
    outline: 3px solid #fff;
  }

  #outer-circle {
    cursor: pointer;
  }
`;

export const CameraClose = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  width: 25px;
  height: 25px;
  opacity: 1;
  border-radius: 50%;
  cursor: pointer;
  z-index: 3;
  background: rgba(255, 255, 255, 0.75);
  padding: 6px;
  opacity: 0.5;
  box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.1);

  &:hover {
    opacity: 1;
  }

  &::before,
  &::after {
    position: absolute;
    left: 50%;
    content: ' ';
    height: 14px;
    width: 2px;
    background-color: #333;
  }

  &::before {
    transform: translateX(-50%) rotate(45deg);
  }

  &::after {
    transform: translateX(-50%) rotate(-45deg);
  }
`;

export const Error = styled.div`
  color: ${({ theme: { palette } }) => palette.error};
  font-size: 13px;
  margin: 5px 0px 5px 5px;
  min-height: 13px;

  &:first-of-type {
    margin-top: 15px;
  }
`;

export const ErrorWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
