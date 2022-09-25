import styled from 'styled-components';
import BubbleWrapper from '../../../../elements/Bubble/Bubble.styled';
import { StepRow, StepWrapper } from '../StepsShared.styled';

export const StepOneWrapper = styled(StepWrapper)`
  ${StepRow} {
    &:last-of-type {
      flex-direction: column;

      ${BubbleWrapper} {
        &:first-of-type {
          margin-bottom: 25px;
        }

        ${({ theme }) => theme.up(theme.breakpoints.md)} {
          position: absolute;

          &:first-of-type {
            top: 21.5%;
            margin-bottom: 0;
          }
          &:last-of-type {
            top: 62%;
          }
        }
      }
    }
  }
`;

export const AvatarUploadWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin: 0 0 30px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    margin: 0 0 50px;
  }
`;
export const UploadWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-wrap: nowrap;
  }

  > div:first-of-type {
    margin: 0 auto;
  }
`;

export const UploadButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    margin-left: 32px;
    align-items: flex-start;
    margin-top: 0;
  }
`;

export const UploadParagraph = styled.p`
  margin: 10px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.gray};
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

export const DeleteIconWrapper = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  z-index: 2;
`;
