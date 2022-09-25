import { useRouter } from 'next/router';
import { Icon, SocialIcons, Wrapper } from './ShareBanner.styled';
import { Heading } from '../index';
import { FacebookIcon, TwitterIcon } from '../../icons';

export interface ShareBannerProps {
  title?: string;
}

const ShareBanner = ({ title = 'Share on social media' }: ShareBannerProps) => {
  const router = useRouter();
  const currentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`;
  const shareFacebookLink = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
  const shareTwitterLink = `https://twitter.com/intent/tweet?text=${currentUrl}`;

  return (
    <Wrapper>
      <Heading variant="h5">{title}</Heading>
      <SocialIcons>
        <Icon href={shareFacebookLink} rel="noreferrer" target="_blank">
          <FacebookIcon />
        </Icon>
        <Icon href={shareTwitterLink} rel="noreferrer" target="_blank">
          <TwitterIcon />
        </Icon>
      </SocialIcons>
    </Wrapper>
  );
};

export default ShareBanner;
