import { Heading } from '../../../../../elements';
import { EvCarIcon } from '../../../../../icons';
import { HeadingWrapper, NoTripsWrapper } from './NoTrips.styled';

const NoTrips = () => (
  <NoTripsWrapper>
    <EvCarIcon />
    <HeadingWrapper>
      <Heading variant="h3">No trips yet</Heading>
    </HeadingWrapper>
  </NoTripsWrapper>
);

export default NoTrips;
