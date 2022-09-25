import { Story, Meta } from '@storybook/react/types-6-0';
import { ITimelineItem } from '../../interfaces/contentful.types.generated';
import Timeline, { TimelineProps } from './Timeline';

export default {
  title: 'Elements/Timeline',
  component: Timeline,
} as Meta;

const Template: Story<TimelineProps> = (args) => <Timeline {...args} />;

const mockTimelineItems = [...Array(5)].map((_, id) => ({
  fields: {
    title: `Item #${id + 1}`,
    description: {
      content: [
        {
          content: [
            {
              marks: [],
              nodeType: 'text',
              value: `Timeline Item description #${id + 1}`,
            },
          ],
        },
      ],
    },
  },
  sys: {
    id: `${id}`,
  },
})) as unknown as ITimelineItem[];

export const Default = Template.bind({});
Default.args = {
  items: mockTimelineItems,
};
