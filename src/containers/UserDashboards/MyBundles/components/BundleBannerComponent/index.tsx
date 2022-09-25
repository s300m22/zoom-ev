import React from 'react';
import { Image, RichTextRenderer, StyledLink } from '../../../../../elements';
import { IBanner } from '../../../../../interfaces/contentful.types.generated';
import { Container } from './BundleBannerComponent.styled';

const BundleBannerComponent: React.FC<IBanner> = ({ fields }) => {
  return (
    <Container
      isPartnerLogo={fields.variant === 'partner_logo'}
      style={{ padding: fields.padding }}
    >
      {fields.icon && <Image asset={fields.icon} />}
      <div className="content-zone">
        <h4>{fields.title}</h4>
        <RichTextRenderer>{fields.body}</RichTextRenderer>
        {fields.cta && (
          <StyledLink externalLink={!!fields.cta.fields.customUrl} link={fields.cta} />
        )}
      </div>
    </Container>
  );
};

export default BundleBannerComponent;
