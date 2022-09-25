import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { BoldText, Button, Heading, UserAvatar } from '../../../..';
import { StarInput, TextArea } from '../../../../Inputs';
import { ButtonsWrapper } from '../../CompleteBookingPopup.styled';
import { AddUserReviewForm } from './AddUserReview.styled';
import { useAddReviewMutation } from '../../../../../hooks/api/addReview/addReview.generated';
import { logError } from '../../../../../utils';
import { ReviewType, ReviewTypeEnum } from '../../../../../interfaces/api.types.generated.d';
import { CarRentalRequestsQuery } from '../../../../../hooks/api/carRentalRequests/carRentalRequests.generated';

interface AddUserReviewProps {
  rentalId: string;
  guestDetails: CarRentalRequestsQuery['carRentalRequests']['rentalRequests'][0]['user']['details'];
  setActiveStep: Dispatch<SetStateAction<number>>;
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
  refetchRentals: () => void;
}

const AddUserReview = ({
  rentalId,
  guestDetails,
  setActiveStep,
  setOpenPopup,
  refetchRentals,
}: AddUserReviewProps) => {
  const [addReview, { loading }] = useAddReviewMutation({ refetchQueries: ['carRentalRequests'] });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    trigger,
  } = useForm<ReviewType>({
    mode: 'onBlur',
  });

  const onSubmit = async (input: ReviewType) => {
    try {
      const isValid = await trigger();

      if (!isValid) {
        return;
      }

      const { score, note } = input;
      await addReview({
        variables: {
          rentalRequestId: rentalId,
          note,
          score,
          reviewType: ReviewTypeEnum.CarRenter,
        },
      });
      setActiveStep(5);
    } catch (error: any) {
      logError(error);
    }
  };

  return (
    <>
      <Heading variant="h3">Review your Guest</Heading>
      <AddUserReviewForm id="add-user-review" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <UserAvatar avatarUrl={guestDetails.avatarImage?.url} height="120px" width="120px" />
          <BoldText style={{ marginTop: '15px' }}>
            {guestDetails.firstName} {guestDetails.lastName}
          </BoldText>
        </div>
        <div>
          <StarInput control={control} errors={errors} name="score" required />
          <TextArea
            // @ts-ignore
            {...register('note', { required: true })}
            disabled={loading}
            errors={errors}
            maxLength={750}
            noResize
            placeholder="Tell other hosts how did you like renting your EV to this person"
            required
          />
        </div>
      </AddUserReviewForm>
      <ButtonsWrapper>
        <Button
          isLoading={loading}
          onClick={() => {
            setActiveStep(0);
            refetchRentals();
            setOpenPopup(false);
          }}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button form="add-user-review" isLoading={loading} withArrow>
          Submit
        </Button>
      </ButtonsWrapper>
    </>
  );
};

export default AddUserReview;
