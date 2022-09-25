import { Story, Meta } from '@storybook/react/types-6-0';
import PageLoader, { PageLoaderProps } from './PageLoader';

export default {
  title: 'Elements/PageLoader',
  component: PageLoader,
} as Meta;

const Template: Story<PageLoaderProps> = (args) => <PageLoader {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Lorem Ipsum</>,
};
