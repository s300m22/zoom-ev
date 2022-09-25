import * as Sentry from '@sentry/react';
import isProduction from './isProduction';

const logError = (error: any) => {
  Sentry.captureException(error);
  !isProduction &&
    console.error('Error: ', typeof error === 'string' ? error : JSON.stringify(error));
};

export default logError;
