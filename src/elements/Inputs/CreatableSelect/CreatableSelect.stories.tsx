import { Story, Meta } from '@storybook/react/types-6-0';
import { useForm } from 'react-hook-form';
import CreatableSelect, { CreatableSelectProps } from './CreatableSelect';

export default {
  title: 'Elements/CreatableSelect',
  component: CreatableSelect,
} as Meta;

const Template: Story<CreatableSelectProps> = (args) => {
  const { control } = useForm();
  return <CreatableSelect {...args} control={control} />;
};
export const Default = Template.bind({});
Default.args = {
  name: 'Example Creatable Input',
  label: 'Example Creatable Input',
  options: [
    {
      label: 'Value #1',
      value: 'Value #1',
    },
    {
      label: 'Value #2',
      value: 'Value #2',
    },
    {
      label: 'Value #3',
      value: 'Value #3',
    },
  ],
};
