import { Story, Meta } from '@storybook/react/types-6-0';
import CancelSubscriptionPopup from './CancelSubscriptionPopup';

export default {
  title: 'Elements/Popups/CancelSubscriptionPopup',
  component: CancelSubscriptionPopup,
} as Meta;

const Template: Story = (args) => <CancelSubscriptionPopup {...args} />;

export const Default = Template.bind({});
Default.args = {};
