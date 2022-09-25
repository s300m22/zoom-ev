import { Story, Meta } from '@storybook/react/types-6-0';
import UserAvatar, { UserAvatarProps } from './UserAvatar';

export default {
  title: 'Elements/UserAvatar',
  component: UserAvatar,
} as Meta;

const Template: Story<UserAvatarProps> = (args) => <UserAvatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  avatarUrl:
    'https://zoom-ev-dev-zoomevdevimagesbucket32c7dc76-2007atjiu1uk.s3.eu-west-1.amazonaws.com/cf6dcd0e-1f5f-4fd3-a567-e505f6ba7311?AWSAccessKeyId=ASIA4VMCOK4SF7UXE3XQ&Expires=1620128053&Signature=wCj2y3l2g4M2uepd08ljfKlvdVA%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEHMaCWV1LXdlc3QtMSJHMEUCIByBtBjv4rQdZpfKuRltfwt3RC6Z0rjaP6anUY0TLhvVAiEAvpLy2iUf4g0uP10lo3PpjNzVaPtSLOV3BvEARMyES%2Bcq%2FQEI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw4NzA1NDEzMTc5MjQiDN54ADWp6h%2BG2JIndirRAcMWOcrRYWo9C8qKHt0jJMFdn5WgWCBoxDi%2FKO0nRxrAM552DerspXmLMe2iXexZYEnapBShnAjyg8Z%2BHEha50rIZwgQb9IP%2FafOAiO8cqyoT9YIzNG0muRKzgZQZn9%2BDUXPGTrg8r7vQjA4Z45zPxA%2FeCydn%2BK%2FKJE7OJVw5bKNqmQ3MugpAd5Xqz%2FgEGeEoeBdf1IGPkQ2n7b1S999sZKRQy600iJQER3BTtgKhP0KpkFd4JhMvnGWkJRCvAIVS6aEkQIHK19XE3BrXrMOdA%2FJMPzWxIQGOuABywIAmgt72hKKy6uCe%2BUjgWSQAPcDmOb1cV05LqcZ3t%2BBBDKfQNY05x54ie33opzw45YrAtBcTwws18%2FquqMoVZN0a%2BX13i1R6ls6kEfqOKDup7X3Jv1jj0TRTxy7%2BXcrb9lhyhMk75WJqfhylbEOBTPw%2FLYpxNJQJ%2BCMipFAc2wPOVhnd2SC%2BQinEpBBYrxo6iTBVPjDOncofpENLkkb4FhIUGRm5olWrvZKP%2BEQtch%2F68c4Kr1x9FjV4A6z%2BDHefNOzaIctSGYVlZQ24bS%2BbUryO2HKgSWP35mTG9Osknk%3D',
  width: '150px',
  height: '150px',
};
