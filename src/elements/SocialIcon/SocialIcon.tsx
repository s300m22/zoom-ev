import React from 'react';
import { StyledLink, Image } from '..';
import { INavigationLink } from '../../interfaces/contentful.types.generated';

interface SocialIconProps {
  socialLink: INavigationLink;
}

const SocialIcon = ({ socialLink }: SocialIconProps) => {
  const { image, customUrl } = socialLink.fields;
  return socialLink ? (
    <StyledLink externalLink href={customUrl}>
      {image && <Image asset={image} />}
    </StyledLink>
  ) : null;
};

export default SocialIcon;
