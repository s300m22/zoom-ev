import { ReactNode } from 'react';
import Wrapper from './HighlightText.styled';

export interface HighlightTextProps {
  text: string;
  highlight: Array<string>;
}

const getHighlightedText = (text: string, highlight: Array<string>): ReactNode => {
  // Split on highlight term and include term into parts, ignore case
  const highLightRegex = new RegExp(`(${highlight.join('|')})`, 'gi');
  const parts = text.split(highLightRegex);
  return (
    <span>
      {parts.map((part, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <span key={i} style={highlight.some((value) => part === value) ? { fontWeight: 700 } : {}}>
          {part}
        </span>
      ))}{' '}
    </span>
  );
};

const HighlightText = ({ text, highlight }: HighlightTextProps) => (
  <Wrapper>{getHighlightedText(text, highlight)}</Wrapper>
);

export default HighlightText;
