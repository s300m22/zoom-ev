import styled from 'styled-components';
import BubbleWrapper from '../../../../elements/Bubble/Bubble.styled';
import {
  DropZoneInputWrapper,
  UploadDropZoneWrapper,
  UploadImageWrapper,
} from '../../../../elements/DropZoneInput/DropZoneInput.styled';
import { StepWrapper } from '../StepsShared.styled';

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
    height: 95px;
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
    height: 200px;
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
  margin-top: 30px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    margin-top: 0;
  }

  ${DropZoneInputWrapper} {
    width: 100%;

    ${UploadDropZoneWrapper} {
      width: 100%;
    }
  }
`;

export const PhotosTitle = styled.div`
  display: flex;
  width: 100%;
  color: ${({ theme }) => theme.palette.dark};
  margin: 24px 0 10px;
  font-weight: 500;
`;

export const StepTwoBubbleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const StepTwoTitle = styled.div`
  width: 100%;
`;

export const StepTwoElement = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  color: ${({ theme }) => theme.palette.gray};
  font-size: 14px;
  line-height: 21px;
  margin: 20px 0 10px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    width: 50%;
  }

  svg {
    margin-bottom: 10px;
  }

  &:nth-last-of-type(-n + 2) {
    margin-bottom: 60px;
  }
`;

export const StepTwoWrapper = styled(StepWrapper)`
  ${BubbleWrapper} {
    align-items: flex-start;

    &:last-of-type {
      margin-top: 30px;
    }
  }
`;
