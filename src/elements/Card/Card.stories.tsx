import { Asset } from 'contentful';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Document } from '@contentful/rich-text-types';
import Card, { CardProps } from './Card';
import { INavigationLink } from '../../interfaces/contentful.types.generated';

export default {
  title: 'Elements/Card',
  component: Card,
} as Meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Example card',
  image: {
    fields: {
      file: {
        contentType: 'image/png',
        fileName: 'icon.png',
        url: 'images.ctfassets.net/qtza00wly75a/1rOlXnvqu1QYiDJfPdT2Ux/4ad849f78abbf8bf797f370e0d5b03c8/Group_197.png',
        details: {
          size: 25745,
          image: {
            height: 64,
            width: 64,
          },
        },
      },
      title: 'banner_icon',
      description: 'Banner Icon',
    },
    sys: {},
  } as Asset,
  cta: {
    fields: {
      label: 'Learn more',
      customUrl: 'https://www.zoom-ev.com/',
    },
  } as INavigationLink,
  body: {
    content: [
      {
        content: [
          {
            nodeType: 'text',
            marks: new Array(0),
            value: 'When the pants screams for norman island, all lads trade wet, evil pins.',
          },
        ],
        nodeType: 'paragraph',
      },
    ],
    nodeType: 'document',
  } as Document,
  showDotIcon: false,
};

export const Simple = Template.bind({});
Simple.args = {
  title: 'Example card',
  body: {
    content: [
      {
        content: [
          {
            nodeType: 'text',
            marks: new Array(0),
            value: 'When the pants screams for norman island, all lads trade wet, evil pins.',
          },
        ],
        nodeType: 'paragraph',
      },
    ],
    nodeType: 'document',
  } as Document,
  imagePosition: 'left',
  showDotIcon: true,
};
