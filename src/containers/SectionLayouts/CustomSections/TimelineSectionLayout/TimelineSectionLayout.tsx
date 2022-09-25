import { ICustomSectionFields } from '../../../../interfaces/contentful.types.generated';
import { BannerWrapper, TimelineSection } from './TimelineSectionLayout.styled';
import {
  Banner,
  Heading,
  Image,
  SectionContainer,
  ContentAligner,
  Timeline,
} from '../../../../elements';

const TimelineSectionLayout = ({
  title,
  imagePattern,
  primaryImage,
  imageTransform,
  timelineItems,
  banner,
  timelineDirection,
  noTitle,
  background,
  padding,
  margin,
}: ICustomSectionFields) => (
  <SectionContainer background={background} margin={margin} padding={padding}>
    <TimelineSection widthProp={primaryImage ? '50%' : '100%'}>
      {title && !noTitle && (
        <ContentAligner additionalContentHorizontalAlignment="center" gutterBottom width="100%">
          <Heading variant="h2">{title}</Heading>
        </ContentAligner>
      )}
      <Timeline direction={timelineDirection} items={timelineItems} />
      {primaryImage && (
        <div>
          <Image asset={primaryImage} imagePattern={imagePattern} imageTransform={imageTransform} />
        </div>
      )}
      {banner && (
        <BannerWrapper>
          <Banner {...banner.fields} />
        </BannerWrapper>
      )}
    </TimelineSection>
  </SectionContainer>
);

export default TimelineSectionLayout;
