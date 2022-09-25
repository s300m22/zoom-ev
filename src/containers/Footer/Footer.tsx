import { Entry } from 'contentful';
import { StyledLink, Container, Divider, FooterSection, SocialIcon } from '../../elements';
import { IFooterSectionFields, INavigationLink } from '../../interfaces/contentful.types.generated';
import {
  FooterCallToAction,
  FooterLinks,
  FooterLinksSection,
  FooterSectionsContainer,
  FooterWrapper,
} from './Footer.styled';

interface FooterProps {
  cta?: INavigationLink;
  links?: INavigationLink[];
  sections?: Entry<IFooterSectionFields>[];
  socialLinks?: INavigationLink[];
  isWide?: boolean;
}

const Footer = ({ cta, links, sections, socialLinks, isWide }: FooterProps) => (
  <FooterWrapper>
    <Container isWide={isWide}>
      {cta && (
        <FooterCallToAction>
          {cta.fields.text}
          <StyledLink color="secondary" link={cta}>
            {cta.fields.label}
          </StyledLink>
        </FooterCallToAction>
      )}
      {sections && (
        <FooterSectionsContainer>
          {sections.map((section) => (
            <FooterSection key={section.sys.id} section={section.fields} />
          ))}
        </FooterSectionsContainer>
      )}

      <Divider />
      <FooterLinks>
        {socialLinks && (
          <FooterLinksSection>
            {socialLinks.map((link) => (
              <SocialIcon key={link.sys.id} socialLink={link} />
            ))}
          </FooterLinksSection>
        )}
        {links && (
          <FooterLinksSection>
            {links?.map((link) => (
              <StyledLink key={link.sys.id} link={link} />
            ))}
          </FooterLinksSection>
        )}
      </FooterLinks>
    </Container>
  </FooterWrapper>
);

export default Footer;
