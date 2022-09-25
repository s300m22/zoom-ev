import { ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { UrlObject } from 'url';
import {
  IFaqPage,
  IFaq,
  IPage,
  INavigationLink,
  IBlogPost,
} from '../../interfaces/contentful.types.generated';
import { Paragraph, Link, LinkWrapper, DropdownLink } from './StyledLink.styled';
import { getUrlPrefix } from '../../utils';
import DropdownIcon from '../../icons/DropdownIcon';
import { useMediaDevice } from '../../hooks';

export interface StyledLinkProps {
  color?: 'primary' | 'secondary' | 'blue';
  href?: string | UrlObject;
  link?: INavigationLink;
  children?: ReactNode;
  externalLink?: boolean;
  goBack?: boolean;
}

const StyledLink = ({
  color = 'primary',
  link,
  href,
  children,
  externalLink = false,
  goBack = false,
}: StyledLinkProps) => {
  const { isDesktop } = useMediaDevice();

  const [dropdownShown, setDropDownShown] = useState(false);

  const urlSlug =
    (link?.fields?.linkedEntry as unknown as IFaqPage | IFaq | IPage)?.fields?.urlSlug ||
    (link?.fields?.linkedEntry as unknown as IBlogPost)?.fields?.slug;

  const navigateTo = (urlSlug && `/${urlSlug}`) || link?.fields.customUrl || href;
  const urlPrefix = link?.fields?.linkedEntry ? getUrlPrefix(link.fields.linkedEntry) : '';
  const router = useRouter();

  if (link && link.fields?.dropdownItems?.length) {
    return (
      <DropdownLink>
        <LinkWrapper
          onClick={(e) => {
            e.preventDefault();
            setDropDownShown(!dropdownShown);
            e.stopPropagation();
          }}
        >
          <Paragraph className="ltt">
            <span>{children || link?.fields.label}</span> &nbsp; <DropdownIcon fill="gray" />
          </Paragraph>
        </LinkWrapper>

        {dropdownShown || isDesktop ? (
          <div className="menu">
            {link.fields?.dropdownItems?.map((linkI: INavigationLink) => (
              <StyledLink color="primary" key={linkI.sys.id} link={linkI} />
            ))}
          </div>
        ) : null}
      </DropdownLink>
    );
  }

  if (!navigateTo) {
    return (
      <LinkWrapper onClick={() => goBack && router.back()}>
        <Paragraph>{children || link?.fields.label}</Paragraph>
      </LinkWrapper>
    );
  }

  if (typeof href === 'string' && externalLink) {
    return (
      <LinkWrapper>
        <Link color={color} href={href} rel="noreferrer noopener nofollow" target="_blank">
          {children}
        </Link>
      </LinkWrapper>
    );
  }

  if (externalLink) {
    return (
      <LinkWrapper>
        <Link
          color={color}
          href={`${urlPrefix}${navigateTo}`}
          rel="noreferrer noopener"
          target="_blank"
        >
          {children || link?.fields.label}
        </Link>
      </LinkWrapper>
    );
  }

  return (
    <LinkWrapper>
      <NextLink href={`${urlPrefix}${navigateTo}`} passHref={externalLink}>
        <Link color={color}>{children || link?.fields.label}</Link>
      </NextLink>
    </LinkWrapper>
  );
};

export default StyledLink;
