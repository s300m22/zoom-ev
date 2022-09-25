import styled from 'styled-components';
import { PricingForm } from '../../../../elements/CarPricingForm/CarPricingForm.styled';
import BubbleWrapper from '../../../../elements/Bubble/Bubble.styled';
import { StepRow, StepWrapper } from '../StepsShared.styled';

const StepThreeWrapper = styled(StepWrapper)`
  ${StepRow} {
    p {
      margin: 0;
    }

    ${PricingForm} {
      margin-top: 30px;
    }
  }

  ${BubbleWrapper} {
    ${({ theme }) => theme.up(theme.breakpoints.md)} {
      position: absolute;
      top: 0;
    }
  }
`;

export default StepThreeWrapper;
