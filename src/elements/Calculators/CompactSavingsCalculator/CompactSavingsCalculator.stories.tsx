import { Story, Meta } from '@storybook/react/types-6-0';
import CompactSavingsCalculator, {
  CompactSavingsCalculatorProps,
} from './CompactSavingsCalculator';
import { IKeyValueItem } from '../../../interfaces/contentful.types.generated';

export default {
  title: 'Elements/Calculators/Compact Savings',
  component: CompactSavingsCalculator,
} as Meta;

const Template: Story<CompactSavingsCalculatorProps> = (args) => (
  <CompactSavingsCalculator {...args} />
);

export const Default = Template.bind({});
Default.args = {
  discountedOffPrice: [
    { fields: { key: '0 < 2 years', value: '1' } },
    { fields: { key: '2 < 3 years', value: '0.9' } },
    { fields: { key: '3 < 5 years', value: '0.8' } },
    { fields: { key: '5 < 8 years', value: '0.7' } },
    { fields: { key: '8 years +', value: '0' } },
  ] as Array<IKeyValueItem>,
  defaultCarAge: { fields: { key: '0 < 2 years', value: '1' } } as IKeyValueItem,
  rentPricing: [
    { fields: { key: '10,000 - 19,999', value: '35' } },
    { fields: { key: '20,000 - 29,999', value: '45' } },
    { fields: { key: '30,000 - 39,999', value: '65' } },
    { fields: { key: '75,000+', value: '0' } },
  ] as Array<IKeyValueItem>,
  defaultRentPricing: { fields: { key: '20,000 - 29,999', value: '45' } } as IKeyValueItem,
};
