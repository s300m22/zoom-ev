import { ReactNode } from 'react';
import Wrapper from './StrikethroughText.styled';

export interface StrikethroughTextProps {
  children?: ReactNode;
}

const StrikethroughText = ({ children }: StrikethroughTextProps) => (
  <Wrapper>
    <span>{children}</span>
  </Wrapper>
);

export default StrikethroughText;
