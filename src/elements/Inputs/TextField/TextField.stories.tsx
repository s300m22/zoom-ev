import { Story, Meta } from '@storybook/react/types-6-0';
import TextField, { InputProps } from './TextField';

export default {
  title: 'Elements/Inputs/Text Field',
  component: TextField,
} as Meta;

const Template: Story<InputProps> = (args) => <TextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Example label',
};
