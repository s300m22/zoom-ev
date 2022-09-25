import { Heading, Popup } from '..';
import {
  DialogActionsHolder,
  DialogMessage,
  DialogMessageContent,
  DialogPopupWrapper,
} from './Dialog.styled';

type DialogProps = {
  children?: React.ReactNode | undefined;
  header?: string;
  text?: string;
  onClose?: () => void;
};
const Dialog: React.FC<DialogProps> = ({ children, header, text, onClose = () => {} }) => {
  return (
    <Popup isOpen setIsOpen={() => onClose()}>
      <DialogPopupWrapper>
        <DialogMessage>
          <Heading variant="h4">{header}</Heading>
          <DialogMessageContent>{text}</DialogMessageContent>
        </DialogMessage>
      </DialogPopupWrapper>
      <DialogActionsHolder>{children}</DialogActionsHolder>
    </Popup>
  );
};

export default Dialog;
