import styled from 'styled-components';
import BubbleWrapper from '../../../../elements/Bubble/Bubble.styled';
import { StepRow, StepWrapper } from '../StepsShared.styled';

export const StepThreeWrapper = styled(StepWrapper)`
  ${StepRow} {
    &:last-of-type {
      flex-direction: column;

      ${BubbleWrapper} {
        ${({ theme }) => theme.up(theme.breakpoints.md)} {
          position: absolute;
          bottom: 60px;
        }
      }
    }
  }
`;

export const CheckCodeWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  p,
  span {
    margin: 5px 0 0;
  }

  a {
    font-size: 14px;
  }
`;
