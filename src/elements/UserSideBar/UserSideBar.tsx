import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import {
  BundleIcon,
  LogoutIcon,
  DashboardIcon,
  ProfileIcon,
  BookingsIcon,
  CarIcon,
  RidesIcon,
  PayoutsIcon,
} from '../../icons';
import {
  UserSideBarWrapper,
  NavigationLink,
  SubNav,
  SubNavTitle,
  BusinessAvatarWrapper,
  NavSectionTitle,
  MenuBlock,
} from './UserSideBar.styled';
import { useIsBusiness, useLogout } from '../../hooks';
import { UserAvatar } from '..';
import { userDetailsAtom } from '../../recoil';

interface LinkProps {
  link: string;
  icon: ReactNode;
  name: string;
}

interface MenuProps {
  name: string;
  link?: string;
  icon?: ReactNode;
  isSubMenu: boolean;
  subMenuLinks?: LinkProps[];
}

const UserSideBar = () => {
  const userDetails = useRecoilValue(userDetailsAtom);
  const router = useRouter();
  const logout = useLogout();
  const isBusiness = useIsBusiness();
  const businessLogo = userDetails?.business?.logoImage?.url;

  const buildSubmenu = ({ name, subMenuLinks = [] }: MenuProps) => (
    <SubNav key={name}>
      <SubNavTitle>{name}</SubNavTitle>
      {subMenuLinks?.map((subnav: LinkProps) => (
        <NavigationLink className={router.route === subnav.link ? 'active' : ''} key={subnav.name}>
          <Link href={subnav.link}>
            <a>
              {subnav.icon} {subnav.name}
            </a>
          </Link>
        </NavigationLink>
      ))}
    </SubNav>
  );

  const buildMenu = ({ link, name, icon }: MenuProps) => (
    <NavigationLink className={router.route === link ? 'active' : ''} key={name}>
      <Link href={link as string}>
        <a>
          {icon} {name}
        </a>
      </Link>
    </NavigationLink>
  );

  const dashboardData = {
    link: '/dashboard',
    icon: <DashboardIcon />,
    name: 'Dashboard',
    isSubMenu: false,
  };

  const profileData = {
    link: '/dashboard/profile',
    icon: <ProfileIcon />,
    name: 'Profile',
    isSubMenu: false,
  };

  const bundlesData = {
    link: '/dashboard/bundles',
    icon: <BundleIcon />,
    name: isBusiness ? 'Bundles' : 'My Benefits',
    isSubMenu: false,
  };

  const nonBusinessNavLinks = [
    dashboardData,
    {
      isSubMenu: true,
      name: 'FOR GUESTS',
      subMenuLinks: [
        {
          link: '/dashboard/trips',
          icon: <RidesIcon />,
          name: 'My trips',
        },
      ],
    },
    {
      isSubMenu: true,
      name: 'FOR HOSTS',
      subMenuLinks: [
        {
          link: '/dashboard/bookings',
          icon: <BookingsIcon />,
          name: 'Bookings',
        },
        {
          link: '/dashboard/cars',
          icon: <CarIcon />,
          name: 'My EVs',
        },
        {
          link: '/dashboard/payouts',
          icon: <PayoutsIcon />,
          name: 'Payouts',
        },
      ],
    },
  ];

  const businessNavLinks = [
    dashboardData,
    profileData,
    bundlesData,
    {
      link: '/dashboard/bookings',
      icon: <BookingsIcon />,
      name: 'Bookings',
      isSubMenu: false,
    },
    {
      link: '/dashboard/cars',
      icon: <CarIcon />,
      name: 'My EVs',
      isSubMenu: false,
    },
  ];

  return (
    <UserSideBarWrapper>
      {isBusiness && businessLogo ? (
        <BusinessAvatarWrapper>
          <UserAvatar avatarUrl={businessLogo} />
        </BusinessAvatarWrapper>
      ) : null}
      <div>
        {isBusiness ? (
          businessNavLinks.map((nav) => {
            if (nav) {
              if (nav.isSubMenu) {
                return buildSubmenu(nav);
              }
              return buildMenu(nav);
            }
            return null;
          })
        ) : (
          <>
            <MenuBlock>
              <NavSectionTitle>EV Benefits</NavSectionTitle>
              {buildMenu(bundlesData)}
            </MenuBlock>
            <MenuBlock>
              <NavSectionTitle>Car Sharing</NavSectionTitle>
              {nonBusinessNavLinks.map((nav) => {
                if (nav) {
                  return nav.isSubMenu ? buildSubmenu(nav) : buildMenu(nav);
                }
                return null;
              })}
            </MenuBlock>
          </>
        )}
        {!isBusiness && (
          <>
            <NavSectionTitle>More</NavSectionTitle>
            {buildMenu(profileData)}
          </>
        )}
        <NavigationLink onClick={() => logout()}>
          <a>
            <LogoutIcon /> Logout
          </a>
        </NavigationLink>
      </div>

      {/* <LogoutWrapper>
        
      </LogoutWrapper> */}
    </UserSideBarWrapper>
  );
};
export default UserSideBar;
