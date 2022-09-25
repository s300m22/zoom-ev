import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';
import Snackbar, { SnackbarProps } from './Snackbar';

export default {
  title: 'Elements/Snackbar',
  component: Snackbar,
} as Meta;

const StoryWrapper = (props: SnackbarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>
      <Snackbar {...props} onClose={() => setIsOpen(false)} open={isOpen}>
        Lorem ipsum Oops, Something went wrong.
      </Snackbar>
    </>
  );
};

const Template: Story<SnackbarProps> = (args) => <StoryWrapper {...args} />;

export const Default = Template.bind({});
Default.args = {};
