import { ShowSnackbarProps } from '../../providers/SnackbarProvider';
import { logError } from '../../utils';

export interface CognitoError {
  message: string;
  code: string;
}

const errors = [
  'NotAuthorizedException',
  'UsernameExistsException',
  'CodeMismatchException',
  'ExpiredCodeException',
  'LimitExceededException',
  'UserNotFoundException',
  'UsernameExistsException',
];

const handleErrors = (
  error: CognitoError,
  showSnackbar: ({ message, type }: ShowSnackbarProps) => void,
) => {
  logError(JSON.stringify(error));
  if (errors.includes(error.code) && error.message) {
    showSnackbar({ message: `${error.code}: ${error.message}`, type: 'error' });
  } else {
    showSnackbar({
      message: `${error.code}: ${error.message || 'Oops, Something went wrong.'}`,
      type: 'error',
    });
  }
};

export default handleErrors;
