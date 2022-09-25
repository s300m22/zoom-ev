import Skeleton from 'react-loading-skeleton';
import { EventsLog } from '../../../../../elements';

// Mocked data until backed will be prepared
const latestActivitiesMock = [
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
];

const LatestActivities = () => {
  return latestActivitiesMock ? (
    <EventsLog
      eventsLog={latestActivitiesMock}
      noEventsText="You will find your latest activity here."
      title="Latest activities"
      toHighlight={['pending', 'accepted', 'cancelled by a host', 'completed']}
    />
  ) : (
    <>
      <Skeleton
        count={1}
        height={18}
        style={{
          marginTop: '30px',
          marginBottom: '20px',
          width: '10%',
        }}
      />
      <Skeleton
        count={1}
        height={358}
        style={{
          marginBottom: '10px',
          borderRadius: '12px',
          boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
        }}
      />
    </>
  );
};

export default LatestActivities;
