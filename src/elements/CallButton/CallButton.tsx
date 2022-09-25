import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { CallIcon } from '../../icons';
import { CallButtonText, CallLink } from './CallButton.styled';

export interface CallButtonProps {
  phoneNumber?: string | null;
  buttonText: string;
}

const CallButton = ({ phoneNumber, buttonText }: CallButtonProps) => {
  const [showNumber, setShowNumber] = useState(false);

  if (!phoneNumber || phoneNumber === '') return null;

  const parsedPhoneNumber = phoneNumber.replaceAll('|', '');

  if (isMobile) {
    return (
      <CallLink href={`tel:${parsedPhoneNumber}`}>
        <CallIcon height="36px" width="36px" />
        <CallButtonText>{buttonText}</CallButtonText>
      </CallLink>
    );
  }

  return (
    <>
      {showNumber ? (
        <CallLink>
          <CallButtonText>{parsedPhoneNumber}</CallButtonText>
        </CallLink>
      ) : (
        <CallLink onClick={() => setShowNumber(true)}>
          <CallIcon height="36px" width="36px" />
          <CallButtonText>{buttonText}</CallButtonText>
        </CallLink>
      )}
    </>
  );
};

export default CallButton;
