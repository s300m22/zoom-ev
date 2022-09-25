import { Story, Meta } from '@storybook/react/types-6-0';
import ShareBanner, { ShareBannerProps } from './ShareBanner';

export default {
  title: 'Elements/ShareBanner',
  component: ShareBanner,
} as Meta;

const Template: Story<ShareBannerProps> = (args) => <ShareBanner {...args} />;

export const Default = Template.bind({});
