import compareAsc from 'date-fns/compareAsc';
import differenceInHours from 'date-fns/differenceInHours';
import isPast from 'date-fns/isPast';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import isWithinInterval from 'date-fns/isWithinInterval';
import { useForm, useWatch } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import add from 'date-fns/add';
import { isSameDay } from 'date-fns';

import {
  Button,
  DateInput,
  Error,
  Heading,
  SimpleCard,
  SubText,
  PriceSkeleton,
} from '../../../../elements';
import { useIsBusiness, useNextQueryParam } from '../../../../hooks';
import { useCarRentalPriceLazyQuery } from '../../../../hooks/api/carRentalPrice/carRentalPrice.generated';
import { GetPublicCarQuery } from '../../../../hooks/api/getPublicCarInformation/getPublicCarInformation.generated';
import { UserDetailsApprovalStatusEnum } from '../../../../interfaces/api.types.generated.d';
import { userDetailsAtom } from '../../../../recoil';
import { formatPrice, getRelationType, RelationTypesEnum, logError } from '../../../../utils';
import {
  BookEvForm,
  CostSummary,
  CostSummaryRow,
  CostSummaryTotal,
  InfoText,
} from './BookCard.styled';
import Dialog from '../../../../elements/Dialog';
import { AuthState, BookingDialogContent, getDialogContentForState } from './BookCard.utils';

interface BookCardProps {
  car: GetPublicCarQuery['car'];
}
interface FormProps {
  availabilityTimeStart: any;
  availabilityTimeEnd: any;
}

