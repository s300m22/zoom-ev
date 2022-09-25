import { useState } from 'react';
import { UserAvatar } from '../..';
import { useSetBusinessInvitationPopupClosedMutation } from '../../../hooks/api/setBusinessInvitationPopupClosed/setBusinessInvitationPopupClosed.generated';
import { logError } from '../../../utils';
import Button from '../../Button';
import Heading from '../../Heading';
import Popup from '../../Popup';
import {
  ImageWrapper,
  ButtonsWrapper,
  BusinessInvitationPopupWrapper,
  Paragraph,
} from './BusinessInvitationPopup.styled';

export interface BusinessInvitationPopupProps {
  businessImage?: string;
}

const BusinessInvitationPopup = ({ businessImage }: BusinessInvitationPopupProps) => {
  const [openPopup, setOpenPopup] = useState(true);
  const [setBusinessInvitationPopupClosed] = useSetBusinessInvitationPopupClosedMutation();

  const handleClose = async () => {
    try {
      await setBusinessInvitationPopupClosed();
      setOpenPopup(false);
    } catch (error: any) {
      logError(error);
    }
  };

  return (
    <Popup isOpen={openPopup} setIsOpen={setOpenPopup}>
      <BusinessInvitationPopupWrapper>
        <ImageWrapper>{businessImage && <UserAvatar avatarUrl={businessImage} />}</ImageWrapper>
        <Heading variant="h3">Welcome to ZoomEV for business</Heading>
        <Paragraph>You have been invited to join the business account.</Paragraph>
        <ButtonsWrapper>
          <Button onClick={handleClose} withArrow>
            Got it
          </Button>
        </ButtonsWrapper>
      </BusinessInvitationPopupWrapper>
    </Popup>
  );
};
export default BusinessInvitationPopup;
