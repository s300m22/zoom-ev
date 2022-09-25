import { Story, Meta } from '@storybook/react/types-6-0';
import { Heading } from '../index';
import { HeadingProps } from './Heading';

export default {
  title: 'Elements/Heading',
  component: Heading,
} as Meta;

const Template: Story<HeadingProps> = (args) => <Heading {...args}>Styled header</Heading>;

export const Default = Template.bind({});
Default.args = {
  variant: 'h1',
};
