import { ReactNode } from 'react';
import { CloseButton, SnackbarType, SnackbarWrapper } from './Snackbar.styled';

export interface SnackbarProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  type: SnackbarType;
}

const Snackbar = ({ children, open = true, onClose, type = 'info' }: SnackbarProps) => (
  <SnackbarWrapper open={open} type={type}>
    {children}
    <CloseButton onClick={onClose} type={type} />
  </SnackbarWrapper>
);

export default Snackbar;
