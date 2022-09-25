import { Heading } from '../../../../../elements';
import { EvCarIcon } from '../../../../../icons';
import { HeadingWrapper, NoCarsWrapper } from './NoCars.styled';

const NoCars = () => (
  <NoCarsWrapper>
    <EvCarIcon />
    <HeadingWrapper>
      <Heading variant="h3">You haven&apos;t added any EVs yet.</Heading>
    </HeadingWrapper>
  </NoCarsWrapper>
);

export default NoCars;
