import { useState } from 'react';
import {
  IBenefitsSubsectionFields,
  IBenefitsSectionCategoryFields,
  IBenefitsSectionFields,
} from '../../../interfaces/contentful.types.generated';
import {
  BenefitsBanner,
  BenefitsList,
  BenefitsListItem,
  BenefitSubsectionContainer,
  ButtonTabs,
  CategoryHeader,
  Column,
  GreenLine,
  Header,
  Paragraph,
  Subsection,
  Wrapper,
  SubtextContainer,
} from './BenefitsSection.styled';
import { Button, Heading, Image, RichTextRenderer } from '../../../elements';
import ContentSection from '../../ContentSection';

const BenefitsSubsection = ({ description, benefits, logo, image }: IBenefitsSubsectionFields) => (
  <Subsection>
    <Column className="text__container">
      <Image asset={logo} />
      <RichTextRenderer>{description}</RichTextRenderer>
      <BenefitsList>
        {benefits.map((benefit) => {
          const {
            sys: { id },
            fields: { title, description: benefitDescription },
          } = benefit;
          return (
            <BenefitsListItem key={id}>
              <Heading variant="h4">{title}</Heading>
              <RichTextRenderer>{benefitDescription}</RichTextRenderer>
            </BenefitsListItem>
          );
        })}
      </BenefitsList>
    </Column>
    <Column className="image__container">
      <Image asset={image} />
    </Column>
  </Subsection>
);

const BenefitsCategory = ({
  categoryName,
  description: categoryDescription,
  categorySubsections,
}: IBenefitsSectionCategoryFields) => {
  const [activeTab, setActiveTab] = useState(categorySubsections[0].sys.id);
  const getTabs = () => {
    return (
      <>
        {categorySubsections.map((section) => {
          const {
            sys: { id },
            fields: { logo },
          } = section;
          return (
            <Button
              className={activeTab === section.sys.id ? 'active' : ''}
              key={id}
              onClick={() => setActiveTab(id)}
              variant="text"
            >
              <Image asset={logo} />
            </Button>
          );
        })}
      </>
    );
  };

  return (
    <BenefitSubsectionContainer>
      <CategoryHeader>
        <Heading variant="h2">{categoryName}</Heading>
        <SubtextContainer>
          <RichTextRenderer>{categoryDescription}</RichTextRenderer>
        </SubtextContainer>
        <GreenLine />
        {categorySubsections.length > 1 && <ButtonTabs type="top">{getTabs()}</ButtonTabs>}
      </CategoryHeader>
      {categorySubsections.map((section) =>
        activeTab === section.sys.id ? (
          <BenefitsSubsection key={section.sys.id} {...section.fields} />
        ) : null,
      )}
      {categorySubsections.length > 1 && <ButtonTabs type="bottom">{getTabs()}</ButtonTabs>}
    </BenefitSubsectionContainer>
  );
};
const BenefitsSection = ({ title, subtitle, categories, banner }: IBenefitsSectionFields) => {
  return (
    <Wrapper>
      <Header>
        <Heading variant="h2">{title}</Heading>
        <Paragraph>{subtitle}</Paragraph>
      </Header>
      {categories.map((category) => {
        return category.sys.contentType.sys.id === 'benefitsSectionCategory' ? (
          // @ts-expect-error this could be one of 2 types
          <BenefitsCategory key={category.sys.id} {...category.fields} />
        ) : (
          // @ts-expect-error this could be one of 2 types
          <ContentSection key={category.sys.id} section={category} />
        );
      })}
      {banner && (
        <BenefitsBanner>
          <Heading variant="h2">{banner.fields.title}</Heading>
          <RichTextRenderer>{banner.fields.body}</RichTextRenderer>
        </BenefitsBanner>
      )}
    </Wrapper>
  );
};

// @ts
export default BenefitsSection;
