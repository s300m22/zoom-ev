import { Story, Meta } from '@storybook/react/types-6-0';
import StatusLabel, { StatusLabelProps } from './StatusLabel';

export default {
  title: 'Elements/StatusLabel',
  component: StatusLabel,
} as Meta;

const Template: Story<StatusLabelProps> = (args) => <StatusLabel {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Lorem Ipsum</>,
};