const BookCard = ({ car }: BookCardProps) => {
  const router = useRouter();
  const [timeStart, timeEnd] = useNextQueryParam(['start', 'end']);

  const userDetails = useRecoilValue(userDetailsAtom);
  const isBusiness = useIsBusiness();
  const isUserApproved =
    userDetails?.details.approvalStatus === UserDetailsApprovalStatusEnum.Approved &&
    userDetails.validAsCarRenter;
  const [bookingUnavailableDialog, setBookingUnavailableDialog] =
    useState<BookingDialogContent | null>(null);
  const carId = car?.id as string;
  const pricePerHour = car?.pricePerHour as number;
  const pricePerDay = car?.pricePerDay as number;
  const pricePerWeek = car?.pricePerWeek as number;
  const relationType = getRelationType(car, isBusiness);
  const [userStatusNotification, setUserStatusNotification] = useState('');
  const [title, setTitle] = useState({
    label: 'hour',
    price: pricePerHour ? Math.trunc(pricePerHour) / 100 : 0,
  });
  const [error, setError] = useState('');

  const [disableButton, setDisableButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const carAvailabilityPeriods = useMemo(() => car?.availabilityPeriodsComputed, [car]);

  const [
    getCarRentalPrice,
    { data: carRentalPriceData, loading: carRentalPriceLoading, called: carRentalCalled },
  ] = useCarRentalPriceLazyQuery();

  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    setValue,
  } = useForm<FormProps>({
    mode: 'onSubmit',
  });

  const carRentalPrice = carRentalPriceData?.carRentalPrice;

  const onSubmit = async (input: FormProps) => {
    try {
      setLoading(true);
      const { availabilityTimeStart, availabilityTimeEnd } = input;
      const isValid = await trigger();

      if (!isValid && error) {
        return;
      }
      if (isBusiness) {
        setUserStatusNotification('You do not have permission to rent a car on this account');
      } else if (isUserApproved) {
        router.push(
          `/book-ev/${carId}?ts=${Date.parse(availabilityTimeStart)}&te=${Date.parse(
            availabilityTimeEnd,
          )}`,
        );
      } else if (
        userDetails?.detailsRequested?.approvalStatus === UserDetailsApprovalStatusEnum.Pending
      ) {
        setBookingUnavailableDialog(getDialogContentForState(AuthState.PENDING));
      } else if (
        userDetails?.detailsRequested?.approvalStatus === UserDetailsApprovalStatusEnum.Rejected
      ) {
        setBookingUnavailableDialog(getDialogContentForState(AuthState.REJECTED));
      } else if (userDetails?.id) {
        setBookingUnavailableDialog(getDialogContentForState(AuthState.UNAPPROVED));
      } else {
        router.push(
          `/auth/login?returnTo=${encodeURIComponent(
            `/car/${car?.id}?start=${Date.parse(availabilityTimeStart)}&end=${Date.parse(
              availabilityTimeEnd,
            )}`,
          )}`,
        );
      }
    } catch (err) {
      logError(err);
    } finally {
      setLoading(false);
    }
  };

  const availabilityTimeStart = useWatch<any>({
    control,
    name: 'availabilityTimeStart',
  });

  const availabilityTimeEnd = useWatch<any>({
    control,
    name: 'availabilityTimeEnd',
  });

  useEffect(() => {
    if (availabilityTimeStart && availabilityTimeEnd) {
      const diffInHours = differenceInHours(availabilityTimeEnd, availabilityTimeStart);
      if (diffInHours >= 168) {
        setTitle({
          label: 'week',
          price: pricePerWeek / 100,
        });
      } else if (diffInHours >= 24) {
        setTitle({
          label: 'day',
          price: pricePerDay / 100,
        });
      } else {
        setTitle({
          label: 'hour',
          price: pricePerHour / 100,
        });
      }

      if (isPast(availabilityTimeStart)) {
        setError('You can only select future dates.');
        setDisableButton(true);
      } else if (
        availabilityTimeEnd &&
        compareAsc(availabilityTimeStart, availabilityTimeEnd) > 0
      ) {
        setError('End date must be later than start date.');
        setDisableButton(true);
      } else {
        setError('');
        getCarRentalPrice({
          variables: {
            carId,
            timeStart: availabilityTimeStart.getTime(),
            timeEnd: availabilityTimeEnd.getTime(),
          },
        });
        setDisableButton(false);
      }
    } else {
      setDisableButton(true);
      setError('');
    }
  }, [
    availabilityTimeEnd,
    availabilityTimeStart,
    car,
    carId,
    getCarRentalPrice,
    pricePerDay,
    pricePerHour,
    pricePerWeek,
    timeStart,
    timeEnd,
  ]);

  const insuranceText = useMemo(() => {
    switch (relationType) {
      case RelationTypesEnum.B2B:
      case RelationTypesEnum.P2B:
        return 'Includes breakdown and insurance cover';
      case RelationTypesEnum.P2P:
      default:
        return 'Includes breakdown cover. Insurance is not included and must be organised separately by the Guest.';
    }
  }, [relationType]);

  const bookedPeriodsTemp = useMemo(
    () =>
      car?.bookedPeriods.map((bp) => ({
        start: new Date(bp.timeStart!).toUTCString(), // eslint-disable-line
        end: new Date(bp.timeEnd!).toUTCString(), // eslint-disable-line
      })),
    [car?.bookedPeriods],
  );

  const filterDate = (date: Date, isEnd?: boolean) => {
    const startingPeriod =
      availabilityTimeStart && isEnd
        ? [
            carAvailabilityPeriods?.find(({ timeStart: start, timeEnd: end }) =>
              isWithinInterval(availabilityTimeStart, { start, end }),
            ),
          ]
        : [];
    const periods = startingPeriod.length ? startingPeriod : carAvailabilityPeriods;
    const isDateAvailable = periods?.find((period) => {
      if (period) {
        const { timeStart: start, timeEnd: end } = period;
        if (start && end) {
          return (
            isSameDay(date, start) ||
            isSameDay(date, end - 1) ||
            isWithinInterval(date, { start, end })
          );
        }
      }
      return false;
    });
    return Boolean(isDateAvailable);
  };

  const filterTime = (date: Date) => {
    const isTimeAvailable = carAvailabilityPeriods?.find((period) => {
      const { timeStart: start, timeEnd: end } = period;
      if (start && end) {
        return isWithinInterval(date, { start, end });
      }
      return false;
    });
    return Boolean(isTimeAvailable);
  };

  useEffect(() => {
    if (timeStart) setValue('availabilityTimeStart', new Date(parseInt(timeStart)));
    if (timeEnd) setValue('availabilityTimeEnd', new Date(parseInt(timeEnd)));
  }, [setValue, timeEnd, timeStart]);

  return car?.pricePerDay ? (
    <SimpleCard>
      <Heading variant="h4">
        {formatPrice(title.price)} / {title.label}
      </Heading>
      <br />
      <BookEvForm id="book-ev" noValidate onSubmit={handleSubmit(onSubmit)}>
        <DateInput
          alternative
          control={control}
          disabled={loading}
          disabledPeriods={bookedPeriodsTemp}
          endDate={availabilityTimeEnd}
          errors={errors}
          filterDate={filterDate}
          filterTime={filterTime}
          label="Pick up"
          name="availabilityTimeStart"
          placeholderText="Add date and time"
          prefilledDate={
            typeof timeStart === 'string'
              ? parseInt(timeStart, 10)
              : add(Date.now(), { days: 1 }).getTime()
          }
          required
          showClock
        />
        <DateInput
          alternative
          control={control}
          disabled={loading}
          disabledPeriods={bookedPeriodsTemp}
          errors={errors}
          filterDate={filterDate}
          filterTime={filterTime}
          label="Drop Off"
          name="availabilityTimeEnd"
          placeholderText="Add date and time"
          prefilledDate={typeof timeEnd === 'string' ? parseInt(timeEnd, 10) : null}
          required
          showClock
          startDate={availabilityTimeStart}
        />
      </BookEvForm>

      {bookingUnavailableDialog && (
        <Dialog
          header={bookingUnavailableDialog.title}
          onClose={() => setBookingUnavailableDialog(null)}
          text={bookingUnavailableDialog.text}
        >
          <Button
            onClick={() => {
              setBookingUnavailableDialog(null);
            }}
            variant="outlined"
          >
            {bookingUnavailableDialog.action1Title}
          </Button>
          {bookingUnavailableDialog.action2Path && (
            <Button
              onClick={() => {
                if (bookingUnavailableDialog.action2Path)
                  router.push(bookingUnavailableDialog.action2Path);
              }}
            >
              {bookingUnavailableDialog.action2Title}
            </Button>
          )}
        </Dialog>
      )}

      {/* <Error>{error}</Error> */}
      {carRentalPrice || carRentalCalled ? (
        <CostSummary>
          <CostSummaryRow>
            <SubText>Total</SubText>
            <Heading variant="h6">
              {carRentalPriceLoading ? (
                <PriceSkeleton />
              ) : (
                formatPrice(
                  carRentalPrice
                    ? (carRentalPrice.rentalFeeSum - carRentalPrice.additionalFee) / 100
                    : 0,
                )
              )}
            </Heading>
          </CostSummaryRow>
          <CostSummaryRow>
            <SubText>Booking fee</SubText>
            <Heading variant="h6">
              {carRentalPriceLoading ? (
                <PriceSkeleton />
              ) : (
                formatPrice(carRentalPrice ? carRentalPrice.additionalFee / 100 : 0)
              )}
            </Heading>
          </CostSummaryRow>
          <CostSummaryTotal>
            <Heading variant="h4">Total</Heading>
            <Heading variant="h4">
              {carRentalPriceLoading ? (
                <PriceSkeleton />
              ) : (
                formatPrice(carRentalPrice ? carRentalPrice.rentalFeeSum / 100 : 0)
              )}
            </Heading>
          </CostSummaryTotal>
          {}
          <InfoText>{insuranceText}</InfoText>
        </CostSummary>
      ) : null}
      <Button disabled={disableButton} form="book-ev">
        Book this EV
      </Button>
      {userStatusNotification ? (
        <Error style={{ marginTop: '10px' }}>{userStatusNotification}</Error>
      ) : null}
    </SimpleCard>
  ) : null;
};

export default BookCard;
