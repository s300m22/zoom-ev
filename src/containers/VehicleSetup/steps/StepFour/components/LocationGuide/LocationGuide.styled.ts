import styled from 'styled-components';
import BubbleWrapper from '../../../../../../elements/Bubble/Bubble.styled';
import { StepWrapper } from '../../../../../IntroduceYourself/steps/StepsShared.styled';

export const LocationGuideWrapper = styled(StepWrapper)`
  ${BubbleWrapper} {
    top: 0 !important;
  }
`;

export default LocationGuideWrapper;
