import { Story, Meta } from '@storybook/react/types-6-0';
import AvailabilityCalendar, { AvailabilityCalendarProps } from './AvailabilityCalendar';

export default {
  title: 'Elements/AvailabilityCalendar',
  component: AvailabilityCalendar,
} as Meta;

const Template: Story<AvailabilityCalendarProps> = (args) => <AvailabilityCalendar {...args} />;

export const Default = Template.bind({});
Default.args = {
  carId: '123',
  setIsLoading: () => null,
};
