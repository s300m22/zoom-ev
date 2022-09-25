import { Story, Meta } from '@storybook/react/types-6-0';
import { CarRentalRequestStatusEnum } from '../../interfaces/api.types.generated.d';
import RentalStatus, { RentalStatusProps } from './RentalStatus';

export default {
  title: 'Elements/RentalStatus',
  component: RentalStatus,
} as Meta;

const Template: Story<RentalStatusProps> = (args) => <RentalStatus {...args} />;

export const Default = Template.bind({});
Default.args = {
  rentalStatus: CarRentalRequestStatusEnum.Accepted,
};
