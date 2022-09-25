import { Story, Meta } from '@storybook/react/types-6-0';
import UserRatings, { UserRatingsProps } from './UserRatings';

export default {
  title: 'Elements/UserRatings',
  component: UserRatings,
} as Meta;

const Template: Story<UserRatingsProps> = (args) => <UserRatings {...args} />;

export const Default = Template.bind({});
Default.args = {
  avgScore: 4.5,
  totalReviews: 135,
};
