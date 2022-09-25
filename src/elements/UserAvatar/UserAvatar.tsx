import { DefaultAvatarIcon } from '../../icons';
import { UserAvatarWrapper, AvatarImage, UserAvatarImageWrapper } from './UserAvatar.styled';

export interface UserAvatarProps {
  avatarUrl?: string;
  width?: string;
  height?: string;
  variant?: string;
}

const UserAvatar = ({ avatarUrl, width = '100px', height = '100px', variant }: UserAvatarProps) => (
  <UserAvatarWrapper style={{ width, height }} variant={variant}>
    <UserAvatarImageWrapper>
      {avatarUrl ? <AvatarImage alt="" src={avatarUrl} /> : <DefaultAvatarIcon />}
    </UserAvatarImageWrapper>
  </UserAvatarWrapper>
);

export default UserAvatar;
