import {
  Description,
  Wrapper,
  FullWidthWrapper,
  FullWidthAligner,
  FullWidthButtonWrapper,
} from './Banner.styled';
import { Button, Image, Heading, RichTextRenderer } from '..';
import { IBannerFields } from '../../interfaces/contentful.types.generated';
import { stringToSlug } from '../../utils/stringUtil';

export type BannerProps = IBannerFields;

const Banner = ({
  icon,
  cta,
  title,
  body,
  noTitle = false,
  fullWidth,
  variant = 'primary',
  titleVariant = 'h5',
}: BannerProps) => {
  if (fullWidth) {
    return (
      <FullWidthAligner>
        <FullWidthWrapper variant={variant}>
          <div>
            {!noTitle && <Heading variant={titleVariant}>{title}</Heading>}
            {body && (
              <Description>
                <RichTextRenderer>{body}</RichTextRenderer>
              </Description>
            )}
          </div>
          {cta && (
            <FullWidthButtonWrapper>
              <Button id={stringToSlug(title)} link={cta} />
            </FullWidthButtonWrapper>
          )}
        </FullWidthWrapper>
      </FullWidthAligner>
    );
  }

  return (
    <Wrapper variant={variant}>
      <div>
        {!noTitle && <Heading variant={titleVariant}>{title}</Heading>}
        {body && (
          <Description>
            <RichTextRenderer>{body}</RichTextRenderer>
          </Description>
        )}
        {cta && <Button id={stringToSlug(title)} link={cta} variant="contained" />}
      </div>
      {icon && <Image asset={icon} />}
    </Wrapper>
  );
};

export default Banner;
