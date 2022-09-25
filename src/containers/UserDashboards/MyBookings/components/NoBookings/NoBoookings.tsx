import { Heading } from '../../../../../elements';
import { EvCarIcon } from '../../../../../icons';
import { HeadingWrapper, NoCarsWrapper } from './NoBookingsCars.styled';

const NoBookings = () => (
  <NoCarsWrapper>
    <EvCarIcon />
    <HeadingWrapper>
      <Heading variant="h3">No bookings, yet!</Heading>
    </HeadingWrapper>
  </NoCarsWrapper>
);

export default NoBookings;
