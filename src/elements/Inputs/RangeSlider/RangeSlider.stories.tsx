import { Story, Meta } from '@storybook/react/types-6-0';
import RangeSlider, { RangeSliderProps } from './RangeSlider';

export default {
  title: 'Elements/Inputs/Range Slider',
  component: RangeSlider,
} as Meta;

const Template: Story<RangeSliderProps> = (args) => <RangeSlider {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Extra Long Example Label',
  minValue: 10,
  maxValue: 100,
  unit: 'pint of beer',
  initValue: 57,
};
