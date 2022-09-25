import { Asset } from 'contentful';
import { useState } from 'react';
import { Button, Heading, Image, Popup, StyledLink } from '../..';
import {
  Paragraph,
  UnsavedChangesBusinessPopupWrapper,
  ButtonsWrapper,
} from './UnsavedChangesBusinessPopup.styled';

interface ContinueSetupCarPopupProps {
  logo?: Asset;
}

const UnsavedChangesBusinessPopup = ({ logo }: ContinueSetupCarPopupProps) => {
  const [openPupup, setOpenPopup] = useState(false);
  return (
    <Popup
      isOpen={openPupup}
      setIsOpen={setOpenPopup}
      trigger={<StyledLink>{logo && <Image asset={logo} />}</StyledLink>}
    >
      <UnsavedChangesBusinessPopupWrapper>
        <Heading variant="h3">You have unsaved changes</Heading>
        <Paragraph>
          If you leave this page, all unsaved changes will be lost. <br />
          Do you want to leave this page?
        </Paragraph>
        <ButtonsWrapper>
          <Button onClick={() => setOpenPopup(false)} variant="outlined">
            Cancel
          </Button>
          <Button href="/">Leave page</Button>
        </ButtonsWrapper>
      </UnsavedChangesBusinessPopupWrapper>
    </Popup>
  );
};

export default UnsavedChangesBusinessPopup;
