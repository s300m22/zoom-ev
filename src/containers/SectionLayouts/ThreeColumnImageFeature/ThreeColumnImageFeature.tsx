import { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import { Button, Heading, Image } from '../../../elements';
import { IThreeColumnImageFeatureFields } from '../../../interfaces/contentful.types.generated';
import { CtaWrapper } from '../CustomSections/ColumnsSectionLayout/ColumnsSectionLayout.styled';
import { Wrapper, ImageWrapper } from './ThreeColumnImageFeature.styled';

const ThreeColumnImageFeature: React.FC<IThreeColumnImageFeatureFields> = ({
  title,
  image1,
  image2,
  image3,
  image1Link,
  image2Link,
  image3Link,
  cta,
}) => {
  const [showLightBox, setShowLightBox] = useState<string | null>(null);
  return (
    <Wrapper>
      <Heading variant="h2">{title}</Heading>
      <ImageWrapper>
        <a
          href={image1Link}
          onClick={() => {
            if (!image1Link) setShowLightBox(image1.fields.file.url);
          }}
          rel="noreferrer"
          target="_blank"
        >
          <Image asset={image1} />
        </a>
        <a
          href={image2Link}
          onClick={() => {
            if (!image2Link) setShowLightBox(image2.fields.file.url);
          }}
          rel="noreferrer"
          target="_blank"
        >
          <Image asset={image2} />
        </a>
        <a
          href={image3Link}
          onClick={() => {
            if (!image3Link) setShowLightBox(image3.fields.file.url);
          }}
          rel="noreferrer"
          target="_blank"
        >
          <Image asset={image3} />
        </a>
      </ImageWrapper>

      {cta && (
        <CtaWrapper>
          <Button link={cta} />
        </CtaWrapper>
      )}

      {showLightBox != null && (
        <Lightbox
          mainSrc={showLightBox}
          onCloseRequest={() => setShowLightBox(null)}
          onMoveNextRequest={() => {}}
          onMovePrevRequest={() => {}}
        />
      )}
    </Wrapper>
  );
};

export default ThreeColumnImageFeature;
