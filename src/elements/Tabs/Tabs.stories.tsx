import { Story, Meta } from '@storybook/react/types-6-0';
import Tabs, { TabsProps } from './Tabs';
import { ITab } from '../../interfaces/contentful.types.generated';

export default {
  title: 'Elements/Tabs',
  component: Tabs,
} as Meta;

const Template: Story<TabsProps> = (args) => <Tabs {...args} />;

export const Default = Template.bind({});

const mockTabs = [...Array(5)].map((_, id) => ({
  fields: {
    title: `Tab #${id + 1}`,
    description: {
      content: [
        {
          content: [
            {
              marks: [],
              nodeType: 'text',
              value: `Example tab content #${id + 1}`,
            },
          ],
        },
      ],
    },
  },
  sys: {
    id: `${id}`,
  },
})) as unknown as ITab[];

Default.args = {
  tabs: mockTabs,
};
