import { Banner, Container } from '../../elements';
import { BannerStandaloneWrapper } from '../../elements/Banner/Banner.styled';
import {
  IColumnSection,
  ICustomSection,
  ITabsSection,
  ITimelineItem,
  ICalculatorSection,
  IFaqSection,
  IBenefitsSection,
  ISingleCenteredImageSection,
  ICallToActionSection,
  IEcologicalFootprintSection,
  IGoElectricSection,
  IAwardsTrustpilotSection,
  IBanner,
  IScrollSpyComponent,
  IThreeColumnImageFeature,
  IBenefitGroupsSection,
} from '../../interfaces/contentful.types.generated';

import {
  CardsSectionLayout,
  ColumnSectionLayout,
  ColumnsSectionLayout,
  UnsupportedSection,
  TestimonialsSectionLayout,
  PartnersCarouselSectionLayout,
  TabSectionLayout,
  TimelineSectionLayout,
  CardsPartnersSectionLayout,
  MultiRowsSectionLayout,
  CalculatorSection,
  BenefitsSection,
  CallToActionSection,
  EcologicalFootprintSection,
  GoElectricSection,
  AwardsTrustpilotSection,
  ThreeColumnImageFeature,
} from '../SectionLayouts';
import BenefitGroupsSection from '../SectionLayouts/BenefitGroupsSection';
import ScrollSpyComponent from '../SectionLayouts/ScrollSpyComponent';
import SingleCenteredImageSection from '../SectionLayouts/SingleCenteredImageSection';

export interface ContentSectionProps {
  section:
    | ICustomSection
    | IColumnSection
    | ITabsSection
    | ITimelineItem
    | ICalculatorSection
    | IFaqSection
    | IBenefitsSection
    | ISingleCenteredImageSection
    | ICallToActionSection
    | IEcologicalFootprintSection
    | IGoElectricSection
    | IAwardsTrustpilotSection
    | IScrollSpyComponent
    | IThreeColumnImageFeature
    | IBenefitGroupsSection
    | IBanner;
}

const ContentSection = ({ section }: ContentSectionProps) => {
  switch (section.sys.contentType.sys.id) {
    case 'columnSection': {
      const { fields } = section as IColumnSection;
      return <ColumnSectionLayout {...fields} />;
    }
    case 'tabsSection': {
      const { fields } = section as ITabsSection;
      return <TabSectionLayout {...fields} />;
    }
    case 'calculatorSection': {
      const { fields } = section as ICalculatorSection;
      return <CalculatorSection {...fields} />;
    }
    case 'benefitsSection': {
      const { fields } = section as IBenefitsSection;
      return <BenefitsSection {...fields} />;
    }
    case 'singleCenteredImageSection': {
      const { fields } = section as ISingleCenteredImageSection;
      return <SingleCenteredImageSection {...fields} />;
    }
    case 'callToActionSection': {
      const { fields } = section as ICallToActionSection;
      return <CallToActionSection {...fields} />;
    }
    case 'ecologicalFootprintSection': {
      const { fields } = section as IEcologicalFootprintSection;
      return <EcologicalFootprintSection {...fields} />;
    }
    case 'goElectricSection': {
      const { fields } = section as IGoElectricSection;
      return <GoElectricSection {...fields} />;
    }
    case 'awardsTrustpilotSection': {
      const { fields } = section as IAwardsTrustpilotSection;
      return <AwardsTrustpilotSection {...fields} />;
    }
    case 'scrollSpyComponent': {
      const { fields } = section as IScrollSpyComponent;
      return <ScrollSpyComponent {...fields} />;
    }

    case 'banner': {
      const { fields } = section as IBanner;
      return (
        <Container>
          <BannerStandaloneWrapper>
            <Banner {...fields} />
          </BannerStandaloneWrapper>
        </Container>
      );
    }
    case 'threeColumnImageFeature': {
      const { fields } = section as IThreeColumnImageFeature;
      return <ThreeColumnImageFeature {...fields} />;
    }
    case 'benefitGroupsSection': {
      const { fields } = section as IBenefitGroupsSection;
      return <BenefitGroupsSection {...fields} />;
    }
    case 'customSection': {
      const { fields } = section as ICustomSection;
      switch (fields.layout) {
        case 'Cards & Partners':
          return <CardsPartnersSectionLayout {...fields} />;
        case 'Cards':
          return <CardsSectionLayout {...fields} />;
        case '2 columns':
          return <ColumnsSectionLayout {...fields} />;
        case '3 columns':
          return <ColumnsSectionLayout {...fields} />;
        case 'Multiple rows':
          return <MultiRowsSectionLayout {...fields} />;
        case 'Partners Carousel':
          return <PartnersCarouselSectionLayout {...fields} />;
        case 'Testimonials':
          return <TestimonialsSectionLayout {...fields} />;
        case 'Timeline':
          return <TimelineSectionLayout {...fields} />;
        default:
          return <UnsupportedSection section={section} />;
      }
    }
    default:
      return <UnsupportedSection section={section} />;
  }
};

export default ContentSection;
