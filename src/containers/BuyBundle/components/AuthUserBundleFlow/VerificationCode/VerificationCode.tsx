/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { Auth } from '@aws-amplify/auth';
import { useWatch, useForm } from 'react-hook-form';
import { BoldText, CodeInput, Heading, SimpleCard, SubText } from '../../../../../elements';
import handleErrors from '../../../../Auth/handleErrors';
import { useSnackbar } from '../../../../../hooks';
import { verificationCodeValidator } from '../../../../../utils';
import VerificationCodeForm from './VerificationCode.styled';

interface VerificationProps {
  verificationCode: string;
}

interface VerificationCodeProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
}

const VerificationCode = ({ setActiveStep }: VerificationCodeProps) => {
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(false);
  const username = sessionStorage.getItem('registerMail');
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<VerificationProps>({
    mode: 'onChange',
  });

  const submitForm = useCallback(
    async (input: VerificationProps) => {
      try {
        setLoading(true);
        if (username) {
          await Auth.confirmSignUp(username, input.verificationCode);
          showSnackbar({
            message: 'Account successfully verified. You may log in now.',
            type: 'success',
          });
          setActiveStep(3);
          reset();
        } else {
          throw Error('User not found.');
        }
      } catch (error: any) {
        handleErrors(error, showSnackbar);
      } finally {
        setLoading(false);
      }
    },
    [reset, setActiveStep, showSnackbar, username],
  );

  const verificationCode = useWatch<any>({
    control,
    name: 'verificationCode',
  });

  useEffect(() => {
    if (verificationCode?.length === 6 && !loading) {
      submitForm({
        verificationCode,
      });
    }
  }, [submitForm, verificationCode]);

  return (
    <>
      <Heading variant="h2">Check your email for code</Heading>
      <SubText>
        We’ve sent a 6-character code to <BoldText>{username}</BoldText>. The code expires shortly,
        so please enter it soon.
      </SubText>
      <SimpleCard>
        <VerificationCodeForm noValidate onSubmit={handleSubmit(submitForm)}>
          {/* @ts-ignore */}
          <CodeInput
            {...register('verificationCode', {
              required: true,
              minLength: verificationCodeValidator(),
            })}
            errors={errors}
            fields={6}
            inputMode="numeric"
            setCodeValue={setValue}
            type="number"
          />
        </VerificationCodeForm>
      </SimpleCard>
    </>
  );
};

export default VerificationCode;
