import { Story, Meta } from '@storybook/react/types-6-0';
import CompleteBookingPopup, { CompleteBookingPopupProps } from './CompleteBookingPopup';

export default {
  title: 'Elements/Popups/CompleteBookingPopup',
  component: CompleteBookingPopup,
} as Meta;

const Template: Story<CompleteBookingPopupProps> = (args) => <CompleteBookingPopup {...args} />;

export const Default = Template.bind({});
Default.args = {
  rentalId: '1',
};
