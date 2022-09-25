import { Story, Meta } from '@storybook/react/types-6-0';
import SimpleCard, { SimpleCardProps } from './SimpleCard';

export default {
  title: 'Elements/SimpleCard',
  component: SimpleCard,
} as Meta;

const Template: Story<SimpleCardProps> = (args) => <SimpleCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Lorem Ipsum</>,
};
