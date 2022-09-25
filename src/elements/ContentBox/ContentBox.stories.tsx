import { Story, Meta } from '@storybook/react/types-6-0';
import ContentBox, { ContentBoxProps } from './ContentBox';

export default {
  title: 'Elements/ContentBox',
  component: ContentBox,
} as Meta;

const Template: Story<ContentBoxProps> = (args) => <ContentBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Lorem Ipsum</>,
};
