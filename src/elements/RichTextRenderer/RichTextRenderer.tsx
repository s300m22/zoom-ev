/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { ReactElement, ReactNode } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document, BLOCKS, Node, INLINES } from '@contentful/rich-text-types';
import { Asset } from 'contentful';
import { Blockquote, Heading } from '../index';
import { HeadingVariant } from '../Heading/Heading';
import StyledLink from '../StyledLink';
import StyledEmbeddedImage from './RichTextRenderer.styled';
import Image from '../Image';

const renderStyledHeader = (variant: HeadingVariant) => (node: Node, renderChildren: ReactNode) =>
  (
    <Heading
      id={
        (node as any).content.length
          ? (node as any).content[0]?.value.replace('.&nbsp;', '').replace('.', '').trim()
          : ''
      }
      variant={variant}
    >
      {renderChildren}
    </Heading>
  );

const renderHyperlink = () => (node: Node, renderChildren: ReactNode) => {
  const { data } = node;
  return (
    <StyledLink externalLink href={data.uri}>
      {renderChildren}
    </StyledLink>
  );
};

const renderQuote = () => (node: Node, renderChildren: ReactNode) =>
  <Blockquote>{renderChildren}</Blockquote>;

const renderStyledEmbeddedAsset = () => (node: Node) => {
  const { data } = node;
  if (data.target === undefined) return null;
  const { contentType, description, url } = data.target.fields.file;
  if (contentType === undefined) return null;
  if (contentType === 'application/pdf') {
    return (
      <StyledLink externalLink href={url}>
        {description}
      </StyledLink>
    );
  }

  return (
    <StyledEmbeddedImage>
      <Image asset={data.target as Asset} />
    </StyledEmbeddedImage>
  );
};

const renderEntryAssetHyperlink = () => (node: Node, renderChildren: ReactNode) => {
  const { data } = node;
  if (data.target.sys.contentType.sys.id === 'blogPost')
    return <StyledLink href={`/blog/${data.target?.fields.slug}`}>{renderChildren}</StyledLink>;
  return <StyledLink href={data.target?.fields.urlSlug}>{renderChildren}</StyledLink>;
};

const options = {
  renderNode: {
    [BLOCKS.HEADING_1]: renderStyledHeader('h1'),
    [BLOCKS.HEADING_2]: renderStyledHeader('h2'),
    [BLOCKS.HEADING_3]: renderStyledHeader('h3'),
    [BLOCKS.HEADING_4]: renderStyledHeader('h4'),
    [BLOCKS.HEADING_5]: renderStyledHeader('h5'),
    [BLOCKS.HEADING_6]: renderStyledHeader('h6'),
    [BLOCKS.QUOTE]: renderQuote(),
    [BLOCKS.EMBEDDED_ASSET]: renderStyledEmbeddedAsset(),
    [INLINES.HYPERLINK]: renderHyperlink(),
    [INLINES.ENTRY_HYPERLINK]: renderEntryAssetHyperlink(),
    [INLINES.ASSET_HYPERLINK]: renderEntryAssetHyperlink(),
  },
  renderText: (text: string) =>
    text.split('\n').reduce<string[]>((children: string[], textSegment: string, index: number) => {
      // eslint-disable-next-line react/no-array-index-key
      return [...children, index > 0 && <br key={index} />, textSegment] as string[];
    }, []),
};

interface RichTextRendererProps {
  children?: Document;
}

const RichTextRenderer = ({ children }: RichTextRendererProps) => {
  if (!children) return null;

  return documentToReactComponents(children, options) as ReactElement | null;
};

export default RichTextRenderer;
