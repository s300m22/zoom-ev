import { IBundleDiscountPriceCardFields } from '../../interfaces/contentful.types.generated';
import RichTextRenderer from '../RichTextRenderer/RichTextRenderer';
import Heading from '../Heading/Heading';
import Image from '../Image';
import Banner from '../Banner';
import {
  BundlePrice,
  ButtonContainer,
  DescriptionWrapper,
  DotContainer,
  ImageContainer,
  StyledButton,
  StyledCard,
  SubcardsWrapper,
  Subtitle,
} from './BundleDiscountCard.styled';
import { Card, ContentAligner } from '../index';
import { useMediaDevice } from '../../hooks';
import { BubblePointIcon } from '../../icons';

export interface BundleDiscountCardProps extends IBundleDiscountPriceCardFields {
  height?: string;
}

const BundleDiscountCard = ({
  image,
  title,
  subtitle,
  noTitle,
  bundlePrice,
  body,
  height,
  width,
  imagePosition = 'top',
  cta,
  showDotIcon,
  banner,
  additionalContentVerticalAlignment = 'top',
  titleVariant = 'h5',
  showBorders = true,
  subCards,
  margin,
  horizontalList = false,
  type = 'Other',
  titleAlignment = 'left',
  titleColor = '#061027',
}: BundleDiscountCardProps) => {
  const { isMobile } = useMediaDevice();
  const formattedImgPosition = imagePosition === 'left' && isMobile ? 'top' : imagePosition;
  return (
    <StyledCard
      cardType={type}
      height={height}
      horizontalList={horizontalList}
      imagePosition={formattedImgPosition}
      isDotIcon={showDotIcon}
      margin={margin}
      noTitle={noTitle}
      showBorders={showBorders}
      showDotIcon={showDotIcon}
      style={type === 'Employee' ? { gridColumn: 'span 2' } : {}}
      titleAlignment={titleAlignment}
      titleColor={titleColor}
      width={width}
    >
      {showDotIcon && imagePosition === 'left' && (
        <DotContainer>
          <BubblePointIcon />
        </DotContainer>
      )}

      {image && (
        <ImageContainer cardType={type} imagePosition={formattedImgPosition}>
          <Image asset={image} />
        </ImageContainer>
      )}

      {additionalContentVerticalAlignment === 'between' && !noTitle && (
        <div style={{ width: '100%', textAlign: 'left' }}>
          <Heading variant={titleVariant}>{title}</Heading>
        </div>
      )}

      <ContentAligner
        additionalContentHorizontalAlignment={formattedImgPosition === 'left' ? 'start' : 'center'}
        additionalContentVerticalAlignment={additionalContentVerticalAlignment}
      >
        {!noTitle && additionalContentVerticalAlignment !== 'between' && (
          <Heading variant={titleVariant}>{title}</Heading>
        )}
        {subtitle && <Subtitle>{subtitle}</Subtitle>}

        {bundlePrice && <BundlePrice>{bundlePrice}</BundlePrice>}

        {body && (
          <DescriptionWrapper imagePosition={formattedImgPosition}>
            <RichTextRenderer>{body}</RichTextRenderer>
          </DescriptionWrapper>
        )}

        {banner && <Banner {...banner.fields} />}
        {cta && formattedImgPosition === 'left' && (
          <ButtonContainer imagePosition={formattedImgPosition}>
            <StyledButton link={cta} variant="outlined" />
          </ButtonContainer>
        )}
      </ContentAligner>

      {subCards && (
        <SubcardsWrapper>
          {subCards.map((subCard) => (
            <Card {...subCard.fields} key={subCard.sys.id} />
          ))}
        </SubcardsWrapper>
      )}

      {cta && formattedImgPosition !== 'left' && (
        <ButtonContainer imagePosition={formattedImgPosition}>
          <StyledButton link={cta} variant="outlined" />
        </ButtonContainer>
      )}
    </StyledCard>
  );
};

export default BundleDiscountCard;
