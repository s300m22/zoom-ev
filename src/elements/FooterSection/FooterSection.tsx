import React from 'react';
import { IFooterSectionFields } from '../../interfaces/contentful.types.generated';
import { Heading, StyledLink } from '../index';
import Wrapper from './FooterSection.styled';

export interface FooterSectionProps {
  section: IFooterSectionFields;
}

const FooterSection = ({ section }: FooterSectionProps) => {
  if (!section) return null;

  return section.label ? (
    <Wrapper>
      <Heading variant="h6">{section.label}</Heading>
      {section.links?.map((link) => (
        <StyledLink key={link.sys.id} link={link} />
      ))}
    </Wrapper>
  ) : null;
};

export default FooterSection;
