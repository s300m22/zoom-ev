import { Story, Meta } from '@storybook/react';
import SearchFilters from './SearchFilters';

export default {
  title: 'Elements/SearchFilters',
  // decorators: [withNextRouter],
  component: SearchFilters,
  argTypes: {},
  parameters: {},
} as Meta;

const Template: Story = () => <SearchFilters />;

export const Default = Template.bind({
  nextRouter: {
    path: '/search',
    asPath: '/search',
    query: {},
  },
});
