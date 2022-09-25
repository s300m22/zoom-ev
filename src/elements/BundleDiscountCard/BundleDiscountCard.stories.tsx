import { Story, Meta } from '@storybook/react/types-6-0';
import BundleDiscountCard, { BundleDiscountCardProps } from './BundleDiscountCard';

export default {
  title: 'Elements/BundleDiscountCard',
  component: BundleDiscountCard,
} as Meta;

const Template: Story<BundleDiscountCardProps> = (args) => <BundleDiscountCard {...args} />;

export const Default = Template.bind({});
Default.args = {};
