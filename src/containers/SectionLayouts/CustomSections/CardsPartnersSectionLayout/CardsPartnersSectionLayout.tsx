import { ICustomSectionFields } from '../../../../interfaces/contentful.types.generated';
import { CardsSectionLayout, PartnersCarouselSectionLayout } from '../../index';
import Wrapper from './CardsPartnersSectionLayout.styled';

type CardsPartnersSectionLayoutProps = ICustomSectionFields;

const CardsPartnersSectionLayout = ({
  background = 'light',
  padding,
  ...rest
}: CardsPartnersSectionLayoutProps) => (
  <Wrapper background={background} padding={padding}>
    <CardsSectionLayout background="" padding="0" {...rest} />
    <PartnersCarouselSectionLayout background="" padding="0" {...rest} />
  </Wrapper>
);

export default CardsPartnersSectionLayout;
