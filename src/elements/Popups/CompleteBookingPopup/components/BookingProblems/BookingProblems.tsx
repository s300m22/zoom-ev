import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../..';
import { useReportCarRentalRequestIncidentAsOwnerMutation } from '../../../../../hooks/api/reportCarRentalRequestIncidentAsOwner/reportCarRentalRequestIncidentAsOwner.generated';
import { logError } from '../../../../../utils';
import { TextArea } from '../../../../Inputs';
import { Form, ButtonsWrapper } from '../../CompleteBookingPopup.styled';

interface BookingCompletedProps {
  rentalId: string;
  problemsList: Array<string>;
  setActiveStep: Dispatch<SetStateAction<number>>;
}

interface BookingProblemsFormProps {
  undamaged: string;
  clean: string;
  charged: string;
  ontime: string;
}

const BookingProblems = ({ rentalId, problemsList, setActiveStep }: BookingCompletedProps) => {
  const [reportProblem, { loading: problemLoading }] =
    useReportCarRentalRequestIncidentAsOwnerMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<BookingProblemsFormProps>({
    mode: 'onBlur',
  });

  const onSubmit = async (input: BookingProblemsFormProps) => {
    try {
      const isValid = await trigger();

      if (!isValid) {
        return;
      }
      await reportProblem({
        variables: {
          id: rentalId,
          incidentDescription: JSON.stringify(input),
        },
      });
      setActiveStep(3);
    } catch (error: any) {
      logError(error);
    }
  };

  return (
    <>
      <Form
        id="checklistForm"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        style={{ marginTop: '30px' }}
      >
        {problemsList.map((problem: any) => (
          <TextArea
            key={problem}
            {...register(problem, { required: true })}
            disabled={problemLoading}
            errors={errors}
            label={`Your vehicle wasn’t returned ${problem.replace('ontime', 'on time')}`}
            maxLength={750}
            noResize
            placeholder="Sorry to hear that,&#10;Can you give us more details, so we can better understand what happened?"
            required
          />
        ))}
      </Form>
      <ButtonsWrapper>
        <Button
          isLoading={problemLoading}
          onClick={(e) => {
            e.preventDefault();
            setActiveStep(0);
          }}
          variant="outlined"
        >
          Back
        </Button>
        <Button form="checklistForm" isLoading={problemLoading} type="submit" withArrow>
          Next
        </Button>
      </ButtonsWrapper>
    </>
  );
};

export default BookingProblems;
