import styled from 'styled-components';
import BubbleWrapper from '../../../../elements/Bubble/Bubble.styled';
import { StepRow, StepWrapper } from '../StepsShared.styled';

export const StepFourWrapper = styled(StepWrapper)`
  ${StepRow} {
    :last-of-type {
      ${BubbleWrapper} {
        top: 21%;
        align-items: flex-start;
      }
    }
  }
`;

export default StepFourWrapper;
