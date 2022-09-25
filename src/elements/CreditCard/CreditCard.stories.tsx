import { Story, Meta } from '@storybook/react/types-6-0';
import CreditCard, { CreditCardProps } from './CreditCard';

export default {
  title: 'Elements/CreditCard',
  component: CreditCard,
  argTypes: {
    issuer: {
      control: {
        type: 'select',
        options: ['Visa', 'Mastercard', 'Maestro', 'American Express'],
      },
    },
    imageOverlay: {
      controls: {
        type: 'radio',
        options: [true, false],
      },
    },
  },
} as Meta;

const Template: Story<CreditCardProps> = (args) => <CreditCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  paymentMethod: {
    id: '1',
    brand: 'Visa',
    last4: '1234',
  },
};
