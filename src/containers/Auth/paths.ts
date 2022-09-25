const PATHS = {
  register: '/auth/register',
  login: '/auth/login',
  forgotPassword: '/auth/forgot-password',
  tellUsMore: '/auth/tell-us-more',
  verificationCode: '/auth/confirm-account',
  updatePassword: '/auth/update-password',
  newPasswordConfirm: '/auth/new-password-confirm',
  newPasswordResetVerify: '/auth/set-new-password',
} as const;

export default PATHS;
