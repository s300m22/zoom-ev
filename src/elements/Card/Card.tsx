import { ICardFields } from '../../interfaces/contentful.types.generated';
import RichTextRenderer from '../RichTextRenderer/RichTextRenderer';
import Heading from '../Heading/Heading';
import Image from '../Image';
import Banner from '../Banner';
import {
  ButtonContainer,
  StyledButton,
  DescriptionWrapper,
  ImageContainer,
  StyledCard,
  DotContainer,
  SubcardsWrapper,
  Subtitle,
} from './Card.styled';
import { ContentAligner } from '../index';
import { useMediaDevice } from '../../hooks';
import { BubblePointIcon } from '../../icons';

export interface CardProps extends ICardFields {
  height?: string;
}

const Card = ({
  image,
  title,
  subtitle,
  noTitle,
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
}: CardProps) => {
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

export default Card;
