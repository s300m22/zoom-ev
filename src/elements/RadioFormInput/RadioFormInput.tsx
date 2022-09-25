import { ReactNode } from 'react';
import Wrapper from './RadioFormInput.styled';

export interface RadioFormInputProps {
  children?: ReactNode;
}

const RadioFormInput = ({ children }: RadioFormInputProps) => <Wrapper>{children}</Wrapper>;

export default RadioFormInput;
