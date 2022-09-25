import { ReactNode } from 'react';
import Wrapper from './SwitchInput.styled';

export interface SwitchInputProps {
  children?: ReactNode;
}

const SwitchInput = ({ children }: SwitchInputProps) => <Wrapper>{children}</Wrapper>;

export default SwitchInput;
