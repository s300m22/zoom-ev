/* eslint-disable @typescript-eslint/no-explicit-any */
import { Asset } from 'contentful';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { INavigationLink } from '../../interfaces/contentful.types.generated';
import { MenuHambuger, ImageWrapper, NavContainer, NavWrapper, Wrapper } from './TopBar.styled';
import { Image, StyledLink, UserMenu } from '../../elements';
import { CloseMenuIcon, HamburgerIcon } from '../../icons';

interface TopBarProps {
  navigation?: Array<INavigationLink>;
  logo?: Asset;
  cta?: INavigationLink;
  isWide: boolean;
  hideProfile?: boolean;
  logoLink?: boolean;
  secondaryLogo?: string;
}

const TopBar = ({
  navigation,
  logo,
  cta,
  isWide,
  hideProfile = false,
  logoLink = true,
  secondaryLogo = undefined,
}: TopBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const htmlElement = document.getElementsByTagName('html')[0];
    if (isOpen) {
      htmlElement.style.overflow = 'hidden';
    } else {
      htmlElement.removeAttribute('style');
    }
  }, [isOpen]);

  return (
    <Wrapper isWide={isWide}>
      <NavContainer isWide={isWide}>
        <ImageWrapper>
          <StyledLink href={!logoLink ? '' : '/'}>{logo && <Image asset={logo} />}</StyledLink>
        </ImageWrapper>
        <ImageWrapper>{secondaryLogo && <Image asset={secondaryLogo} />}</ImageWrapper>
        {navigation?.length && (
          <MenuHambuger onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <CloseMenuIcon /> : <HamburgerIcon />}
          </MenuHambuger>
        )}
        <NavWrapper isOpen={isOpen} onClick={() => setIsOpen(false)}>
          {navigation?.map((link: any) => (
            <StyledLink
              color={
                `/${link.fields.linkedEntry?.fields?.urlSlug}` === router.asPath
                  ? 'blue'
                  : 'primary'
              }
              key={link.sys.id}
              link={link}
            />
          ))}
          {!hideProfile && <UserMenu ctaLink={cta} setIsOpen={setIsOpen} />}
        </NavWrapper>
      </NavContainer>
    </Wrapper>
  );
};

export default TopBar;
