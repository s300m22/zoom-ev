import { Asset } from 'contentful';
import AvatarWrapper, { AvatarVariants } from './Avatar.styled';
import Image from '../Image';
import { DefaultAvatarIcon } from '../../icons';

interface AvatarProps {
  avatar?: Asset | string;
  variant?: AvatarVariants;
}

const Avatar = ({ avatar, variant }: AvatarProps) => (
  <AvatarWrapper variant={variant}>
    {avatar ? <Image asset={avatar} /> : <DefaultAvatarIcon height="100%" width="100%" />}
  </AvatarWrapper>
);

export default Avatar;
