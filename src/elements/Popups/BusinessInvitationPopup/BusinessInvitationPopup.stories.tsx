import { Story, Meta } from '@storybook/react/types-6-0';
import BusinessInvitationPopup, { BusinessInvitationPopupProps } from './BusinessInvitationPopup';

export default {
  title: 'Elements/Popups/ReceivedBundlePopup',
  component: BusinessInvitationPopup,
} as Meta;

const Template: Story<BusinessInvitationPopupProps> = (args) => (
  <BusinessInvitationPopup {...args} />
);

export const Default = Template.bind({});
Default.args = {
  // receivedBundles: <>Lorem Ipsum</>,
};
