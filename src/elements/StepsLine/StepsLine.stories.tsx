import { Story, Meta } from '@storybook/react/types-6-0';
import StepsLine, { StepsLineProps } from './StepsLine';

export default {
  title: 'Elements/StepsLine',
  component: StepsLine,
} as Meta;

const Template: Story<StepsLineProps> = (args) => <StepsLine {...args} />;

export const Default = Template.bind({});
Default.args = {
  steps: ['Step #1', 'Step #2', 'Step #3', 'Step #4', 'Step #5'],
  activeStep: 1,
};
