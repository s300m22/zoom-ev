import { Story, Meta } from '@storybook/react/types-6-0';
import { ReactCodeInputProps } from 'react-code-input';
import CodeInput from './CodeInput';

export default {
  title: 'Elements/Inputs/CodeInput',
  component: CodeInput,
} as Meta;

const Template: Story<ReactCodeInputProps> = (args) => <CodeInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  fields: 6,
  inputMode: 'latin',
  name: 'PIN for my card',
  type: 'number',
};
