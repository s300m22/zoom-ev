import { Story, Meta } from '@storybook/react/types-6-0';
import EventsLog, { EventsLogProps } from './EventsLog';

export default {
  title: 'Elements/EventsLog',
  component: EventsLog,
} as Meta;

const Template: Story<EventsLogProps> = (args) => <EventsLog {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Example Events Log',
  noEventsText: 'No events',
  eventsLog: [
    {
      id: '1',
      text: 'Your request to book Mario Bianchi’s Renault Zoe GF20 WSN is pending',
      user: {
        details: {
          avatarImage: {
            id: '1',
            url: 'https://images.ctfassets.net/qtza00wly75a/5pV3bagRX5KrE0MEhFAR9X/8de14f8b856ff0f9c0d64f36cae9b445/martin_green.png',
          },
        },
      },
    },
    {
      id: '2',
      text: 'Marco Bianchi accepted your request to book Renault Zoe GF20 WSN.',
      user: {
        details: {
          avatarImage: {
            id: '2',
            url: 'https://images.ctfassets.net/qtza00wly75a/2ykM8lT46TSpJJC6HzrLdV/aa71bfc31e906063f703526188428214/Ellipse_17_2x.png',
          },
        },
      },
    },
    {
      id: '3',
      text: 'Your booking of Mario Bianchi’s Renault Zoe GF20 WSN was cancelled by a host.',
      user: {
        details: {
          avatarImage: {
            id: '3',
            url: 'https://images.ctfassets.net/qtza00wly75a/5pV3bagRX5KrE0MEhFAR9X/8de14f8b856ff0f9c0d64f36cae9b445/martin_green.png',
          },
        },
      },
    },
    {
      id: '4',
      text: 'Your booking of Mario Bianchi’s Renault Zoe GF20 WSN is completed.',
      user: {
        details: {
          avatarImage: {
            id: '4',
            url: 'https://images.ctfassets.net/qtza00wly75a/2ykM8lT46TSpJJC6HzrLdV/aa71bfc31e906063f703526188428214/Ellipse_17_2x.png',
          },
        },
      },
    },
  ],
};
