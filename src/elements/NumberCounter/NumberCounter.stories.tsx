import { Story, Meta } from '@storybook/react/types-6-0';
import NumberCounter, { NumberCounterProps } from './NumberCounter';

export default {
  title: 'Elements/NumberCounter',
  component: NumberCounter,
} as Meta;

const Template: Story<NumberCounterProps> = (args) => <NumberCounter {...args} />;

export const Default = Template.bind({});
Default.args = {
  countTo: 2500,
};
