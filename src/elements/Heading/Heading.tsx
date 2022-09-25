import { ReactNode } from 'react';
import { H1, H2, H3, H4, H5, H6, H7 } from './Heading.styled';

export type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7';

export interface HeadingProps {
  variant: HeadingVariant;
  superscriptTitle?: string;
  children: ReactNode;
  id?: string;
}

const Heading = ({ variant, superscriptTitle, children, id }: HeadingProps) => {
  const SuperscriptTitle = superscriptTitle && <sup>{superscriptTitle}</sup>;
  const Content = (
    <>
      {children}
      {SuperscriptTitle}
    </>
  );

  switch (variant) {
    case 'h1':
      return <H1 id={id}>{Content}</H1>;
    case 'h2':
      return <H2 id={id}>{Content}</H2>;
    case 'h3':
      return <H3 id={id}>{Content}</H3>;
    case 'h4':
      return <H4 id={id}>{Content}</H4>;
    case 'h5':
      return <H5 id={id}>{Content}</H5>;
    case 'h6':
      return <H6 id={id}>{Content}</H6>;
    case 'h7':
      return <H7 id={id}>{Content}</H7>;
    default:
      return null;
  }
};

export default Heading;
