import { Button, Heading, Image } from '../../../../../elements';
import { DefaultBundleIcon } from '../../../../../icons';
import {
  WaitingBundleCardStyled,
  CardInnerWrapper,
  ImageWrapper,
  TextWrapper,
} from './WaitingBundleCard.styled';

interface WaitingCardBundleProps {
  issuer: string;
  partnerImage?: string;
  url: string;
}

const WaitingBundleCard = ({ issuer, partnerImage, url }: WaitingCardBundleProps) => {
  return (
    <WaitingBundleCardStyled>
      <CardInnerWrapper>
        <div>
          <ImageWrapper>
            {partnerImage ? (
              <Image alt="Partner logo" asset={partnerImage} />
            ) : (
              <DefaultBundleIcon />
            )}
          </ImageWrapper>
          <TextWrapper>
            <Heading variant="h6">New bundle is waiting for you </Heading>
            <p>{issuer}</p>
          </TextWrapper>
        </div>
        <div>
          <Button href={`/${url}`} variant="outlined">
            View bundle details
          </Button>
          <Button href="/checkout" variant="contained" withArrow>
            Get your bundle
          </Button>
        </div>
      </CardInnerWrapper>
    </WaitingBundleCardStyled>
  );
};

export default WaitingBundleCard;
