import React, { createContext, FC, useRef, useState } from 'react';
import { SnackbarType } from '../elements/Snackbar/Snackbar.styled';
import { Snackbar } from '../elements';

export interface SnackbarContextValue {
  showSnackbar: (showSnackbarProps: ShowSnackbarProps) => void;
}

export const SnackbarContext = createContext<SnackbarContextValue>({
  showSnackbar: () => {},
});

const getDisplayDuration = (message: string): number => {
  const { min, max } = Math;
  const msgLength = message.length;

  return min(max(msgLength * 50, 2500), 7500);
};

export interface ShowSnackbarProps {
  message: string;
  type?: SnackbarType;
  duration?: number;
}

const SnackbarContextProvider: FC = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  const [messageInternal, setMessageInternal] = useState('');
  const [typeInternal, setTypeInternal] = useState<SnackbarType>('info');
  const [timeOutInternal, setTimeOutInternal] = useState<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const snackbarContainerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setOpen(false);
    if (timeOutInternal) {
      clearTimeout(timeOutInternal);
      setTimeOutInternal(undefined);
    }
  };

  const showSnackbar = ({ message, type = 'info', duration }: ShowSnackbarProps) => {
    if (!isOpen) {
      setMessageInternal(message);
      setTypeInternal(type);
      let durationInternal = duration;
      if (!duration) {
        durationInternal = getDisplayDuration(message);
      }
      setOpen(true);
      setTimeOutInternal(setTimeout(handleClose, durationInternal as number));
    }
  };

  return (
    <>
      <SnackbarContext.Provider value={{ showSnackbar }}>{children}</SnackbarContext.Provider>
      <div ref={snackbarContainerRef}>
        <Snackbar onClose={handleClose} open={isOpen} type={typeInternal}>
          {messageInternal}
        </Snackbar>
      </div>
    </>
  );
};

export default SnackbarContextProvider;
