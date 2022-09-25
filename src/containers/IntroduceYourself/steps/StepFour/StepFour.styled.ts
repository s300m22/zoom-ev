import styled from 'styled-components';
import { DoubleInputWrapper, StepRow, StepWrapper } from '../StepsShared.styled';
import BubbleWrapper from '../../../../elements/Bubble/Bubble.styled';

const StepFourWrapper = styled(StepWrapper)`
  ${DoubleInputWrapper} {
    :first-of-type {
      > div {
        margin-bottom: 30px;
      }
    }
  }
  ${StepRow} {
    &:last-of-type {
      flex-direction: column;

      ${BubbleWrapper} {
        align-items: flex-start;
        &:first-of-type {
          margin-bottom: 25px;
        }

        ${({ theme }) => theme.up(theme.breakpoints.md)} {
          position: absolute;

          &:first-of-type {
            top: 27.5%;
            margin-bottom: 0;
          }

          &:last-of-type {
            top: 65%;
          }
        }
      }
    }
  }
`;

export default StepFourWrapper;
