import { RefObject } from 'react';
import { logError } from '../utils';
import useSnackbar from './useSnackbar';

const useCopyToClipboard = () => {
  const showSnackbar = useSnackbar();

  const copy = async (element: RefObject<HTMLDivElement>) => {
    try {
      const text = element.current?.innerText;

      if (text) {
        await navigator.clipboard.writeText(text);
        showSnackbar({
          message: `Successfully copied "${text}" to clipboard.`,
          type: 'success',
        });
      } else {
        throw new Error('Copying failed.');
      }
    } catch (error) {
      logError(error);
      showSnackbar({
        message: 'Oops, Something went wrong. Please copy the text manually.',
        type: 'error',
      });
    }
  };

  return copy;
};

export default useCopyToClipboard;
