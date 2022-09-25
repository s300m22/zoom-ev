import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import {
  CallIconOutlinedWrapper,
  EnquireLink,
  EnquireText,
  EnquireWithSellerWrapper,
  PhoneNumberText,
} from './EnquireWithSeller.styled';
import CallIconOutlined from '../../../../icons/CallIconOutlined';
import EmailIcon from '../../../../icons/EmailIcon';

export interface CallButtonProps {
  phoneNumber?: string | null;
  buttonText: string;
  email?: string | null;
}

const EnquireWithSeller = ({ phoneNumber, buttonText, email }: CallButtonProps) => {
  const [showNumber, setShowNumber] = useState(false);
  const parsedPhoneNumber = phoneNumber?.replaceAll('|', '');

  if (isMobile) {
    return (
      <EnquireWithSellerWrapper>
        <EnquireText>{buttonText}</EnquireText>
        {parsedPhoneNumber && (
          <EnquireLink href={`tel:${parsedPhoneNumber}`}>
            <CallIconOutlinedWrapper>
              <CallIconOutlined height="36px" width="36px" />
            </CallIconOutlinedWrapper>
          </EnquireLink>
        )}
        {email && (
          <EnquireLink href={`mailto: ${email}`}>
            <EmailIcon height="36px" width="36px" />
          </EnquireLink>
        )}
      </EnquireWithSellerWrapper>
    );
  }

  return (
    <>
      {showNumber ? (
        <EnquireWithSellerWrapper>
          <EnquireText>{buttonText}</EnquireText>
          {parsedPhoneNumber && (
            <>
              <CallIconOutlinedWrapper>
                <CallIconOutlined height="36px" width="36px" />
              </CallIconOutlinedWrapper>
              <PhoneNumberText>{parsedPhoneNumber}</PhoneNumberText>
            </>
          )}
          {email && (
            <EnquireLink href={`mailto: ${email}`}>
              <EmailIcon height="36px" width="36px" />
            </EnquireLink>
          )}
        </EnquireWithSellerWrapper>
      ) : (
        <EnquireWithSellerWrapper>
          <EnquireText>{buttonText}</EnquireText>
          {parsedPhoneNumber && (
            <CallIconOutlinedWrapper>
              <CallIconOutlined height="36px" onClick={() => setShowNumber(true)} width="36px" />
            </CallIconOutlinedWrapper>
          )}
          {email && (
            <EnquireLink href={`mailto: ${email}`}>
              <EmailIcon height="36px" width="36px" />
            </EnquireLink>
          )}
        </EnquireWithSellerWrapper>
      )}
    </>
  );
};

export default EnquireWithSeller;
