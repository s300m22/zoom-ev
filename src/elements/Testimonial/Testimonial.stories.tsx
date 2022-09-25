import { Story, Meta } from '@storybook/react/types-6-0';
import Testimonial, { TestimonialProps } from './Testimonial';
import { IAuthor } from '../../interfaces/contentful.types.generated';

export default {
  title: 'Elements/Testimonial',
  component: Testimonial,
} as Meta;

const Template: Story<TestimonialProps> = (args) => <Testimonial {...args} />;

export const Default = Template.bind({});
Default.args = {
  quote:
    'Having been recommended to Zoom to renew my multi-car policy for my EVs, the service I received was exceptional, the team knew all about EVs and I saved £350 across our two cars. You have to talk to these guys.',
  author: {
    fields: {
      firstName: 'Pippin',
      lastName: 'Pooper',
      location: 'Belfast',
      avatar: {
        fields: {
          file: {
            contentType: 'image/png',
            fileName: 'martin_green.png',
            url: '//images.ctfassets.net/qtza00wly75a/5pV3bagRX5KrE0MEhFAR9X/8de14f8b856ff0f9c0d64f36cae9b445/martin_green.png',
            details: {
              size: 25745,
              image: {
                height: 150,
                width: 150,
              },
            },
          },
          title: 'martin_green',
          description: 'Martin Green',
        },
      },
    },
  } as IAuthor,
};
