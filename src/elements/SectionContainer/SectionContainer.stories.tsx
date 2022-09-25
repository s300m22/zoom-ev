import { Story, Meta } from '@storybook/react/types-6-0';
import SectionContainer, { SectionContainerProps } from './SectionContainer';

export default {
  title: 'Elements/Section Container',
  component: SectionContainer,
} as Meta;

const Template: Story<SectionContainerProps> = (args) => (
  <SectionContainer {...args}>
    <h1>Not upstairs or paradise, absorb the result.</h1>
  </SectionContainer>
);

export const Default = Template.bind({});
Default.args = {};
