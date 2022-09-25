import { Dispatch, SetStateAction, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { StepWrapper, StepRow, StepParagraph } from '../StepsShared.styled';
import { Checkbox, Heading, SimpleCard, StyledLink } from '../../../../elements';
import { logError } from '../../../../utils';
import { useUpdateMyDetailsMutation } from '../../../../hooks/api/updateMyDetails/updateMyDetails.generated';
import mixpanel from 'mixpanel-browser';

interface StepFiveProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const StepFive = ({ setActiveStep, setIsLoading }: StepFiveProps) => {
  const [updateMyDetails] = useUpdateMyDetailsMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      const isValid = await trigger();
      if (!isValid) {
        return;
      }
      await updateMyDetails({
        variables: {
          isDraft: false,
          update: {},
        },
      });

      mixpanel.track('sharing.registration_complete');
      reset();
      setActiveStep(6);
    } catch (error: any) {
      logError(error);
    } finally {
      setIsLoading(false);
    }
  }, [reset, setActiveStep, setIsLoading, trigger, updateMyDetails]);

  return (
    <StepWrapper>
      <StepRow>
        <SimpleCard customStyles={{ width: '100%', textAlign: 'left' }}>
          <Heading variant="h4">Agreements</Heading>
          <StepParagraph>You are almost there. This is the last step.</StepParagraph>
          <form id="submit-form-5" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Checkbox
              {...register('termsAccept', { required: true })}
              customStyles={{
                fontSize: '16px',
                fontWeight: 400,
              }}
              errors={errors}
              label={
                <>
                  I accept Zoom EV&lsquo;s{' '}
                  <StyledLink color="blue" externalLink href="/terms-and-conditions">
                    Terms &amp; Conditions
                  </StyledLink>{' '}
                  of Service
                </>
              }
              required
            />
            <Checkbox
              {...register('acceptanceCriteriaAccept', { required: true })}
              customStyles={{
                fontSize: '16px',
                fontWeight: 400,
              }}
              errors={errors}
              label={
                <>
                  I accept Zoom EV’s{' '}
                  <StyledLink
                    color="blue"
                    externalLink
                    href="/terms-and-conditions#Table%201%20Member%20Eligibility"
                  >
                    Acceptance Criteria
                  </StyledLink>{' '}
                  and meet the criteria stipulated
                </>
              }
              required
            />
          </form>
        </SimpleCard>
      </StepRow>
    </StepWrapper>
  );
};

export default StepFive;
