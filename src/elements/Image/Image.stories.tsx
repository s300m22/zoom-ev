import { Story, Meta } from '@storybook/react/types-6-0';
import { Asset } from 'contentful';
import Image, { ImageProps } from './Image';

export default {
  title: 'Elements/Image',
  component: Image,
  argTypes: {
    imagePattern: {
      control: {
        type: 'select',
        options: ['None', 'Pattern #1', 'Pattern #2', 'Pattern #3'],
      },
    },
    imageOverlay: {
      controls: {
        type: 'radio',
        options: [true, false],
      },
    },
  },
} as Meta;

const Template: Story<ImageProps> = (args) => <Image {...args} />;

export const Default = Template.bind({});

Default.args = {
  asset: {
    fields: {
      file: {
        contentType: 'image/jpeg',
        fileName: 'people_in_car.jpg',
        url: 'images.ctfassets.net/qtza00wly75a/1wu6f0nc6xt2PFawSLRWV7/5c3cf3d34ea55911d8f2d7a763fcc842/iStock-595728408.jpg',
        details: {
          size: 25745,
          image: {
            height: 869,
            width: 579,
          },
        },
      },
      title: 'People in Car',
      description: 'People in Car',
    },
    sys: {},
  } as Asset,
  imagePattern: 'None',
  imageOverlay: false,
};
