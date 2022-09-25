import { Auth } from '@aws-amplify/auth';
import { useForm } from 'react-hook-form';
import { Button } from '../../../../elements';
import { useSnackbar, useTheme } from '../../../../hooks';

interface ResendCodeProps {
  email: string;
}

const ResendCode = ({ email }: ResendCodeProps) => {
  const showSnackbar = useSnackbar();
  const theme = useTheme();
  const { trigger } = useForm();

  const handleReset = async () => {
    try {
      trigger('email');
      await Auth.resendSignUp(email);
      showSnackbar({ message: 'Code sent successfully.', type: 'success' });
    } catch (error: any) {
      if (!email) {
        showSnackbar({ message: 'Please fill an email in the box above.', type: 'error' });
      } else {
        showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
      }
    }
  };

  return (
    <Button
      customStyles={{ color: theme.palette.hover, fontWeight: 500, textDecoration: 'underline' }}
      onClick={handleReset}
      variant="text"
    >
      Resend code
    </Button>
  );
};

export default ResendCode;
