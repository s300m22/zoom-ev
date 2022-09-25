import { ReactNode } from 'react';
import PreloaderWrapper from './Preloader.styled';

export interface PreloaderProps {
  children?: ReactNode;
}

const Preloader = ({ children }: PreloaderProps) => <PreloaderWrapper>{children}</PreloaderWrapper>;

export default Preloader;
