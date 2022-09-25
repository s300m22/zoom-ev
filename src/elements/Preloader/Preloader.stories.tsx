import { Story, Meta } from '@storybook/react/types-6-0';
import Preloader, { PreloaderProps } from './Preloader';

export default {
  title: 'Elements/Preloader',
  component: Preloader,
} as Meta;

const Template: Story<PreloaderProps> = (args) => <Preloader {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Lorem Ipsum</>,
};
