import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { Document } from '@contentful/rich-text-types';
import { getTextWithLimit } from '../../utils';

export interface PlainTextRendererProps {
  children?: Document;
  charsLimit?: number;
  toFirstDot?: boolean;
}

const PlainTextRenderer = ({ children, charsLimit, toFirstDot }: PlainTextRendererProps) => {
  if (!children) return null;
  const plainText = documentToPlainTextString(children);
  const formattedText = getTextWithLimit({ text: plainText, limit: charsLimit, toFirstDot });

  return <>{formattedText}</>;
};

export default PlainTextRenderer;
