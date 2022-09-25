import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { BoldText, Button, Heading } from '../../../..';
import { useFinishCarRentalRequestMutation } from '../../../../../hooks/api/finishCarRentalRequest/finishCarRentalRequest.generated';
import { logError } from '../../../../../utils';
import { Checkbox } from '../../../../Inputs';
import { ButtonsWrapper, Form } from '../../CompleteBookingPopup.styled';

interface BookingCheckListProps {
  rentalId: string;
  setActiveStep: Dispatch<SetStateAction<number>>;
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
  setProblemsList: Dispatch<SetStateAction<Array<string>>>;
}

interface CheckListFormProps {
  undamaged: boolean;
  clean: boolean;
  charged: boolean;
  ontime: boolean;
}

const BookingCheckList = ({
  rentalId,
  setActiveStep,
  setOpenPopup,
  setProblemsList,
}: BookingCheckListProps) => {
  const [finishCarRentalRequest, { loading }] = useFinishCarRentalRequestMutation({
    variables: {
      id: rentalId,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<CheckListFormProps>({
    mode: 'onBlur',
  });

  const onSubmit = async (input: CheckListFormProps) => {
    try {
      const isValid = await trigger();

      if (!isValid) {
        return;
      }
      const isAllCheckboxChecked = Object.values(input).every((i) => i === true);
      setProblemsList(
        Object.keys(Object.fromEntries(Object.entries(input).filter(([, val]) => val === false))),
      );
      if (isAllCheckboxChecked) {
        try {
          await finishCarRentalRequest();
          setActiveStep(1);
        } catch (error: any) {
          logError(error);
        }
      } else {
        setActiveStep(2);
      }
    } catch (error: any) {
      logError(error);
    }
  };

  return (
    <>
      <Heading variant="h3">Complete rental</Heading>
      <Form id="checklistForm" noValidate onSubmit={handleSubmit(onSubmit)}>
        <BoldText style={{ margin: '30px 0 15px' }}>Please complete the checklist </BoldText>
        <Checkbox
          {...register('undamaged')}
          customStyles={{
            margin: '10px 0',
          }}
          errors={errors}
          label="Vehicle was returned undamaged"
        />
        <Checkbox
          {...register('clean')}
          customStyles={{
            margin: '10px 0',
          }}
          errors={errors}
          label="Vehicle was returned clean "
        />
        <Checkbox
          {...register('charged')}
          customStyles={{
            margin: '10px 0',
          }}
          errors={errors}
          label="Vehicle was returned with 80% charge"
        />
        <Checkbox
          {...register('ontime')}
          customStyles={{
            margin: '10px 0',
          }}
          errors={errors}
          label="Vehicle was returned at a time agreed with the renter"
        />
      </Form>
      <ButtonsWrapper>
        <Button
          isLoading={loading}
          onClick={(e) => {
            e.preventDefault();
            setActiveStep(0);
            setOpenPopup(false);
          }}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button form="checklistForm" isLoading={loading} type="submit" withArrow>
          Next
        </Button>
      </ButtonsWrapper>
    </>
  );
};

export default BookingCheckList;
