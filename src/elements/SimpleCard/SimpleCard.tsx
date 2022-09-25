import { ReactNode } from 'react';
import { CSSProperties } from 'styled-components';
import { SimpleCardFooter, SimpleCardWrapper } from './SimpleCard.styled';

export interface SimpleCardProps {
  children?: ReactNode;
  customStyles?: CSSProperties;
  footer?: ReactNode;
  footerVariant?: 'light' | 'dark';
}

const SimpleCard = ({
  children,
  customStyles,
  footer,
  footerVariant = 'light',
}: SimpleCardProps) => (
  <SimpleCardWrapper style={customStyles}>
    {children}
    {footer && <SimpleCardFooter variant={footerVariant}>{footer}</SimpleCardFooter>}
  </SimpleCardWrapper>
);

export default SimpleCard;
