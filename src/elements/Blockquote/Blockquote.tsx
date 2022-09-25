import { ReactNode } from 'react';
import Wrapper from './Blockquote.styled';

export interface BlockquoteProps {
  children?: ReactNode;
}

const Blockquote = ({ children }: BlockquoteProps) => <Wrapper>{children}</Wrapper>;

export default Blockquote;
