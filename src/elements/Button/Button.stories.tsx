import { Story, Meta } from '@storybook/react/types-6-0';
import { Button } from '../index';
import { ButtonProps } from './Button';
import { INavigationLink } from '../../interfaces/contentful.types.generated';

export default {
  title: 'Elements/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

const mockLink = {
  fields: {
    label: 'Click me',
    customUrl: 'https://www.zoom-ev.com/',
    showArrow: true,
  },
} as INavigationLink;

export const Default = Template.bind({});

Default.args = { link: mockLink };

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
  link: mockLink,
};

export const Link = Template.bind({});
Link.args = {
  disabled: false,
  variant: 'link',
  link: mockLink,
};

export const Text = Template.bind({});
Text.args = {
  disabled: false,
  variant: 'text',
  link: mockLink,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  variant: 'outlined',
  link: mockLink,
};
