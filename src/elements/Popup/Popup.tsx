import { Dispatch, SetStateAction, ReactNode, useEffect } from 'react';
import { PopupClose, PopupOverlay, PopupWrapper, PopupTrigger } from './Popup.styled';

export interface PopupProps {
  trigger?: ReactNode;
  children: ReactNode;
  maxHeight?: string;
  handleCloseEvent?: () => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  dismissible?: boolean;
}

const Popup = ({
  trigger,
  children,
  handleCloseEvent,
  maxHeight = '500px',
  isOpen,
  setIsOpen,
  dismissible = true,
}: PopupProps) => {
  useEffect(() => {
    const htmlElement = document.getElementsByTagName('html')[0];
    if (isOpen) htmlElement.style.overflow = 'hidden';
    return () => htmlElement.removeAttribute('style');
  }, [isOpen]);

  const handleClose = () => {
    if (dismissible) {
      setIsOpen(false);
      handleCloseEvent && handleCloseEvent();
    }
  };

  return (
    <>
      {trigger && (
        <PopupTrigger onClick={() => setIsOpen(true)} role="button" tabIndex={0}>
          {trigger}
        </PopupTrigger>
      )}
      {isOpen ? (
        <>
          <PopupWrapper maxHeight={maxHeight}>
            {dismissible && <PopupClose onClick={handleClose} />}
            {children}
          </PopupWrapper>
          <PopupOverlay onClick={handleClose} />
        </>
      ) : null}
    </>
  );
};

export default Popup;
