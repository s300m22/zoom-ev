import { useRouter } from 'next/router';
import { useState } from 'react';
import { DefaultBundleIcon } from '../../../icons';
import Button from '../../Button';
import Heading from '../../Heading';
import Image from '../../Image';
import Popup from '../../Popup';
import {
  ImageWrapper,
  ButtonsWrapper,
  ReceivedBundlePopupWrapper,
} from './ReceivedBundlePopup.styled';

export interface ReceivedBundlePopupProps {
  partnerImage?: string;
  bundlePageUrl?: string;
}

const ReceivedBundlePopup = ({ partnerImage, bundlePageUrl }: ReceivedBundlePopupProps) => {
  const [openPopup, setOpenPopup] = useState(true);
  const router = useRouter();
  return (
    <Popup isOpen={openPopup} setIsOpen={setOpenPopup}>
      <ReceivedBundlePopupWrapper>
        <ImageWrapper>
          {partnerImage ? <Image asset={partnerImage} /> : <DefaultBundleIcon />}
        </ImageWrapper>

        <Heading variant="h3">You have received an EV Benefits Bundle</Heading>
        <ButtonsWrapper>
          <Button
            onClick={() => {
              localStorage.setItem('bundlePopupClosed', 'true');
              setOpenPopup(false);
            }}
            variant="outlined"
            withArrow
          >
            I will do it later
          </Button>
          <Button onClick={() => router.push(`/${bundlePageUrl}`)} withArrow>
            View bundle details
          </Button>
        </ButtonsWrapper>
      </ReceivedBundlePopupWrapper>
    </Popup>
  );
};
export default ReceivedBundlePopup;
