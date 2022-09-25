import { Story, Meta } from '@storybook/react/types-6-0';
import UserSideBar from './UserSideBar';

export default {
  title: 'Elements/UserSideBar',
  component: UserSideBar,
} as Meta;

const Template: Story = () => <UserSideBar />;

export const Default = Template.bind({});

Default.parameters = {
  backgrounds: { default: 'dark' },
};
