import { Story, Meta } from '@storybook/react/types-6-0';
import Bubble, { BubbleProps } from './Bubble';

export default {
  title: 'Elements/Bubble',
  component: Bubble,
} as Meta;

const Template: Story<BubbleProps> = (args) => <Bubble {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Lorem Ipsum</>,
};
