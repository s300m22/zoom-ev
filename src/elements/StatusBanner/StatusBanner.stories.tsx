import { Story, Meta } from '@storybook/react/types-6-0';
import StatusBanner, { StatusBannerProps } from './StatusBanner';

export default {
  title: 'Elements/StatusBanner',
  component: StatusBanner,
} as Meta;

const Template: Story<StatusBannerProps> = (args) => <StatusBanner {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Lorem Ipsum</>,
};
