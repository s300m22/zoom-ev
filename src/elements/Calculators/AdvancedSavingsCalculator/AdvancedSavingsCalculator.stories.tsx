import { Story, Meta } from '@storybook/react/types-6-0';
import AdvancedSavingsCalculator from './AdvancedSavingsCalculator';
import { ICalculatorSectionFields } from '../../../interfaces/contentful.types.generated';

export default {
  title: 'Elements/Calculators/Advanced Savings Calculator',
  component: AdvancedSavingsCalculator,
} as Meta;

const Template: Story<ICalculatorSectionFields> = (args) => <AdvancedSavingsCalculator {...args} />;

export const Default = Template.bind({});
Default.args = {
  chargerPrice: 15,
  title: 'Example Savings Calculator',
  mileagePerYear: '1000, 15000',
  evRange: '100, 600',
  type: 'Savings - Advanced',
  publicParkingPerDay: 15,
  plugsurfingRate: 9.95,
  defaultEvRange: 400,
  defaultMileagePerYear: 7500,
  tariffs: ['0.15', '0.17', '0.19'],
};
