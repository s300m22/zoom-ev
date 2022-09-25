import { Story, Meta } from '@storybook/react/types-6-0';
import CarSearchBar from './CarSearchBar';

export default {
  title: 'Elements/CarSearchBar',
  component: CarSearchBar,
} as Meta;

const Template: Story = () => <CarSearchBar />;

export const Default = Template.bind({});
Default.args = {};
