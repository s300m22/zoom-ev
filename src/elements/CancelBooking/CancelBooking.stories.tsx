import { Story, Meta } from '@storybook/react/types-6-0';
import CancelBooking, { CancelBookingProps } from './CancelBooking';

export default {
  title: 'Elements/CancelBooking',
  component: CancelBooking,
} as Meta;

const Template: Story<CancelBookingProps> = (args) => <CancelBooking {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: '1',
};
