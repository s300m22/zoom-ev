import { Story, Meta } from '@storybook/react/types-6-0';
import List, { ListProps } from './List';

export default {
  title: 'Elements/List',
  component: List,
} as Meta;

const Template: Story<ListProps> = (args) => <List {...args} />;

export const Default = Template.bind({});
Default.args = {
  listTitle: 'Lorem ipsum dolor sit amet',
  listItems: ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La'],
  listColumns: 2,
};
