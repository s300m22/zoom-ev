import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BoldText, Button, Heading, Popup, SubText, UserAvatar } from '../..';
import {
  AddUserReviewForm,
  ButtonsWrapper,
  AddHostCarReviewPopupWrapper,
  ReviewContainer,
} from './AddHostCarReviewPopup.styled';
import { ImageType, ReviewTypeEnum } from '../../../interfaces/api.types.generated.d';
import { logError } from '../../../utils';
import { useAddReviewMutation } from '../../../hooks/api/addReview/addReview.generated';
import { StarInput, TextArea } from '../../Inputs';
import { useSnackbar } from '../../../hooks';
import CarPhoto from '../../CarPhoto';

export interface CompleteBookingPopupProps {
  rentalId: string;
  hostDetails: {
    isBusiness: boolean;
    name: string;
    avatar: string;
  };
  carDetails: {
    name?: string;
    avatar?: ImageType | null;
    plate?: string;
  };
}

interface ReviewHostAndCarInput {
  userScore: number;
  userNote: string;
  carScore: number;
  carNote: string;
}

const PopupTrigger = () => <Button>Leave review</Button>;

const AddHostCarReviewPopup = ({
  rentalId,
  hostDetails,
  carDetails,
}: CompleteBookingPopupProps) => {
  const showSnackbar = useSnackbar();
  const [openPopup, setOpenPopup] = useState(false);
  const [addCarReview, { loading: carReviewLoading }] = useAddReviewMutation();
  const [addUserReview, { loading: userReviewLoading }] = useAddReviewMutation({
    refetchQueries: ['carRentalRequests'],
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    trigger,
  } = useForm<ReviewHostAndCarInput>({
    mode: 'onBlur',
  });

  const onSubmit = async (input: ReviewHostAndCarInput) => {
    try {
      const isValid = await trigger();

      if (!isValid) {
        return;
      }

      const { userScore, userNote, carScore, carNote } = input;

      await addCarReview({
        variables: {
          rentalRequestId: rentalId,
          note: carNote,
          score: carScore,
          reviewType: ReviewTypeEnum.Car,
        },
      });

      await addUserReview({
        variables: {
          rentalRequestId: rentalId,
          note: userNote,
          score: userScore,
          reviewType: hostDetails.isBusiness
            ? ReviewTypeEnum.CarOwnerBusiness
            : ReviewTypeEnum.CarOwnerIndividual,
        },
      });
      showSnackbar({ message: 'Thanks! Reviews successfully added.', type: 'success' });
    } catch (error: any) {
      showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
      logError(error);
    } finally {
      setOpenPopup(false);
    }
  };

  const isLoading = userReviewLoading || carReviewLoading;

  return (
    <Popup isOpen={openPopup} maxHeight="auto" setIsOpen={setOpenPopup} trigger={<PopupTrigger />}>
      <AddHostCarReviewPopupWrapper>
        <AddUserReviewForm id="add-user-review" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Heading variant="h3">Review the EV</Heading>
          <ReviewContainer>
            <div>
              <CarPhoto height="120px" photoUrl={carDetails.avatar?.url} width="120px" />
              <BoldText style={{ marginTop: '15px' }}>{carDetails.name}</BoldText>
              <SubText>{carDetails.plate}</SubText>
            </div>
            <div>
              <StarInput control={control} errors={errors} name="carScore" required />
              <TextArea
                {...register('carNote', { required: true })}
                disabled={isLoading}
                errors={errors}
                maxLength={750}
                noResize
                placeholder="Tell other Guests about your EV experience and how you found  this EV so they know what to expect!"
                required
              />
            </div>
          </ReviewContainer>
          <Heading variant="h3">Review your host</Heading>
          <ReviewContainer>
            <div>
              <UserAvatar avatarUrl={hostDetails.avatar} height="120px" width="120px" />
              <BoldText style={{ marginTop: '15px' }}>{hostDetails.name}</BoldText>
            </div>
            <div>
              <StarInput control={control} errors={errors} name="userScore" required />
              <TextArea
                {...register('userNote', { required: true })}
                disabled={isLoading}
                errors={errors}
                maxLength={750}
                name="userNote"
                noResize
                placeholder="Tell other hosts how did you like renting your EV to this person"
                required
              />
            </div>
          </ReviewContainer>
        </AddUserReviewForm>
        <ButtonsWrapper>
          <Button
            isLoading={isLoading}
            onClick={() => {
              setOpenPopup(false);
            }}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button form="add-user-review" isLoading={isLoading} withArrow>
            Submit
          </Button>
        </ButtonsWrapper>
      </AddHostCarReviewPopupWrapper>
    </Popup>
  );
};

export default AddHostCarReviewPopup;
