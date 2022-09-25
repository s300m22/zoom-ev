import { Story, Meta } from '@storybook/react/types-6-0';
import FormRadioInput, { RadioInputProps } from './FormRadioInput';

export default {
  title: 'Elements/Inputs/Form Radio Input',
  component: FormRadioInput,
} as Meta;

const Template: Story<RadioInputProps> = (args) => <FormRadioInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'ExampleRadio',
  value: 'Example Radio',
  checked: true,
};
