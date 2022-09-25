import { Story, Meta } from '@storybook/react/types-6-0';
import RadioFormInput, { RadioFormInputProps } from './RadioFormInput';

export default {
  title: 'Elements/RadioFormInput',
  component: RadioFormInput,
} as Meta;

const Template: Story<RadioFormInputProps> = (args) => <RadioFormInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Lorem Ipsum</>,
};
