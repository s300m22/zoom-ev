import { Story, Meta } from '@storybook/react/types-6-0';
import PhoneInput, { PhoneInputProps } from './PhoneInput';

export default {
  title: 'Elements/Inputs/Phone Input',
  component: PhoneInput,
} as Meta;

const Template: Story<PhoneInputProps> = (args) => <PhoneInput {...args} />;

export const Default = Template.bind({});
Default.args = {};
