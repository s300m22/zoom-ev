import {
  EventsCard,
  EventsLogWrapper,
  EventLogTitle,
  EventRow,
  EventRowImage,
  EventRowText,
  NoEvents,
} from './EventsLog.styled';
import { HighlightText, UserAvatar } from '..';
import { ImageType } from '../../interfaces/api.types.generated.d';

interface EventProps {
  id: string;
  text: string;
  user: {
    details: {
      avatarImage?: ImageType | null;
    };
  };
}

export interface EventsLogProps {
  title?: string;
  eventsLog?: Array<EventProps>;
  noEventsText?: string;
  toHighlight?: Array<string>;
}

interface EventLogRowProps {
  eventElement: EventProps;
  toHighlight: Array<string>;
}

const EventLogRow = ({ eventElement, toHighlight }: EventLogRowProps) => (
  <EventRow>
    <EventRowImage>
      <UserAvatar
        avatarUrl={eventElement.user.details.avatarImage?.url}
        height="42px"
        variant="log"
        width="42px"
      />
    </EventRowImage>
    <EventRowText>
      <HighlightText highlight={toHighlight} text={eventElement.text} />
    </EventRowText>
  </EventRow>
);

const EventsLog = ({
  title,
  eventsLog,
  noEventsText = 'Empty log',
  toHighlight = [],
}: EventsLogProps) => (
  <EventsLogWrapper>
    <EventLogTitle>{title}</EventLogTitle>
    {eventsLog ? (
      <EventsCard>
        {eventsLog.map((eventElement) => (
          <EventLogRow
            eventElement={eventElement}
            key={eventElement.id}
            toHighlight={toHighlight}
          />
        ))}
      </EventsCard>
    ) : (
      <NoEvents>{noEventsText}</NoEvents>
    )}
  </EventsLogWrapper>
);

export default EventsLog;
