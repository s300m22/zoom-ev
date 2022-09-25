import { Meta, Story } from '@storybook/react/types-6-0';
import Select, { SelectProps } from './Select';

export default {
  title: 'Elements/Inputs/Select',
  component: Select,
} as Meta;

const mapOptions = (numberOfOptions = 5) =>
  [...Array(numberOfOptions)].map((_, id) => {
    const value = id + 1;
    return (
      <option key={value} value={value}>
        Example {value}
      </option>
    );
  });

const Template: Story<SelectProps> = (args) => (
  <div style={{ width: '292px', height: '200px' }}>
    <Select {...args}>{mapOptions()}</Select>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  label: 'Example select',
};
