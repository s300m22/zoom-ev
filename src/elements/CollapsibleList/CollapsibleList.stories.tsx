import { Story, Meta } from '@storybook/react/types-6-0';
import CollapsibleList, { CollapsibleListProps } from './CollapsibleList';

export default {
  title: 'Elements/CollapsibleList',
  component: CollapsibleList,
} as Meta;

const Template: Story<CollapsibleListProps> = (args) => <CollapsibleList {...args} />;

const elementsList = [
  {
    title: 'Pick-up Steps',
    content: <div>Lorem Ipsum</div>,
  },
  {
    title: 'Drop-off Steps',
    content: <div>Lorem Ipsum</div>,
  },
];

export const Default = Template.bind({});
Default.args = {
  elementsList,
};
