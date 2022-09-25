import { Story, Meta } from '@storybook/react/types-6-0';
import StrikethroughText, { StrikethroughTextProps } from './StrikethroughText';

export default {
  title: 'Elements/StrikethroughText',
  component: StrikethroughText,
} as Meta;

const Template: Story<StrikethroughTextProps> = (args) => <StrikethroughText {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Lorem Ipsum</>,
};
