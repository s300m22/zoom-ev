import { Story, Meta } from '@storybook/react/types-6-0';
import UserMenu, { UserMenuProps } from './UserMenu';

export default {
  title: 'Elements/UserMenu',
  component: UserMenu,
} as Meta;

const Template: Story<UserMenuProps> = (args) => <UserMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  ctaLink: undefined,
};
