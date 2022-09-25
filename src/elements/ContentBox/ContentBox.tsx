import { ReactNode } from 'react';
import ContentBoxWrapper from './ContentBox.styled';

export interface ContentBoxProps {
  children?: ReactNode;
}

const ContentBox = ({ children }: ContentBoxProps) => (
  <ContentBoxWrapper>{children}</ContentBoxWrapper>
);

export default ContentBox;
