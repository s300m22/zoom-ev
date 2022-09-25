import { ICustomSectionFields } from '../../../../interfaces/contentful.types.generated';
import {
  BundleDiscountCard,
  Button,
  Card,
  Heading,
  RichTextRenderer,
  SectionContainer,
} from '../../../../elements';
import { Wrapper, CardsWrapper, ContentAfterCards } from './CardsSectionLayout.styled';

type CardsSectionLayoutProps = ICustomSectionFields;

const CardsSectionLayout = ({
  noTitle,
  title,
  background,
  description,
  ctaButton,
  titlePosition = 'left',
  bundleDiscountCard,
  cards,
  padding,
  margin,
  cardsColumns = 2,
}: CardsSectionLayoutProps) => (
  <SectionContainer background={background} margin={margin} padding={padding}>
    <Wrapper position={titlePosition}>
      {!noTitle && <Heading variant="h2">{title}</Heading>}
      {cards && (
        <CardsWrapper additionalPadding={Boolean(!description)} columns={cardsColumns}>
          {cards.map(({ fields, sys }) => (
            <Card key={sys.id} {...fields} />
          ))}
        </CardsWrapper>
      )}
      {bundleDiscountCard && (
        <CardsWrapper additionalPadding={Boolean(!description)} columns={cardsColumns}>
          {[bundleDiscountCard].map(({ fields, sys }) => (
            <BundleDiscountCard key={sys.id} {...fields} />
          ))}
        </CardsWrapper>
      )}
      {(description || ctaButton) && (
        <ContentAfterCards>
          <RichTextRenderer>{description}</RichTextRenderer>
          {ctaButton && <Button link={ctaButton} />}
        </ContentAfterCards>
      )}
    </Wrapper>
  </SectionContainer>
);

export default CardsSectionLayout;
