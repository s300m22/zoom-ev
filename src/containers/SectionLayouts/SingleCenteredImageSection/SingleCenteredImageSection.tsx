import { Image, StyledLink } from '../../../elements';
import { ISingleCenteredImageSectionFields } from '../../../interfaces/contentful.types.generated';
import { SingleCenteredImageSectionWrapper } from './SingleCenteredImageSection.styled';

const SingleCenteredImageSection = ({
  image,
  text,
  background = '#eef3f6',
  padding = '130px 0',
  link = undefined,
  mobileImage = undefined,
}: ISingleCenteredImageSectionFields) => (
  <SingleCenteredImageSectionWrapper background={background} padding={padding}>
    {link && (
      <StyledLink externalLink={link.startsWith('http')} href={link}>
        <Image asset={image} mobileImage={mobileImage} />
      </StyledLink>
    )}

    {!link && <Image asset={image} mobileImage={mobileImage} />}
    {text && <p>{text}</p>}
  </SingleCenteredImageSectionWrapper>
);

export default SingleCenteredImageSection;
