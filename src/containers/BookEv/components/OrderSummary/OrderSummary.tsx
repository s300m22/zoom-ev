import { useMemo, Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import {
  BoldText,
  Button,
  CarPhoto,
  Checkbox,
  Heading,
  SimpleCard,
  StyledLink,
  SubText,
  PriceSkeleton,
} from '../../../../elements';
import {
  AgreementsForm,
  AvarageRatings,
  ButtonWrapper,
  CarCardPhotoWrapper,
  CarReviewsCountsWrapper,
  PriceBox,
  SplitBox,
  SummaryBox,
  SummaryBoxCarDetails,
  SummaryInfoText,
  TotalBox,
} from './OrderSummary.styled';
import { GetPublicCarQuery } from '../../../../hooks/api/getPublicCarInformation/getPublicCarInformation.generated';
import { StarIcon } from '../../../../icons';
import {
  formatPrice,
  getCarPhotos,
  getRelationType,
  logError,
  RelationTypesEnum,
} from '../../../../utils';
import { useCreateCarRentalRequestMutation } from '../../../../hooks/api/createCarRentalRequest/createCarRentalRequest.generated';
import { useCarRentalPriceQuery } from '../../../../hooks/api/carRentalPrice/carRentalPrice.generated';
import { useIsBusiness, useNextQueryParam, useSnackbar } from '../../../../hooks';
import mixpanel from 'mixpanel-browser';

interface OrderSummaryProps {
  car: GetPublicCarQuery['car'];
  selectedPaymentMethodId: string;
  setShowOutro: Dispatch<SetStateAction<boolean>>;
}

const OrderSummary = ({ car, selectedPaymentMethodId, setShowOutro }: OrderSummaryProps) => {
  const [ts, te] = useNextQueryParam(['ts', 'te']);
  const carId = car?.id as string;
  const timeStart = parseInt(ts || '', 10);
  const timeEnd = parseInt(te || '', 10);
  const carName = `${car?.details?.maker?.name || ''} ${car?.details?.model?.name || ''}`;
  const carImages = getCarPhotos(car?.details?.images, car?.details.mainImageId);
  const isBusiness = useIsBusiness();
  const relationType = getRelationType(car, isBusiness);
  const carDoors = car?.details.doors;
  const carSeats = car?.details.seats;
  const carTransmission = car?.details.transmission;
  const carLocation = car?.addressPublic;
  const carReviewsCounts = car?.reviewsCount;
  const carReviewsScore = car?.reviewsAverageScore;
  const carPricePerDay = car?.pricePerDay;
  const { data: carRentalPriceData, loading: carRentalPriceLoad } = useCarRentalPriceQuery({
    variables: {
      carId,
      timeStart,
      timeEnd,
    },
  });
  const carRentalPrice = carRentalPriceData?.carRentalPrice;
  const [createCarRentalRequest, { loading: carRentalRequestLoading }] =
    useCreateCarRentalRequestMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    mode: 'onSubmit',
  });
  const showSnackbar = useSnackbar();

  const onSubmit = async () => {
    try {
      const isValid = await trigger();
      if (!isValid) {
        return;
      }
      if (timeStart && timeEnd) {
        await createCarRentalRequest({
          variables: {
            input: {
              carId,
              timeStart,
              timeEnd,
              stripeSetupIntentId: selectedPaymentMethodId,
            },
          },
        });

        mixpanel.track('sharing.create_booking', {
          vehicleId: carId,
          makeAndModel: `${car?.details.maker} ${car?.details.model}`,
          bookingTime: {
            start: timeStart,
            end: timeEnd,
          },
        });
        setShowOutro(true);
      }
    } catch (error: any) {
      if (error.message.includes('4 hours')) {
        showSnackbar({ message: error.message, type: 'error' });
      }
      logError(error);
    }
  };

  const insuranceText = useMemo(() => {
    switch (relationType) {
      case RelationTypesEnum.B2B:
      case RelationTypesEnum.P2B:
        return 'Includes breakdown and insurance cover';
      case RelationTypesEnum.P2P:
      default:
        return 'Includes breakdown cover.\nInsurance is not included and must be organised separately by the Guest.';
    }
  }, [relationType]);

  return carPricePerDay ? (
    <SimpleCard>
      <Heading variant="h4">Order summary </Heading>
      <SummaryBox>
        <CarCardPhotoWrapper>
          <CarPhoto height="auto" photoUrl={carImages.mainImage?.url} width="100%" />
        </CarCardPhotoWrapper>
        <SummaryBoxCarDetails>
          <Heading variant="h6">{carName}</Heading>
          <SubText style={{ fontSize: '16px', margin: '0' }}>
            {carDoors} doors · {carSeats} seats · {carTransmission}
          </SubText>
          <SubText style={{ fontSize: '16px' }}>{carLocation}</SubText>
          <AvarageRatings>
            <StarIcon /> <BoldText>{carReviewsScore || '-'}/5</BoldText>
            <CarReviewsCountsWrapper>({carReviewsCounts})</CarReviewsCountsWrapper>
          </AvarageRatings>
        </SummaryBoxCarDetails>
      </SummaryBox>
      <SplitBox>
        <div>
          <SubText>
            <BoldText>Total</BoldText>
          </SubText>
          {carRentalPrice ? (
            <BoldText style={{ fontWeight: 600, fontSize: '18px' }}>
              {formatPrice((carRentalPrice.rentalFeeOwner + carRentalPrice.rentalFeeZoom) / 100)}
            </BoldText>
          ) : null}
        </div>
        <div>
          <SubText>
            <BoldText>Booking fee</BoldText>
          </SubText>
          {carRentalPrice ? (
            <BoldText style={{ fontWeight: 600, fontSize: '18px' }}>
              {formatPrice(carRentalPrice.additionalFee / 100)}
            </BoldText>
          ) : null}
        </div>
      </SplitBox>

      <TotalBox>
        <PriceBox>
          <Heading variant="h6">Total</Heading>
          {carRentalPrice ? (
            <Heading variant="h4">
              {carRentalPriceLoad ? (
                <PriceSkeleton width={60} />
              ) : (
                formatPrice(carRentalPrice.rentalFeeSum / 100)
              )}
            </Heading>
          ) : null}
        </PriceBox>
        <SummaryInfoText>{insuranceText}</SummaryInfoText>
      </TotalBox>

      <AgreementsForm noValidate onSubmit={handleSubmit(onSubmit)}>
        <Checkbox
          {...register('terms', { required: true })}
          customStyles={{
            fontSize: '16px',
            fontWeight: 400,
          }}
          errors={errors}
          label={
            <>
              I accept the{' '}
              <StyledLink color="blue" externalLink href="/terms-and-conditions">
                Terms and Conditions
              </StyledLink>
            </>
          }
          required
        />
        <Checkbox
          {...register('criteria', { required: true })}
          customStyles={{
            fontSize: '16px',
            fontWeight: 400,
          }}
          errors={errors}
          label={
            <>
              I meet the Member{' '}
              <StyledLink color="blue" externalLink href="/terms-and-conditions">
                Eligibility criteria
              </StyledLink>
            </>
          }
          required
        />
        <Checkbox
          {...register('insurance', { required: true })}
          customStyles={{
            fontSize: '16px',
            fontWeight: 400,
          }}
          errors={errors}
          label={
            <>
              I agree to the{' '}
              <StyledLink color="blue" externalLink href="/terms-and-conditions">
                Insurance requirements
              </StyledLink>
            </>
          }
          required
        />
        <ButtonWrapper>
          <Button disabled={!selectedPaymentMethodId} isLoading={carRentalRequestLoading} withArrow>
            Confirm and pay
          </Button>
        </ButtonWrapper>
      </AgreementsForm>
    </SimpleCard>
  ) : (
    <Skeleton
      count={1}
      height={702}
      style={{
        borderRadius: '12px',
        boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
      }}
    />
  );
};
export default OrderSummary;
