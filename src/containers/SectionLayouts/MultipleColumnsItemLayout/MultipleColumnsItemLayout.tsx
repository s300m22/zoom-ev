import { Document } from '@contentful/rich-text-types';
import React from 'react';
import { Asset } from 'contentful';
import {
  DescriptionWrapper,
  Wrapper,
  StyledReadMoreWrapper,
  HeaderWrapper,
  ImageContainer,
  WidthWrapper,
} from './MultipleColumnsItemLayout.styled';
import { Heading, Button, PlainTextRenderer } from '../../../elements';
import Image from '../../../elements/Image';

interface MultipleColumnsItemLayoutProps {
  title: string;
  description: Document;
  readMoreLink?: string;
  image?: Asset;
  imageMaxWidth?: string;
}

const MultipleColumnsItemLayout = ({
  title,
  description,
  readMoreLink,
  image,
  imageMaxWidth,
}: MultipleColumnsItemLayoutProps) => (
  <WidthWrapper>
    <Wrapper>
      {image && (
        <ImageContainer>
          <Image asset={image} maxWidth={imageMaxWidth} />
        </ImageContainer>
      )}

      <HeaderWrapper>
        <Heading variant="h4">{title}</Heading>
      </HeaderWrapper>
      {description && (
        <DescriptionWrapper>
          <PlainTextRenderer charsLimit={150}>{description}</PlainTextRenderer>
        </DescriptionWrapper>
      )}
      {readMoreLink && (
        <StyledReadMoreWrapper>
          <Button href={readMoreLink} variant="text" withArrow>
            Read more
          </Button>
        </StyledReadMoreWrapper>
      )}
    </Wrapper>
  </WidthWrapper>
);

export default MultipleColumnsItemLayout;
