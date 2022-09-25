import { Heading } from '../../../../elements';
import { EvCarIcon } from '../../../../icons';
import { HeadingWrapper, NoCarsWrapper } from './CarNotFound.styled';

const CarNotFound = () => (
  <NoCarsWrapper>
    <EvCarIcon />
    <HeadingWrapper>
      <Heading variant="h3">Car not found</Heading>
    </HeadingWrapper>
  </NoCarsWrapper>
);

export default CarNotFound;
