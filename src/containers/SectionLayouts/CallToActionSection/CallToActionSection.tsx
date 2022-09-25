import { Banner, Button, RichTextRenderer } from '../../../elements';
import { ICallToActionSectionFields } from '../../../interfaces/contentful.types.generated';
import {
  CallToActionContainer,
  CallToActionSectionWrapper,
  ButtonWrapper,
} from './CallToActionSection.styled';

const CallToActionSection = ({
  banner,
  text,
  ctaButton,
  ctaButton2,
  background = '#eef3f6',
  padding = '130px 0 215px',
  width = '891px',
}: ICallToActionSectionFields) => (
  <CallToActionSectionWrapper background={background} padding={padding}>
    <CallToActionContainer width={width}>
      <RichTextRenderer>{text}</RichTextRenderer>
      {(ctaButton || ctaButton2) && (
        <ButtonWrapper>
          {ctaButton && <Button link={ctaButton} />}
          {ctaButton2 && <Button link={ctaButton2} />}
        </ButtonWrapper>
      )}
      {banner && <Banner {...banner.fields} />}
    </CallToActionContainer>
  </CallToActionSectionWrapper>
);

export default CallToActionSection;
