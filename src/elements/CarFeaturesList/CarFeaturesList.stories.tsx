import { Story, Meta } from '@storybook/react/types-6-0';
import CarFeaturesList, { CarFeaturesListProps } from './CarFeaturesList';

export default {
  title: 'Elements/CarFeaturesList',
  component: CarFeaturesList,
} as Meta;

const Template: Story<CarFeaturesListProps> = (args) => <CarFeaturesList {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Lorem Ipsum</>,
};
