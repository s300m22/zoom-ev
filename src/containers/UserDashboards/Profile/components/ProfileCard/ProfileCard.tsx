import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import {
  BoldText,
  Heading,
  SubText,
  UserAvatar,
  UserAvatarInput,
  UserRatings,
} from '../../../../../elements';
import {
  ProfileCardCell,
  SettingsCardWrapper,
  UserDetailsWrapper,
  NavigationButton,
} from './ProfileCard.styled';
import { userDetailsAtom } from '../../../../../recoil';
import { BundleIcon, CogIcon, ProfileIcon } from '../../../../../icons';
import ContactNumber from './components/ContactNumber';
import { useIsBusiness } from '../../../../../hooks';

const ProfileCard = () => {
  const router = useRouter();
  const isBusiness = useIsBusiness();
  const userDetails = useRecoilValue(userDetailsAtom);
  const businessAvatar = userDetails?.business?.logoImage?.url;

  return userDetails ? (
    <SettingsCardWrapper>
      <ProfileCardCell>
        {isBusiness ? <UserAvatar avatarUrl={businessAvatar} /> : <UserAvatarInput />}

        <UserDetailsWrapper>
          <div>
            <Heading variant="h6">
              {userDetails.details.firstName} {userDetails.details.lastName}
            </Heading>
            {isBusiness ? (
              <>
                <UserRatings
                  avgScore={userDetails.reviewsAverageScore}
                  totalReviews={userDetails.reviewsCount}
                />
                <SubText style={{ fontSize: '16px' }}>Role</SubText>
                <BoldText>{userDetails.businessUserRole}</BoldText>
              </>
            ) : (
              <UserRatings
                avgScore={userDetails.reviewsAverageScore}
                totalReviews={userDetails.reviewsCount}
              />
            )}
          </div>
          {!isBusiness ? <ContactNumber /> : null}
        </UserDetailsWrapper>
      </ProfileCardCell>
      <ProfileCardCell isBusiness={isBusiness}>
        {!isBusiness ? (
          <>
            <NavigationButton onClick={() => router.push('/dashboard/profile/details')}>
              <ProfileIcon />
              Profile details
            </NavigationButton>
            <NavigationButton onClick={() => router.push('/dashboard/profile/payment')}>
              <BundleIcon />
              Payment method
            </NavigationButton>
            <NavigationButton onClick={() => router.push('/dashboard/profile/settings')}>
              <CogIcon />
              Account settings
            </NavigationButton>
          </>
        ) : (
          <NavigationButton onClick={() => router.push('/dashboard/profile/settings-business')}>
            <CogIcon />
            Account settings
          </NavigationButton>
        )}
      </ProfileCardCell>
    </SettingsCardWrapper>
  ) : null;
};
export default ProfileCard;
