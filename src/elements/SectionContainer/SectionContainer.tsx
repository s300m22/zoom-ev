import { ReactNode } from 'react';
import { CustomStylesContainer, AlignmentContainer } from './SectionContainer.styled';

export type Background = 'light' | 'dark' | string;

export interface SectionContainerProps {
  children: ReactNode;
  background?: Background;
  padding?: string;
  margin?: string;
}

const SectionContainer = ({
  children,
  background = 'light',
  padding = '0px',
  margin = '0 auto',
}: SectionContainerProps) => (
  <CustomStylesContainer background={background} margin={margin} padding={padding}>
    <AlignmentContainer>{children}</AlignmentContainer>
  </CustomStylesContainer>
);

export default SectionContainer;
