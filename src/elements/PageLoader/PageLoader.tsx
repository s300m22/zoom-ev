import { ReactNode } from 'react';
import Wrapper from './PageLoader.styled';

export interface PageLoaderProps {
  children?: ReactNode;
}

const PageLoader = ({ children }: PageLoaderProps) => <Wrapper>{children}</Wrapper>;

export default PageLoader;
