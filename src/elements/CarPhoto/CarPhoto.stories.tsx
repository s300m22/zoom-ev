import { Story, Meta } from '@storybook/react/types-6-0';
import CarPhoto, { CarPhotoProps } from './CarPhoto';

export default {
  title: 'Elements/CarPhoto',
  component: CarPhoto,
} as Meta;

const Template: Story<CarPhotoProps> = (args) => <CarPhoto {...args} />;

export const Default = Template.bind({});
Default.args = {
  photoUrl: 'https://images.dev.zoom-ev.com/fe5cfa32-6918-46ed-8fac-b3cd18720c69',
};
