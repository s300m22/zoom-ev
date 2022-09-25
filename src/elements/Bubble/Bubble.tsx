import { ReactNode } from 'react';
import BubbleWrapper from './Bubble.styled';

type Directions = 'top' | 'right' | 'bottom' | 'left';
export interface BubbleProps {
  children: ReactNode;
  direction?: Directions;
}

const Bubble = ({ children, direction = 'right' }: BubbleProps) => (
  <BubbleWrapper direction={direction}>{children}</BubbleWrapper>
);

export default Bubble;
