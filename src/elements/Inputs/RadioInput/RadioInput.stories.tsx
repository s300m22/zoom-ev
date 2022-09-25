import { Story, Meta } from '@storybook/react/types-6-0';
import RadioInput, { RadioInputProps } from './RadioInput';

export default {
  title: 'Elements/Inputs/Radio Input',
  component: RadioInput,
} as Meta;

const Template: Story<RadioInputProps> = (args) => <RadioInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  additionalLabel: 'Extra Long Example Label',
  name: 'ExampleRadio',
  value: 'Example Radio',
  checked: true,
};
