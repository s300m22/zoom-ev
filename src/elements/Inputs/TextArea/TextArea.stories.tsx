import { Story, Meta } from '@storybook/react/types-6-0';
import TextArea, { TextAreaProps } from './TextArea';

export default {
  title: 'Elements/Inputs/Text Area',
  component: TextArea,
} as Meta;

const Template: Story<TextAreaProps> = (args) => <TextArea {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Example label',
};
