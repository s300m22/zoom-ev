import { Story, Meta } from '@storybook/react/types-6-0';
import CarCard, { CarProps } from './CarCard';

export default {
  title: 'Elements/CarCard',
  component: CarCard,
} as Meta;

const Template: Story<CarProps> = (args) => <CarCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  modelName: 'Mercedes Benz EQC 400',
  partnerLogo:
    'https://images.ctfassets.net/qtza00wly75a/2Rtv77xJOfqSBplahhJ6LF/3a21f1628a26cd3584179b0b31523581/bp_pulse.png',
  carImage:
    'https://images.ctfassets.net/qtza00wly75a/5HFIF4IMb4rVF6yM3W9vy7/64e185a58f95e8af29289356eb3d1d44/car_2.jpg',
  location: 'London 6534MLG',
  pricePerDay: 110.84,
  reviewsAverageScore: 4.5,
};
