import { Story, Meta } from '@storybook/react/types-6-0';
import Tooltip, { TooltipProps } from './Tooltip';

export default {
  title: 'Elements/Tooltip',
  component: Tooltip,
} as Meta;

const Template: Story<TooltipProps> = (args) => <Tooltip {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  children: <>Lorem Ipsum</>,
};
