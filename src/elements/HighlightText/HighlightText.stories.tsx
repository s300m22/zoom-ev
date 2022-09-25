import { Story, Meta } from '@storybook/react/types-6-0';
import HighlightText, { HighlightTextProps } from './HighlightText';

export default {
  title: 'Elements/HighlightText',
  component: HighlightText,
} as Meta;

const Template: Story<HighlightTextProps> = (args) => <HighlightText {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus placerat scelerisque erat vel egestas. Fusce fringilla sem in pharetra sollicitudin. Nullam vestibulum dignissim tortor vel viverra. Praesent sem eros, varius eget est vitae, accumsan gravida ante. Proin vitae ipsum venenatis, luctus ex a, faucibus massa. Ut lacinia felis massa, eget elementum augue ornare vitae. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas eu convallis metus. Maecenas eu metus vitae lectus pretium rhoncus. Maecenas sollicitudin efficitur feugiat. Pellentesque ultricies, erat non auctor maximus, erat ante imperdiet nisl, et condimentum ipsum diam congue urna. Sed id interdum nulla, a porta erat. Phasellus pellentesque vestibulum eros ut luctus.',
  highlight: ['ipsum', 'eget', 'ante', 'egestas'],
};
