import { Button } from '../../../elements';
import { IStickyCtaFields } from '../../../interfaces/contentful.types.generated';
import { CtaWrapper } from './PageStickyCTA.styled';

interface StickyCTAPROps extends IStickyCtaFields {
  before?: any;
}

const PageStickyCTA: React.FC<StickyCTAPROps> = ({ button, backgroundColour, before = null }) => {
  return (
    <CtaWrapper color={backgroundColour}>
      {before}
      <Button link={button} style={{ width: before !== null ? 'auto' : '100%' }} />
    </CtaWrapper>
  );
};

export default PageStickyCTA;
