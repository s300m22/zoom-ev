import { Story, Meta } from '@storybook/react/types-6-0';
import { Button } from '..';
import Heading from '../Heading';
import Popup, { PopupProps } from './Popup';

export default {
  title: 'Elements/Popup',
  component: Popup,
} as Meta;

const Template: Story<PopupProps> = (args) => <Popup {...args} />;

const PopupContent = () => (
  <>
    <Heading variant="h2">Lorem Ipsum</Heading>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam condimentum bibendum tincidunt.
      Aenean venenatis tortor in turpis bibendum, in tempor mauris condimentum. Morbi efficitur
      risus id mollis auctor. Donec quis ex consectetur, dapibus nulla vel, suscipit justo.
      Phasellus hendrerit tellus vel justo volutpat facilisis. Curabitur augue lectus, condimentum
      in commodo dapibus, varius in tellus. Curabitur nec euismod enim. Aenean eleifend elit id
      ipsum facilisis, sed fermentum nibh egestas. Proin porttitor, ipsum non dignissim pretium,
      velit nisi molestie urna, non maximus sapien ex et neque.
    </p>
  </>
);

export const Default = Template.bind({});
Default.args = {
  trigger: <Button>Open</Button>,
  children: <PopupContent />,
};
