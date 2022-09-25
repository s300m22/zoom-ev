import { Story, Meta } from '@storybook/react/types-6-0';
import DateInput, { InputProps } from './DateInput';

export default {
  title: 'Elements/Inputs/DateInput',
  component: DateInput,
} as Meta;

const Template: Story<InputProps> = (args) => <DateInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'dateInput',
  label: 'Example Date Input',
};
