import { Story, Meta } from '@storybook/react/types-6-0';
import UpdatePaymentDetailsPopup from './UpdatePaymentDetailsPopup';

export default {
  title: 'Elements/Popups/UpdatePaymentDetailsPopup',
  component: UpdatePaymentDetailsPopup,
} as Meta;

const Template: Story = (args) => <UpdatePaymentDetailsPopup {...args} />;

export const Default = Template.bind({});
Default.args = {};
