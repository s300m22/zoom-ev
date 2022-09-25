import { Story, Meta } from '@storybook/react/types-6-0';
import ReceivedBundlePopup, { ReceivedBundlePopupProps } from './ReceivedBundlePopup';

export default {
  title: 'Elements/Popups/ReceivedBundlePopup',
  component: ReceivedBundlePopup,
} as Meta;

const Template: Story<ReceivedBundlePopupProps> = (args) => <ReceivedBundlePopup {...args} />;

export const Default = Template.bind({});
Default.args = {
  // receivedBundles: <>Lorem Ipsum</>,
};
