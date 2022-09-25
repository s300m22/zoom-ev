import { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { INavigationLink } from '../../interfaces/contentful.types.generated';
import Button from '../Button';
import { userDetailsAtom } from '../../recoil';
import {
  FirstNameContainer,
  UserMenuContent,
  UserMenuWrapper,
  UserMenuInnerWrapper,
  UserSubMenu,
  UserSubMenuInner,
  LogoutButtonWrapper,
} from './UserMenu.styled';
import { ArrowBottomIcon } from '../../icons';
import { useLogout, useMediaDevice } from '../../hooks';
import StyledLink from '../StyledLink';
import { UserAvatar } from '..';

export interface UserMenuProps {
  ctaLink?: INavigationLink;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const UserMenu = ({ ctaLink, setIsOpen }: UserMenuProps) => {
  const [showSubMenu, setShownSubMenu] = useState(false);
  const userDetails = useRecoilValue(userDetailsAtom);
  const logout = useLogout();
  const { isMobile, isDesktop, isUltraWide } = useMediaDevice();
  const router = useRouter();
  const avatarUrl = userDetails?.business?.logoImage?.url || userDetails?.details?.avatarImage?.url;

  return (
    <UserMenuWrapper>
      {userDetails ? (
        <>
          <UserMenuInnerWrapper
            onMouseEnter={() => setShownSubMenu(true)}
            onMouseLeave={() => setShownSubMenu(false)}
          >
            <UserMenuContent
              onClick={() => {
                router.push('/dashboard');
                setIsOpen(false);
              }}
              showSubMenu={showSubMenu}
            >
              <UserAvatar avatarUrl={avatarUrl} height="40px" width="40px" />
              <FirstNameContainer>{userDetails?.details?.firstName}</FirstNameContainer>
            </UserMenuContent>
            {showSubMenu && (isDesktop || isUltraWide) && (
              <UserSubMenu>
                <UserSubMenuInner>
                  <StyledLink href="/dashboard">Dashboard</StyledLink>
                  <Button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    variant="text"
                  >
                    Logout
                  </Button>
                </UserSubMenuInner>
              </UserSubMenu>
            )}
            <ArrowBottomIcon />
          </UserMenuInnerWrapper>
          {isMobile && (
            <LogoutButtonWrapper>
              <Button onClick={() => logout()} variant="text">
                Logout
              </Button>
            </LogoutButtonWrapper>
          )}
        </>
      ) : (
        <Button link={ctaLink} />
      )}
    </UserMenuWrapper>
  );
};

export default UserMenu;
