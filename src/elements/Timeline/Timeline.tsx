import React from 'react';
import { ITimelineItem } from '../../interfaces/contentful.types.generated';
import { TimelineItem, TimelineWrapper } from './Timeline.styled';
import { Container, RichTextRenderer, Heading } from '../index';

export interface TimelineProps {
  items?: ITimelineItem[];
  direction?: 'vertical' | 'horizontal';
}

const Timeline = ({ items, direction = 'vertical' }: TimelineProps) => (
  <Container>
    <TimelineWrapper direction={direction}>
      {items?.map(({ fields: { title, description, noTitle }, sys }) => (
        <TimelineItem direction={direction} key={sys.id}>
          {!noTitle && <Heading variant="h4">{title}</Heading>}
          {description && <RichTextRenderer>{description}</RichTextRenderer>}
        </TimelineItem>
      ))}
    </TimelineWrapper>
  </Container>
);

export default Timeline;
