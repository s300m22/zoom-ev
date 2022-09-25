export type BookingDialogContent = {
  title: string;
  text: string;
  action1Title: string;
  action2Title: string;
  action2Path?: string;
};

export enum AuthState {
  UNAUTHENTICATED,
  UNAPPROVED,
  PENDING,
  REJECTED,
}

export const getDialogContentForState = (state: AuthState): BookingDialogContent | null => {
  switch (state) {
    case AuthState.UNAUTHENTICATED:
      return {
        title: 'Not logged in',
        text: 'You need to be singed in to share an EV',
        action1Title: 'Dismiss',
        action2Title: 'Sign In',
        action2Path: '/auth/login?returnTo={returnURL}',
      };

    case AuthState.UNAPPROVED:
      return {
        title: 'Register to share this EV',
        text: 'You need to register for car sharing with Zoom EV and be approved before you can book.',
        action1Title: 'No Thanks',
        action2Title: "Register to share EV's",
        action2Path: '/introduce-yourself',
      };

    case AuthState.PENDING:
      return {
        title: 'We’re reviewing your application',
        text: 'Your application needs to be approved by the Zoom EV team before you can book this EV. We will notify you via email once your application is approved.',
        action1Title: 'Got It',
        action2Title: '',
        action2Path: undefined,
      };
    case AuthState.REJECTED:
      return {
        title: 'Sorry, you can’t share this vehicle',
        text: 'Your previous application to share was declined by Zoom EV but if your details have changed, you can resubmit it now.',
        action1Title: 'Maybe later',
        action2Title: 'Resubmit Application',
        action2Path: '/introduce-yourself',
      };

    default:
      return null;
  }
};
