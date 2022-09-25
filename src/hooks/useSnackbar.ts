import { useContext } from 'react';
import { ShowSnackbarProps, SnackbarContext } from '../providers/SnackbarProvider';

const useSnackbar = (): ((showSnackbarProps: ShowSnackbarProps) => void) => {
  const { showSnackbar } = useContext(SnackbarContext);
  return showSnackbar;
};

export default useSnackbar;
