import { Story, Meta } from '@storybook/react/types-6-0';
import { useForm } from 'react-hook-form';
import StarInput, { StarInputProps } from './StarInput';

export default {
  title: 'Elements/Inputs/StarInput',
  component: StarInput,
} as Meta;

const Template: Story<StarInputProps> = (args) => {
  const {
    control,
    formState: { errors },
  } = useForm();
  return <StarInput {...args} control={control} errors={errors} />;
};

export const Default = Template.bind({});
Default.args = {
  name: 'Star Input',
  defaultValue: 2,
};
