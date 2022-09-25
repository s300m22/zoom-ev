import { Asset } from 'contentful';
import { IColumnSectionFields } from '../../../interfaces/contentful.types.generated';
import {
  Button,
  Banner,
  Card,
  ContentAligner,
  Heading,
  Image,
  List,
  RichTextRenderer,
} from '../../../elements';
import {
  AdditionalContentSection,
  ButtonWrapper,
  PrimaryContentWrapper,
  DescriptionWrapper,
  CardsWrapper,
  ContentWrapper,
  WidthWrapper,
  SectionGrayOverlay,
  AdditionalCardsWrapper,
  OuterWrapper,
  PartnersListContainer,
  PartnerListItem,
  PartnersList,
} from './ColumnSectionLayout.styled';
import ContentSection from '../../ContentSection';

interface ColumnSectionLayoutProps extends IColumnSectionFields {
  partnersList?: Array<Asset>;
}

const ColumnSectionLayout = ({
  additionalContent,
  title,
  showTitle = true,
  superscriptTitle,
  description,
  additionalContentHorizontalAlignment = 'center',
  additionalContentVerticalAlignment = 'center',
  additionalContentPlacement,
  additionalCards,
  image,
  imageOverlay,
  cta,
  cta2,
  background = 'light',
  padding,
  margin,
  imagePattern,
  cards,
  titleVariant = 'h2',
  listTitle,
  listItems,
  listColumns = 1,
  textWidth,
  partnersList,
  imageTransform,
  textAlignment,
  banners,
  minimalHeight = '572px',
  cardsColumns = 2,
}: ColumnSectionLayoutProps) => {
  const showAdditionalContent = Boolean(image || additionalContent);
  return (
    <OuterWrapper background={background} margin={margin} padding={padding}>
      <PrimaryContentWrapper layout={additionalContentPlacement} minHeight={minimalHeight}>
        <WidthWrapper>
          <ContentWrapper>
            <ContentAligner
              additionalContentHorizontalAlignment={additionalContentHorizontalAlignment}
              additionalContentVerticalAlignment={additionalContentVerticalAlignment}
              textAlignment={textAlignment}
              width={textWidth}
            >
              {title && showTitle && (
                <Heading superscriptTitle={superscriptTitle} variant={titleVariant}>
                  {title}
                </Heading>
              )}
              {description && (
                <DescriptionWrapper>
                  <RichTextRenderer>{description}</RichTextRenderer>
                </DescriptionWrapper>
              )}
              {banners &&
                banners.map((banner) => <Banner {...banner.fields} key={banner.sys.id} />)}
              {(cta || cta2) && (
                <ButtonWrapper>
                  {cta && <Button link={cta} />}
                  {cta2 && <Button link={cta2} />}
                </ButtonWrapper>
              )}
              {partnersList && (
                <PartnersListContainer>
                  <Heading variant="h6">Partners doing it</Heading>
                  <PartnersList>
                    {partnersList.map((partnerLogo) => (
                      <PartnerListItem key={partnerLogo.sys.id}>
                        <Image asset={partnerLogo} />
                      </PartnerListItem>
                    ))}
                  </PartnersList>
                </PartnersListContainer>
              )}
            </ContentAligner>
            {listItems && (
              <List listColumns={listColumns} listItems={listItems} listTitle={listTitle} />
            )}
            {cards && (
              <CardsWrapper
                columns={cardsColumns}
                direction={showAdditionalContent ? 'row' : 'column'}
              >
                {cards.map(({ fields, sys }) => (
                  <Card key={sys.id} {...fields} />
                ))}
              </CardsWrapper>
            )}
          </ContentWrapper>
        </WidthWrapper>
        {showAdditionalContent && (
          <AdditionalContentSection>
            <ContentAligner
              additionalContentHorizontalAlignment={additionalContentHorizontalAlignment}
              additionalContentVerticalAlignment={additionalContentVerticalAlignment}
              imageOverlay={imageOverlay}
            >
              {Boolean(!image) && (
                <SectionGrayOverlay src="data:image/png;base64,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" />
              )}
              {additionalContent && <ContentSection section={additionalContent} />}
              {image && (
                <Image
                  asset={image}
                  imageOverlay={imageOverlay}
                  imagePattern={imagePattern}
                  imageTransform={imageTransform}
                  layout={additionalContentPlacement}
                />
              )}
            </ContentAligner>
          </AdditionalContentSection>
        )}
      </PrimaryContentWrapper>
      {additionalCards && (
        <AdditionalCardsWrapper>
          {additionalCards?.map(({ fields, sys }) => (
            <Card key={sys.id} {...fields} />
          ))}
        </AdditionalCardsWrapper>
      )}
    </OuterWrapper>
  );
};
export default ColumnSectionLayout;
