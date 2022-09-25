import { Story, Meta } from '@storybook/react/types-6-0';
import ReactivateSubscriptionPopup from './ReactivateSubscriptionPopup';

export default {
  title: 'Elements/Popups/ReactivateSubscriptionPopup',
  component: ReactivateSubscriptionPopup,
} as Meta;

const Template: Story = (args) => <ReactivateSubscriptionPopup {...args} />;

export const Default = Template.bind({});
Default.args = {};
