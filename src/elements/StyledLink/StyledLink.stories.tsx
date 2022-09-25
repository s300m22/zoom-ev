import { Story, Meta } from '@storybook/react/types-6-0';
import StyledLink, { StyledLinkProps } from './StyledLink';
import { INavigationLink } from '../../interfaces/contentful.types.generated';

export default {
  title: 'Elements/StyledLink',
  component: StyledLink,
} as Meta;

const Template: Story<StyledLinkProps> = (args) => <StyledLink {...args} />;
export const Default = Template.bind({});
Default.args = {
  link: {
    fields: {
      label: 'Click me',
      customUrl: 'https://www.zoom-ev.com/',
    },
  } as INavigationLink,
};

export const WithChildren = Template.bind({});
WithChildren.args = {
  children: <>Click me</>,
  link: {
    fields: {
      customUrl: 'https://www.zoom-ev.com/',
    },
  } as INavigationLink,
};

export const WithoutLink = Template.bind({});
WithoutLink.args = {
  children: <>I am not clickable</>,
};
