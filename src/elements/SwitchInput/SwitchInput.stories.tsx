import { Story, Meta } from '@storybook/react/types-6-0';
import SwitchInput, { SwitchInputProps } from './SwitchInput';

export default {
  title: 'Elements/SwitchInput',
  component: SwitchInput,
} as Meta;

const Template: Story<SwitchInputProps> = (args) => <SwitchInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Lorem Ipsum</>,
};
