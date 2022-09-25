import { Story, Meta } from '@storybook/react/types-6-0';
import ContentAligner, { ContentAlignerProps } from './ContentAligner.styled';

export default {
  title: 'Elements/ContentAligner',
  component: ContentAligner,
  argTypes: {
    additionalContentHorizontalAlignment: {
      control: {
        type: 'select',
        options: ['center', 'start', null],
      },
    },
    additionalContentVerticalAlignment: {
      control: {
        type: 'select',
        options: ['center', 'top', null],
      },
    },
  },
} as Meta;

const Template: Story<ContentAlignerProps> = (args) => <ContentAligner {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <div>
      <h1>Energy doesnt cheerfully synthesise any therapist — but the seeker is what rises.</h1>
      <p>Parasites are the vogons of the extraterrestrial plasma.</p>
    </div>
  ),
  additionalContentHorizontalAlignment: 'start',
  additionalContentVerticalAlignment: 'center',
  width: '100%',
};
